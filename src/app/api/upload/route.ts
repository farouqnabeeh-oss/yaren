import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only images are allowed" }, { status: 400 });
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Image must be under 5MB" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Build unique filename
    const ext = file.name.split(".").pop() ?? "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const filePath = `uploads/${filename}`;

    try {
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from("yareen-uploads") // Make sure this bucket exists and is public
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (error) {
        throw error;
      }

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from("yareen-uploads")
        .getPublicUrl(filePath);

      return NextResponse.json({ url: publicUrl });
    } catch (supabaseError) {
      console.warn("Supabase upload failed, falling back to local storage:", supabaseError);
      
      // Local fallback
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      
      // Ensure directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      const localFilePath = path.join(uploadDir, filename);
      await fs.promises.writeFile(localFilePath, buffer);
      
      // Return local public URL path
      const publicUrl = `/uploads/${filename}`;
      return NextResponse.json({ url: publicUrl });
    }
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

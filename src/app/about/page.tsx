import { getExperts } from "@/lib/actions/experts";
import AboutClient from "./AboutClient";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const experts = await getExperts();
  return <AboutClient dbExperts={experts} />;
}

"use client";

import TabsSection, { Tab } from "@/components/tabs";
import { useSearchParams, useRouter } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const activeTab: Tab = searchParams.get("active") as Tab;

  if (activeTab) {
    const router = useRouter();
    router.replace("/");
  }

  return <TabsSection activeTab={activeTab} />;
}

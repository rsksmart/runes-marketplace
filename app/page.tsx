"use client";

import TabsSection, { Tab } from "@/components/tabs";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const activeTab: Tab = searchParams.get("active") as Tab;
  const router = useRouter();

  useEffect(() => {
    if (activeTab) {
      router.replace("/");
    }
  }, []);

  return <TabsSection activeTab={activeTab} />;
}

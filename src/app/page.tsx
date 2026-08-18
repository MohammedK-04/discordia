"use client";

import { useState } from "react";
import { AppShell, type TabName } from "@/components/layout";

export default function Page() {
  const [tab, setTab] = useState<TabName>("Home");
  const [createOpen, setCreateOpen] = useState(false);
  const [rolesOpen, setRolesOpen] = useState(false);

  return (
    <AppShell
      tab={tab}
      onTabChange={setTab}
      createOpen={createOpen}
      onCreateOpen={() => setCreateOpen(true)}
      onCreateClose={() => setCreateOpen(false)}
      rolesOpen={rolesOpen}
      onRolesOpen={() => setRolesOpen(true)}
      onRolesClose={() => setRolesOpen(false)}
    />
  );
}

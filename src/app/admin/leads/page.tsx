import React from "react";
import { AdminAuthGuard } from "@/components/admin/admin-auth-guard";
import { CRMDashboard } from "@/components/admin/crm-dashboard";

export const metadata = {
  title: "Admin Client CRM & AI Agent | Exo Advance LLC",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLeadsPage() {
  return (
    <AdminAuthGuard>
      <CRMDashboard />
    </AdminAuthGuard>
  );
}

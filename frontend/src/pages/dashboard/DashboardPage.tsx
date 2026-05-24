import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { InvestorDashboard } from "./InvestorDashboard";
import { EntrepreneurDashboard } from "./EntrepreneurDashboard";
import { DashboardLayout } from "../../components/layout/DashboardLayout";

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="p-20 text-center text-2xl">Loading Dashboard...</div>
    );
  }

  console.log("🔍 Current User:", user.name, "| Role:", user.role);

  const isEntrepreneur = user.role?.toLowerCase().trim() === "entrepreneur";

  return (
    <DashboardLayout>
      {isEntrepreneur ? <EntrepreneurDashboard /> : <InvestorDashboard />}
    </DashboardLayout>
  );
};

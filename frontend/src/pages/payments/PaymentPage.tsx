import React, { useState } from "react";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeftRight,
  CreditCard,
  History,
  DollarSign,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";

interface Transaction {
  id: string;
  amount: number;
  type: "Deposit" | "Withdraw" | "Transfer";
  party: string; // Sender or Receiver name
  status: "Completed" | "Pending";
  date: string;
}

export const PaymentPage: React.FC = () => {
  // States for Wallet Balance Simulation
  const [balance, setBalance] = useState<number>(25450.0);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "TXN-9821",
      amount: 5000,
      type: "Deposit",
      party: "Main Bank Account",
      status: "Completed",
      date: "May 20, 2026",
    },
    {
      id: "TXN-7410",
      amount: 12000,
      type: "Transfer",
      party: "Nexus Alpha Startup (Deal #1)",
      status: "Completed",
      date: "May 18, 2026",
    },
    {
      id: "TXN-3211",
      amount: 1500,
      type: "Withdraw",
      party: "ATM Cash Out",
      status: "Completed",
      date: "May 15, 2026",
    },
  ]);

  // Form inputs states
  const [amountInput, setAmountInput] = useState<string>("");
  const [transferTarget, setTransferTarget] = useState<string>("");
  const [activeTab, setActiveTab] = useState<
    "Deposit" | "Withdraw" | "Transfer"
  >("Deposit");

  // Handle Simulation Logic
  const handleTransactionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amountInput);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Yar sahi amount enter karo!");
      return;
    }

    if (
      (activeTab === "Withdraw" || activeTab === "Transfer") &&
      numericAmount > balance
    ) {
      alert("Oops! Wallet mein itne paise nahi hain.");
      return;
    }

    // Process balances simulation
    let targetParty = "My Bank Account";
    if (activeTab === "Deposit") {
      setBalance((prev) => prev + numericAmount);
    } else if (activeTab === "Withdraw") {
      setBalance((prev) => prev - numericAmount);
    } else if (activeTab === "Transfer") {
      if (!transferTarget.trim()) {
        alert("Yar receiver ka naam to likho!");
        return;
      }
      setBalance((prev) => prev - numericAmount);
      targetParty = transferTarget;
    }

    // Add to history table mockup
    const newTxn: Transaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      amount: numericAmount,
      type: activeTab,
      party: targetParty,
      status: "Completed",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    setTransactions((prev) => [newTxn, ...prev]);
    setAmountInput("");
    setTransferTarget("");
    alert(`${activeTab} Simulation Successful!`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6 text-gray-900 dark:text-white">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Escrow Wallet & Payments
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Simulate secure Stripe/PayPal transfers and manage funding deal equity
          releases.
        </p>
      </div>

      {/* Top Grid: Balance and Card View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wallet Balance Display Card */}
        <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg border-none rounded-2xl relative overflow-hidden">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium opacity-80">
                Available Escrow Balance
              </span>
              <Wallet className="w-6 h-6 opacity-80" />
            </div>
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight">
                ${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </h2>
              <p className="text-xs opacity-75 mt-1">
                Platform ID: NX-99402-USR
              </p>
            </div>
            <div className="pt-2 flex gap-4 text-xs font-semibold border-t border-white/20">
              <span className="flex items-center gap-1 text-green-300">
                <ArrowUpRight className="w-3 h-3" /> +$5,000 this week
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Mock Stripe Virtual Card Object */}
        <Card className="bg-gray-900 text-white shadow-lg border-none rounded-2xl md:col-span-2 relative overflow-hidden font-mono bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black">
          <CardContent className="p-6 h-full flex flex-col justify-between min-h-[160px]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans">
                  Nexus Venture Secured Card
                </p>
                <p className="text-sm mt-1 font-semibold text-blue-400">
                  INVESTOR ACCOUNT
                </p>
              </div>
              <CreditCard className="w-8 h-8 text-gray-400" />
            </div>
            <div className="text-xl tracking-[0.25em] py-2">
              •••• •••• •••• 4242
            </div>
            <div className="flex justify-between items-center text-xs font-sans text-gray-400">
              <div>
                <p className="text-[9px] uppercase">Card Holder</p>
                <p className="font-medium text-white tracking-wide mt-0.5">
                  MOCK USER PROTOCOL
                </p>
              </div>
              <div className="text-right">
                <p className="text-[9px] uppercase">Expires</p>
                <p className="font-medium text-white mt-0.5">12 / 29</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Grid: Controls Form & Real-time execution system */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Transaction Control Box */}
        <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
          <div className="flex border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30">
            {(["Deposit", "Withdraw", "Transfer"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab);
                  setAmountInput("");
                }}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${activeTab === tab ? "border-blue-600 text-blue-600 bg-white dark:bg-gray-800" : "border-transparent text-gray-400 hover:text-gray-600"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <CardContent className="p-5">
            <form onSubmit={handleTransactionSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-1.5">
                  Amount (USD)
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={amountInput}
                    onChange={(e) => setAmountInput(e.target.value)}
                    placeholder="0.00"
                    className="block w-full pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
                    required
                  />
                </div>
              </div>

              {activeTab === "Transfer" && (
                <div className="animate-fadeIn">
                  <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-1.5">
                    Recipient Startup / Founder Name
                  </label>
                  <input
                    type="text"
                    value={transferTarget}
                    onChange={(e) => setTransferTarget(e.target.value)}
                    placeholder="e.g. Nexus Alpha HQ"
                    className="block w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required={activeTab === "Transfer"}
                  />
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full text-xs font-bold uppercase tracking-wider py-2.5"
              >
                Execute Mock {activeTab}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Transaction History Table List Panel */}
        <Card className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
            <History className="w-4 h-4 text-gray-400" />
            <h3 className="font-bold text-base">
              Simulated Transaction Log Registry
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 dark:bg-gray-900/40 text-gray-400 text-[10px] uppercase font-bold tracking-wider border-b border-gray-100 dark:border-gray-700">
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Party/Destination</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm font-medium">
                {transactions.map((txn) => (
                  <tr
                    key={txn.id}
                    className="hover:bg-gray-50/50 dark:hover:bg-gray-900/10 transition-colors"
                  >
                    <td className="p-4 font-mono text-xs text-gray-400">
                      {txn.id}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                          txn.type === "Deposit"
                            ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                            : txn.type === "Withdraw"
                              ? "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                              : "text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400"
                        }`}
                      >
                        {txn.type === "Deposit" && (
                          <ArrowDownLeft className="w-3 h-3" />
                        )}
                        {txn.type === "Withdraw" && (
                          <ArrowUpRight className="w-3 h-3" />
                        )}
                        {txn.type === "Transfer" && (
                          <ArrowLeftRight className="w-3 h-3" />
                        )}
                        {txn.type}
                      </span>
                    </td>
                    <td className="p-4 text-xs font-semibold text-gray-600 dark:text-gray-300">
                      {txn.party}
                    </td>
                    <td className="p-4 text-xs text-gray-400">{txn.date}</td>
                    <td className="p-4">
                      <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {txn.status}
                      </span>
                    </td>
                    <td
                      className={`p-4 text-right font-bold ${txn.type === "Deposit" ? "text-green-600" : "text-gray-800 dark:text-white"}`}
                    >
                      {txn.type === "Deposit" ? "+" : "-"}$
                      {txn.amount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

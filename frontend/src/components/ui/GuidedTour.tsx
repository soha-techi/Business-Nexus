import React, { useState } from "react";
import { HelpCircle, ArrowRight, X } from "lucide-react";
import { useLocation } from "react-router-dom";

interface TourStep {
  title: string;
  content: string;
}

export const GuidedTour: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const location = useLocation();

  // 🎯 Dynamic steps mapping according to your exact file structure & paths
  const tourDatabase: Record<string, TourStep[]> = {
    // 🌟 Dashboard Page shows ALL features guidance as requested!
    "/dashboard": [
      {
        title: "🚀 Main Dashboard Overview",
        content: "Welcome to Business Nexus! Monitor live charts, platform activities, and dynamic startup tracking cards at a single glance.",
      },
      {
        title: "📹 Nexus Conference Room",
        content: "Equipped with secure WebRTC infrastructure for real-time secure video meetings and active screen presentation with global investors.",
      },
      {
        title: "📁 Document Chamber",
        content: "A secure digital vault where entrepreneurs and investors upload, sign, and authorize contracts under high-grade simulated encryption.",
      },
      {
        title: "💳 Payments Wallet Matrix",
        content: "Simulates digital escrow accounts, dynamic holding balances, and safe contract fund transfers smoothly.",
      },
      {
        title: "📅 Sync Meeting Calendar",
        content: "Integrated scheduling grid to log calendar events and fix pitch meetings with venture capital teams without overlaps.",
      },
      {
        title: "🔒 2FA Security System",
        content: "Your entry is bulletproof with multi-step One-Time Password verification (Mock: 123456) and a real-time live password strength meter.",
      }
    ],

    // 📹 Conference Room Page (Only Video Room steps)
    "/video-room": [
      {
        title: "📹 WebRTC Setup Lobby",
        content: "This lobby automatically triggers device checks. Ensure your hardware links, camera feeds, and microphones are authorized before launching the stream.",
      },
      {
        title: "🖥️ In-Call Control Array",
        content: "Inside an active call, utilize instant HD screen sharing, mute local audio arrays, or present slide decks flawlessly.",
      }
    ],

    // 💳 Payments Wallet Page (Only Payments steps)
    "/payments": [
      {
        title: "💳 Escrow & Account Balance",
        content: "Track live internal balances, simulated ledger holdings, and verify inbound or outbound milestone payments securely.",
      },
      {
        title: "📊 Historical Transaction Ledger",
        content: "Review comprehensive transaction logs tracking amounts, unique sender IDs, receiver names, and clear real-time processing statuses.",
      }
    ],

    // 📅 Meeting Calendar Page (Only Calendar steps)
    "/calendar": [
      {
        title: "📅 Interactive Booking Matrix",
        content: "Manage investor scheduling profiles here. Click on any active date block to create, review, or modify virtual presentation timelines.",
      }
    ],

    // 📁 Document Chamber Page (Only Document steps)
    "/documents": [
      {
        title: "📁 Corporate Document Chamber",
        content: "Securely upload legal documents or business pitch files. Select any transaction agreement from the sidebar matrix to review and e-sign.",
      }
    ]
  };

  // Fallback default step if URL path doesn't explicitly match
  const defaultSteps: TourStep[] = [
    {
      title: "🚀 Business Nexus Ecosystem",
      content: "Use the sidebar links to navigate through different modules like the Video Lounge, Document Chamber, and Escrow Wallet utilities.",
    }
  ];

  // Match the exact current browser URL path
  const currentPath = location.pathname.toLowerCase();
  const steps = tourDatabase[currentPath] || defaultSteps;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOpen(false);
      setCurrentStep(0);
    }
  };

  return (
    <>
      {/* Floating Tour Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setCurrentStep(0);
            setIsOpen(true);
          }}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 z-50 transition-all transform hover:scale-105"
        >
          <HelpCircle className="w-5 h-5" />
          <span>Tour This Page</span>
        </button>
      )}

      {/* Dynamic Pop-up Guide Card */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-85 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl p-5 shadow-2xl z-50 border border-blue-100 dark:border-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-base text-blue-600 dark:text-blue-400 tracking-tight">
              {steps[currentStep]?.title}
            </h3>
            <button
              onClick={() => {
                setIsOpen(false);
                setCurrentStep(0);
              }}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            {steps[currentStep]?.content}
          </p>

          <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
            <span className="text-[10px] text-gray-400 font-medium">
              Step {currentStep + 1} of {steps.length}
            </span>
            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1 transition-colors"
            >
              <span>{currentStep === steps.length - 1 ? "Finish" : "Next"}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
import React, { useState } from "react";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Monitor,
  MonitorOff,
  User,
  ShieldCheck,
  Radio,
  Users,
  Settings2,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";

export const VideoCallPage: React.FC = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);

  const handleStartCall = () => {
    setIsCallActive(true);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setIsScreenSharing(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-2 md:p-4">
      {/* Upper Header Layout */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 dark:border-gray-800 pb-5 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Nexus Conference Room
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Secure WebRTC End-to-End Encrypted Video Collaboration
          </p>
        </div>
        {/* Dynamic Badge status */}
        <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-lg text-xs font-semibold border border-blue-100 dark:border-blue-900/50">
          <ShieldCheck className="w-4 h-4" />
          <span>Room Status: Protected Server</span>
        </div>
      </div>

      {!isCallActive ? (
        /* ================= PREMIUM LOBBY INTERFACE ================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
          {/* Left Panel: Aesthetic Welcome & Info */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6 bg-gradient-to-br from-gray-900 to-slate-800 text-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-800">
            <div className="space-y-4">
              <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Business Lounge
              </span>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                Connect Live with Top Global Investors & Founders
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                Experience high-fidelity, ultra-low latency audio and visual
                streams. Pitch decks can be seamlessly discussed through the
                real-time screen sharing matrix.
              </p>
            </div>

            {/* Quick Feature Metric Grid */}
            <div className="grid grid-cols-3 gap-4 border-t border-gray-800 pt-6">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gray-800 rounded-lg text-blue-400">
                  <Radio className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-400">Latency</p>
                  <p className="text-xs font-bold">&lt; 15ms</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gray-800 rounded-lg text-purple-400">
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-400">Capacity</p>
                  <p className="text-xs font-bold">Multi-Peer</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gray-800 rounded-lg text-emerald-400">
                  <Settings2 className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-400">Audio</p>
                  <p className="text-xs font-bold">HD Voice</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Clean Configuration & Join Card */}
          <div className="lg:col-span-5">
            <Card className="h-full shadow-lg border border-gray-200 dark:border-gray-800 flex flex-col justify-center py-8 px-6 text-center">
              <CardContent className="space-y-6 p-0">
                <div className="relative w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg shadow-blue-500/20">
                  <Video className="w-10 h-10" />
                  <span className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white dark:border-gray-900" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Ready to Join Meeting?
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                    Please ensure your device settings, camera inputs, and
                    microphone links are authorized.
                  </p>
                </div>

                {/* Simulated Hardware Status Checks */}
                <div className="bg-gray-50 dark:bg-gray-900/60 p-3 rounded-xl border border-gray-100 dark:border-gray-800/80 text-left space-y-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between items-center">
                    <span>📷 Media Source Camera</span>
                    <span className="text-green-500 font-semibold">Ready</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🎙️ Default Communications Mic</span>
                    <span className="text-green-500 font-semibold">Active</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 font-semibold shadow-md shadow-blue-500/10 py-3.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  onClick={handleStartCall}
                >
                  Securely Join Call Room
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* ================= ACTIVE VIDEO CALL LAYOUT ================= */
        <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-950 p-4 md:p-6 rounded-3xl relative shadow-2xl min-h-[460px] border border-gray-900">
            {/* Participant 1: Remote Stream */}
            <div className="bg-slate-900 rounded-2xl relative overflow-hidden flex items-center justify-center border border-gray-800/80 group transition-all min-h-[220px]">
              <div className="text-center text-gray-500">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400 border border-gray-700 shadow-inner">
                  <User className="w-10 h-10" />
                </div>
                <p className="font-semibold text-sm text-gray-300">
                  Remote Participant
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Awaiting remote stream upload...
                </p>
              </div>
              <span className="absolute bottom-4 left-4 bg-gray-950/80 backdrop-blur-md px-3 py-1.5 text-xs text-gray-300 rounded-xl font-medium border border-gray-800/60">
                Partner Secure Stream
              </span>
            </div>

            {/* Participant 2: Local Active User Stream */}
            <div className="bg-slate-900 rounded-2xl relative overflow-hidden flex items-center justify-center border border-gray-800/80 min-h-[220px]">
              {isVideoOn ? (
                <div className="text-center text-blue-400 space-y-2">
                  <div className="inline-flex relative">
                    <Video className="w-14 h-14 mx-auto animate-pulse" />
                    <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 animate-ping" />
                  </div>
                  <p className="text-sm font-semibold text-gray-200">
                    Your Local WebRTC Feed is Active
                  </p>
                  <p className="text-xs text-gray-500">
                    Broadcasting via secure gateway
                  </p>
                </div>
              ) : (
                <div className="text-center text-gray-600">
                  <VideoOff className="w-14 h-14 mx-auto mb-2 text-gray-700" />
                  <p className="text-sm font-semibold">
                    Your Video Stream is Muted
                  </p>
                </div>
              )}

              {isScreenSharing && (
                <div className="absolute inset-0 bg-blue-600/10 backdrop-blur-md flex items-center justify-center border-2 border-blue-500 animate-in fade-in duration-300">
                  <p className="bg-blue-600 text-white text-xs px-3.5 py-2 rounded-xl shadow-lg font-bold tracking-wide uppercase">
                    🖥️ Currently Presenting Screen
                  </p>
                </div>
              )}

              <span className="absolute bottom-4 left-4 bg-gray-950/80 backdrop-blur-md px-3 py-1.5 text-xs text-gray-300 rounded-xl font-medium border border-gray-800/60">
                You (Local Identity)
              </span>
            </div>
          </div>

          {/* Premium Video Floating Controls Bar */}
          <div className="flex justify-center items-center gap-4 bg-white dark:bg-gray-800 max-w-md mx-auto p-3.5 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700/80">
            <button
              onClick={() => setIsAudioOn(!isAudioOn)}
              className={`p-3.5 rounded-xl transition-all shadow-sm ${isAudioOn ? "bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-200" : "bg-red-500 text-white hover:bg-red-600"}`}
              title={isAudioOn ? "Mute Mic" : "Unmute Mic"}
            >
              {isAudioOn ? (
                <Mic className="w-5 h-5" />
              ) : (
                <MicOff className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-3.5 rounded-xl transition-all shadow-sm ${isVideoOn ? "bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-200" : "bg-red-500 text-white hover:bg-red-600"}`}
              title={isVideoOn ? "Turn Camera Off" : "Turn Camera On"}
            >
              {isVideoOn ? (
                <Video className="w-5 h-5" />
              ) : (
                <VideoOff className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={`p-3.5 rounded-xl transition-all shadow-sm ${isScreenSharing ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-200"}`}
              title={isScreenSharing ? "Stop Presenting" : "Share Screen"}
            >
              {isScreenSharing ? (
                <MonitorOff className="w-5 h-5" />
              ) : (
                <Monitor className="w-5 h-5" />
              )}
            </button>

            <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1"></div>

            <button
              onClick={handleEndCall}
              className="p-3.5 bg-red-600 text-white rounded-xl hover:bg-red-700 shadow-md shadow-red-500/20 transition-transform active:scale-95 flex items-center justify-center"
              title="Disconnect Call"
            >
              <PhoneOff className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

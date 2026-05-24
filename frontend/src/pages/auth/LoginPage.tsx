import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error: authError } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Milestone 6: 2FA State Management
  const [step, setStep] = useState<1 | 2>(1);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const handleCredentialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");

    // Pehle initial credentials verify honge, phir OTP step aayega
    const success = await login(formData.email, formData.password);
    if (success) {
      setStep(2); // Move to OTP step mockup
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === "123456") {
      navigate("/dashboard");
    } else {
      setOtpError("Invalid 2FA code. Use mock code: 123456");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl font-bold text-white">BN</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {step === 1 ? "Welcome Back" : "Two-Factor Auth"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {step === 1
                ? "Sign in to your Business Nexus account"
                : "Enter the 6-digit OTP code sent to your device"}
            </p>
          </CardHeader>

          <CardContent>
            {/* Error alerts */}
            {authError && step === 1 && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm">
                  {authError}
                </p>
              </div>
            )}

            {otpError && step === 2 && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm">
                  {otpError}
                </p>
              </div>
            )}

            {/* STEP 1: Email & Password Form */}
            {step === 1 && (
              <form onSubmit={handleCredentialSubmit} className="space-y-4">
                <div>
                  <Input
                    icon={Mail}
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                  />
                </div>

                <div className="relative">
                  <Input
                    icon={Lock}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            )}

            {/* STEP 2: 2FA OTP Input Block */}
            {step === 2 && (
              <form onSubmit={handleOtpSubmit} className="space-y-5">
                <div>
                  <Input
                    icon={ShieldCheck}
                    type="text"
                    name="otp"
                    maxLength={6}
                    placeholder="Enter 6-digit OTP (Mock: 123456)"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    required
                    className="text-center tracking-widest text-lg font-bold"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-1/3"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="w-2/3 bg-green-600 hover:bg-green-700"
                  >
                    Verify & Enter
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

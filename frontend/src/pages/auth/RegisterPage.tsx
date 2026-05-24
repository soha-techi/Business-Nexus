import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User, MapPin } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "entrepreneur",
    location: "",
    bio: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  // Milestone 6: Password Strength Logic
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "Too Short",
    color: "bg-gray-200",
  });

  useEffect(() => {
    const pass = formData.password;
    if (!pass) {
      setPasswordStrength({ score: 0, label: "None", color: "bg-gray-200" });
      return;
    }
    if (pass.length < 6) {
      setPasswordStrength({
        score: 1,
        label: "Weak (Too short)",
        color: "bg-red-500",
      });
      return;
    }

    let currentScore = 1;
    // Check points
    if (/[A-Z]/.test(pass)) currentScore++; // Has uppercase
    if (/[0-9]/.test(pass)) currentScore++; // Has numbers
    if (/[^A-Za-z0-9]/.test(pass)) currentScore++; // Has special characters

    if (currentScore === 1) {
      setPasswordStrength({ score: 1, label: "Weak", color: "bg-red-500" });
    } else if (currentScore === 2) {
      setPasswordStrength({ score: 2, label: "Fair", color: "bg-orange-500" });
    } else if (currentScore === 3) {
      setPasswordStrength({ score: 3, label: "Good", color: "bg-yellow-500" });
    } else {
      setPasswordStrength({
        score: 4,
        label: "Strong Security! 💪",
        color: "bg-green-500",
      });
    }
  }, [formData.password]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[\w.-]+@gmail\.com$/.test(formData.email))
      newErrors.email = "Only @gmail.com emails are allowed";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    setFormErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role as "entrepreneur" | "investor",
      location: formData.location,
      bio: formData.bio,
    };

    const result = await register(userData);
    if (result) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/login");
      }, 2000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: "" });
    }
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
              Create Account
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Join Business Nexus and connect with professionals
            </p>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm">
                  {error}
                </p>
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center space-x-2">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Account created successfully!</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  icon={User}
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  error={formErrors.name}
                />
              </div>

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
                  error={formErrors.email}
                />
              </div>

              <div>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="entrepreneur">Entrepreneur</option>
                  <option value="investor">Investor</option>
                </select>
              </div>

              <div>
                <Input
                  icon={MapPin}
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  error={formErrors.location}
                />
              </div>

              <div>
                <textarea
                  name="bio"
                  placeholder="Bio (optional)"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                />
              </div>

              {/* Password field with Live Strength Meter */}
              <div className="relative space-y-1">
                <Input
                  icon={Lock}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  error={formErrors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-5 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>

                {/* Live Indicator UI Component */}
                {formData.password && (
                  <div className="pt-1 px-1">
                    <div className="flex justify-between text-xs mb-1 font-medium">
                      <span className="text-gray-500 dark:text-gray-400">
                        Password Strength:
                      </span>
                      <span className="capitalize text-gray-700 dark:text-gray-300">
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden flex gap-0.5">
                      <div
                        className={`h-full ${passwordStrength.color} transition-all duration-300`}
                        style={{
                          width: `${(passwordStrength.score / 4) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <Input
                  icon={Lock}
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  error={formErrors.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

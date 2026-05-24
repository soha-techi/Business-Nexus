import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { PaymentPage } from "./pages/payments/PaymentPage";
import { VideoCallPage } from "./pages/video/VideoCallPage";
import { DocumentChamberPage } from "./pages/documents/DocumentChamberPage";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CalendarProvider } from "./contexts/CalendarContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { EntrepreneursPage } from "./pages/entrepreneurs/EntrepreneursPage";
import { InvestorsPage } from "./pages/investors/InvestorsPage";
import { MessagesPage } from "./pages/messages/MessagesPage";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { UserProfilePage } from "./pages/profile/UserProfilePage";
import { RequestsPage } from "./pages/requests/RequestsPage";
import { ChatPage } from "./pages/chat/ChatPage";
import { SettingsPage } from "./pages/settings/SettingsPage";
import CalendarPage from "./pages/CalendarPage";
import { DashboardLayout } from "./components/layout/DashboardLayout";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CalendarProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* GROUP 1: Purane Pages (Kyunki inke andar apna Layout pehle se laga hai) */}
              <Route
                element={
                  <ProtectedRoute>
                    <Outlet />
                  </ProtectedRoute>
                }
              >
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/dashboard/investor" element={<DashboardPage />} />
                <Route
                  path="/dashboard/entrepreneur"
                  element={<DashboardPage />}
                />
                <Route path="/entrepreneurs" element={<EntrepreneursPage />} />
                <Route path="/investors" element={<InvestorsPage />} />
                <Route path="/requests" element={<RequestsPage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/chat/:userId" element={<ChatPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route
                  path="/profile/investor/:id"
                  element={<UserProfilePage />}
                />
                <Route
                  path="/profile/entrepreneur/:id"
                  element={<UserProfilePage />}
                />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>

              {/* GROUP 2: Naye Pages (Inhe Layout ki zaroorat hai, tabhi right side par khulenge) */}
              <Route
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Outlet />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              >
                <Route path="/payments" element={<PaymentPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/video-room" element={<VideoCallPage />} />
                <Route
                  path="/document-chamber"
                  element={<DocumentChamberPage />}
                />
              </Route>

              {/* Default Fallback */}
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </CalendarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

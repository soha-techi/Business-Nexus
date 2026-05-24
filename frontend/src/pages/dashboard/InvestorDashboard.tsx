import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  TrendingUp,
  Users,
  MessageSquare,
  FileText,
  Calendar,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useCalendar } from "../../contexts/CalendarContext";
import { usersAPI } from "../../services/api";
import { CompactEntrepreneurCard } from "../../components/entrepreneur/CompactEntrepreneurCard";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useNavigate } from "react-router-dom";

export const InvestorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { events } = useCalendar();
  const navigate = useNavigate();

  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [stats, setStats] = useState({
    totalEntrepreneurs: 0,
    activeRequests: 0,
    thisMonth: 0,
    messages: 0,
  });

  useEffect(() => {
    fetchEntrepreneurs();
    fetchStats();

    const interval = setInterval(() => {
      fetchEntrepreneurs();
      fetchStats();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchEntrepreneurs();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedIndustry]);

  const fetchEntrepreneurs = async () => {
    try {
      setLoading(true);
      const response = await usersAPI.getEntrepreneurs({
        search: searchTerm,
        industry: selectedIndustry,
        limit: 100,
      });
      setEntrepreneurs(response.data || []);
    } catch (error) {
      console.error("Failed to fetch entrepreneurs:", error);
      setEntrepreneurs([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await usersAPI.getDashboardStats();
      const statsData = response.data || response || {};
      setStats({
        totalEntrepreneurs: 0,
        activeRequests: 0,
        thisMonth: 0,
        messages: 0,
        ...statsData,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const handleMessage = (entrepreneurId: string) =>
    navigate(`/chat/${entrepreneurId}`);
  const handleRequest = (entrepreneurId: string) => {
    alert("Collaboration request sent successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Discover promising entrepreneurs and startups
          </p>
        </div>
        <Button variant="outline" onClick={fetchEntrepreneurs}>
          Refresh
        </Button>
      </div>

      {/* */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Entrepreneurs
                </p>
                <p className="text-2xl font-bold">{stats.totalEntrepreneurs}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Requests
                </p>
                <p className="text-2xl font-bold">{stats.activeRequests}</p>
              </div>
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold">{stats.thisMonth}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Messages</p>
                <p className="text-2xl font-bold">{stats.messages}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold">Confirmed Meetings</h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/calendar")}
            >
              Open Calendar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No meetings scheduled yet.
              <br />
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => navigate("/calendar")}
              >
                Go to Meeting Calendar
              </span>{" "}
              to schedule meetings.
            </div>
          ) : (
            <div className="space-y-3">
              {events.map((meeting: any) => (
                <div
                  key={meeting.id}
                  className="flex items-center justify-between bg-white p-4 rounded-xl border"
                >
                  <div>
                    <p className="font-medium">{meeting.title}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(meeting.start).toLocaleDateString()} •{" "}
                      {new Date(meeting.start).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <span className="px-4 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Confirmed
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/*  */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          Available Entrepreneurs ({entrepreneurs.length})
        </h2>
        {/*  */}
      </div>
    </div>
  );
};

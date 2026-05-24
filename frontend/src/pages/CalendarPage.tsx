import React from "react";
import MeetingCalendar from "../components/Calendar/MeetingCalendar";

const CalendarPage = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header Area (Bina Back Button Ke) */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">
          Meeting Scheduler
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 transition-colors">
          Schedule meetings with investors and manage your availability
        </p>
      </div>

      {/* Calendar Area */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors border border-gray-100 dark:border-gray-700">
        <MeetingCalendar />
      </div>
    </div>
  );
};

export default CalendarPage;

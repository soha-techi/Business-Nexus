import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useCalendar } from "../../contexts/CalendarContext";

const MeetingCalendar = () => {
  const { events, addEvent } = useCalendar();

  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    investor: "",
    description: "",
  });

  const handleDateSelect = (selectInfo: any) => {
    setSelectedSlot(selectInfo);
    setFormData({ title: "", investor: "", description: "" });
    setShowModal(true);
  };

  const handleEventClick = (clickInfo: any) => {
    if (confirm(`Delete this meeting?\n\n${clickInfo.event.title}`)) {
      // Delete functionality baad mein add karenge
      alert("Delete feature coming soon");
    }
  };

  const saveMeeting = () => {
    if (!formData.title) {
      alert("Please enter meeting title");
      return;
    }

    const newEvent = {
      id: Date.now().toString(),
      title: formData.title,
      start: selectedSlot.startStr,
      end: selectedSlot.endStr,
      backgroundColor: "#3b82f6",
    };

    addEvent(newEvent); // ← Context mein save ho raha hai
    setShowModal(false);
    alert("✅ Meeting Scheduled Successfully!");
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        selectable={true}
        select={handleDateSelect}
        events={events}
        eventClick={handleEventClick}
        height="auto"
        slotMinTime="08:00:00"
        slotMaxTime="21:00:00"
      />

      {/* Modal Same as before */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4">
            <h2 className="text-2xl font-bold mb-6">Schedule New Meeting</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Meeting Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Meeting with Alex - Stone Capital"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Investor Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Alex Rivera"
                  value={formData.investor}
                  onChange={(e) =>
                    setFormData({ ...formData, investor: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-blue-500 h-24"
                  placeholder="Meeting agenda..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 border rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={saveMeeting}
                className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MeetingCalendar;

import React, { createContext, useContext, useState } from "react";

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor?: string;
}

interface CalendarContextType {
  events: Event[];
  addEvent: (event: Event) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined,
);

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = (newEvent: Event) => {
    setEvents((prev) => [...prev, newEvent]);
  };

  return (
    <CalendarContext.Provider value={{ events, addEvent }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context)
    throw new Error("useCalendar must be used within CalendarProvider");
  return context;
};

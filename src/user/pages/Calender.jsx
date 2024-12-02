import { useState } from "react";
import Sidebar from "../components/Sidebar";
import CalendarGrid from "../components/CalenderGrid";
import Header from "../components/Header";
import EventModal from "../components/EventModal";

const Calender = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addEvent = (date, event) => {
    setEvents((prev) => ({
      ...prev,
      [date]: [...(prev[date] || []), event],
    }));
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen">
      <Sidebar year={year} events={events} />
      <div className="flex-1 flex flex-col">
        <Header
          year={year}
          onYearChange={(newYear) => setYear(newYear)}
          onAddMeeting={() => setIsModalOpen(true)}
        />
        <CalendarGrid
          year={year}
          events={events}
          onDateSelect={(date) => setSelectedDate(date)}
        />
      </div>
      {isModalOpen && (
        <EventModal
          date={selectedDate}
          onClose={() => setIsModalOpen(false)}
          onSave={addEvent}
        />
      )}
    </div>
  );
};

export default Calender;

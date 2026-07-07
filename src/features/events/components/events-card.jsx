// EventCard.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  CalendarPlus,
  X,
  Chrome,
  Apple,
  Calendar as CalendarIcon,
} from "lucide-react";
import { formatEventDate } from "@/lib/format-event-date";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-[90%] max-w-sm"
          >
            <div className="bg-white/70 backdrop-blur-md transform -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 shadow-2xl border border-emerald-50/50">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CalendarButton = ({ icon: Icon, label, onClick, className = "" }) => (
  <motion.button
    onClick={onClick}
    className={`flex items-center space-x-3 w-full p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors ${className}`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Icon className="w-5 h-5" />
    <span className="text-gray-700 font-medium">{label}</span>
  </motion.button>
);

/**
 * SingleEventCard component displays an event card with options to add the event
 * to various calendars (Google Calendar, Apple Calendar, and Outlook Calendar).
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.eventData - Object containing event data.
 * @param {string} props.eventData.date - The date of the event (expected format: YYYY-MM-DD).
 * @param {string} props.eventData.startTime - The start time of the event (expected format: HH:mm).
 * @param {string} props.eventData.endTime - The end time of the event (expected format: HH:mm).
 * @param {string} props.eventData.title - The title of the event.
 * @param {string} props.eventData.description - A description of the event.
 * @param {string} props.eventData.location - The location where the event takes place.
 * @param {string} props.eventData.timeZone - The IANA time zone of the event (defaults to America/Argentina/Buenos_Aires).
 *
 * @example
 * const eventData = {
 *   date: '2023-10-15',
 *   startTime: '14:00',
 *   endTime: '16:00',
 *   title: 'Wedding Ceremony - Reception',
 *   description: 'Join us to celebrate the wedding ceremony and reception.',
 *   location: 'Sunset Gardens',
 *   timeZone: 'America/Argentina/Buenos_Aires'
 * };
 *
 * <SingleEventCard eventData={eventData} />
 *
 * @returns {JSX.Element} A JSX element representing the event card.
 */
const SingleEventCard = ({ eventData }) => {
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const timeZone = eventData.timeZone || "America/Argentina/Buenos_Aires";

  const normalizeTime = (time) => String(time || "00:00").slice(0, 5);

  const getEventDates = () => {
    // API dates arrive as full ISO strings (UTC midnight); keep only the
    // date part so the event lands on the intended local day.
    const dateOnly = String(eventData.date).slice(0, 10);
    const startDate = new Date(
      `${dateOnly}T${normalizeTime(eventData.startTime)}:00`,
    );
    const endDate = new Date(
      `${dateOnly}T${normalizeTime(eventData.endTime)}:00`,
    );

    // Events ending past midnight (e.g. 19:00 - 03:00) finish the next day
    if (endDate <= startDate) {
      endDate.setDate(endDate.getDate() + 1);
    }

    return { startDate, endDate };
  };

  // Format as local wall-clock time (no UTC conversion) so the calendar
  // entry keeps the invitation's timezone via ctz / TZID.
  const formatCalendarDate = (date) => {
    const pad = (value) => String(value).padStart(2, "0");

    return [
      date.getFullYear(),
      pad(date.getMonth() + 1),
      pad(date.getDate()),
      "T",
      pad(date.getHours()),
      pad(date.getMinutes()),
      "00",
    ].join("");
  };

  const googleCalendarLink = () => {
    const { startDate, endDate } = getEventDates();

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventData.title)}&dates=${formatCalendarDate(startDate)}/${formatCalendarDate(endDate)}&details=${encodeURIComponent(eventData.description || "")}&location=${encodeURIComponent(eventData.location)}&ctz=${encodeURIComponent(timeZone)}`;
  };

  const generateICSContent = () => {
    const { startDate, endDate } = getEventDates();

    return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${window.location.href}
DTSTART;TZID=${timeZone}:${formatCalendarDate(startDate)}
DTEND;TZID=${timeZone}:${formatCalendarDate(endDate)}
SUMMARY:${eventData.title}
DESCRIPTION:${eventData.description || ""}
LOCATION:${eventData.location}
END:VEVENT
END:VCALENDAR`;
  };

  const downloadICSFile = () => {
    const icsContent = generateICSContent();
    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${eventData.title.toLowerCase().replace(/ /g, "-")}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative">
      <motion.div
        className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-emerald-50/50 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">
            {eventData.title.split(" - ")[0]}
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-emerald-500 hover:text-emerald-800 transition-colors"
            onClick={() => setShowCalendarModal(true)}
          >
            <CalendarPlus className="w-5 h-5" />
          </motion.button>
        </div>
        <div className="space-y-3 text-gray-600">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-emerald-500" />
            <span>{formatEventDate(eventData.date)}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-emerald-500" />
            <span>
              {eventData.startTime?.substring(0, 5) || eventData.startTime} hs
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-emerald-500" />
            <span>{eventData.location}</span>
          </div>
        </div>
      </motion.div>

      <Modal
        isOpen={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
      >
        <div className="space-y-6 ">
          <div className="flex justify-between  items-center">
            <h3 className="text-xl font-semibold text-gray-800">
              Añadir al Calendario
            </h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowCalendarModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="space-y-3">
            <CalendarButton
              icon={(props) => (
                <Chrome {...props} className="w-5 h-5 text-emerald-500" />
              )}
              label="Google Calendar"
              onClick={() => window.open(googleCalendarLink(), "_blank")}
            />

            <CalendarButton
              icon={(props) => (
                <Apple {...props} className="w-5 h-5 text-gray-900" />
              )}
              label="Apple Calendar"
              onClick={downloadICSFile}
            />

            <CalendarButton
              icon={(props) => (
                <CalendarIcon {...props} className="w-5 h-5 text-blue-600" />
              )}
              label="Outlook Calendar"
              onClick={downloadICSFile}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Main EventCards component that handles multiple events
const EventCards = ({ events }) => {
  return (
    <div className="space-y-6">
      {events.map((event, index) => (
        <SingleEventCard key={index} eventData={event} />
      ))}
    </div>
  );
};

export default EventCards;

/**
 * Formats a date string in Spanish (es-ES) format
 * @param {string} isoString - The ISO date string to format
 * @param {('full'|'short'|'time')} [format='full'] - The format type to use
 * @returns {string} The formatted date string in Spanish
 *
 * @example
 * // returns "Senin, 1 Januari 2024"
 * formatEventDate("2024-01-01T00:00:00.000Z", "full")
 *
 * // returns "1 Januari 2024"
 * formatEventDate("2024-01-01T00:00:00.000Z", "short")
 *
 * // returns "00:00"
 * formatEventDate("2024-01-01T00:00:00.000Z", "time")
 */
export const formatEventDate = (isoString, format = "full") => {
  if (!isoString) {
    return "";
  }

  // For date formats, parse only the YYYY-MM-DD part at local noon.
  // API dates arrive as "2026-12-06T00:00:00.000Z" (UTC midnight), which
  // would otherwise display as the previous day in UTC-negative timezones.
  const dateOnlyMatch = String(isoString).match(/^(\d{4}-\d{2}-\d{2})/);
  const date =
    format === "time"
      ? new Date(isoString)
      : new Date(`${dateOnlyMatch ? dateOnlyMatch[1] : isoString}T12:00:00`);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const formats = {
    full: {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
    short: {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
    time: {
      hour: "2-digit",
      minute: "2-digit",
    },
  };

  if (format === "time") {
    return date.toLocaleTimeString("es-ES", formats[format]);
  }

  // Use es-ES locale directly
  let formatted = date.toLocaleDateString("es-ES", formats[format]);

  // Capitalize first letter (e.g., "domingo" -> "Domingo")
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

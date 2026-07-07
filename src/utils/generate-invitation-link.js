import { safeBase64 } from "@/lib/base64";

/**
 * Generate a personalized invitation link for a guest
 * @param {string} uid - The invitation UID (e.g., 'rifqi-dina-2025')
 * @param {string} guestName - The guest's name (e.g., 'John Doe')
 * @param {string} baseUrl - Optional base URL (defaults to current origin)
 * @param {number} guestLimit - Maximum people allowed for this invitation
 * @returns {string} - The personalized invitation URL
 *
 * @example
 * generateInvitationLink('rifqi-dina-2025', 'John Doe')
 * // Returns: http://localhost:5173/rifqi-dina-2025?guest=Sm9obiBEb2U=&guests=1
 *
 * generateInvitationLink('rifqi-dina-2025', 'Ahmad Abdullah', 'https://wedding.example.com')
 * // Returns: https://wedding.example.com/rifqi-dina-2025?guest=QWhtYWQgQWJkdWxsYWg=&guests=1
 */
export function generateInvitationLink(
  uid,
  guestName,
  baseUrl,
  guestLimit = 1,
) {
  const url =
    baseUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const encodedName = safeBase64.encode(guestName);
  return `${url}/${uid}?guest=${encodedName}&guests=${guestLimit}`;
}

/**
 * Generate multiple invitation links for a list of guests
 * @param {string} uid - The invitation UID
 * @param {Array<string|{name: string, guests?: number}>} guests - Array of guest names or guest objects
 * @param {string} baseUrl - Optional base URL
 * @returns {Array<{name: string, guests: number, link: string}>} - Array of objects with name, guest limit and link
 *
 * @example
 * const guests = ['John Doe', { name: 'Ahmad Abdullah', guests: 3 }];
 * generateBulkInvitationLinks('rifqi-dina-2025', guests);
 * // Returns:
 * // [
 * //   { name: 'John Doe', guests: 1, link: 'http://localhost:5173/rifqi-dina-2025?guest=...&guests=1' },
 * //   { name: 'Ahmad Abdullah', guests: 3, link: 'http://localhost:5173/rifqi-dina-2025?guest=...&guests=3' }
 * // ]
 */
export function generateBulkInvitationLinks(uid, guests, baseUrl) {
  return guests.map((guest) => {
    const name = typeof guest === "string" ? guest : guest.name;
    const guestLimit = typeof guest === "string" ? 1 : guest.guests || 1;

    return {
      name,
      guests: guestLimit,
      link: generateInvitationLink(uid, name, baseUrl, guestLimit),
    };
  });
}

function formatGuestCount(count) {
  return count === 1 ? "1 persona" : `${count} personas`;
}

/**
 * Console utility to quickly generate invitation links
 * Usage: Run this in browser console or node script
 *
 * @example
 * // In browser console:
 * import { printInvitationLinks } from './utils/generateInvitationLink'
 * printInvitationLinks('rifqi-dina-2025', ['John Doe', 'Jane Smith'])
 */
export function printInvitationLinks(
  uid,
  guests,
  baseUrl = "http://localhost:5173",
) {
  const links = generateBulkInvitationLinks(uid, guests, baseUrl);
  console.log("\n=== Personalized Invitation Links ===\n");
  links.forEach(({ name, guests: guestLimit, link }) => {
    console.log(`${name} (${formatGuestCount(guestLimit)}):\n${link}\n`);
  });
  return links;
}

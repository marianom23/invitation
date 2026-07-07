/**
 * Example script to generate personalized invitation links
 *
 * Usage:
 *   bun run generate-links
 *
 * This will output personalized invitation links for each guest
 */

// URL-safe base64 encode function (same as safeBase64 in src/lib/base64.js)
function safeBase64Encode(str) {
  return btoa(encodeURIComponent(str))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function generateInvitationLink(
  uid,
  guestName,
  baseUrl = "http://localhost:5173",
  guestLimit = 1,
) {
  const encodedName = safeBase64Encode(guestName);
  return `${baseUrl}/${uid}?guest=${encodedName}&guests=${guestLimit}`;
}

function formatGuestCount(count) {
  return count === 1 ? "1 persona" : `${count} personas`;
}

// ===== CONFIGURATION =====
const INVITATION_UID = "rifqi-dina-2025"; // Change this to your invitation UID
const BASE_URL = "http://localhost:5173"; // Change this to your production URL

// List of guests (name + max people allowed to RSVP with that link)
const guestList = [
  { name: "Ahmad Abdullah", guests: 1 },
  { name: "Sarah Johnson", guests: 1 },
  { name: "Bapak Rudi & Keluarga", guests: 4 },
  { name: "Ibu Siti & Keluarga", guests: 3 },
  { name: "Dr. Bambang", guests: 1 },
  { name: "Keluarga Besar Hartono", guests: 6 },
];

// ===== GENERATE LINKS =====
console.log(
  "\n╔══════════════════════════════════════════════════════════════╗",
);
console.log("║          PERSONALIZED WEDDING INVITATION LINKS               ║");
console.log(
  "╚══════════════════════════════════════════════════════════════╝\n",
);

console.log(`Invitation UID: ${INVITATION_UID}`);
console.log(`Base URL: ${BASE_URL}\n`);
console.log("─".repeat(70) + "\n");

guestList.forEach((guest, index) => {
  const link = generateInvitationLink(
    INVITATION_UID,
    guest.name,
    BASE_URL,
    guest.guests,
  );
  console.log(
    `${index + 1}. ${guest.name} (${formatGuestCount(guest.guests)})`,
  );
  console.log(`   ${link}\n`);
});

console.log("─".repeat(70));
console.log(`\nTotal guests: ${guestList.length}`);
console.log("\nHow to use:");
console.log("1. Share each personalized link with the corresponding guest");
console.log("2. When they open the link, their name will be pre-filled");
console.log("3. They can still edit their name if needed\n");

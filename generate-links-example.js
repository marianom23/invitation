/**
 * Generates the personalized invitation links for every guest.
 *
 * Usage:
 *   bun run generate-links
 *
 * Guest list source: "BODA 2026.pdf" (couples without a number = 2 people,
 * single names = 1, numbers in parentheses = total people for that link).
 */

// URL-safe base64 encode function (same as safeBase64 in src/lib/base64.js)
function safeBase64Encode(str) {
  return btoa(encodeURIComponent(str))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function generateInvitationLink(uid, guestName, baseUrl, guestLimit = 1) {
  const encodedName = safeBase64Encode(guestName);
  return `${baseUrl}/${uid}?guest=${encodedName}&guests=${guestLimit}`;
}

function formatGuestCount(count) {
  return count === 1 ? "1 persona" : `${count} personas`;
}

// ===== CONFIGURATION =====
const INVITATION_UID = "carolina-ignacio-2026";
const BASE_URL = "https://carolinaeignacio.invitaciones.workers.dev";

// List of guests by group (name + max people allowed to RSVP with that link)
const guestGroups = {
  "FAMILIA CHILE": [
    { name: "Elisa Molina y Fernando Oyanedel", guests: 2 },
    { name: "Alfredo Molina", guests: 3 },
    { name: "Rodolfo Molina y Marcela Valdez", guests: 2 },
    { name: "Rodolfo Molina y Faride Bertrand", guests: 2 },
    { name: "Nicolás Molina y Bárbara Zuñiga", guests: 2 },
    { name: "Matías Molina", guests: 1 },
    { name: "Elizabeth Naves", guests: 1 },
    { name: "Francisco Díaz y Lorena Naves", guests: 2 },
    { name: "Francisco Díaz", guests: 2 },
    { name: "Pablo Díaz y Estefanía Lira", guests: 2 },
    { name: "Álvaro Naves", guests: 2 },
    { name: "Roberto Muñoz y Claudia Naves", guests: 2 },
    { name: "Silvia Naves", guests: 1 },
    { name: "Alexa Szelest", guests: 2 },
  ],
  "AMIGOS CHILE": [
    { name: "Diego Palma y María José Carreño", guests: 2 },
    { name: "Valeria Palma", guests: 2 },
    { name: "Lexymar Nava", guests: 2 },
    { name: "Carlos Alvarado", guests: 2 },
    { name: "Leandro Reyes y Milenka Sandoval", guests: 2 },
    { name: "Fernando Garate", guests: 2 },
    { name: "Mónica Miranda", guests: 2 },
    { name: "Luis Cardenas", guests: 2 },
    { name: "Karelin Páez", guests: 3 },
    { name: "Maite Corsini", guests: 1 },
  ],
  "FAMILIA ARGENTINA": [
    { name: "Mario Martín y Rosa Guerra", guests: 2 },
    { name: "Mariano Martín y Micaela García", guests: 2 },
    { name: "Juan Ignacio Vera y Victoria Quiroga", guests: 2 },
    { name: "Andrés Ziemecki y Marianela Martín", guests: 2 },
    { name: "Joaquín Zurano y Analía Martín", guests: 2 },
    { name: "Alberto Zurano y Verónica Miranda", guests: 2 },
    { name: "Jorge Valdéz y Miriam Martín", guests: 3 },
    { name: "Agustina Martín y Laura Peralta", guests: 2 },
    { name: "Dionicio Guerra y Stella Guerra", guests: 2 },
    { name: "Martín Guerra y Graciela Zarate", guests: 2 },
    { name: "Virginia Guerra", guests: 1 },
    { name: "Rubén Dominguez", guests: 1 },
    { name: "Matías Murua y Cinthia Dominguez", guests: 2 },
    { name: "Carlos Gandolfo y Esther Dominguez", guests: 2 },
    { name: "Leandro Mascia y Romina Gandolfo", guests: 5 },
    { name: "Franco Murua y Luciana Martín", guests: 4 },
    { name: "Marcelo Rosetto y Jésica Martín", guests: 4 },
    { name: "Emanuel Vera y Alejandro Vera", guests: 2 },
    { name: "Jorge Martín", guests: 1 },
  ],
  "AMIGOS ARGENTINA": [
    { name: "Andrés Rosales", guests: 1 },
    { name: "Nahuel Studer", guests: 1 },
    { name: "Alejandro Díaz Castillo", guests: 1 },
    { name: "Elvio Lara", guests: 1 },
    { name: "Camila Ruggeri", guests: 1 },
    { name: "Brenda Lerdón y Natacha Lerdón", guests: 2 },
    { name: "Cinthia Cano", guests: 1 },
    { name: "Gisela Stallocca", guests: 2 },
    { name: "Paula Gómez", guests: 2 },
    { name: "Florencia Gómez", guests: 2 },
    { name: "Malena Polenta", guests: 2 },
    { name: "Erika Regazzoni", guests: 2 },
    { name: "Mayra Centre", guests: 2 },
    { name: "Macarena Listur", guests: 2 },
    { name: "Federico Ordovini", guests: 2 },
    { name: "Emanuel Arancibia", guests: 2 },
    { name: "Omar Farias", guests: 2 },
    { name: "Andrés Díaz", guests: 2 },
    { name: "Matías Moreno", guests: 2 },
    { name: "Matias García", guests: 2 },
    { name: "Nicolás Mole", guests: 2 },
    { name: "Lucas Barroso", guests: 2 },
    { name: "Maximiliano Toledo", guests: 2 },
    { name: "Daniel Fernández", guests: 2 },
    { name: "José Díaz", guests: 2 },
    { name: "Gastón Moyano", guests: 2 },
    { name: "Milena Alba", guests: 2 },
  ],
};

// ===== GENERATE LINKS =====
let totalLinks = 0;
let totalPeople = 0;

for (const [group, guests] of Object.entries(guestGroups)) {
  const groupPeople = guests.reduce((sum, g) => sum + g.guests, 0);
  console.log(`\n════════ ${group} (${groupPeople} personas) ════════\n`);

  guests.forEach((guest) => {
    const link = generateInvitationLink(
      INVITATION_UID,
      guest.name,
      BASE_URL,
      guest.guests,
    );
    console.log(`${guest.name} (${formatGuestCount(guest.guests)})`);
    console.log(`${link}\n`);
    totalLinks += 1;
    totalPeople += guest.guests;
  });
}

console.log("─".repeat(70));
console.log(`Total invitaciones: ${totalLinks}`);
console.log(`Total personas: ${totalPeople}`);

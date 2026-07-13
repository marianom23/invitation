const config = {
  data: {
    // Main invitation title that appears on the page
    title: "Boda de Ignacio & Carolina",
    // Opening message/description of the invitation
    description:
      "Después de recorrer juntos muchos momentos, decidimos comenzar una nueva etapa. Con mucha felicidad te invitamos a celebrar nuestro matrimonio.",
    // Groom's name
    groomName: "Carolina",
    // Bride's name
    brideName: "Ignacio",
    // Groom's parents names
    parentGroom: "Padre del Novio & Madre del Novio",
    // Bride's parents names
    parentBride: "Padre de la Novia & Madre de la Novia",
    // Wedding date (format: YYYY-MM-DD)
    date: "2026-12-06",
    // Wedding time
    time: "18:00",
    // Relationship start date (for the counter)
    anniversaryDate: "2007-09-14T18:00:00",
    // List of venues (Church, Salon, etc.)
    venues: [
      {
        name: "Ceremonia Religiosa",
        location: "Parroquia Nuestra Señora de La Carrodilla",
        address: "Carrodilla 11, Luján de Cuyo",
        time: "18:00 hrs",
        maps_url:
          "https://www.google.com/maps/place/Nuestra+Se%C3%B1ora+de+La+Carrodilla/@-32.9590081,-68.8547402,17z/data=!3m1!4b1!4m6!3m5!1s0x967e0bae04ad95f1:0xb4491263672cc168!8m2!3d-32.9590081!4d-68.8521653!16s%2Fg%2F11f0_qhknr",
        maps_embed:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.697006927481!2d-68.8521653!3d-32.9590081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0bae04ad95f1%3A0xb4491263672cc168!2sNuestra%20Se%C3%B1ora%20de%20La%20Carrodilla!5e0!3m2!1ses!2sar!4v1773777588664!5m2!1ses!2sar",
      },
      {
        name: "Fiesta y Celebración",
        location: "Casa Strawitz",
        address: "Castro Barros 2715, Maipú",
        time: "20:00 hrs",
        maps_url:
          "https://www.google.com/maps/place/Casa+Strawitz/@-32.9698343,-68.7364518,17z/data=!4m9!3m8!1s0x967e0d41fc867e67:0xba05e0e8bc430aec!5m2!4m1!1i2!8m2!3d-32.9698343!4d-68.7338769!16s%2Fg%2F11f0_qhknr",
        maps_embed:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.2831248037343!2d-68.7364518!3d-32.9698343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0d41fc867e67%3A0xba05e0e8bc430aec!2sCasa%20Strawitz!5e0!3m2!1ses!2sar!4v1742241243534!5m2!1ses!2sar",
      },
    ],
    // Image that appears when link is shared on social media
    ogImage: "/images/og-image.jpg",
    // Icon that appears in browser tab
    favicon: "/images/favicon.ico",
    // List of event agenda/schedule
    agenda: [
      {
        // First event name
        title: "Ceremonia Religiosa",
        // Event date (format: YYYY-MM-DD)
        date: "2026-12-06",
        // Start time (format: HH:MM)
        startTime: "18:00",
        // End time (format: HH:MM)
        endTime: "19:30",
        // Event venue
        location: "Parroquia Nuestra Señora de La Carrodilla",
        // Full address
        address: "Carrodilla 11, Luján de Cuyo",
      },
      {
        // Second event name
        title: "Recepción de la Boda",
        date: "2026-12-06",
        startTime: "20:00",
        endTime: "04:00",
        location: "Casa Strawitz",
        address: "Castro Barros 2715, Maipú",
      },
      // You can add more agenda items with the same format
    ],
    // Venue photos for the Stack card gallery (salon & iglesia images)
    venuePhotos: [
      {
        image: "/images/iglesia.webp",
        title: "Parroquia Nuestra Señora de La Carrodilla",
        description: "El lugar donde diremos el 'Sí, acepto'",
      },
      {
        image: "/images/iglesia-dentro.webp",
        title: "Interior de la Parroquia",
        description: "Un espacio sagrado y lleno de luz",
      },
      {
        image: "/images/Iglesia-jardin.webp",
        title: "Jardín de la Parroquia",
        description: "Un entorno natural para nuestra celebración",
      },
      {
        image: "/images/salon-alto.jpeg",
        title: "Casa Strawitz — Salón Alto",
        description: "Donde celebraremos juntos esta nueva etapa",
      },
      {
        image: "/images/salon-patio.jpeg",
        title: "Casa Strawitz — Patio",
        description: "Momentos al aire libre entre amigos y familia",
      },
      {
        image: "/images/salon-fuente.jpeg",
        title: "Casa Strawitz — La Fuente",
        description: "El toque mágico del salón",
      },
    ],

    // Couple photos for the photo carousel ("Nuestra Historia en Fotos")
    couplePhotos: [
      { image: "/images/caro-1.webp", alt: "Carolina e Ignacio" },
      { image: "/images/caro-2.webp", alt: "Carolina e Ignacio" },
      { image: "/images/caro-3.webp", alt: "Carolina e Ignacio" },
      { image: "/images/caro-4.webp", alt: "Carolina e Ignacio" },
      { image: "/images/caro-5.webp", alt: "Carolina e Ignacio" },
      { image: "/images/caro-6.webp", alt: "Carolina e Ignacio" },
    ],

    // Background music settings
    audio: {
      // Music file (choose one or replace with your own file)
      src: "/audio/Perfect-(Mr-Jat.in).mp3",
      // Music title to display
      title: "Perfect - Ed Sheeran",
      // Whether music plays automatically when website opens
      autoplay: true,
      // Whether music repeats continuously
      loop: true,
    },

    // Dress code for the celebration. Leave code empty ("") to hide the section.
    dressCode: {
      code: "Elegante",
      note: "Se agradece evitar el color blanco, reservado para la novia.",
    },

    // Love story timeline ("Nuestra Historia"). Leave empty ([]) to hide the section.
    story: [
      {
        year: "2007",
        title: "Nos conocimos",
        description:
          "El comienzo de todo: una historia que empezó casi sin darnos cuenta.",
        image: "/images/ellos-joven.jpeg",
      },
      {
        year: "2015",
        title: "Construyendo juntos",
        description:
          "Años de risas, viajes y momentos que nos hicieron equipo.",
        image: "/images/ellos-playa.jpeg",
      },
      {
        year: "2024",
        title: "La propuesta",
        description:
          "Dijimos que sí a seguir eligiéndonos, ahora para siempre.",
        image: "/images/ellos-beso.jpeg",
      },
      {
        year: "2026",
        title: "¡Nos casamos!",
        description: "Y queremos celebrarlo con vos.",
        image: "/images/ellos-abrazados.jpeg",
      },
    ],

    // Spotify playlist so guests can recommend songs for the party.
    // Paste a normal playlist link (ideally a collaborative one so guests can add tracks themselves).
    // Leave playlistUrl empty ("") to hide this section.
    spotify: {
      playlistUrl:
        "https://open.spotify.com/playlist/3vrhF6ggH3txqH7DGsX9xT?si=A6tTggwFR3-2rLTNm1hV1w&pi=nl6J_ycJSaOsn&pt=d7b8c68dfea784db5cf445aa193c71c6",
    },

    // List of bank accounts for digital envelope/gifts
    banks: [
      {
        bank: "Mercado Pago",
        accountNumber: "0000003100066788934847",
        accountName: "Carolina Belen Martin",
        alias: "carolina.m.22.mp",
        country: "Argentina",
        flag: "🇦🇷",
      },
      {
        bank: "Banco de Chile",
        accountNumber: "00-057-88222-69",
        accountName: "Carolina Martin",
        accountType: "Cuenta Vista",
        rut: "14.600.492-K",
        country: "Chile",
        flag: "🇨🇱",
      },
    ],
  },
};

export default config;

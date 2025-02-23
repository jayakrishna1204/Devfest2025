const URLSite = 'https://devfest2025.gdgnantes.com';

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Devfest Nantes 2025',
  startDate: '2025-10-16T09:00:00',
  endDate: '2025-10-17T19:00:00',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'Place',
    name: 'Cité des Congrès de Nantes',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '5 Rue de Valmy',
      addressLocality: 'Nantes',
      postalCode: '44000',
      addressRegion: 'Loire Atlantique',
      addressCountry: 'France',
    },
  },
  image: [URLSite + '/images/social-share.jpg'],
  description:
    "Le DevFest, ou 'Developers Festival', est une conférence technique destinée aux développeuses et développeurs. Elle s'adresse aussi bien aux étudiantes et étudiants, aux professionnels ou tout simplement aux curieuses et curieux technophiles.",
  // offers: {
  //   '@type': 'Offer',
  //   url: 'https://www.example.com/event_offer/12345_202403180430',
  //   price: 30,
  //   priceCurrency: 'USD',
  //   availability: 'https://schema.org/InStock',
  //   validFrom: '2024-05-21T12:00',
  // },
  organizer: {
    '@type': 'Organization',
    name: 'GDG Nantes',
    url: 'https://gdgnantes.com',
  },
};

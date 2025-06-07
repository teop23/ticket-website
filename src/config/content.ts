// Hero Section
export const hero = {
  title: "Power Millions",
  description: "The first Solana token with automatic hourly lottery draws. Hold $TICKET tokens to enter - every 100 tokens gives you one ticket for all future drawings.",
  contractAddress: "TicketKHJVqZ8BVqX8W3aqr8K9nGhqp7hU9nF2eR3mP1",
  nextDrawing: {
    date: "Thu, Jun 5, 2025",
    time: {
      hours: "00",
      minutes: "28",
      seconds: "01"
    }
  },
  jackpot: {
    amount: "$1,039.93",
    solAmount: "6.82"
  },
  recentWinners: [
    {
      date: "6/5/2025 at 11:00:45 AM",
      address: "F5MwsvBw33g...",
      amount: "$3,041",
      solAmount: "19.94"
    },
    {
      date: "6/5/2025 at 10:00:08 AM",
      address: "EEcYgxgENgd...",
      amount: "$2,504",
      solAmount: "16.42"
    },
    {
      date: "6/5/2025 at 9:00:27 AM",
      address: "DMY9RYkjE2Z...",
      amount: "$2,695",
      solAmount: "17.67"
    }
  ]
};

// Navigation
export const navigation = {
  items: [
    { label: 'Winners', href: '/winners' },
    { label: 'How To Play', href: '/how-to-play' },
    { label: 'FAQ', href: '#faq' }
  ]
};

// Footer
export const footer = {
  description: "Power Millions: Fair launch with 100% of supply added to liquidity pool and LP tokens locked for 1 year.",
  recentWinners: [
    { label: 'View All Winners', href: '/winners' }
  ],
  resources: [
    { label: 'How to Play', href: '/how-to-play' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Token Contract', href: '#' }
  ],
  copyright: "© 2025 Power Millions $TICKET",
  policies: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' }
  ]
};
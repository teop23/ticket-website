// Hero Section
export const hero = {
  title: "Power Millions",
  description: "The first Solana token with automatic hourly lottery draws. Hold $TICKET tokens to enter - every 100 tokens gives you 1 ticket for all future drawings.",
  contractAddress: "AALVnkKGw76kd4svrsSDLM4deYee4yLmdoavRFGTb1f4",
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
  ],
  socialLinks: [
    { name: 'X', href: 'https://x.com/Power_Millions' },
    { name: 'Telegram', href: 'https://t.me/Power_Millions' }
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
    { label: 'Token Contract', href: hero.contractAddress !== "TO BE ANNOUNCED" && hero.contractAddress !== "" ? `https://revshare.dev/token/${hero.contractAddress}` : '#' },
  ],
  copyright: "© 2025 Power Millions $TICKET",
  policies: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' }
  ]
};
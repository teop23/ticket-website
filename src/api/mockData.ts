import { Winner, PotData } from './types';

export const mockWinners: Winner[] = [
  {
    id: 1,
    token_id: 1,
    eligible: 1000,
    distributed: 19.94,
    date_added: "2025-06-05T11:00:45.000Z",
    data: "F5MwsvBw33gs9Fn6yeLDoxNxg8QzVbR2mK4pL7nH8Xyz,19.94"
  },
  {
    id: 2,
    token_id: 1,
    eligible: 850,
    distributed: 16.42,
    date_added: "2025-06-05T10:00:08.000Z",
    data: "EEcYgxgENgdRaYmFSkcDBig7JSCpL9nF2eR3mP1qW8Abc,16.42"
  },
  {
    id: 3,
    token_id: 1,
    eligible: 920,
    distributed: 17.67,
    date_added: "2025-06-05T09:00:27.000Z",
    data: "DMY9RYkjE2ZBYWmqZZ4ihZEQ3iL8nG5hU9nF2eR3mDef,17.67"
  },
  {
    id: 4,
    token_id: 1,
    eligible: 750,
    distributed: 12.35,
    date_added: "2025-06-05T08:00:15.000Z",
    data: "BKL8mNpQ4rS6tU7vW9xY1zA2bC3dE4fG5hI6jK7lM8nO,12.35"
  },
  {
    id: 5,
    token_id: 1,
    eligible: 1200,
    distributed: 23.89,
    date_added: "2025-06-05T07:00:33.000Z",
    data: "HJK9pQrS2tU5vW8xY1zA4bC7dE0fG3hI6jK9lM2nO5pQ,23.89"
  },
  {
    id: 6,
    token_id: 1,
    eligible: 680,
    distributed: 11.24,
    date_added: "2025-06-05T06:00:41.000Z",
    data: "NOP2qRsT5uV8wX1yZ4aB7cD0eF3gH6iJ9kL2mN5oP8qR,11.24"
  },
  {
    id: 7,
    token_id: 1,
    eligible: 890,
    distributed: 15.67,
    date_added: "2025-06-05T05:00:19.000Z",
    data: "STU5vWxY1zA4bC7dE0fG3hI6jK9lM2nO5pQ8rS1tU4vW,15.67"
  },
  {
    id: 8,
    token_id: 1,
    eligible: 1050,
    distributed: 21.43,
    date_added: "2025-06-05T04:00:52.000Z",
    data: "XYZ8aB1cD4eF7gH0iJ3kL6mN9oP2qR5sT8uV1wX4yZ7a,21.43"
  }
];

export const mockPotData: PotData = {
  amount: "$1,039.93",
  solAmount: "6.82",
  usdValue: 1039.93,
  solValue: 6.82
};
export interface User {
  name: string;
  email: string;
}

export interface EventBooking {
  bookingId: string;
  eventName: string;
  user: User;
  amount: number;
  status: 'Confirmed' | 'Cancelled' | 'Refunded' | 'Pending';
  bookingDate: string; // ISO date string
  seats?: string; // Optional
  ticketInfo?: string; // Optional, e.g., "VIP Pass", "General Admission"
  price?: number; // Optional, could be same as amount or a per-ticket price
  apiReferenceId?: string; // Optional
}

export const mockEventBookings: EventBooking[] = [
  {
    bookingId: 'BK001',
    eventName: 'Annual Tech Conference 2024',
    user: { name: 'Alice Wonderland', email: 'alice@example.com' },
    amount: 199.00,
    status: 'Confirmed',
    bookingDate: '2024-05-15T10:30:00Z',
    seats: 'B12, B13',
    ticketInfo: 'Standard Delegate Pass',
    price: 199.00,
    apiReferenceId: 'conf_xyz_123'
  },
  {
    bookingId: 'BK002',
    eventName: 'Summer Music Festival',
    user: { name: 'Bob The Builder', email: 'bob@example.com' },
    amount: 89.50,
    status: 'Confirmed',
    bookingDate: '2024-06-01T14:00:00Z',
    seats: 'GA-001',
    ticketInfo: 'General Admission',
    price: 89.50,
    apiReferenceId: 'fest_abc_456'
  },
  {
    bookingId: 'BK003',
    eventName: 'Regional Art Expo',
    user: { name: 'Charlie Brown', email: 'charlie@example.com' },
    amount: 25.00,
    status: 'Cancelled',
    bookingDate: '2024-04-20T09:15:00Z',
    ticketInfo: 'Adult Entry',
    price: 25.00,
  },
  {
    bookingId: 'BK004',
    eventName: 'Annual Tech Conference 2024',
    user: { name: 'Diana Prince', email: 'diana@example.com' },
    amount: 398.00,
    status: 'Confirmed',
    bookingDate: '2024-05-10T11:00:00Z',
    seats: 'V5, V6 (VIP Row)',
    ticketInfo: 'VIP Delegate Pass',
    price: 199.00, // per ticket
    apiReferenceId: 'conf_xyz_789'
  },
  {
    bookingId: 'BK005',
    eventName: 'Charity Gala Dinner',
    user: { name: 'Edward Scissorhands', email: 'edward@example.com' },
    amount: 500.00,
    status: 'Refunded',
    bookingDate: '2024-03-01T18:30:00Z',
    ticketInfo: 'Table of 4',
    price: 500.00,
  },
  {
    bookingId: 'BK006',
    eventName: 'Summer Music Festival',
    user: { name: 'Fiona Gallagher', email: 'fiona@example.com' },
    amount: 179.00,
    status: 'Pending',
    bookingDate: '2024-06-05T12:00:00Z',
    ticketInfo: 'Early Bird - General Admission (x2)',
    price: 89.50, // per ticket
  },
  {
    bookingId: 'BK007',
    eventName: 'Annual Tech Conference 2024',
    user: { name: 'George Costanza', email: 'george@example.com' },
    amount: 199.00,
    status: 'Confirmed',
    bookingDate: '2024-05-18T16:45:00Z',
    seats: 'C1',
    ticketInfo: 'Standard Delegate Pass',
    price: 199.00,
    apiReferenceId: 'conf_xyz_101'
  },
];

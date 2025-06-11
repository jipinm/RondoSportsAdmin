export interface RefundUser {
  name: string;
  email: string;
}

export type RefundStatus = 'Pending' | 'Approved' | 'Rejected';

export interface RefundLogEntry {
  requestId: string;
  bookingId: string; // Links to an EventBooking
  user: RefundUser;
  amount: number;
  reason: string;
  requestDate: string; // ISO date string
  status: RefundStatus;
  processedDate?: string; // ISO date string, for approved/rejected requests
  notes?: string; // Optional notes from admin
}

export const mockRefundLogs: RefundLogEntry[] = [
  {
    requestId: 'RF001',
    bookingId: 'BK003', // Assuming this booking was cancelled
    user: { name: 'Charlie Brown', email: 'charlie@example.com' },
    amount: 25.00,
    reason: 'Event cancelled by user',
    requestDate: '2024-04-22T10:00:00Z',
    status: 'Approved',
    processedDate: '2024-04-23T14:00:00Z',
    notes: 'Refund processed via Stripe.'
  },
  {
    requestId: 'RF002',
    bookingId: 'BK005', // Assuming this booking was eligible for refund
    user: { name: 'Edward Scissorhands', email: 'edward@example.com' },
    amount: 500.00,
    reason: 'Organizer cancelled the event',
    requestDate: '2024-03-05T11:30:00Z',
    status: 'Approved',
    processedDate: '2024-03-06T09:15:00Z',
  },
  {
    requestId: 'RF003',
    bookingId: 'BK001', // Example for a pending request
    user: { name: 'Alice Wonderland', email: 'alice@example.com' },
    amount: 199.00,
    reason: 'Accidental double booking',
    requestDate: '2024-06-10T09:00:00Z',
    status: 'Pending',
  },
  {
    requestId: 'RF004',
    bookingId: 'BK002', // Example for a rejected request
    user: { name: 'Bob The Builder', email: 'bob@example.com' },
    amount: 89.50,
    reason: 'Requested outside of refund window',
    requestDate: '2024-06-08T17:00:00Z',
    status: 'Rejected',
    processedDate: '2024-06-09T10:00:00Z',
    notes: 'User requested refund 2 days after event start. Policy is up to 24 hours before.'
  },
  {
    requestId: 'RF005',
    bookingId: 'BK007',
    user: { name: 'George Costanza', email: 'george@example.com' },
    amount: 199.00,
    reason: 'Unable to attend due to illness',
    requestDate: '2024-05-20T13:15:00Z',
    status: 'Pending',
  },
  {
    requestId: 'RF006',
    bookingId: 'BK004',
    user: { name: 'Diana Prince', email: 'diana@example.com' },
    amount: 398.00,
    reason: 'Travel plans changed',
    requestDate: '2024-05-12T08:20:00Z',
    status: 'Approved',
    processedDate: '2024-05-13T11:00:00Z',
  },
];

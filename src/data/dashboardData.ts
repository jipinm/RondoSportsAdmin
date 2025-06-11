export interface BookingDataPoint {
  name: string; // e.g., 'Jan', 'Feb', 'Mon', 'Tue'
  bookings: number;
}

export interface TopEventData {
  id: string;
  eventName: string;
  bookingCount: number;
}

export interface DashboardSummaryData {
  totalBookingsToday: number;
  totalBookingsThisWeek: number;
  totalBookingsThisMonth: number;
  totalRevenue: number; // Assuming in a standard currency unit
  totalRefunds: number;  // Assuming in a standard currency unit
}

export const dashboardSummaryStats: DashboardSummaryData = {
  totalBookingsToday: 25,
  totalBookingsThisWeek: 180,
  totalBookingsThisMonth: 750,
  totalRevenue: 55320, // e.g., $55,320.00
  totalRefunds: 1250,   // e.g., $1,250.00
};

export const topEventsData: TopEventData[] = [
  { id: 'evt001', eventName: 'Annual Tech Conference 2024', bookingCount: 150 },
  { id: 'evt002', eventName: 'Summer Music Festival', bookingCount: 120 },
  { id: 'evt003', eventName: 'Regional Art Expo', bookingCount: 95 },
  { id: 'evt004', eventName: 'Charity Gala Dinner', bookingCount: 70 },
  { id: 'evt005', eventName: 'Local Farmers Market - Special Edition', bookingCount: 50 },
];

export const bookingsOverTimeData: BookingDataPoint[] = [
  { name: 'Jan', bookings: 120 },
  { name: 'Feb', bookings: 150 },
  { name: 'Mar', bookings: 130 },
  { name: 'Apr', bookings: 180 },
  { name: 'May', bookings: 210 },
  { name: 'Jun', bookings: 190 },
  { name: 'Jul', bookings: 220 },
  // Add more months or change to days/weeks as needed
];

// Example for daily bookings this week
export const dailyBookingsThisWeek: BookingDataPoint[] = [
    { name: 'Mon', bookings: 30 },
    { name: 'Tue', bookings: 22 },
    { name: 'Wed', bookings: 45 },
    { name: 'Thu', bookings: 28 },
    { name: 'Fri', bookings: 35 },
    { name: 'Sat', bookings: 10 },
    { name: 'Sun', bookings: 10 },
];

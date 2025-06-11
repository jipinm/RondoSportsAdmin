import React, { useState, useMemo, useEffect } from 'react';
import { mockEventBookings, EventBooking } from '../data/eventBookingsData';
// import { mockUsers, UserProfile } from '../data/usersData.ts'; // For User Activity Report
import Table, { ColumnDefinition } from '../components/Table'; // Re-use Table if suitable
import Button from '../components/Button';
import styles from './ReportsPage.module.css'; // Create this file

interface BookingReportItem {
  eventName: string;
  numberOfBookings: number;
  totalAmount: number;
}

const ReportsPage: React.FC = () => {
  // Booking Report State
  const [bookingReportData, setBookingReportData] = useState<BookingReportItem[]>([]);
  const [eventFilter, setEventFilter] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState<string>(''); // ISO date string YYYY-MM-DD

  // Get unique event names for filter dropdown
  const uniqueEventNames = useMemo(() => {
    const names = new Set(mockEventBookings.map(booking => booking.eventName));
    return ['All', ...Array.from(names)];
  }, []); // Based on original full booking list

  // Process and filter data for Booking Report
  const processedBookingReport = useMemo(() => {
    let filteredBookings = mockEventBookings;

    if (eventFilter !== 'All') {
      filteredBookings = filteredBookings.filter(b => b.eventName === eventFilter);
    }

    if (dateFilter) {
      const filterDate = new Date(dateFilter).setHours(0,0,0,0); // Compare dates only
      filteredBookings = filteredBookings.filter(b => {
        const bookingDate = new Date(b.bookingDate).setHours(0,0,0,0);
        return bookingDate >= filterDate;
      });
    }

    // Aggregate data
    const aggregated = filteredBookings.reduce((acc, booking) => {
      if (booking.status === 'Confirmed' || booking.status === 'Pending') { // Consider only confirmed/pending for revenue
        const existingEvent = acc.find(item => item.eventName === booking.eventName);
        if (existingEvent) {
          existingEvent.numberOfBookings += 1;
          existingEvent.totalAmount += booking.amount;
        } else {
          acc.push({
            eventName: booking.eventName,
            numberOfBookings: 1,
            totalAmount: booking.amount,
          });
        }
      }
      return acc;
    }, [] as BookingReportItem[]);

    return aggregated;
  }, [eventFilter, dateFilter]);

  useEffect(() => {
    setBookingReportData(processedBookingReport);
  }, [processedBookingReport]);

  const bookingReportColumns: ColumnDefinition<BookingReportItem>[] = [
    { key: 'eventName', header: 'Event Name' },
    { key: 'numberOfBookings', header: 'Number of Bookings' },
    {
      key: 'totalAmount',
      header: 'Total Amount',
      render: (item) => `$${item.totalAmount.toFixed(2)}`
    },
  ];

  // CSV Export Function
  const handleExportBookingReportCSV = () => {
    const headers = bookingReportColumns.map(col => col.header).join(',');
    const rows = bookingReportData.map(item =>
      [
        `"${item.eventName.replace(/"/g, '""')}"`, // Handle quotes in event names
        item.numberOfBookings,
        item.totalAmount.toFixed(2)
      ].join(',')
    ).join('\n');

    const csvString = `${headers}\n${rows}`;
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) { // Feature detection
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'booking_report.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      alert("CSV export is not supported in your browser.");
    }
  };


  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.pageTitle}>Reports</h2>

      {/* Booking Report Section */}
      <section className={styles.reportSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Booking Report</h3>
          <Button onClick={handleExportBookingReportCSV} variant="primary" size="sm" disabled={bookingReportData.length === 0}>
            Export as CSV
          </Button>
        </div>
        <div className={styles.filterControlsContainer}>
          <div className={styles.filterGroup}>
            <label htmlFor="eventFilter" className={styles.filterLabel}>Filter by Event:</label>
            <select
              id="eventFilter"
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className={styles.filterSelect}
            >
              {uniqueEventNames.map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label htmlFor="dateFilter" className={styles.filterLabel}>Bookings On/After Date:</label>
            <input
              type="date"
              id="dateFilter"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className={styles.filterInput} // Similar style to filterSelect
            />
          </div>
        </div>
        <Table
          columns={bookingReportColumns}
          data={bookingReportData}
          rowsPerPage={10} // Or adjust as needed, no pagination key needed if table itself doesn't have internal page state
        />
         {bookingReportData.length === 0 && <p className={styles.noDataMessage}>No data matches the current filters.</p>}
      </section>

      {/* Revenue Report Section - Placeholder */}
      <section className={styles.reportSection}>
        <h3 className={styles.sectionTitle}>Revenue Report</h3>
        <p className={styles.placeholderText}>Detailed revenue analytics and charts will be displayed here. (e.g., revenue over time, by event type, etc.)</p>
        {/* Potentially add date range pickers, event type filters etc. */}
      </section>

      {/* User Activity Report Section - Placeholder */}
      <section className={styles.reportSection}>
        <h3 className={styles.sectionTitle}>User Activity Report</h3>
        <p className={styles.placeholderText}>User registration trends, login activity, booking frequency, and other engagement metrics will be shown here.</p>
        {/* Potentially add filters by user role, registration date range etc. */}
      </section>
    </div>
  );
};

export default ReportsPage;

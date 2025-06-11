import React, { useState, useMemo, useEffect } from 'react';
import Table, { ColumnDefinition } from '../components/Table';
import Modal from '../components/Modal';
import { mockEventBookings as initialMockBookings, EventBooking } from '../data/eventBookingsData';
import styles from './EventBookingsPage.module.css';
import Button from '../components/Button';

const bookingStatuses = ['All', 'Confirmed', 'Cancelled', 'Refunded', 'Pending'] as const;
type BookingStatusFilter = typeof bookingStatuses[number];

const EventBookingsPage: React.FC = () => {
  const [bookingsData, setBookingsData] = useState<EventBooking[]>(initialMockBookings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<EventBooking | null>(null);
  const [statusFilter, setStatusFilter] = useState<BookingStatusFilter>('All');
  const [tablePageResetKey, setTablePageResetKey] = useState(0);

  const handleRowClick = (booking: EventBooking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const handleStatusFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value as BookingStatusFilter);
    setTablePageResetKey(prev => prev + 1);
  };

  const handleCancelBooking = (bookingId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent row click when clicking button
    setBookingsData(prevBookings =>
      prevBookings.map(booking =>
        booking.bookingId === bookingId ? { ...booking, status: 'Cancelled' } : booking
      )
    );
  };

  const handleMarkAsRefunded = (bookingId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent row click
    setBookingsData(prevBookings =>
      prevBookings.map(booking =>
        booking.bookingId === bookingId ? { ...booking, status: 'Refunded' } : booking
      )
    );
  };

  const filteredBookings = useMemo(() => {
    let dataToFilter = bookingsData;
    if (statusFilter === 'All') {
      return dataToFilter;
    }
    return dataToFilter.filter(booking => booking.status === statusFilter);
  }, [statusFilter, bookingsData]);

  const columns: ColumnDefinition<EventBooking>[] = [
    { key: 'bookingId', header: 'Booking ID' },
    { key: 'eventName', header: 'Event Name' },
    {
      key: 'user',
      header: 'User',
      render: (item) => `${item.user.name} (${item.user.email})`
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (item) => `$${item.amount.toFixed(2)}`
    },
    {
      key: 'status',
      header: 'Status',
      render: (item) => (
        <span className={`${styles.status} ${styles[`status${item.status.replace(/\s+/g, '')}`]}`}>
          {item.status}
        </span>
      )
    },
    {
      key: 'bookingDate',
      header: 'Booking Date',
      render: (item) => new Date(item.bookingDate).toLocaleDateString()
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item) => (
        <div className={styles.actionButtons}>
          <Button onClick={(e) => { e.stopPropagation(); handleRowClick(item); }} variant="secondary" type="button" size="sm">
            Details
          </Button>
          {(item.status === 'Confirmed' || item.status === 'Pending') && (
            <Button onClick={(e) => handleCancelBooking(item.bookingId, e)} variant="secondary" type="button" size="sm" className={styles.cancelButton}>
              Cancel
            </Button>
          )}
          {item.status === 'Cancelled' && (
            <Button onClick={(e) => handleMarkAsRefunded(item.bookingId, e)} variant="secondary" type="button" size="sm" className={styles.refundButton}>
              Mark Refunded
            </Button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Event Bookings Management</h2>
      </div>

      <div className={styles.filterControls}>
        <div className={styles.filterGroup}>
          <label htmlFor="statusFilter" className={styles.filterLabel}>Filter by Status:</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className={styles.filterSelect}
          >
            {bookingStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <Table
        key={tablePageResetKey}
        columns={columns}
        data={filteredBookings}
        onRowClick={handleRowClick}
        rowsPerPage={5} // Increased rowsPerPage a bit
      />

      {selectedBooking && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={`Booking Details: ${selectedBooking.bookingId}`}
          size="lg"
        >
          <div className={styles.modalContent}>
            <p><strong>Event:</strong> {selectedBooking.eventName}</p>
            <p><strong>User:</strong> {selectedBooking.user.name} ({selectedBooking.user.email})</p>
            <p><strong>Amount:</strong> ${selectedBooking.amount.toFixed(2)}</p>
            <p><strong>Status:</strong> <span className={`${styles.status} ${styles[`status${selectedBooking.status.replace(/\s+/g, '')}`]}`}>{selectedBooking.status}</span></p>
            <p><strong>Booking Date:</strong> {new Date(selectedBooking.bookingDate).toLocaleString()}</p>
            <p><strong>Seats:</strong> {selectedBooking.seats || 'N/A'}</p>
            <p><strong>Ticket Info:</strong> {selectedBooking.ticketInfo || 'N/A'}</p>
            <p><strong>Price Detail:</strong> ${selectedBooking.price?.toFixed(2) || selectedBooking.amount.toFixed(2)}</p>
            <p><strong>API Reference ID:</strong> {selectedBooking.apiReferenceId || 'N/A'}</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EventBookingsPage;

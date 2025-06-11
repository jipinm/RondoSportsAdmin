import React, { useState, useMemo } from 'react';
import Table, { ColumnDefinition } from '../components/Table';
import Button from '../components/Button';
import { mockRefundLogs, RefundLogEntry, RefundStatus } from '../data/refundLogsData';
import styles from './RefundLogsPage.module.css'; // Create this file

const refundStatusesForFilter: ('All' | RefundStatus)[] = ['All', 'Pending', 'Approved', 'Rejected'];

const RefundLogsPage: React.FC = () => {
  const [refundRequests, setRefundRequests] = useState<RefundLogEntry[]>(mockRefundLogs);
  const [statusFilter, setStatusFilter] = useState<'All' | RefundStatus>('All');
  const [tablePageResetKey, setTablePageResetKey] = useState(0);
  // Modal state for viewing details can be added later if needed
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedRequest, setSelectedRequest] = useState<RefundLogEntry | null>(null);

  const handleStatusChange = (requestId: string, newStatus: RefundStatus, event: React.MouseEvent) => {
    event.stopPropagation();
    setRefundRequests(prevRequests =>
      prevRequests.map(req =>
        req.requestId === requestId
          ? { ...req, status: newStatus, processedDate: new Date().toISOString() }
          : req
      )
    );
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value as 'All' | RefundStatus);
    setTablePageResetKey(prev => prev + 1);
  };

  const filteredRefundRequests = useMemo(() => {
    if (statusFilter === 'All') {
      return refundRequests;
    }
    return refundRequests.filter(req => req.status === statusFilter);
  }, [refundRequests, statusFilter]);

  const columns: ColumnDefinition<RefundLogEntry>[] = [
    { key: 'requestId', header: 'Request ID' },
    { key: 'bookingId', header: 'Booking ID' },
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
    { key: 'reason', header: 'Reason' },
    {
      key: 'requestDate',
      header: 'Request Date',
      render: (item) => new Date(item.requestDate).toLocaleDateString()
    },
    {
      key: 'status',
      header: 'Status',
      render: (item) => (
        <span className={`${styles.statusBadge} ${styles[`status${item.status}`]}`}>
          {item.status}
        </span>
      )
    },
    {
      key: 'processedDate',
      header: 'Processed Date',
      render: (item) => item.processedDate ? new Date(item.processedDate).toLocaleDateString() : 'N/A'
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item) => (
        item.status === 'Pending' ? (
          <div className={styles.actionButtons}>
            <Button
              onClick={(e) => handleStatusChange(item.requestId, 'Approved', e)}
              variant="secondary"
              size="sm"
              className={styles.approveButton}
            >
              Approve
            </Button>
            <Button
              onClick={(e) => handleStatusChange(item.requestId, 'Rejected', e)}
              variant="secondary"
              size="sm"
              className={styles.rejectButton}
            >
              Reject
            </Button>
          </div>
        ) : (
          <span className={styles.noActions}>No actions</span>
        )
      )
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Refund Logs & Processing</h2>
      </div>

      <div className={styles.filterControlsContainer}>
        <div className={styles.filterGroup}>
          <label htmlFor="statusFilter" className={styles.filterLabel}>Filter by Status:</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={handleFilterChange}
            className={styles.filterSelect}
          >
            {refundStatusesForFilter.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <Table
        key={tablePageResetKey}
        columns={columns}
        data={filteredRefundRequests}
        rowsPerPage={5}
        // onRowClick={(item) => { setSelectedRequest(item); setIsModalOpen(true); }} // Optional: For modal view
      />

      {/* Modal for viewing details can be added here */}
      {/* {selectedRequest && isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Refund Request: ${selectedRequest.requestId}`}>
          <p><strong>Booking ID:</strong> {selectedRequest.bookingId}</p>
          <p><strong>User:</strong> {selectedRequest.user.name}</p>
          <p><strong>Amount:</strong> ${selectedRequest.amount.toFixed(2)}</p>
          <p><strong>Reason:</strong> {selectedRequest.reason}</p>
          <p><strong>Status:</strong> {selectedRequest.status}</p>
          <p><strong>Request Date:</strong> {new Date(selectedRequest.requestDate).toLocaleString()}</p>
          {selectedRequest.processedDate && <p><strong>Processed Date:</strong> {new Date(selectedRequest.processedDate).toLocaleString()}</p>}
          {selectedRequest.notes && <p><strong>Notes:</strong> {selectedRequest.notes}</p>}
        </Modal>
      )} */}
    </div>
  );
};

export default RefundLogsPage;

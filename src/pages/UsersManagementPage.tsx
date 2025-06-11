import React, { useState, useMemo, useEffect } from 'react';
import Table, { ColumnDefinition } from '../components/Table';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Input from '../components/Input';
import { mockUsers, UserProfile } from '../data/usersData';
import styles from './UsersManagementPage.module.css';

const initialUserRoles: UserProfile['role'][] = ['Super Admin', 'Admin', 'User', 'Support Staff']; // Predefined for consistency
const userStatuses: UserProfile['status'][] = ['Active', 'Inactive', 'Deactivated'];

const UsersManagementPage: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>(mockUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [modalUserData, setModalUserData] = useState<Partial<UserProfile>>({});

  const [roleFilter, setRoleFilter] = useState<UserProfile['role'] | 'All'>('All');
  const [tablePageResetKey, setTablePageResetKey] = useState(0);

  // Dynamically get unique roles from current users data for the filter dropdown
  const availableRoles = useMemo(() => {
    const roles = new Set(users.map(user => user.role));
    return ['All', ...Array.from(roles)];
  }, [users]);


  const handleOpenEditModal = (user: UserProfile) => {
    setEditingUser(user);
    setModalUserData({ ...user });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setModalUserData({});
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setModalUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    if (editingUser) {
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === editingUser.id ? { ...user, ...modalUserData } as UserProfile : user
        )
      );
    }
    handleCloseModal();
  };

  const handleDeactivateUser = (userId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, status: 'Deactivated' } : user
      )
    );
  };

  const handleRoleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRoleFilter(event.target.value as UserProfile['role'] | 'All');
    setTablePageResetKey(prev => prev + 1); // Reset table pagination
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      (roleFilter === 'All' || user.role === roleFilter)
      // Add status filter here if also implemented: && (statusFilter === 'All' || user.status === statusFilter)
    );
  }, [users, roleFilter]);

  const columns: ColumnDefinition<UserProfile>[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
    {
      key: 'status',
      header: 'Status',
      render: (item) => (
        <span className={`${styles.statusBadge} ${styles[`status${item.status.replace(/\s+/g, '')}`]}`}>
          {item.status}
        </span>
      )
    },
    {
      key: 'joinedDate',
      header: 'Joined Date',
      render: (item) => new Date(item.joinedDate).toLocaleDateString()
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item) => (
        <div className={styles.actionButtons}>
          <Button onClick={() => handleOpenEditModal(item)} variant="secondary" size="sm">
            View/Edit
          </Button>
          {item.status !== 'Deactivated' && (
            <Button
              onClick={(e) => handleDeactivateUser(item.id, e)}
              variant="secondary"
              size="sm"
              className={styles.deactivateButton}
            >
              Deactivate
            </Button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Users Management</h2>
      </div>

      <div className={styles.filterControlsContainer}>
        <div className={styles.filterGroup}>
          <label htmlFor="roleFilter" className={styles.filterLabel}>Filter by Role:</label>
          <select
            id="roleFilter"
            value={roleFilter}
            onChange={handleRoleFilterChange}
            className={styles.filterSelect}
          >
            {availableRoles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
        {/* Add other filters like status filter here if needed */}
      </div>

      <Table
        key={tablePageResetKey}
        columns={columns}
        data={filteredUsers}
        rowsPerPage={5}
      />

      {isModalOpen && editingUser && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={`Edit User: ${editingUser.name}`} size="lg">
          <div className={styles.modalForm}>
            <div className={styles.formField}>
              <label htmlFor="name">Name:</label>
              <Input type="text" name="name" value={modalUserData.name || ''} onChange={handleInputChange} />
            </div>
            <div className={styles.formField}>
              <label htmlFor="email">Email:</label>
              <Input type="email" name="email" value={modalUserData.email || ''} onChange={handleInputChange} />
            </div>
            <div className={styles.formField}>
              <label htmlFor="role">Role:</label>
              <select name="role" value={modalUserData.role || ''} onChange={handleInputChange} className={styles.formSelect}>
                {initialUserRoles.map(role => <option key={role} value={role}>{role}</option>)}
              </select>
            </div>
            <div className={styles.formField}>
              <label htmlFor="status">Status:</label>
              <select name="status" value={modalUserData.status || ''} onChange={handleInputChange} className={styles.formSelect}>
                {userStatuses.map(status => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
            <div className={styles.modalActions}>
              <Button onClick={handleCloseModal} variant="secondary">Cancel</Button>
              <Button onClick={handleSaveChanges} variant="primary">Save Changes</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UsersManagementPage;

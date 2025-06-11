export interface UserProfile {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Inactive' | 'Deactivated';
  joinedDate: string; // ISO date string
  role: 'Super Admin' | 'Admin' | 'User' | 'Support Staff';
  permissions?: string[]; // e.g., ['manage_users', 'edit_content']
  avatarUrl?: string; // Optional
  lastLogin?: string; // ISO date string, optional
}

export const mockUsers: UserProfile[] = [
  {
    id: 'usr001',
    name: 'Super Admin User',
    email: 'superadmin@example.com',
    status: 'Active',
    joinedDate: '2023-01-10T10:00:00Z',
    role: 'Super Admin',
    permissions: ['all'],
    avatarUrl: 'https://i.pravatar.cc/150?u=usr001',
    lastLogin: '2024-06-10T10:00:00Z'
  },
  {
    id: 'usr002',
    name: 'Admin User One',
    email: 'admin1@example.com',
    status: 'Active',
    joinedDate: '2023-02-15T11:30:00Z',
    role: 'Admin',
    permissions: ['manage_events', 'manage_bookings', 'view_reports'],
    avatarUrl: 'https://i.pravatar.cc/150?u=usr002',
    lastLogin: '2024-06-11T09:00:00Z'
  },
  {
    id: 'usr003',
    name: 'Regular User Jane',
    email: 'jane.doe@example.com',
    status: 'Active',
    joinedDate: '2023-03-20T14:20:00Z',
    role: 'User',
    avatarUrl: 'https://i.pravatar.cc/150?u=usr003',
    lastLogin: '2024-06-05T15:30:00Z'
  },
  {
    id: 'usr004',
    name: 'Inactive User John',
    email: 'john.roe@example.com',
    status: 'Inactive',
    joinedDate: '2023-04-01T08:00:00Z',
    role: 'User',
    avatarUrl: 'https://i.pravatar.cc/150?u=usr004',
    lastLogin: '2024-03-01T12:00:00Z'
  },
  {
    id: 'usr005',
    name: 'Support Staff Mike',
    email: 'support.mike@example.com',
    status: 'Active',
    joinedDate: '2023-05-10T16:00:00Z',
    role: 'Support Staff',
    permissions: ['view_bookings', 'manage_refunds'],
    avatarUrl: 'https://i.pravatar.cc/150?u=usr005',
    lastLogin: '2024-06-11T11:00:00Z'
  },
  {
    id: 'usr006',
    name: 'Deactivated User Sue',
    email: 'sue.storm@example.com',
    status: 'Deactivated',
    joinedDate: '2023-01-25T12:00:00Z',
    role: 'User',
    avatarUrl: 'https://i.pravatar.cc/150?u=usr006',
    lastLogin: '2023-06-01T10:00:00Z'
  },
   {
    id: 'usr007',
    name: 'Admin User Two',
    email: 'admin2@example.com',
    status: 'Active',
    joinedDate: '2023-07-19T09:30:00Z',
    role: 'Admin',
    permissions: ['manage_content', 'view_users'],
    avatarUrl: 'https://i.pravatar.cc/150?u=usr007',
    lastLogin: '2024-06-09T14:20:00Z'
  },
];

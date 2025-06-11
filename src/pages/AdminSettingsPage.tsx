import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/Input';
import Button from '../components/Button';
import styles from './AdminSettingsPage.module.css'; // Create this file

// Mock user profile data (as AuthContext only stores role)
interface UserProfileData {
  name: string;
  email: string;
  avatarUrl?: string; // For current avatar
  avatarFile?: File | null; // For new upload
}

// Mock roles and permissions data
interface RolePermission {
  role: string;
  permissions: string[];
  description: string;
}
const mockRolesPermissions: RolePermission[] = [
  { role: 'Super Admin', permissions: ['All Access'], description: 'Full control over the system.' },
  { role: 'Admin', permissions: ['Manage Events', 'Manage Bookings', 'Manage Users', 'View Reports'], description: 'Manages core parts of the application.' },
  { role: 'Support Staff', permissions: ['View Bookings', 'Manage Refunds', 'Respond to Queries'], description: 'Assists users and handles support tasks.' },
  { role: 'User', permissions: ['View Events', 'Make Bookings'], description: 'Standard user with access to public features.' },
];


const AdminSettingsPage: React.FC = () => {
  const { userRole, logout } = useAuth(); // Assuming userRole is like 'Super Admin'

  // Mock current user data for profile editing
  const [profile, setProfile] = useState<UserProfileData>({
    name: userRole === 'Super Admin' ? 'Super Administrator' : 'Admin User', // Example name based on role
    email: userRole === 'Super Admin' ? 'superadmin@example.com' : 'admin@example.com', // Example email
    avatarUrl: 'https://i.pravatar.cc/150?u=admin', // Default avatar
    avatarFile: null,
  });
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(profile.avatarUrl || null);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordChangeMessage, setPasswordChangeMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [profileUpdateMessage, setProfileUpdateMessage] = useState<string | null>(null);


  const handleProfileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfile(prev => ({ ...prev, avatarFile: file }));
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = (e: FormEvent) => {
    e.preventDefault();
    console.log('Saving profile:', { ...profile, avatarUrl: profile.avatarFile ? profile.avatarFile.name : profile.avatarUrl });
    if (profile.avatarFile) {
        setProfile(prev => ({...prev, avatarUrl: profileImagePreview || prev.avatarUrl, avatarFile: null}));
    }
    setProfileUpdateMessage('Profile updated successfully!');
    setTimeout(() => setProfileUpdateMessage(null), 3000);
  };

  const handleChangePassword = (e: FormEvent) => {
    e.preventDefault();
    setPasswordChangeMessage(null);
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordChangeMessage({type: 'error', text: 'All password fields are required.'});
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordChangeMessage({type: 'error', text: 'New passwords do not match.'});
      return;
    }
    if (newPassword.length < 6) {
        setPasswordChangeMessage({type: 'error', text: 'New password must be at least 6 characters long.'});
        return;
    }
    console.log('Changing password for user:', profile.email);
    setPasswordChangeMessage({type: 'success', text: 'Password changed successfully! (Simulated)'});
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setTimeout(() => setPasswordChangeMessage(null), 3000);
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.pageTitle}>Admin Settings</h2>

      <section className={styles.settingsSection}>
        <h3 className={styles.sectionTitle}>User Profile</h3>
        <form onSubmit={handleSaveProfile} className={styles.profileForm}>
          <div className={styles.avatarSection}>
            <img
              src={profileImagePreview || 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=No+Image'}
              alt="Profile Avatar"
              className={styles.avatarPreview}
            />
            <label htmlFor="avatarUpload" className={styles.avatarUploadLabel}>Change Picture</label>
            <input
              type="file"
              id="avatarUpload"
              accept="image/*"
              onChange={handleAvatarChange}
              className={styles.avatarUploadInput}
            />
          </div>
          <div className={styles.profileDetails}>
            <div className={styles.formField}>
              <label htmlFor="name">Name:</label>
              <Input type="text" name="name" id="name" value={profile.name} onChange={handleProfileInputChange} />
            </div>
            <div className={styles.formField}>
              <label htmlFor="email">Email:</label>
              <Input type="email" name="email" id="email" value={profile.email} onChange={handleProfileInputChange} />
            </div>
            <Button type="submit" variant="primary">Save Profile</Button>
            {profileUpdateMessage && <p className={styles.successMessage}>{profileUpdateMessage}</p>}
          </div>
        </form>
      </section>

      <section className={styles.settingsSection}>
        <h3 className={styles.sectionTitle}>Change Password</h3>
        <form onSubmit={handleChangePassword} className={styles.passwordForm}>
          <div className={styles.formField}>
            <label htmlFor="currentPassword">Current Password:</label>
            <Input type="password" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          </div>
          <div className={styles.formField}>
            <label htmlFor="newPassword">New Password:</label>
            <Input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div className={styles.formField}>
            <label htmlFor="confirmNewPassword">Confirm New Password:</label>
            <Input type="password" id="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
          </div>
          <Button type="submit" variant="primary">Change Password</Button>
          {passwordChangeMessage && (
            <p className={passwordChangeMessage.type === 'success' ? styles.successMessage : styles.errorMessage}>
              {passwordChangeMessage.text}
            </p>
          )}
        </form>
      </section>

      <section className={styles.settingsSection}>
        <h3 className={styles.sectionTitle}>Roles & Permissions Management</h3>
        <div className={styles.rolesTableContainer}>
            <table className={styles.rolesTable}>
                <thead>
                    <tr>
                        <th>Role</th>
                        <th>Description</th>
                        <th>Permissions</th>
                    </tr>
                </thead>
                <tbody>
                    {mockRolesPermissions.map(rolePerm => (
                        <tr key={rolePerm.role}>
                            <td>{rolePerm.role}</td>
                            <td>{rolePerm.description}</td>
                            <td>{rolePerm.permissions.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </section>

      <section className={styles.settingsSection}>
        <h3 className={styles.sectionTitle}>Account Actions</h3>
        <Button onClick={logout} variant="secondary" className={styles.logoutButton}>
          Logout
        </Button>
        <p className={styles.logoutDescription}>This will log you out of the admin dashboard.</p>
      </section>
    </div>
  );
};

export default AdminSettingsPage;

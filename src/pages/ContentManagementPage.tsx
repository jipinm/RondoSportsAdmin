import React, { useState, ChangeEvent } from 'react';
import { mockPageContent, mockBannersData, PageContent, BannerItem } from '../data/contentData';
import styles from './ContentManagementPage.module.css'; // Create this file
import Button from '../components/Button';
import Input from '../components/Input'; // For banner form

// Helper to generate unique IDs for new banners
const generateId = () => `banner${Date.now()}`;

const ContentManagementPage: React.FC = () => {
  // Page Content State
  const [termsContent, setTermsContent] = useState<string>(mockPageContent.terms);
  const [privacyContent, setPrivacyContent] = useState<string>(mockPageContent.privacy);
  const [aboutUsContent, setAboutUsContent] = useState<string>(mockPageContent.aboutUs);
  const [lastSaved, setLastSaved] = useState<{[key: string]: string}>({});

  // Banner Management State
  const [banners, setBanners] = useState<BannerItem[]>(mockBannersData);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<BannerItem | Partial<BannerItem> | null>(null);
  const [bannerImagePreview, setBannerImagePreview] = useState<string | null>(null);


  const handlePageContentSave = (pageKey: keyof PageContent, content: string) => {
    // In a real app, this would involve an API call
    console.log(`Saving content for ${pageKey}:`, content.substring(0,100) + "...");
    setLastSaved(prev => ({...prev, [pageKey]: new Date().toLocaleTimeString() }));
    // Potentially update mockPageContent or a global state if this was a real app
  };

  // Banner Handlers
  const openBannerModal = (banner?: BannerItem) => {
    if (banner) {
      setEditingBanner({ ...banner });
      if (banner.imageFile) setBannerImagePreview(URL.createObjectURL(banner.imageFile));
      else if (banner.imageUrl) setBannerImagePreview(banner.imageUrl);
      else setBannerImagePreview(null);
    } else {
      setEditingBanner({ title: '', subtitle: '', imageUrl: '', link: '', isActive: true, imageFile: null });
      setBannerImagePreview(null);
    }
    setIsBannerModalOpen(true);
  };

  const closeBannerModal = () => {
    setIsBannerModalOpen(false);
    setEditingBanner(null);
    setBannerImagePreview(null);
  };

  const handleBannerInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingBanner) return;
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setEditingBanner(prev => ({ ...prev!, [name]: checked }));
    } else {
        setEditingBanner(prev => ({ ...prev!, [name]: value }));
    }
  };

  const handleBannerImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!editingBanner) return;
    const file = e.target.files?.[0];
    if (file) {
      setEditingBanner(prev => ({ ...prev!, imageFile: file, imageUrl: file.name })); // Store file & temp name
      setBannerImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveBanner = () => {
    if (!editingBanner) return;

    // In a real app, upload editingBanner.imageFile if it exists, then get back the new imageUrl
    // For now, if imageFile exists, we'll just keep its preview URL as imageUrl for demo
    let finalImageUrl = editingBanner.imageUrl || '';
    if (editingBanner.imageFile && bannerImagePreview && bannerImagePreview.startsWith('blob:')) {
        // This is a simplification. In a real app, you'd upload the file
        // and get a persistent URL from the server.
        // For now, we're just using the blob URL which is temporary.
        // Or, more simply, we could just use the placeholder if no new file is selected.
        finalImageUrl = `https://via.placeholder.com/1200x400/CCCCCC/000000?text=${editingBanner.title?.replace(/\s+/g, '+') || 'New+Banner'}`;
         if (editingBanner.imageFile) {
            console.log("Simulating upload for:", editingBanner.imageFile.name);
            // Here you would typically call an upload service
            // For demo, we'll use a generic placeholder if a file was selected
            finalImageUrl = `https://via.placeholder.com/1200x400/EEEEEE/000000?text=Uploaded:${editingBanner.imageFile.name.substring(0,10)}`;
        }
    }


    const bannerToSave: BannerItem = {
      id: editingBanner.id || generateId(),
      title: editingBanner.title || 'Untitled Banner',
      subtitle: editingBanner.subtitle || '',
      imageUrl: finalImageUrl, // Use the potentially updated image URL
      imageFile: editingBanner.imageFile, // Keep file for potential re-upload or display
      link: editingBanner.link || '#',
      isActive: editingBanner.isActive !== undefined ? editingBanner.isActive : true,
    };

    setBanners(prev => {
      const existing = prev.find(b => b.id === bannerToSave.id);
      if (existing) {
        return prev.map(b => b.id === bannerToSave.id ? bannerToSave : b);
      }
      return [...prev, bannerToSave];
    });
    closeBannerModal();
  };

  const handleDeleteBanner = (bannerId: string) => {
    setBanners(prev => prev.filter(b => b.id !== bannerId));
  };

  const toggleBannerStatus = (bannerId: string) => {
    setBanners(prev => prev.map(b => b.id === bannerId ? {...b, isActive: !b.isActive} : b));
  };


  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.pageTitle}>Content Management</h2>

      {/* Page Content Editing */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Page Content</h3>
        {Object.keys(mockPageContent).map(pageKey => {
          const content = pageKey === 'terms' ? termsContent : pageKey === 'privacy' ? privacyContent : aboutUsContent;
          const setContent = pageKey === 'terms' ? setTermsContent : pageKey === 'privacy' ? setPrivacyContent : setAboutUsContent;
          const pageName = pageKey === 'terms' ? "Terms & Conditions" : pageKey === 'privacy' ? "Privacy Policy" : "About Us";

          return (
            <div key={pageKey} className={styles.pageEditBlock}>
              <h4>Edit: {pageName}</h4>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={styles.textarea}
                rows={10}
              />
              <div className={styles.saveActions}>
                <Button onClick={() => handlePageContentSave(pageKey as keyof PageContent, content)} size="sm">
                  Save {pageName}
                </Button>
                {lastSaved[pageKey] && <span className={styles.lastSaved}>Last saved: {lastSaved[pageKey]}</span>}
              </div>
            </div>
          );
        })}
      </section>

      {/* Banner Management */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Banner Management</h3>
            <Button onClick={() => openBannerModal()} variant="primary">Add New Banner</Button>
        </div>
        <div className={styles.bannerList}>
          {banners.map(banner => (
            <div key={banner.id} className={styles.bannerItem}>
              <img
                src={banner.imageFile ? URL.createObjectURL(banner.imageFile) : banner.imageUrl}
                alt={banner.title}
                className={styles.bannerImagePreviewSmall}
              />
              <div className={styles.bannerInfo}>
                <strong>{banner.title}</strong>
                {banner.subtitle && <p>{banner.subtitle}</p>}
                <p><a href={banner.link} target="_blank" rel="noopener noreferrer">{banner.link}</a></p>
                <p>Status: <span className={banner.isActive ? styles.activeStatus : styles.inactiveStatus}>{banner.isActive ? 'Active' : 'Inactive'}</span></p>
              </div>
              <div className={styles.bannerActions}>
                <Button onClick={() => openBannerModal(banner)} size="sm">Edit</Button>
                <Button onClick={() => toggleBannerStatus(banner.id)} size="sm" variant="secondary">
                  {banner.isActive ? 'Deactivate' : 'Activate'}
                </Button>
                <Button onClick={() => handleDeleteBanner(banner.id)} size="sm" className={styles.deleteButton}>Delete</Button>
              </div>
            </div>
          ))}
           {banners.length === 0 && <p>No banners configured yet.</p>}
        </div>
      </section>

      {/* Banner Edit/Add Modal */}
      {isBannerModalOpen && editingBanner && (
        <Modal isOpen={isBannerModalOpen} onClose={closeBannerModal} title={editingBanner.id ? "Edit Banner" : "Add New Banner"} size="lg">
          <div className={styles.modalForm}>
            <div className={styles.formField}>
              <label htmlFor="title">Title:</label>
              <Input type="text" name="title" value={editingBanner.title || ''} onChange={handleBannerInputChange} />
            </div>
            <div className={styles.formField}>
              <label htmlFor="subtitle">Subtitle (Optional):</label>
              <Input type="text" name="subtitle" value={editingBanner.subtitle || ''} onChange={handleBannerInputChange} />
            </div>
            <div className={styles.formField}>
              <label htmlFor="link">Link URL:</label>
              <Input type="text" name="link" value={editingBanner.link || ''} onChange={handleBannerInputChange} />
            </div>
            <div className={styles.formField}>
              <label htmlFor="imageUrl">Image File:</label>
              <Input type="file" name="imageFile" accept="image/*" onChange={handleBannerImageChange} />
              {bannerImagePreview && (
                <img src={bannerImagePreview} alt="Preview" className={styles.bannerImagePreviewModal} />
              )}
            </div>
             <div className={styles.formFieldRow}>
              <label htmlFor="isActive" className={styles.checkboxLabel}>Active:</label>
              <input
                type="checkbox"
                name="isActive"
                id="isActiveBanner"
                checked={editingBanner.isActive !== undefined ? editingBanner.isActive : true}
                onChange={handleBannerInputChange}
                className={styles.checkboxInput}
              />
            </div>
            <div className={styles.modalActions}>
              <Button onClick={closeBannerModal} variant="secondary">Cancel</Button>
              <Button onClick={handleSaveBanner} variant="primary">Save Banner</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ContentManagementPage;

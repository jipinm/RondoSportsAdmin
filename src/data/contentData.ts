export interface PageContent {
  [key: string]: string; // Page slug -> HTML/Markdown content
}

export interface BannerItem {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string; // Placeholder or actual URL
  imageFile?: File | null; // For new uploads
  link: string; // URL the banner links to
  isActive: boolean;
}

export const mockPageContent: PageContent = {
  terms: `
    <h2>Terms and Conditions</h2>
    <p>Last updated: ${new Date().toLocaleDateString()}</p>
    <p>Welcome to Our Application! These terms and conditions outline the rules and regulations for the use of Our Application's Website.</p>
    <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Our Application if you do not agree to take all of the terms and conditions stated on this page.</p>
    <h3>License</h3>
    <p>Unless otherwise stated, Our Application and/or its licensors own the intellectual property rights for all material on Our Application. All intellectual property rights are reserved. You may access this from Our Application for your own personal use subjected to restrictions set in these terms and conditions.</p>
    <p>You must not:
      <ul>
        <li>Republish material from Our Application</li>
        <li>Sell, rent or sub-license material from Our Application</li>
        <li>Reproduce, duplicate or copy material from Our Application</li>
        <li>Redistribute content from Our Application</li>
      </ul>
    </p>
    <p>This Agreement shall begin on the date hereof.</p>
  `,
  privacy: `
    <h2>Privacy Policy</h2>
    <p>Last updated: ${new Date().toLocaleDateString()}</p>
    <p>Your privacy is important to us. It is Our Application's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.</p>
    <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
    <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</p>
    <p>We don’t share any personally identifying information publicly or with third-parties, except when required to by law.</p>
  `,
  aboutUs: `
    <h2>About Us</h2>
    <p>Last updated: ${new Date().toLocaleDateString()}</p>
    <p>Welcome to Our Application! We are a dedicated team passionate about providing the best service and experience to our users.</p>
    <p>Our mission is to innovate and simplify processes, making technology accessible and useful for everyone. We believe in continuous improvement and user-centric development.</p>
    <p>Founded in [Year], Our Application has come a long way from its beginnings. We now serve customers all over [place], and are thrilled to be a part of the [industry type] industry.</p>
    <p>We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.</p>
  `,
};

export const mockBannersData: BannerItem[] = [
  {
    id: 'banner001',
    title: 'Summer Special!',
    subtitle: 'Get 20% off on all event bookings this month.',
    imageUrl: 'https://via.placeholder.com/1200x400/FFA07A/FFFFFF?text=Summer+Deals', // Light Salmon
    link: '/events/summer-sale',
    isActive: true,
  },
  {
    id: 'banner002',
    title: 'New Workshop Series',
    subtitle: 'Learn new skills with our expert-led workshops.',
    imageUrl: 'https://via.placeholder.com/1200x400/20B2AA/FFFFFF?text=Workshops', // Light Sea Green
    link: '/workshops',
    isActive: true,
  },
  {
    id: 'banner003',
    title: 'Early Bird Conference Tickets',
    subtitle: 'Book now for the Annual Tech Conference 2025.',
    imageUrl: 'https://via.placeholder.com/1200x400/778899/FFFFFF?text=Conference+2025', // Light Slate Gray
    link: '/conference-2025',
    isActive: false,
  },
];

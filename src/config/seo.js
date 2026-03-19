const location = {
  city: 'Ahmedabad',
  region: 'Gujarat',
  country: 'India'
};

const projects = [
  {
    id: 1,
    slug: 'mern-ecommerce-platform',
    name: 'MERN E-Commerce Platform',
    shortTitle: 'MERN E-Commerce Platform',
    description:
      'Production-ready e-commerce project with React, Node.js, MongoDB, JWT authentication, and PayPal integration.',
    longDescription:
      'A full stack e-commerce application built to handle browsing, cart management, secure checkout, user authentication, and admin workflows. The project focuses on practical product architecture with scalable APIs, a responsive React frontend, and payment processing.',
    url: 'https://shopping-canter.netlify.app',
    codeUrl: 'https://github.com/visheshpanchal27/Mern',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'PayPal API', 'JWT'],
    category: 'fullstack',
    icon: 'fas fa-shopping-cart',
    gradient: 'from-gray-900 to-gray-800',
    stats: { users: '500+', revenue: '$10K+' },
    features: ['PayPal Integration', 'JWT Authentication', 'Real-time Analytics', 'Admin Dashboard'],
    metrics: { performance: 98, security: 95, scalability: 92 },
    seoTitle: 'MERN E-Commerce Platform | Vishesh Panchal Project',
    seoDescription:
      'Detailed case study of a MERN e-commerce platform by Vishesh Panchal with React, Node.js, MongoDB, JWT authentication, and PayPal integration.'
  },
  {
    id: 2,
    slug: 'ai-deepfake-detector',
    name: 'AI DeepFake Detector',
    shortTitle: 'AI DeepFake Detector',
    description:
      'Machine learning application for deepfake detection built with Python, OpenCV, TensorFlow, and computer vision workflows.',
    longDescription:
      'A computer vision focused AI project designed to detect manipulated media through a practical machine learning pipeline. The work highlights experimentation, model evaluation, and applying Python-based tooling to a real-world trust and safety problem.',
    codeUrl: 'https://github.com/visheshpanchal27/DeepFakeDetector',
    tech: ['Python', 'OpenCV', 'TensorFlow', 'Machine Learning'],
    category: 'ai',
    icon: 'fas fa-brain',
    gradient: 'from-gray-800 to-gray-500',
    stats: { accuracy: '79.2%', models: '5+' },
    features: ['Computer Vision', 'Real-time Detection', 'Batch Processing', 'ML Pipeline'],
    metrics: { accuracy: 79, speed: 85, reliability: 88 },
    seoTitle: 'AI DeepFake Detector | Vishesh Panchal Project',
    seoDescription:
      'Project page for Vishesh Panchal’s AI deepfake detector built with Python, OpenCV, TensorFlow, and computer vision workflows.'
  },
  {
    id: 3,
    slug: 'lv-shopping-center',
    name: 'LV Shopping Center',
    shortTitle: 'LV Shopping Center',
    description:
      'Java web application with JSP, Servlets, and MySQL for end-to-end e-commerce operations.',
    longDescription:
      'A Java-based commerce application that covers catalog browsing, cart logic, user authentication, and order handling with server-rendered pages. The project demonstrates backend fundamentals and structured database-backed application design.',
    codeUrl: 'https://github.com/visheshpanchal27/LV_Shopping_Center',
    tech: ['Java', 'JSP', 'Servlets', 'MySQL'],
    category: 'backend',
    icon: 'fas fa-store',
    gradient: 'from-gray-800 to-gray-500',
    stats: { products: '100+', users: '50+' },
    features: ['User Authentication', 'Product Catalog', 'Shopping Cart', 'Order Management'],
    metrics: { functionality: 90, design: 85, performance: 80 },
    seoTitle: 'LV Shopping Center | Vishesh Panchal Project',
    seoDescription:
      'Project page for LV Shopping Center, a Java, JSP, Servlet, and MySQL e-commerce application by Vishesh Panchal.'
  },
  {
    id: 4,
    slug: 'banking-management-system',
    name: 'Banking Management System',
    shortTitle: 'Banking Management System',
    description:
      'Core Java project focused on secure banking operations, account management, and transaction handling.',
    longDescription:
      'A Java application for handling common banking workflows such as account creation, secure transactions, and account record management. It emphasizes object-oriented design, clear business rules, and dependable data handling.',
    codeUrl: 'https://github.com/visheshpanchal27/java',
    tech: ['Java', 'OOP', 'File Handling'],
    category: 'backend',
    icon: 'fas fa-university',
    gradient: 'from-slate-600 to-slate-800',
    stats: { accounts: '25+', transactions: '100+' },
    features: ['Account Management', 'Transaction Processing', 'Security Features', 'Data Handling'],
    metrics: { security: 95, reliability: 90, efficiency: 88 },
    seoTitle: 'Banking Management System | Vishesh Panchal Project',
    seoDescription:
      'Project page for Vishesh Panchal’s Banking Management System built with Core Java and object-oriented design.'
  }
];

export const seoConfig = {
  baseUrl: 'https://vishesh.shop',
  siteName: 'Vishesh Panchal Portfolio',
  name: 'Vishesh Panchal',
  jobTitle: 'Full Stack Developer',
  email: 'visheshpanchal864@gmail.com',
  language: 'en-US',
  location,
  social: {
    github: 'https://github.com/visheshpanchal27',
    linkedin: 'https://www.linkedin.com/in/vishesh-panchal-144281353',
    twitter: 'https://twitter.com/visheshpanchal'
  },
  image: 'https://res.cloudinary.com/dhyc478ch/image/upload/v1765255874/Untitled_design1_wwwx1q.svg',
  defaultTitle: 'Vishesh Panchal | Full Stack Developer Portfolio',
  defaultDescription:
    'Portfolio of Vishesh Panchal, a full stack developer building React, Node.js, MERN stack, and AI-powered web applications for modern businesses.',
  keywords: [
    'Vishesh Panchal',
    'full stack developer portfolio',
    'React developer',
    'MERN stack developer',
    'Node.js developer',
    'JavaScript portfolio',
    'AI web developer',
    'Ahmedabad developer'
  ],
  projects
};

export const getProjectBySlug = (slug) => seoConfig.projects.find((project) => project.slug === slug);

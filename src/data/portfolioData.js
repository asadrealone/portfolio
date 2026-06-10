// =============================================
// SITE DATA - All portfolio content centralized
// =============================================

export const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

export const HERO_TYPING_TEXTS = [
  'AI/ML Engineer',
  'Machine Learning Enthusiast',
  'Data Science Learner',
  'Future AI Researcher',
];

export const HERO_DATA = {
  name: 'ASAD ALI',
  title: 'Aspiring AI/ML Engineer',
  tagline: 'Building intelligent systems using Machine Learning, Deep Learning, and Data-Driven Solutions.',
  summary:
    'Motivated AI/ML enthusiast pursuing a Bachelor\'s degree in Computer Science with hands-on experience developing machine learning models for predictive analytics. Passionate about building impactful AI solutions and continuously expanding expertise in Artificial Intelligence.',
};

export const ABOUT_BIO_PARAGRAPHS = [
  'I am a Computer Science undergraduate at Islamia University of Bahawalpur with a strong passion for Artificial Intelligence and Machine Learning. I enjoy transforming data into actionable insights and building predictive models that solve real-world problems.',
  'I have hands-on experience with machine learning workflows including data preprocessing, exploratory data analysis, feature engineering, model training, evaluation, and deployment preparation.',
];

export const ABOUT_INTERESTS = [
  '🤖 Machine Learning',
  '🧠 Deep Learning',
  '💬 Natural Language Processing',
  '👁️ Computer Vision',
  '🔬 AI Research',
];

export const EDUCATION = [
  {
    institution: 'Islamia University of Bahawalpur',
    degree: 'Bachelor of Science in Computer Science',
    duration: '2024 – 2028',
    cgpa: '3.75 / 4.00',
    icon: '🎓',
  },
];

export const SKILLS = {
  'Programming Languages': [
    { name: 'Python', level: 90 },
    { name: 'SQL', level: 75 },
  ],
  'Machine Learning': [
    { name: 'Scikit-learn', level: 90 },
    { name: 'TensorFlow', level: 75 },
    { name: 'PyTorch', level: 70 },
  ],
  'Data Analytics': [
    { name: 'Pandas', level: 90 },
    { name: 'NumPy', level: 85 },
    { name: 'Matplotlib', level: 80 },
    { name: 'Seaborn', level: 80 },
  ],
};

export const SKILL_TOOLS = [
  'Git', 'Docker', 'Jupyter Notebook', 'React', 'HTML/CSS/Bootstrap',
];

export const CORE_CONCEPTS = [
  'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Automata Theory',
];

export const EXPERIENCE = [
  {
    company: 'Built & Soft',
    role: 'Beginner AI/ML Intern',
    duration: '4 Months',
    type: 'Internship',
    icon: '💼',
    responsibilities: [
      'Assisted in developing and evaluating machine learning models using Python and Scikit-learn.',
      'Performed data preprocessing, automated data cleaning, and exploratory data analysis on structured datasets.',
      'Collaborated with team members on machine learning workflows.',
      'Utilized Jupyter Notebooks and Git for experimentation and documentation.',
    ],
  },
];

export const PROJECTS = [
  {
    id: 1,
    title: 'Loan Approval Prediction System',
    description:
      'Developed a predictive machine learning model to automate credit risk assessments and determine loan approval status using applicant profiles, income levels, credit history, and financial metrics.',
    achievements: [
      'Implemented preprocessing pipelines including encoding, imputation, scaling, and correlation analysis.',
      'Achieved 85% predictive accuracy using Decision Tree Classifier.',
    ],
    tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'Jupyter Notebook'],
    category: 'ML / AI',
    gradient: 'from-blue-500 to-cyan-600',
    accuracy: '85%',
    emoji: '🏦',
    githubUrl: 'https://github.com/asadrealone',
    liveUrl: '#',
  },
  {
    id: 2,
    title: 'Customer Churn Prediction',
    description:
      'Built a binary classification model to predict customer attrition using telecom usage patterns and billing records for the telecommunications industry.',
    achievements: [
      'Applied feature engineering and selection techniques to improve model performance.',
      'Achieved 89% accuracy using Random Forest classifier.',
    ],
    tech: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'Jupyter Notebook'],
    category: 'ML / AI',
    gradient: 'from-purple-500 to-blue-600',
    accuracy: '89%',
    emoji: '📊',
    githubUrl: 'https://github.com/asadrealone',
    liveUrl: '#',
  },
];

export const CERTIFICATIONS = [
  {
    id: 1,
    title: 'Data Science Basics Certification',
    issuer: 'Built & Soft, Bahawalpur',
    icon: '📜',
    badge: 'Verified',
    color: '#2563EB',
  },
];

export const ACHIEVEMENTS = [
  { value: 2, suffix: '+', label: 'Machine Learning Projects', icon: '🚀' },
  { value: 4, suffix: '', label: 'Months Internship Experience', icon: '💼' },
  { value: 85, suffix: '%+', label: 'Model Accuracy Achieved', icon: '🎯' },
  { value: 3.75, suffix: '', label: 'CGPA (Out of 4.00)', icon: '🎓', isDecimal: true },
];

export const CONTACT_INFO = {
  phone: '+92 307 7546633',
  email: 'asadrealone@gmail.com',
  linkedin: 'linkedin.com/in/asadrealone',
  linkedinUrl: 'https://linkedin.com/in/asadrealone',
  github: 'github.com/asadrealone',
  githubUrl: 'https://github.com/asadrealone',
};

export const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/asadrealone', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/asadrealone', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:asadrealone@gmail.com', icon: 'email' },
  { label: 'Phone', href: 'tel:+923077546633', icon: 'phone' },
];

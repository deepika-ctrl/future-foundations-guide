
import { toast } from "@/components/ui/use-toast";

// Mock data - in a real application, these would come from a backend
const API_DELAY = 600; // simulate network delay

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Career {
  id: string;
  title: string;
  description: string;
  skills: string[];
  averageSalary: string;
  growth: string;
  image: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  provider: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  image: string;
  price: string;
  rating: number;
  enrolled: number;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  posted: string;
  description: string;
  requirements: string[];
  logo: string;
}

export interface Resource {
  id: string;
  title: string;
  type: "Article" | "Video" | "Ebook" | "Tool";
  description: string;
  image: string;
  link: string;
}

// Demo credentials
const DEMO_USER: User = {
  id: "demo-user-123",
  name: "Demo User",
  email: "demo@careerpath.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
};

const DEMO_PASSWORD = "password123";

// Mock auth functions
export const authApi = {
  login: async (email: string, password: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    
    if ((email === DEMO_USER.email && password === DEMO_PASSWORD) || 
        (email === "demo" && password === "demo")) {
      return DEMO_USER;
    }
    
    throw new Error("Invalid credentials");
  },
  
  register: async (name: string, email: string, password: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    
    // In a real app, we would send this data to the server
    // Here we'll just return a mock user based on the provided info
    return {
      id: `user-${Date.now()}`,
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };
  },

  getCurrentUser: (): User | null => {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  },

  setCurrentUser: (user: User | null): void => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }
};

// Career paths data
const careers: Career[] = [
  {
    id: "software-dev",
    title: "Software Development",
    description: "Design, develop, and maintain software systems and applications. Work with programming languages like JavaScript, Python, and Java to create solutions for various industries.",
    skills: ["JavaScript", "Python", "Java", "Problem-solving", "Teamwork"],
    averageSalary: "$110,140/year",
    growth: "22% (Much faster than average)",
    image: "/placeholder.svg"
  },
  {
    id: "data-science",
    title: "Data Science",
    description: "Analyze and interpret complex data to help organizations make better decisions. Combine statistics, mathematics, and programming to extract insights from data.",
    skills: ["Python", "R", "SQL", "Statistics", "Machine Learning"],
    averageSalary: "$100,910/year",
    growth: "36% (Much faster than average)",
    image: "/placeholder.svg"
  },
  {
    id: "ux-design",
    title: "UX Design",
    description: "Create meaningful and relevant experiences for users. Research, prototype, and design digital products that are intuitive and enjoyable to use.",
    skills: ["UI Design", "User Research", "Wireframing", "Prototyping", "Empathy"],
    averageSalary: "$85,240/year",
    growth: "8% (Faster than average)",
    image: "/placeholder.svg"
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Protect systems, networks, and programs from digital attacks. Design and implement security measures to safeguard sensitive information.",
    skills: ["Network Security", "Risk Assessment", "Cryptography", "Ethical Hacking", "Security Protocols"],
    averageSalary: "$103,590/year",
    growth: "33% (Much faster than average)",
    image: "/placeholder.svg"
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Promote products or services using digital channels. Develop marketing strategies for online platforms like social media, email, and search engines.",
    skills: ["SEO/SEM", "Social Media", "Content Creation", "Analytics", "Email Marketing"],
    averageSalary: "$74,620/year",
    growth: "10% (Faster than average)",
    image: "/placeholder.svg"
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing",
    description: "Design, implement, and manage cloud-based systems. Enable companies to store and access data and applications over the internet instead of local servers.",
    skills: ["AWS/Azure/GCP", "Networking", "Security", "Virtualization", "DevOps"],
    averageSalary: "$115,790/year",
    growth: "15% (Much faster than average)",
    image: "/placeholder.svg"
  },
];

// Courses data
const courses: Course[] = [
  {
    id: "web-dev-101",
    title: "Web Development Fundamentals",
    description: "Learn the core technologies of web development: HTML, CSS, and JavaScript. Build responsive websites from scratch.",
    provider: "TechAcademy",
    duration: "10 weeks",
    level: "Beginner",
    image: "/placeholder.svg",
    price: "$299",
    rating: 4.7,
    enrolled: 15420
  },
  {
    id: "data-science-basics",
    title: "Data Science Essentials",
    description: "Get started with data analysis, visualization, and basic machine learning concepts using Python.",
    provider: "DataCamp",
    duration: "8 weeks",
    level: "Beginner",
    image: "/placeholder.svg",
    price: "$349",
    rating: 4.8,
    enrolled: 12850
  },
  {
    id: "ux-design-bootcamp",
    title: "UX Design Bootcamp",
    description: "Complete UX design training covering research, wireframing, prototyping, and user testing.",
    provider: "DesignLab",
    duration: "12 weeks",
    level: "Intermediate",
    image: "/placeholder.svg",
    price: "$599",
    rating: 4.6,
    enrolled: 8340
  },
  {
    id: "cyber-security-cert",
    title: "Cybersecurity Professional Certificate",
    description: "Comprehensive training in network security, ethical hacking, and security compliance.",
    provider: "SecureNinja",
    duration: "16 weeks",
    level: "Advanced",
    image: "/placeholder.svg",
    price: "$799",
    rating: 4.9,
    enrolled: 6250
  },
  {
    id: "digital-marketing-mastery",
    title: "Digital Marketing Mastery",
    description: "Learn SEO, content marketing, social media strategies, and PPC advertising.",
    provider: "MarketingPro",
    duration: "6 weeks",
    level: "Intermediate",
    image: "/placeholder.svg",
    price: "$249",
    rating: 4.5,
    enrolled: 18760
  },
  {
    id: "cloud-architect",
    title: "Cloud Solutions Architect",
    description: "Master AWS, Azure, and GCP services. Learn to design and deploy scalable cloud infrastructures.",
    provider: "CloudGuru",
    duration: "14 weeks",
    level: "Advanced",
    image: "/placeholder.svg",
    price: "$649",
    rating: 4.8,
    enrolled: 9120
  },
];

// Jobs data
const jobs: Job[] = [
  {
    id: "job-1",
    title: "Frontend Developer",
    company: "TechStart Inc.",
    location: "San Francisco, CA",
    salary: "$95,000 - $120,000",
    type: "Full-time",
    posted: "2 days ago",
    description: "We're looking for a talented Frontend Developer to join our product team. You'll be responsible for implementing visual elements and UI components that users interact with.",
    requirements: [
      "3+ years of experience with JavaScript, HTML, and CSS",
      "Experience with React, Vue, or Angular",
      "Understanding of responsive design and cross-browser compatibility",
      "Good communication skills and ability to work in a team"
    ],
    logo: "/placeholder.svg"
  },
  {
    id: "job-2",
    title: "Data Scientist",
    company: "AnalyticsHub",
    location: "Remote",
    salary: "$110,000 - $140,000",
    type: "Remote",
    posted: "1 week ago",
    description: "Join our data science team to develop machine learning models and extract insights from complex datasets. You'll work closely with business stakeholders to solve real-world problems.",
    requirements: [
      "MS/PhD in Computer Science, Statistics, or related field",
      "Experience with Python, R, and SQL",
      "Knowledge of machine learning algorithms and statistical analysis",
      "Experience with data visualization tools"
    ],
    logo: "/placeholder.svg"
  },
  {
    id: "job-3",
    title: "UX/UI Designer",
    company: "CreativeWorks",
    location: "New York, NY",
    salary: "$85,000 - $105,000",
    type: "Full-time",
    posted: "3 days ago",
    description: "Create intuitive and engaging user experiences for our digital products. You'll conduct user research, create wireframes, prototypes, and collaborate with developers to implement designs.",
    requirements: [
      "Portfolio demonstrating UX/UI design skills",
      "Experience with design tools like Figma, Sketch, or Adobe XD",
      "Understanding of user-centered design principles",
      "Strong communication and presentation skills"
    ],
    logo: "/placeholder.svg"
  },
  {
    id: "job-4",
    title: "Cybersecurity Analyst",
    company: "SecureTech",
    location: "Boston, MA",
    salary: "$90,000 - $115,000",
    type: "Full-time",
    posted: "5 days ago",
    description: "Help protect our organization from cyber threats. You'll monitor systems for security breaches, implement security measures, and respond to incidents.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "Security certifications (e.g., CompTIA Security+, CISSP)",
      "Experience with security tools and vulnerability assessments",
      "Knowledge of network security and encryption protocols"
    ],
    logo: "/placeholder.svg"
  },
  {
    id: "job-5",
    title: "Digital Marketing Specialist",
    company: "GrowthMarketers",
    location: "Chicago, IL",
    salary: "$65,000 - $85,000",
    type: "Full-time",
    posted: "1 day ago",
    description: "Drive our digital marketing efforts across multiple channels. You'll develop and implement marketing strategies to increase brand awareness and lead generation.",
    requirements: [
      "2+ years of experience in digital marketing",
      "Proficiency in SEO, SEM, and social media marketing",
      "Experience with marketing analytics tools",
      "Strong written and verbal communication skills"
    ],
    logo: "/placeholder.svg"
  },
  {
    id: "job-6",
    title: "Cloud Solutions Engineer",
    company: "CloudWave",
    location: "Remote",
    salary: "$115,000 - $145,000",
    type: "Remote",
    posted: "4 days ago",
    description: "Design and implement cloud infrastructure solutions for our clients. You'll work with AWS, Azure, or GCP to create scalable, secure, and efficient cloud environments.",
    requirements: [
      "5+ years of experience in IT infrastructure",
      "Cloud certifications (e.g., AWS Solutions Architect, Azure Administrator)",
      "Experience with infrastructure as code (Terraform, CloudFormation)",
      "Knowledge of networking, security, and containerization"
    ],
    logo: "/placeholder.svg"
  },
];

// Resources data
const resources: Resource[] = [
  {
    id: "res-1",
    title: "The Complete Web Development Roadmap",
    type: "Article",
    description: "A comprehensive guide to becoming a web developer in 2023, with learning paths and resource recommendations.",
    image: "/placeholder.svg",
    link: "#article-webdev-roadmap"
  },
  {
    id: "res-2",
    title: "Machine Learning Crash Course",
    type: "Video",
    description: "Learn the fundamentals of machine learning with this beginner-friendly video series from Google.",
    image: "/placeholder.svg",
    link: "#video-ml-crashcourse"
  },
  {
    id: "res-3",
    title: "The UX Design Handbook",
    type: "Ebook",
    description: "A complete guide to UX design principles, methodologies, and best practices for creating user-centered products.",
    image: "/placeholder.svg",
    link: "#ebook-ux-handbook"
  },
  {
    id: "res-4",
    title: "Cybersecurity Best Practices",
    type: "Article",
    description: "Essential security practices for individuals and organizations to protect against common cyber threats.",
    image: "/placeholder.svg",
    link: "#article-cybersecurity-practices"
  },
  {
    id: "res-5",
    title: "Digital Marketing Toolkit",
    type: "Tool",
    description: "A collection of free and premium tools to help you plan, execute, and measure your digital marketing campaigns.",
    image: "/placeholder.svg",
    link: "#tool-marketing-toolkit"
  },
  {
    id: "res-6",
    title: "Cloud Architecture Patterns",
    type: "Ebook",
    description: "Learn common architecture patterns for building scalable and resilient cloud applications.",
    image: "/placeholder.svg",
    link: "#ebook-cloud-patterns"
  },
];

// Mock API functions
export const careerApi = {
  getCareers: async (): Promise<Career[]> => {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    return careers;
  },
  
  getCareerById: async (id: string): Promise<Career | undefined> => {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    return careers.find(career => career.id === id);
  }
};

export const courseApi = {
  getCourses: async (): Promise<Course[]> => {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    return courses;
  },
  
  getCourseById: async (id: string): Promise<Course | undefined> => {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    return courses.find(course => course.id === id);
  },
  
  enrollInCourse: async (courseId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    // In a real app, we would make an API call to enroll
    toast({
      title: "Enrolled Successfully!",
      description: "You have been enrolled in the course.",
    });
    return true;
  }
};

export const jobApi = {
  getJobs: async (): Promise<Job[]> => {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    return jobs;
  },
  
  getJobById: async (id: string): Promise<Job | undefined> => {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    return jobs.find(job => job.id === id);
  },
  
  applyForJob: async (jobId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    // In a real app, we would submit the application to an API
    toast({
      title: "Application Submitted!",
      description: "Your job application has been submitted successfully.",
    });
    return true;
  }
};

export const resourceApi = {
  getResources: async (): Promise<Resource[]> => {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    return resources;
  },
  
  getResourceById: async (id: string): Promise<Resource | undefined> => {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    return resources.find(resource => resource.id === id);
  }
};

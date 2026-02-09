export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  contact: {
    email: string;
    location: string;
    phone?: string;
  };
  socials: SocialLink[];
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: SkillItem[];
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  icon: string;
}

export interface Training {
  name: string;
  issuer: string;
  date: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
}

export interface PortfolioData {
  profile: Profile;
  skills: SkillCategory[];
  experience: Experience[];
  certifications: Certification[];
  trainings: Training[];
  stats: Stat[];
}

export const portfolioData: PortfolioData = {
  profile: {
    name: "Iqbal Attila",
    title: "Cybersecurity Enthusiast | Part-time Fullstack Developer",
    tagline: "Securing the Future, One Line of Code at a Time.",
    summary: "Experienced IT Solution Architect and Cybersecurity Professional with over 10 years of expertise in designing and implementing robust IT infrastructures, managing complex systems, and ensuring comprehensive cybersecurity posture. Proven track record in solution architecture, security auditing, and full-stack development.",
    contact: {
      email: "hello@iqbalattila.com",
      location: "Jakarta, Indonesia",
    },
    socials: [
      { platform: "LinkedIn", url: "https://linkedin.com/in/iqbalattila", icon: "Linkedin" },
      { platform: "GitHub", url: "https://github.com/iqbalattila", icon: "Github" },
      { platform: "Twitter", url: "https://twitter.com/iqbalattila", icon: "Twitter" },
    ],
  },
  skills: [
    {
      title: "Cybersecurity",
      icon: "ShieldCheck",
      skills: [
        { name: "Vulnerability Assessment", level: 90 },
        { name: "Incident Response", level: 85 },
        { name: "ISMS ISO 27001", level: 80 },
        { name: "Network Security", level: 85 },
      ],
    },
    {
      title: "Fullstack Development",
      icon: "Code2",
      skills: [
        { name: "React / Next.js", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Node.js", level: 75 },
        { name: "Tailwind CSS", level: 90 },
      ],
    },
    {
      title: "Architecture",
      icon: "Server",
      skills: [
        { name: "Solution Design", level: 95 },
        { name: "Cloud Infrastructure", level: 80 },
        { name: "Microservices", level: 75 },
        { name: "DevOps", level: 80 },
      ],
    },
  ],
  experience: [
    {
      role: "Solution Architect",
      company: "PT Global Infotech Solution",
      location: "Jakarta",
      period: "Jun 2021 - Aug 2025",
      highlights: [
        "Led the design and implementation of enterprise-level IT solutions.",
        "Architected secure and scalable infrastructure for various clients.",
        "Spearheaded cybersecurity initiatives and internal audits.",
      ],
    },
    {
      role: "IT Consultant",
      company: "Bhinneka Inti Global Data",
      location: "Jakarta",
      period: "Feb 2020 - Jul 2020",
      highlights: [
        "Provided strategic IT consulting for digital transformation projects.",
        "Optimized existing IT systems for better performance and security.",
      ],
    },
    {
      role: "Senior IT Officer",
      company: "Danakoo Mitra Artha",
      location: "Jakarta",
      period: "Jul 2019 - Jan 2020",
      highlights: [
        "Managed IT operations and infrastructure for a fintech company.",
        "Implemented security protocols to safeguard financial data.",
      ],
    },
    {
      role: "IT Specialist",
      company: "Teknologi Adhikarya Prima",
      location: "Jakarta",
      period: "Aug 2016 - Jul 2019",
      highlights: [
        "Technical lead for infrastructure deployment projects.",
        "Managed day-to-day IT support and system maintenance.",
      ],
    },
  ],
  certifications: [
    {
      name: "CompTIA Security+",
      issuer: "CompTIA",
      date: "2024",
      icon: "Award",
    },
    {
      name: "ISC2 Candidate",
      issuer: "ISC2",
      date: "2024",
      icon: "Shield",
    },
  ],
  trainings: [
    {
      name: "Internal Auditor ISO 19011:2018",
      issuer: "LMS",
      date: "2023",
    },
    {
      name: "ISMS Awareness ISO 27001",
      issuer: "LMS",
      date: "2023",
    },
  ],
  stats: [
    { label: "Years Experience", value: "10+", icon: "Calendar" },
    { label: "Certifications", value: "5+", icon: "FileCheck" },
    { label: "Projects", value: "50+", icon: "Briefcase" },
  ],
};

export interface SocialLinks {
  linkedin: string;
  github: string;
  researchgate?: string;
  scholar?: string;
}

export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  introduction: string;
  profileImage: string;
  cvUrl: string;
  email: string;
  phone?: string;
  bio: string;
  academicBackground: string;
  careerGoals: string;
  philosophy: string;
  socialLinks: SocialLinks;
}

export interface Stats {
  projectsCount: string;
  mappedArea: string;
  codingHours: string;
  dataPoints: string;
  accuracyScore: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Skills {
  urbanPlanning: Skill[];
  gisRemoteSensing: Skill[];
  programmingDesign: Skill[];
}

export interface ProjectLocation {
  name: string;
  lat: number;
  lng: number;
}

export interface ProjectStats {
  areaMapped?: string;
  timeRange?: string;
  datasets?: string;
  [key: string]: string | undefined;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tools: string[];
  outcomes: string[];
  githubLink: string;
  reportLink: string;
  panelLink?: string;
  customLink?: string;
  customLinkLabel?: string;
  location: ProjectLocation;
  stats: ProjectStats;
  imageUrl: string;
}

export interface Publication {
  id: string;
  title: string;
  type: 'Paper' | 'Conference' | 'Report';
  publisher: string;
  date: string;
  authors: string;
  abstract: string;
  link: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  type: 'Map' | 'Model & Visualization';
  mediaGroup?: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  gpa?: string;
  highlights?: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  description: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export interface AwardItem {
  name: string;
  issuer: string;
  date: string;
  description: string;
}

export interface VolunteerItem {
  role: string;
  organization: string;
  period: string;
  description: string;
}

export interface ResumeData {
  education: EducationItem[];
  experience: ExperienceItem[];
  certifications: CertificationItem[];
  awards: AwardItem[];
  volunteer: VolunteerItem[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  tags: string[];
  content: string;
}

export interface PortfolioData {
  profile: Profile;
  stats: Stats;
  skills: Skills;
  projects: Project[];
  publications: Publication[];
  gallery: GalleryItem[];
  resume: ResumeData;
  blog: BlogPost[];
}

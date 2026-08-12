export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
  isStreaming?: boolean;
  category?: string;
  suggestedFollowups?: string[];
}

export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  availability: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;

  skills: {
    category: string;
    items: string[];
  }[];

  projects: {
    id: string;
    title: string;
    description: string;
    tech: string[];
    link?: string;
    github?: string;
    highlights: string[];
  }[];

  experience: {
    company: string;
    role: string;
    period: string;
    highlights: string[];
  }[];
}

export interface PrebuiltPrompt {
  id: string;
  title: string;
  prompt: string;

  category:
    | "Overview"
    | "Skills"
    | "Projects"
    | "Why Hire"
    | "Interview"
    | "AI"
    | "Automation"
    | "Contact";

  iconName: string;
}
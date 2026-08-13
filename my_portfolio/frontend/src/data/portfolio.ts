import {
  ProfileData,
  PrebuiltPrompt,
} from "../types";

export const PREBUILT_PROMPTS: PrebuiltPrompt[] = [
  {
    id: "technical-stack",
    title: "Technical Stack",
    prompt: "What is Abdullah Sheikh's core technical stack in React, TypeScript, and AI?",
    category: "Skills",
    iconName: "Code2",
  },
  {
    id: "featured-projects",
    title: "Featured Projects",
    prompt: "Tell me about Abdullah's top projects and his GitHub repositories.",
    category: "Projects",
    iconName: "FolderKanban",
  },
  {
    id: "why-hire",
    title: "Why Hire Abdullah?",
    prompt: "Give me a summary of why Abdullah Sheikh is a great fit for full-stack engineering roles.",
    category: "Why Hire",
    iconName: "Briefcase",
  },
  {
    id: "contact-resume",
    title: "Contact & Resume",
    prompt: "How can I contact Abdullah or download his full resume?",
    category: "Contact",
    iconName: "Sparkles",
  },
];

export const ABDULLAH_PROFILE: ProfileData = {
  name: "Abdullah Sheikh",

  title: "AI & Full-Stack Software Engineer",

  bio: "AI-focused software engineer building agentic AI systems, automation workflows, RAG applications, and full-stack web applications.",

  availability:
    "Available for Full-time & High-Impact Roles",

  location:
    "Faisalabad, Pakistan / Remote",

  email:
    "abdullahsheikh6883@gmail.com",

  github:
    "https://github.com/abdullahnadeem215",

  linkedin:
    "https://www.linkedin.com/in/abdullah-sheikh-2882a1317",

  skills: [
    {
      category: "AI & LLM",
      items: [
        "Python",
        "LLMs",
        "RAG",
        "AI Agents",
        "Prompt Engineering",
        "Gemini API",
        "Groq API",
      ],
    },

    {
      category: "Automation",
      items: [
        "n8n",
        "AI Automation",
        "Workflow Automation",
        "LLM Workflows",
      ],
    },

    {
      category: "Backend",
      items: [
        "Python",
        "FastAPI",
        "REST APIs",
        "Pydantic",
      ],
    },

    {
      category: "Frontend",
      items: [
        "React",
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS",
        "Tailwind CSS",
      ],
    },

    {
      category: "Databases",
      items: [
        "MySQL",
        "PostgreSQL",
      ],
    },

    {
      category: "Tools",
      items: [
        "Git",
        "GitHub",
        "Vite",
      ],
    },
  ],

  projects: [
    {
      id: "hireme-ai",

      title: "HireMe AI",

      description:
        "AI-powered interactive portfolio assistant capable of answering recruiter questions using Abdullah's portfolio and resume knowledge.",

      tech: [
        "React",
        "TypeScript",
        "FastAPI",
        "Python",
        "Groq",
        "LLM",
        "SSE",
      ],

      github:
        "https://github.com/abdullahnadeem215/hiremeai",

      link:
        "https://hire-abdullah-three.vercel.app/",

      highlights: [
        "Real-time streaming AI responses.",
        "Resume-powered portfolio knowledge.",
        "Structured project responses rendered as interactive cards.",
      ],
    },

    {
      id: "recruitment-agent",

      title:
        "AI Recruitment Application Agent",

      description:
        "Automated recruitment workflow that processes candidate applications and evaluates candidates using AI.",

      tech: [
        "n8n",
        "LLM",
        "Automation",
        "Email",
        "Data Processing",
      ],

      highlights: [
        "Reduced repetitive manual candidate screening.",
        "Integrated LLM-based evaluation into a business workflow.",
      ],
    },

    {
      id: "docuvision",

      title:
        "DocuVision — Intelligent Document Processing System",

      description:
        "Automated document-processing workflow using OCR, LLMs, and n8n.",

      tech: [
        "n8n",
        "OCR",
        "LLM",
        "Document Automation",
      ],

      highlights: [
        "Converts unstructured documents into usable business information.",
        "Reduces manual document processing.",
      ],
    },

    {
      id: "kohinoor-agent",

      title:
        "AI Lead Qualification Agent — KohinoorAgent",

      description:
        "AI-powered lead qualification workflow designed for a label manufacturing business.",

      tech: [
        "n8n",
        "LLM",
        "Lead Qualification",
        "Automation",
      ],

      highlights: [
        "Automates manual lead screening.",
        "Helps improve sales-team efficiency.",
      ],
    },

    {
      id: "linkedin-automation",

      title:
        "AI-Powered LinkedIn Content Automation",

      description:
        "End-to-end automation system for generating and managing LinkedIn content.",

      tech: [
        "n8n",
        "LLM",
        "Image Generation",
        "Automation",
      ],

      highlights: [
        "Maintains a multi-day publishing plan.",
        "Automates post generation and image prompt creation.",
      ],
    },

    {
      id: "prof-mentor",

      title:
        "Prof Mentor — AI Roadmap & Mentoring Application",

      description:
        "AI-powered application designed to help users plan and navigate technical learning paths.",

      tech: [
        "AI",
        "LLM",
        "Web Application",
      ],

      link:
        "https://prof-mentor.vercel.app/",

      highlights: [
        "Combines AI functionality with a web-based application.",
      ],
    },

    {
      id: "cost-estimation-agent",

      title:
        "AI Cost Estimation Multi-Agent System",

      description:
        "Agentic AI workflow designed for estimating project costs using multiple specialized agents.",

      tech: [
        "AI Agents",
        "LLM",
        "Multi-Agent Architecture",
      ],

      highlights: [
        "Demonstrates multi-agent architecture.",
        "Uses specialized agents for complex estimation workflows.",
      ],
    },

    {
      id: "ims",

      title:
        "Interview Management System",

      description:
        "Interview management system using priority-based scheduling.",

      tech: [
        "C++",
        "Data Structures",
        "Algorithms",
      ],

      github:
        "https://github.com/abdullahnadeem215",

      highlights: [],
    },

    {
      id: "rdms",

      title:
        "Rural Development Management System",

      description:
        "Database-driven management system for organizing rural development activities.",

      tech: [
        "PHP",
        "MySQL",
        "DBMS",
      ],

      github:
        "https://github.com/abdullahnadeem215/RDMS",

      highlights: [],
    },

    {
      id: "kisan-ai",

      title: "Kisan AI",

      description:
        "AI-oriented agricultural solution designed through software requirements engineering.",

      tech: [
        "Software Requirements Engineering",
        "AI Concept",
      ],

      highlights: [],
    },
  ],

  experience: [
    {
      company:
        "AI & Software Engineering",

      role:
        "AI / Full-Stack Developer",

      period:
        "Current",

      highlights: [
        "Building AI-powered applications and automation workflows.",
        "Developing FastAPI backends and React frontends.",
        "Working with LLMs, RAG, AI agents, and n8n automation.",
      ],
    },
  ],
};
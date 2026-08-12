import { ProfileData, PrebuiltPrompt } from "../types";

export const ABDULLAH_PROFILE: ProfileData = {
  name: "Abdullah Sheikh",

  title: "AI Engineer & Full-Stack Software Engineer",

  bio:
    "Software Engineering student focused on AI engineering, LLM applications, AI agents, workflow automation, and full-stack application development. Builds practical AI-powered systems using Python, FastAPI, React, n8n, LLM APIs, RAG, and agentic workflows.",

  availability: "Available for internships, junior AI/software engineering roles, and freelance opportunities",

  location: "Faisalabad, Pakistan",

  email: "abdullahsheikh6883@gmail.com",

  github: "https://github.com/abdullahnadeem215",

  linkedin: "https://www.linkedin.com/in/abdullah-sheikh-2882a1317/",

  skills: [
    {
      category: "AI & LLM Engineering",
      items: [
        "LLM Applications",
        "Prompt Engineering",
        "Context Engineering",
        "RAG",
        "AI Agents",
        "Agentic AI",
        "Multi-Agent Systems",
        "LLM API Integration",
        "Google Gemini",
        "Groq",
        "Hugging Face"
      ]
    },

    {
      category: "Backend Development",
      items: [
        "Python",
        "FastAPI",
        "Pydantic",
        "REST APIs",
        "Webhooks",
        "API Integration"
      ]
    },

    {
      category: "Frontend Development",
      items: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Vite",
        "Tailwind CSS"
      ]
    },

    {
      category: "Automation & AI Workflows",
      items: [
        "n8n",
        "Workflow Automation",
        "Business Process Automation",
        "LLM Workflow Orchestration",
        "Email Automation",
        "OCR Automation"
      ]
    },

    {
      category: "Data & Machine Learning",
      items: [
        "Python",
        "NumPy",
        "Pandas",
        "Matplotlib",
        "Scikit-learn",
        "Data Preprocessing",
        "Regression"
      ]
    },

    {
      category: "Databases & Tools",
      items: [
        "MySQL",
        "PostgreSQL",
        "SQLite",
        "Git",
        "GitHub",
        "Postman",
        "VS Code"
      ]
    },

    {
      category: "Programming & Software Engineering",
      items: [
        "C++",
        "Python",
        "JavaScript",
        "Object-Oriented Programming",
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Software Engineering"
      ]
    }
  ],

  projects: [
    {
      id: "hireme-ai",

      title: "HireMe AI – AI Portfolio Assistant",

      description:
        "An AI-powered conversational portfolio assistant that allows recruiters to ask questions about Abdullah's technical background, projects, skills, education, and capabilities.",

      tech: [
        "React",
        "JavaScript",
        "Tailwind CSS",
        "FastAPI",
        "Python",
        "Groq",
        "LLM",
        "Server-Sent Events",
        "Pydantic"
      ],

      github: "https://github.com/abdullahnadeem215/hiremeai",

      highlights: [
        "Provides recruiter-focused conversational responses about Abdullah's portfolio.",
        "Uses a resume analyzer to convert resume information into structured knowledge.",
        "Streams LLM responses to the frontend using Server-Sent Events.",
        "Deployed frontend and backend separately for a production-style architecture."
      ]
    },

    {
      id: "ai-recruitment-agent",

      title: "AI Recruitment Application Agent",

      description:
        "An AI-powered recruitment automation system that processes candidate applications, evaluates candidates, assigns priority, and automates recruitment-related communication.",

      tech: [
        "n8n",
        "LLMs",
        "AI Automation",
        "Email Automation",
        "Data Processing"
      ],

      github: "https://github.com/abdullahnadeem215",

      highlights: [
        "Automates candidate application processing.",
        "Uses AI to assist with candidate evaluation.",
        "Assigns application priority based on defined criteria.",
        "Automates communication and data handling through workflow automation."
      ]
    },

    {
      id: "docuvision",

      title: "DocuVision – Intelligent Document Processing System",

      description:
        "An intelligent document-processing workflow that extracts useful information from unstructured documents and transforms it into structured data.",

      tech: [
        "n8n",
        "OCR",
        "LLMs",
        "Document Processing",
        "AI Automation"
      ],

      github: "https://github.com/abdullahnadeem215",

      highlights: [
        "Processes unstructured documents.",
        "Uses OCR to extract information from documents.",
        "Uses LLMs to transform extracted information into structured outputs.",
        "Automates the document-processing pipeline using n8n."
      ]
    },

    {
      id: "kohinoor-agent",

      title: "KohinoorAgent – AI Lead Qualification Agent",

      description:
        "An AI-powered lead qualification workflow designed for a label-manufacturing business to analyze and qualify incoming leads automatically.",

      tech: [
        "n8n",
        "LLMs",
        "AI Agents",
        "Lead Qualification",
        "Workflow Automation"
      ],

      github: "https://github.com/abdullahnadeem215",

      highlights: [
        "Analyzes incoming business leads.",
        "Uses AI to evaluate lead information.",
        "Automates lead qualification.",
        "Connects business data with AI-driven workflow automation."
      ]
    },

    {
      id: "linkedin-automation",

      title: "AI-Powered LinkedIn Content Automation",

      description:
        "An automated content-generation pipeline that plans, generates, and prepares LinkedIn content using LLMs, image generation, and scheduled workflows.",

      tech: [
        "n8n",
        "LLMs",
        "Image Generation",
        "API Integration",
        "Workflow Automation"
      ],

      github: "https://github.com/abdullahnadeem215",

      highlights: [
        "Uses a predefined content plan to generate LinkedIn posts.",
        "Generates post content and hashtags using an LLM.",
        "Generates image prompts and integrates image-generation models.",
        "Automates the content workflow through scheduled n8n processes."
      ]
    },

    {
      id: "prof-mentor",

      title: "Prof Mentor – AI Roadmap & Mentoring Application",

      description:
        "An AI-powered application designed to provide personalized technical learning roadmaps and mentorship guidance.",

      tech: [
        "AI",
        "LLMs",
        "React",
        "Web Application"
      ],

      github: "https://prof-mentor.vercel.app/",

      highlights: [
        "Generates personalized technical learning guidance.",
        "Uses AI to help users plan their learning journey.",
        "Designed as an interactive AI mentoring application."
      ]
    },

    {
      id: "cost-estimation-agent",

      title: "AI Cost Estimation Multi-Agent System",

      description:
        "A multi-agent AI system that breaks down software projects into components and estimates project costs using specialized AI agents.",

      tech: [
        "AI Agents",
        "LLMs",
        "Multi-Agent Architecture",
        "Workflow Automation"
      ],

      github: "https://github.com/abdullahnadeem215",

      highlights: [
        "Uses multiple specialized AI agents.",
        "Breaks software projects into smaller components.",
        "Uses agent collaboration to analyze project requirements.",
        "Produces project cost estimation based on the generated analysis."
      ]
    },

    {
      id: "ims",

      title: "Interview Management System",

      description:
        "A software engineering project for managing interviews using priority-based scheduling and data structures.",

      tech: [
        "C++",
        "Data Structures",
        "Algorithms",
        "Priority Scheduling"
      ],

      github: "https://github.com/abdullahnadeem215",

      highlights: [
        "Uses priority-based scheduling for interview management.",
        "Demonstrates practical application of data structures and algorithms.",
        "Built as part of software engineering studies."
      ]
    },

    {
      id: "rdms",

      title: "Rural Development Management System",

      description:
        "A database-driven application for organizing and managing rural development activities.",

      tech: [
        "PHP",
        "MySQL",
        "DBMS"
      ],

      github: "https://github.com/abdullahnadeem215/RDMS",

      highlights: [
        "Uses a relational database for application data.",
        "Demonstrates database management and CRUD operations.",
        "Built as a DBMS-focused software project."
      ]
    },

    {
      id: "kisan-ai",

      title: "Kisan AI",

      description:
        "An academic software engineering project focused on requirements and system specifications for an AI-driven agricultural solution.",

      tech: [
        "Software Requirements Engineering",
        "AI",
        "System Analysis"
      ],

      github: "https://github.com/abdullahnadeem215",

      highlights: [
        "Focused on software requirements and system specifications.",
        "Explored the application of AI to agricultural problems.",
        "Demonstrates software analysis and requirements engineering."
      ]
    }
  ],

  experience: [
    {
      company: "The University of Faisalabad",

      role: "BS Software Engineering Student",

      period: "Current",

      highlights: [
        "Pursuing a BS in Software Engineering.",
        "Developing foundations in software engineering, programming, databases, data structures, and algorithms.",
        "Building practical AI and software projects alongside academic studies."
      ]
    },

    {
      company: "Saylani Mass IT Training Program",

      role: "Agentic AI Training",

      period: "Current Training",

      highlights: [
        "Training in AI engineering and agentic AI development.",
        "Studying LLM application development, prompt and context engineering, AI agents, multi-agent systems, AI system design, and AI infrastructure.",
        "Applying the concepts through practical AI projects."
      ]
    }
  ]
};

export const PREBUILT_PROMPTS: PrebuiltPrompt[] = [
  {
    id: "overview",
    title: "Quick Background",
    prompt:
      "Give me a concise professional overview of Abdullah Sheikh, including his education, current focus, strongest technical areas, and the type of roles he is targeting.",
    category: "Overview",
    iconName: "UserCheck"
  },

  {
    id: "top-skills",
    title: "Core Tech Stack",
    prompt:
      "What are Abdullah Sheikh's strongest technical skills? Group them into AI/LLM engineering, backend, frontend, automation, databases, and software engineering.",
    category: "Skills",
    iconName: "Code2"
  },

  {
    id: "best-projects",
    title: "Key AI Projects",
    prompt:
      "What are Abdullah Sheikh's most relevant AI and software projects? Briefly explain the problem each project solves and the technologies used.",
    category: "Projects",
    iconName: "Sparkles"
  },

  {
    id: "why-hire",
    title: "Why Hire Abdullah?",
    prompt:
      "Why could Abdullah Sheikh be a good candidate for a junior AI Engineer, AI Automation Engineer, or Full-Stack AI Engineer role? Base the answer only on his actual portfolio, education, skills, and projects.",
    category: "Why Hire",
    iconName: "Award"
  },

  {
    id: "ai-experience",
    title: "AI Engineering",
    prompt:
      "What practical experience does Abdullah Sheikh have with LLMs, RAG, AI agents, multi-agent systems, and AI automation?",
    category: "AI",
    iconName: "Cpu"
  },

  {
    id: "automation",
    title: "Automation Experience",
    prompt:
      "How has Abdullah Sheikh used n8n and AI automation in his projects? Give concrete examples from his portfolio.",
    category: "Automation",
    iconName: "Workflow"
  },

  {
    id: "projects",
    title: "Project Experience",
    prompt:
      "List Abdullah Sheikh's most important projects and briefly explain what each one does.",
    category: "Projects",
    iconName: "FolderKanban"
  },

  {
    id: "contact-info",
    title: "Contact & Profiles",
    prompt:
      "How can I contact Abdullah Sheikh or view his GitHub, LinkedIn, and portfolio projects?",
    category: "Contact",
    iconName: "FileText"
  }
];
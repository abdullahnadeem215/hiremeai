import { ProfileData, PrebuiltPrompt } from '../types';

export const ABDULLAH_PROFILE: ProfileData = {
  name: "Abdullah Sheikh",
  title: "Full-Stack AI & Software Engineer",
  bio: "Passionate engineer crafting intelligent agentic AI systems, streaming web applications, and high-performance full-stack web solutions. Specialized in React, TypeScript, Node.js, Python, and GenAI integrations.",
  availability: "Available for Full-time & High-Impact Roles",
  location: "Remote / Open to Relocation",
  email: "abdullahsheikh6883@gmail.com",
  github: "https://github.com/abdullahnadeem215",
  linkedin: "https://github.com/abdullahnadeem215",
  skills: [
    {
      category: "AI & LLM Architecture",
      items: ["Gemini API", "OpenAI API", "RAG Pipelines", "Agentic Workflows", "LangChain / LlamaIndex", "Vector DBs (Pinecone, Chroma)", "Prompt Engineering"]
    },
    {
      category: "Frontend Development",
      items: ["React 19", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "React Query / TanStack", "Redux Toolkit", "WebSockets / SSE"]
    },
    {
      category: "Backend & Systems",
      items: ["Node.js", "Express.js", "Python", "FastAPI", "RESTful APIs", "GraphQL", "PostgreSQL", "MongoDB", "Redis"]
    },
    {
      category: "Cloud & DevOps",
      items: ["Docker", "Google Cloud Run / GCP", "AWS (S3, Lambda, EC2)", "CI/CD Pipelines", "Vite", "Git / GitHub Actions"]
    }
  ],
  projects: [
    {
      id: "hireme-ai",
      title: "HireMe AI - AI Portfolio Assistant",
      description: "Interactive conversational portfolio with real-time streaming AI answers, recruiter prompt presets, and keyboard-accessible UI.",
      tech: ["React 19", "TypeScript", "Gemini 3.6 Flash", "Express", "Tailwind CSS", "Framer Motion", "React Query"],
      github: "https://github.com/abdullahnadeem215/hiremeai",
      highlights: [
        "Streams responses in real-time with zero UI flickering.",
        "Built custom system prompt knowledge base to answer technical & behavioral recruiter questions.",
        "100% accessible with ARIA live regions and full keyboard navigation."
      ]
    },
    {
      id: "agentic-flow",
      title: "Agentic AI Workflow Builder",
      description: "Visual node-based canvas for orchestrating autonomous AI agent graphs with tool execution and multi-model streaming.",
      tech: ["Next.js", "TypeScript", "Python FastAPI", "LangChain", "Tailwind CSS", "React Flow"],
      github: "https://github.com/abdullahnadeem215",
      highlights: [
        "Enabled multi-agent collaboration loops for complex reasoning tasks.",
        "Integrated streaming SSE channels for live node execution status.",
        "Reduced workflow execution latency by 35% using asynchronous task queues."
      ]
    },
    {
      id: "rag-doc-engine",
      title: "Enterprise RAG Document Intelligence",
      description: "High-throughput document search and questioning platform utilizing hybrid dense-sparse vector search and chunk re-ranking.",
      tech: ["Python", "FastAPI", "Pinecone", "Gemini 3.6 Flash", "React", "Docker"],
      github: "https://github.com/abdullahnadeem215",
      highlights: [
        "Processes PDF/Word documents into contextual vector embeddings in seconds.",
        "Implemented citation grounding so every AI response links directly to source document pages.",
        "Architected scalable backend deployed on Cloud Run."
      ]
    },
    {
      id: "pulse-analytics",
      title: "Pulse Real-time Analytics Dashboard",
      description: "High-density data visualization suite monitoring microservice health, user telemetry, and live streaming metrics.",
      tech: ["React", "TypeScript", "Recharts", "Node.js", "WebSockets", "Redis", "Tailwind CSS"],
      github: "https://github.com/abdullahnadeem215",
      highlights: [
        "Sub-100ms real-time metric updates using WebSockets and Redis pub-sub.",
        "Custom responsive dashboard cards with fluid chart resizing.",
        "Built dark mode theme with high contrast visual accessibility."
      ]
    }
  ],
  experience: [
    {
      company: "AI & Full-Stack Solutions",
      role: "Senior Full-Stack AI Engineer",
      period: "2023 - Present",
      highlights: [
        "Architected production GenAI features and agentic interfaces used by thousands of users.",
        "Engineered server-side streaming API endpoints reducing perceived response time by 60%.",
        "Mentored junior developers and instituted strict TypeScript & component architecture standards."
      ]
    },
    {
      company: "DevSolutions Studio",
      role: "Software Developer",
      period: "2021 - 2023",
      highlights: [
        "Developed scalable web portals with React, Node.js, and PostgreSQL.",
        "Implemented OAuth authorization and JWT security middleware.",
        "Optimized frontend bundle size by 40% using code splitting and lazy component loading."
      ]
    }
  ]
};

export const PREBUILT_PROMPTS: PrebuiltPrompt[] = [
  {
    id: "overview",
    title: "Quick Background",
    prompt: "Give me a 30-second executive summary of Abdullah's experience and what makes him stand out as an engineer.",
    category: "Overview",
    iconName: "UserCheck"
  },
  {
    id: "top-skills",
    title: "Core Tech Stack",
    prompt: "What are Abdullah's primary technical skills in AI development, frontend React/TypeScript, and backend systems?",
    category: "Skills",
    iconName: "Code2"
  },
  {
    id: "best-projects",
    title: "Key Projects & AI Work",
    prompt: "Tell me about Abdullah's most impressive projects, especially in AI agents, streaming APIs, and full-stack web applications.",
    category: "Projects",
    iconName: "Sparkles"
  },
  {
    id: "why-hire",
    title: "Why Hire Abdullah?",
    prompt: "Why should a hiring manager or recruiter hire Abdullah Sheikh for a Full-Stack AI Engineer role?",
    category: "Why Hire",
    iconName: "Award"
  },
  {
    id: "system-design",
    title: "System Design Knowledge",
    prompt: "How does Abdullah approach system design, state management, and real-time streaming interfaces in React & Express?",
    category: "Interview",
    iconName: "Cpu"
  },
  {
    id: "contact-info",
    title: "Contact & Resume",
    prompt: "How can I contact Abdullah Sheikh directly or get a copy of his resume?",
    category: "Overview",
    iconName: "FileText"
  }
];

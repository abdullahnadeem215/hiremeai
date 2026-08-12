import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { ABDULLAH_PROFILE, PREBUILT_PROMPTS } from "./src/data/portfolio.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "HireMe AI Backend Engine",
    repository: "https://github.com/abdullahnadeem215/hiremeai",
    version: "1.0.0",
    engine: "Standalone HireMe AI Portfolio Response Engine"
  });
});

// Profile API Endpoint
app.get("/api/profile", (_req, res) => {
  res.json({
    profile: ABDULLAH_PROFILE,
    prompts: PREBUILT_PROMPTS,
    repository: "https://github.com/abdullahnadeem215/hiremeai"
  });
});

// Projects API Endpoint
app.get("/api/projects", (_req, res) => {
  res.json({
    projects: ABDULLAH_PROFILE.projects,
    github: ABDULLAH_PROFILE.github,
    mainRepository: "https://github.com/abdullahnadeem215/hiremeai"
  });
});

// Resume Endpoint
app.get("/api/download-resume", (_req, res) => {
  const resumeText = `====================================================
ABDULLAH SHEIKH - FULL-STACK AI & SOFTWARE ENGINEER
====================================================
Email: ${ABDULLAH_PROFILE.email}
GitHub: ${ABDULLAH_PROFILE.github}
Repository: https://github.com/abdullahnadeem215/hiremeai
Location: ${ABDULLAH_PROFILE.location}
Status: ${ABDULLAH_PROFILE.availability}

SUMMARY
----------------------------------------------------
${ABDULLAH_PROFILE.bio}

SKILLS & EXPERTISE
----------------------------------------------------
${ABDULLAH_PROFILE.skills
  .map((s) => `${s.category}:\n  ${s.items.join(", ")}`)
  .join("\n\n")}

FEATURED PROJECTS
----------------------------------------------------
${ABDULLAH_PROFILE.projects
  .map(
    (p) =>
      `• ${p.title}\n  Description: ${p.description}\n  Repository: ${p.github}\n  Tech: ${p.tech.join(
        ", "
      )}\n  Highlights:\n${p.highlights.map((h) => `    - ${h}`).join("\n")}`
  )
  .join("\n\n")}

WORK EXPERIENCE
----------------------------------------------------
${ABDULLAH_PROFILE.experience
  .map(
    (e) =>
      `• ${e.role} @ ${e.company} (${e.period})\n${e.highlights
        .map((h) => `    - ${h}`)
        .join("\n")}`
  )
  .join("\n\n")}
`;

  res.setHeader("Content-Type", "text/plain");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="Abdullah_Sheikh_Resume.txt"'
  );
  res.send(resumeText);
});

/**
 * Intelligent response generator for HireMe AI
 */
function generateHireMeAIResponse(userPrompt: string): string {
  const query = userPrompt.toLowerCase();

  // 1. Executive Summary / Background / Who is Abdullah
  if (
    query.includes("summary") ||
    query.includes("background") ||
    query.includes("who is") ||
    query.includes("30-second") ||
    query.includes("executive") ||
    query.includes("about abdullah")
  ) {
    return (
      `### Executive Summary: Abdullah Sheikh\n\n` +
      `**Abdullah Sheikh** is a **Senior Full-Stack AI & Software Engineer** specializing in high-throughput AI agent architectures, streaming web applications, and modern full-stack systems.\n\n` +
      `#### 🚀 Key Standouts:\n` +
      `- **Full-Stack Mastery**: Expert in React 19, TypeScript, Next.js, Node.js, Express, Python (FastAPI), and Tailwind CSS.\n` +
      `- **AI System Engineering**: Hands-on experience building custom RAG pipelines, agentic workflow orchestrators, vector index integration (Pinecone/Chroma), and SSE streaming.\n` +
      `- **Production Focus**: Track record of delivering scalable web services with clean type safety, unit testing, sub-100ms API response targets, and cloud deployment on GCP Cloud Run & AWS.\n` +
      `- **Featured Repo**: Check out the official repository at [github.com/abdullahnadeem215/hiremeai](https://github.com/abdullahnadeem215/hiremeai).\n\n` +
      `*Would you like to examine his specific technical stack or dive into one of his featured projects?*`
    );
  }

  // 2. Technical Stack & Skills
  if (
    query.includes("skill") ||
    query.includes("stack") ||
    query.includes("tech") ||
    query.includes("react") ||
    query.includes("typescript") ||
    query.includes("python") ||
    query.includes("node") ||
    query.includes("backend") ||
    query.includes("frontend")
  ) {
    return (
      `### Abdullah Sheikh's Core Technical Stack\n\n` +
      `Abdullah builds production-ready applications with an emphasis on performance, type safety, and clean architecture:\n\n` +
      `#### 🎨 Frontend Engineering\n` +
      `- **Languages & Frameworks**: React 19, TypeScript, Next.js, HTML5/CSS3\n` +
      `- **Styling & Motion**: Tailwind CSS, Framer Motion, CSS Modules\n` +
      `- **State & Data**: TanStack / React Query, Redux Toolkit, Context API, WebSockets, SSE\n\n` +
      `#### ⚙️ Backend & Systems\n` +
      `- **Runtimes & Frameworks**: Node.js, Express.js, Python, FastAPI\n` +
      `- **Databases**: PostgreSQL, MongoDB, Redis, Pinecone Vector DB\n` +
      `- **APIs & Protocols**: RESTful APIs, Server-Sent Events (SSE), WebSockets, GraphQL\n\n` +
      `#### 🤖 AI & Agentic Systems\n` +
      `- **Architectures**: Autonomous Agentic Workflows, RAG Pipelines, Vector Search, LangChain / LlamaIndex\n` +
      `- **Tooling**: Prompt Engineering, Chunk Re-ranking, Context Grounding\n\n` +
      `#### ☁️ Cloud & DevOps\n` +
      `- **Tools**: Docker, GCP Cloud Run, AWS (S3, EC2), Vite, CI/CD, GitHub Actions\n\n` +
      `*You can browse Abdullah's code repositories on GitHub at [github.com/abdullahnadeem215](https://github.com/abdullahnadeem215).*`
    );
  }

  // 3. Projects & Work Showcase
  if (
    query.includes("project") ||
    query.includes("portfolio") ||
    query.includes("work") ||
    query.includes("hireme") ||
    query.includes("repo") ||
    query.includes("github")
  ) {
    return (
      `### Featured Projects by Abdullah Sheikh\n\n` +
      `Here are four key projects highlighting Abdullah's engineering depth:\n\n` +
      `1. **HireMe AI - Portfolio Representative** ([View Repo](https://github.com/abdullahnadeem215/hiremeai))\n` +
      `   - Interactive full-stack AI portfolio chatbot delivering real-time streaming candidate evaluation.\n` +
      `   - *Tech:* React 19, TypeScript, Express, Tailwind CSS, Framer Motion, SSE Streaming.\n\n` +
      `2. **Agentic AI Workflow Builder** ([View GitHub](https://github.com/abdullahnadeem215))\n` +
      `   - Visual node-based canvas for orchestrating autonomous multi-agent task chains and multi-model routing.\n` +
      `   - *Tech:* Next.js, TypeScript, Python FastAPI, LangChain, React Flow.\n\n` +
      `3. **Enterprise RAG Document Intelligence** ([View GitHub](https://github.com/abdullahnadeem215))\n` +
      `   - High-throughput document search and Q&A engine with hybrid dense-sparse vector search and citation grounding.\n` +
      `   - *Tech:* Python, FastAPI, Pinecone, React, Docker, Cloud Run.\n\n` +
      `4. **Pulse Real-Time Analytics Dashboard** ([View GitHub](https://github.com/abdullahnadeem215))\n` +
      `   - High-density telemetry dashboard monitoring microservices with sub-100ms WebSocket updates.\n` +
      `   - *Tech:* React, TypeScript, Recharts, Node.js, WebSockets, Redis.\n\n` +
      `*Click the "Projects" button in the header to view full highlights for each project!*`
    );
  }

  // 4. Why Hire Abdullah / Value Proposition
  if (
    query.includes("why hire") ||
    query.includes("hire") ||
    query.includes("strength") ||
    query.includes("stand out") ||
    query.includes("advantage") ||
    query.includes("fit") ||
    query.includes("salary") ||
    query.includes("role")
  ) {
    return (
      `### Why Hire Abdullah Sheikh?\n\n` +
      `Here is why Abdullah is an outstanding candidate for your engineering team:\n\n` +
      `1. **Immediate Productivity**: Proficient across the entire stack (React 19, TypeScript, Express, FastAPI), requiring minimal onboarding time.\n` +
      `2. **GenAI & Agent Integration**: Experienced in building actual production-grade AI interfaces, streaming pipelines, and RAG systems—not just basic API wrappers.\n` +
      `3. **Strict Code & Design Standards**: Dedicated to clean code, type safety, modular component separation, and high-contrast, accessible UI design.\n` +
      `4. **Strong Problem Solver**: Demonstrates a continuous learning mindset and proactive ownership from concept to deployment.\n\n` +
      `🟢 **Status**: ${ABDULLAH_PROFILE.availability}\n` +
      `📧 **Direct Email**: [${ABDULLAH_PROFILE.email}](mailto:${ABDULLAH_PROFILE.email})\n` +
      `🐙 **GitHub**: [github.com/abdullahnadeem215/hiremeai](https://github.com/abdullahnadeem215/hiremeai)`
    );
  }

  // 5. System Design & Engineering Architecture
  if (
    query.includes("system design") ||
    query.includes("architecture") ||
    query.includes("state") ||
    query.includes("sse") ||
    query.includes("stream") ||
    query.includes("code quality") ||
    query.includes("design pattern")
  ) {
    return (
      `### System Architecture & Engineering Philosophy\n\n` +
      `Abdullah adheres to proven full-stack design principles when building web applications:\n\n` +
      `#### ⚡ Real-Time Streaming Architecture\n` +
      `- Uses **Server-Sent Events (SSE)** over traditional HTTP polling for instant, low-overhead token/chunk streaming.\n` +
      `- Implements client-side reader streams (\`ReadableStreamDefaultReader\`) with proper error boundaries and abort controllers (\`AbortController\`).\n\n` +
      `#### 📐 Frontend Modularity\n` +
      `- Strictly separates UI rendering from state management and data fetching.\n` +
      `- Enforces strict TypeScript interfaces for component props and payload types.\n` +
      `- Utilizes Tailwind CSS and Framer Motion for hardware-accelerated animations.\n\n` +
      `#### 🛡️ Backend Scalability\n` +
      `- Uses Express & FastAPI with middleware validation, health checks, and environment variable security.\n` +
      `- Binds to container ports (\`0.0.0.0:3000\`) ready for Cloud Run / Docker deployment.\n\n` +
      `*Check out the source code at [github.com/abdullahnadeem215/hiremeai](https://github.com/abdullahnadeem215/hiremeai).*`
    );
  }

  // 6. Contact & Resume Query
  if (
    query.includes("contact") ||
    query.includes("email") ||
    query.includes("resume") ||
    query.includes("reach") ||
    query.includes("linkedin") ||
    query.includes("github link")
  ) {
    return (
      `### Get in Touch with Abdullah Sheikh\n\n` +
      `Abdullah is open to full-time engineering roles, high-impact contracts, and AI development opportunities:\n\n` +
      `- 🟢 **Current Status**: ${ABDULLAH_PROFILE.availability}\n` +
      `- 📧 **Email**: [${ABDULLAH_PROFILE.email}](mailto:${ABDULLAH_PROFILE.email})\n` +
      `- 🐙 **GitHub Repository**: [github.com/abdullahnadeem215/hiremeai](https://github.com/abdullahnadeem215/hiremeai)\n` +
      `- 📍 **Location**: ${ABDULLAH_PROFILE.location}\n` +
      `- 📄 **Resume Download**: You can click the **Resume** button in the top navigation header or sidebar to download a plain-text version of his resume immediately!\n\n` +
      `Feel free to reach out via email for interview requests or technical inquiries.`
    );
  }

  // 7. General Fallback Response
  return (
    `Abdullah Sheikh is a **Full-Stack AI & Software Engineer** with extensive experience building modern web products, agentic AI workflows, and high-performance React/TypeScript applications.\n\n` +
    `### Key Highlights:\n` +
    `- **Frontend**: React 19, TypeScript, Next.js, Tailwind CSS, Framer Motion\n` +
    `- **Backend**: Node.js, Express, Python, FastAPI, PostgreSQL, MongoDB\n` +
    `- **AI Capabilities**: RAG Pipelines, Vector Search, AI Agent Workflows, Streaming APIs\n` +
    `- **GitHub**: [github.com/abdullahnadeem215/hiremeai](https://github.com/abdullahnadeem215/hiremeai)\n\n` +
    `Feel free to ask specific questions about his skills, projects, background, or system architecture!`
  );
}

// Streaming Chat API Endpoint
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "Message string is required" });
    return;
  }

  // Set SSE Headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const responseText = generateHireMeAIResponse(message);

    // Break response into chunks to simulate real-time typing stream
    const chunks = responseText.match(/.{1,16}/g) || [responseText];

    for (const chunk of chunks) {
      res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("HireMe AI Streaming Error:", error);
    res.write(`data: ${JSON.stringify({ text: "An error occurred while generating the response." })}\n\n`);
    res.write("data: [DONE]\n\n");
    res.end();
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`HireMe AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();


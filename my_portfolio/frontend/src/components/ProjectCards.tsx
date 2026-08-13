import React from "react";
import {
  ExternalLink,
  Github,
  Sparkles,
  MessageCircle,
} from "lucide-react";

import { Project } from "../types";

interface ProjectCardsProps {
  projects: Project[];

  onAskProject: (
    project: Project
  ) => void;
}

export const ProjectCards: React.FC<
  ProjectCardsProps
> = ({
  projects,
  onAskProject,
}) => {
  if (
    !Array.isArray(projects) ||
    projects.length === 0
  ) {
    return (
      <p className="text-sm text-slate-400">
        No projects found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 mt-2">
      {projects.map(
        (project, projectIndex) => {
          const projectKey =
            project.id ||
            `${project.title}-${projectIndex}`;

          return (
            <div
              key={projectKey}
              className="
                group
                rounded-2xl
                border
                border-slate-800
                bg-slate-900/70
                p-4
                transition-all
                duration-200
                hover:border-blue-500/40
                hover:bg-slate-900
                hover:shadow-lg
                hover:shadow-blue-500/5
              "
            >
              {/* HEADER */}

              <div className="flex items-start gap-3">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-500/10
                    border
                    border-blue-500/20
                    text-blue-400
                  "
                >
                  <Sparkles className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-slate-100">
                    {project.title}
                  </h3>

                  {project.description && (
                    <p
                      className="
                        mt-1
                        text-xs
                        leading-relaxed
                        text-slate-400
                      "
                    >
                      {project.description}
                    </p>
                  )}
                </div>
              </div>

              {/* TECHNOLOGIES */}

              {Array.isArray(
                project.technologies
              ) &&
                project.technologies.length >
                  0 && (
                  <div
                    className="
                      mt-3
                      flex
                      flex-wrap
                      gap-1.5
                    "
                  >
                    {project.technologies.map(
                      (
                        technology,
                        techIndex
                      ) => (
                        <span
                          key={`${technology}-${techIndex}`}
                          className="
                            rounded-md
                            border
                            border-slate-700
                            bg-slate-800/80
                            px-2
                            py-1
                            text-[10px]
                            font-mono
                            text-slate-400
                          "
                        >
                          {technology}
                        </span>
                      )
                    )}
                  </div>
                )}

              {/* HIGHLIGHTS */}

              {Array.isArray(
                project.highlights
              ) &&
                project.highlights.length >
                  0 && (
                  <div className="mt-4 space-y-1.5">
                    {project.highlights.map(
                      (
                        highlight,
                        index
                      ) => (
                        <div
                          key={`${project.title}-highlight-${index}`}
                          className="
                            flex
                            gap-2
                            text-xs
                            leading-relaxed
                            text-slate-400
                          "
                        >
                          <span className="mt-1 text-blue-400">
                            •
                          </span>

                          <span>
                            {highlight}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                )}

              {/* BUTTONS */}

              <div className="mt-4 flex flex-wrap gap-2">
                {/* ASK AI */}

                <button
                  type="button"
                  onClick={() => {
                    console.log(
                      "ASK BUTTON CLICKED:",
                      project.title
                    );

                    onAskProject(project);
                  }}
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-lg
                    border
                    border-blue-500/30
                    bg-blue-500/10
                    px-2.5
                    py-1.5
                    text-[11px]
                    font-medium
                    text-blue-400
                    transition-all
                    hover:bg-blue-500/20
                    hover:border-blue-500/50
                    hover:text-blue-300
                  "
                >
                  <MessageCircle className="h-3.5 w-3.5" />

                  Ask about this project
                </button>

                {/* GITHUB */}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-lg
                      border
                      border-slate-700
                      bg-slate-800/70
                      px-2.5
                      py-1.5
                      text-[11px]
                      text-slate-300
                      transition-colors
                      hover:border-slate-600
                      hover:text-white
                    "
                  >
                    <Github className="h-3.5 w-3.5" />

                    GitHub
                  </a>
                )}

                {/* PROJECT LINK */}

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-lg
                      border
                      border-blue-500/20
                      bg-blue-500/10
                      px-2.5
                      py-1.5
                      text-[11px]
                      text-blue-400
                      transition-colors
                      hover:bg-blue-500/20
                    "
                  >
                    <ExternalLink className="h-3.5 w-3.5" />

                    View Project
                  </a>
                )}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};
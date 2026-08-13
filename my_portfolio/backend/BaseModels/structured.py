from pydantic import BaseModel, Field


class Projects(BaseModel):
    id: str | None = None
    title: str | None = None
    description: str| None = None
    tech: str | None = None
    link: str | None = None
    github: str | None = None
    highlights: str | None = None
    
class Resume(BaseModel):
    name: str | None = None
    projects: list[Projects] = Field(default_factory=list)
    skills: list[dict] = Field(default_factory=list)
    education: list[dict] = Field(default_factory=list)
    certifications: list[dict] = Field(default_factory=list)
    socialmedia: list[dict] = Field(default_factory=list)
    experience: list[dict] = Field(default_factory=list)

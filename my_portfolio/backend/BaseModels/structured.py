from pydantic import BaseModel, Field


class Projects(BaseModel):
    Title:str | None = None
    Problem : str | None = None
    github_link:str |None = None
    tools : list[dict] = Field(default_factory=list)
    liveURL : str |None = None
    
class Resume(BaseModel):
    name: str | None = None
    projects: list[Projects] = Field(default_factory=list)
    skills: list[dict] = Field(default_factory=list)
    education: list[dict] = Field(default_factory=list)
    certifications: list[dict] = Field(default_factory=list)
    socialmedia: list[dict] = Field(default_factory=list)
    experience: list[dict] = Field(default_factory=list)

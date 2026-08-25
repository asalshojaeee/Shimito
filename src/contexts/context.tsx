import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

export type ProjectFile = {
  url: string
  caption: string
}

export type Project = {
  id: string
  title: string
  files: ProjectFile[]
}

type ProjectContextType = {
  projects: Project[]
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>
  addProject: (project: Project) => void
  videoUrl: string | null
  setVideoUrl: (val: string) => void
}

const ProjectContext = createContext<ProjectContextType | null>(null)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  const addProject = (project: Project) => {
    setProjects((prev) => [project, ...prev])
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        setProjects,
        addProject,
        videoUrl,
        setVideoUrl,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectContext)

  if (!context) {
    throw new Error('useProjects must be used within ProjectProvider')
  }

  return context
}

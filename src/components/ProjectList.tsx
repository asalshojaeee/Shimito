import { useProjects } from "../contexts/context"

export default function ProjectList() {
  const {projects} = useProjects()
  return (
    <div className='mt-4 space-y-2 md:space-y-4'>
      {projects.map((project) => (
        <div
          key={project.id}
          className='bg-gray-300 flex items-center  py-1 md:py-2 rounded-3xl '
        >
          <h3 className='font-bold m-2 text-black'>{project.title}</h3>
          <div className='flex gap-2 overflow-x- overflow-y-hidden'>
            {project.files.map((file, idx) => (
              <div
                key={idx}
                className='flex flex-col items-center min-w-[120px]'
              >
                <img
                  src={file.url}
                  alt={`project-${idx}`}
                  className='w-14 h-14 object-cover rounded'
                />
                <p className='text-xs mt-1 text-gray-700'>
                  {file.caption.length > 30
                    ? file.caption.slice(0, 30) + '...'
                    : file.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

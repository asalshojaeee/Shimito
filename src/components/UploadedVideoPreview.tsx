import { useProjects } from '../contexts/context'

export default function UploadedVideoPreview() {
  const { videoUrl } = useProjects()

  if (!videoUrl) return

  return (
    <div className='w-full flex h-44 md:h-58 justify-center mt-2'>
      <video
        className='w-full max-w-lg h-auto rounded-lg'
        controls
        src={videoUrl}
      />
    </div>
  )
}

import { useState } from 'react'
import { supabase } from '../data/supabaseClient'
import { Video } from 'lucide-react'
import { useProjects } from '../contexts/context'

interface Props {
  ownerId: string
  ownerType: 'person' | 'company'
}

export default function UploadVideo({ ownerId, ownerType }: Props) {
  const { videoUrl, setVideoUrl } = useProjects()
  const [uploading, setUploading] = useState(false)

  console.log(ownerId, ownerType)

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      alert('حجم ویدیو باید کمتر از 10 مگابایت باشد')
      return
    }

    const storageBucket =
      ownerType === 'person' ? 'personVideos' : 'companyVideos'
    const table = ownerType === 'person' ? 'people' : 'companies'
    const filePath = `videos/${ownerId}/${Date.now()}_${file.name}`
    setUploading(true)

    const { data, error } = await supabase.storage
      .from(storageBucket)
      .upload(filePath, file, { upsert: true })

    console.log('Upload result:', data, error)

    if (error) {
      console.error(error)
      alert('خطا در آپلود ویدیو')
      setUploading(false)
      return
    }

    const { data: publicData } = supabase.storage
      .from(storageBucket)
      .getPublicUrl(filePath)
    console.log('Public URL:', publicData?.publicUrl)

    if (!publicData?.publicUrl) {
      alert('خطا در دریافت لینک ویدیو')
      setUploading(false)
      return
    }

    setVideoUrl(publicData.publicUrl)

    await supabase
      .from(table)
      .update({ video: publicData.publicUrl })
      .eq('id', ownerId)

    setUploading(false)
    alert('ویدیو با موفقیت آپلود شد!')
  }

  return (
    <div className='flex flex-col w-full'>
      {/* دکمه آپلود */}

      {!videoUrl && (
        <label className='flex text-black gap-1 md:gap-2 items-center justify-center  px-2 py-3 md:px-4 md:py-3 bg-white/85 rounded-xl cursor-pointer hover:bg-white transition'>
          <Video className='w-5 h-5 mr-2' />
          {uploading ? 'در حال آپلود...' : 'آپلود ویدیو'}
          <input
            type='file'
            accept='video/*'
            className='hidden'
            onChange={handleVideoUpload}
          />
        </label>
      )}
    </div>
  )
}

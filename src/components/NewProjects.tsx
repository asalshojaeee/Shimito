import { useState } from 'react'

import { FiTrash2 } from 'react-icons/fi'
import { supabase } from '../data/supabaseClient'
import { PlusSquare } from 'lucide-react'
import { useProjects } from '../contexts/context'

interface ProjectFile {
  url: string
  path: string
  caption: string
}

interface Props {
  ownerId: string
  ownerType: 'person' | 'company'
}

export default function NewProjectModal({ ownerId, ownerType }: Props) {
  const [title, setTitle] = useState('')
  const [files, setFiles] = useState<ProjectFile[]>([])
  const [saving, setSaving] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
 const {setProjects} = useProjects()

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || files.length >= 5) return

    const timestamp = Date.now()
    const filePath = `images/${ownerId}/${timestamp}_${file.name}`

    const storageBucket = ownerType === 'person' ? 'personProjects' : 'projects'

    const { error } = await supabase.storage
      .from(storageBucket)
      .upload(filePath, file, { upsert: true })
    if (error) {
      console.error(error)
      return
    }

    const { data } = supabase.storage.from(storageBucket).getPublicUrl(filePath)
    if (!data?.publicUrl) return

    setFiles((prev) => [
      ...prev,
      { url: data.publicUrl, path: filePath, caption: '' },
    ])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleCaptionChange = (index: number, caption: string) => {
    setFiles((prev) => {
      const updated = [...prev]
      updated[index].caption = caption
      return updated
    })
  }

  const handleSaveProject = async () => {
    if (!title || files.length === 0) {
      alert('عنوان پروژه و حداقل یک عکس لازم است')
      return
    }

    const profileId = ownerId

    try {
      setSaving(true)

      // 1. ایجاد پروژه
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .insert([{ owner_type: ownerType, owner_id: profileId, title }])
        .select()
        .single()
      if (projectError) throw projectError

      const projectId = projectData.id

      // 2. ذخیره عکس‌ها
      for (let i = 0; i < files.length; i++) {
        await supabase.from('project_media').insert([
          {
            project_id: projectId,
            file_url: files[i].url,
            file_path: files[i].path,
            caption: files[i].caption,
            order: i,
          },
        ])
      }

      alert('پروژه ذخیره شد!')
      setTitle('')
      setFiles([])
      setIsOpen(false)
      setProjects((prev) => [
        ...prev,
        { id: projectId, title, files: [...files] },
      ])
    } catch (err) {
      console.error(err)
      alert('خطا در ذخیره پروژه')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='bg-white/85 w-full  text-black px-4 py-3 rounded-xl hover:bg-white transition'
      >
        <p className='flex gap-1 justify-center'>
          <PlusSquare /> پروژه جدید
        </p>
      </button>

      {/* مودال */}
      {isOpen && (
        <div className='fixed inset-0 z-50 text-black flex items-center justify-center'>
          {/* بک‌گراند تاریک با blur */}
          <div
            className='absolute inset-0 bg-black/50 backdrop-blur-sm'
            onClick={() => setIsOpen(false)}
          />

          {/* محتویات مودال */}
          <div
            className='relative bg-white/80 p-4 sm:p-6 rounded-xl shadow-lg 
                w-full max-w-xl max-h-[90vh] overflow-y-auto z-10'
          >
            <h2 className='text-lg font-bold mb-4 text-black'>پروژه جدید</h2>

            <input
              type='text'
              placeholder='عنوان پروژه'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full mb-4 p-2 border rounded bg-white/80 outline-none'
            />

            <div className='grid grid-cols-3 sm:grid-cols-5 gap-2 mb-4'>
              {files.map((file, idx) => (
                <div key={idx} className='relative'>
                  <img
                    src={file.url}
                    alt={`project-${idx}`}
                    className='w-24 h-24 object-cover rounded'
                  />
                  <input
                    type='text'
                    placeholder='کپشن'
                    value={file.caption}
                    onChange={(e) => handleCaptionChange(idx, e.target.value)}
                    className='mt-1 text-xs w-full outline-none bg-white/80'
                  />
                  <button
                    onClick={() => removeFile(idx)}
                    className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1'
                  >
                    <FiTrash2 className='w-3 h-3' />
                  </button>
                </div>
              ))}
              {files.length < 5 && (
                <label
                  className='flex items-center justify-center w-full aspect-square 
                  border-2 border-dashed border-white rounded cursor-pointer text-gray-400'
                >
                  <input
                    type='file'
                    className='hidden'
                    onChange={handleFileUpload}
                  />
                  آپلود
                </label>
              )}
            </div>

            <div className='flex justify-end gap-2'>
              <button
                onClick={() => setIsOpen(false)}
                className='px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition'
              >
                انصراف
              </button>

              <button
                onClick={handleSaveProject}
                disabled={saving}
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
              >
                {saving ? 'در حال ذخیره...' : 'ذخیره پروژه'}
              </button>
            </div>
          </div>
        </div>
      )}

      
    </>
  )
}

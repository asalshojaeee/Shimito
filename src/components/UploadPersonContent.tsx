import { useEffect, useState } from 'react'
import { supabase } from '../data/supabaseClient'
import UploadSection from './UploadSection'
import NewProjectModal from './NewProjects'
import UploadVideo from './UploadVideo'
import ProjectList from './ProjectList'
import UploadedVideoPreview from './UploadedVideoPreview'

interface Props {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
  personId: string
  onUpdate?: (files: { url: string; path: string }[]) => void
  setEditinPersonId: React.Dispatch<React.SetStateAction<string | null>>
  email: string
}

export default function UploadPersonContent({
  setActiveTab,
  personId,
  setEditinPersonId,
  email,
}: Props) {
  const [certificates, setCertificates] = useState<
    { url: string; path: string }[]
  >([])
  const [saving, setSaving] = useState(false)
  const [portfolios, setPortfolios] = useState<{ url: string; path: string }[]>(
    []
  )

  const handlePortfolioUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setSaving(true)
      const filePath = `images/${email}/${Date.now()}_${file.name}`

      await supabase.storage
        .from('personProjects')
        .upload(filePath, file, { upsert: true })

      // دریافت URL عمومی
      const { data } = supabase.storage
        .from('personProjects')
        .getPublicUrl(filePath)
      if (!data?.publicUrl) throw new Error('خطا در دریافت URL عمومی')

      const updatedPortfolios = [
        ...portfolios,
        { url: data.publicUrl, path: filePath },
      ].slice(0, 5)

      setPortfolios(updatedPortfolios)

      await supabase
        .from('people')
        .update({ portfolios: updatedPortfolios })
        .eq('id', personId)
    } catch (err) {
      console.error(err)
      alert('خطا در آپلود فایل')
    } finally {
      setSaving(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setSaving(true)

      const filePath = `images/${email}/${Date.now()}_${file.name}`

      await supabase.storage
        .from('personCertificates')
        .upload(filePath, file, { upsert: true })

      const { data } = supabase.storage
        .from('personCertificates')
        .getPublicUrl(filePath)

      const updatedCertificates = [
        ...certificates,
        { url: data.publicUrl, path: filePath },
      ].slice(0, 5)

      setCertificates(updatedCertificates)

      // 🔥 مهم
      await supabase
        .from('people')
        .update({ certificates: updatedCertificates })
        .eq('id', personId)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const removePortfolio = async (path: string) => {
    const fileToRemove = portfolios.find((p) => p.path === path)
    if (!fileToRemove) return

    // 1. حذف از Supabase Storage
    const { error } = await supabase.storage
      .from('personProjects')
      .remove([fileToRemove.path])

    if (error) {
      console.error('Supabase delete error:', error)
      return
    }

    // 2. حذف از UI
    const updatedPortfolios = portfolios.filter((p) => p.path !== path)

    setPortfolios(updatedPortfolios)

    await supabase
      .from('people')
      .update({ portfolios: updatedPortfolios })
      .eq('id', personId)
  }

  const removeCertificate = async (path: string) => {
    const fileToRemove = certificates.find((p) => p.path === path)
    if (!fileToRemove) return

    // 1. حذف از Supabase Storage
    const { error } = await supabase.storage
      .from('personCertificates')
      .remove([fileToRemove.path])

    if (error) {
      console.error('Supabase delete error:', error)
      return
    }

    // 2. حذف از UI
    const updatedCertificates = certificates.filter((p) => p.path !== path)

    setCertificates(updatedCertificates)

    await supabase
      .from('people')
      .update({ certificates: updatedCertificates })
      .eq('id', personId)
  }

  const handleSubmit = async () => {
    try {
      await supabase
        .from('people')
        .update({
          certificates: certificates, // آرایه URL‌های موجود در state
          portfolios: portfolios,
        })
        .eq('id', personId)

      alert('اطلاعات ذخیره شدند!')
    } catch (err) {
      console.error(err)
      alert('خطا در ذخیره اطلاعات')
    }
  }

  useEffect(() => {
    const fetchPersonUploads = async () => {
      const { data, error } = await supabase
        .from('people')
        .select('certificates, portfolios')
        .eq('id', personId)
        .single()

      if (error) {
        console.error('Fetch uploads error:', error)
        return
      }

      setCertificates(data.certificates || [])
      setPortfolios(data.portfolios || [])
    }

    if (personId) {
      fetchPersonUploads()
    }
  }, [personId])
  return (
    <div className='flex flex-col h-full justify-between'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <UploadSection
          title='آپلود گواهینامه ها'
          hint='گواهینامه ها را با پسوند jpg آپلود کنید'
          inputId='certificate-upload'
          files={certificates}
          onUpload={handleFileUpload}
          onRemove={removeCertificate}
        />

        <UploadSection
          title='آپلود نمونه کارها'
          hint='نمونه کارها را با پسوند jpg آپلود کنید'
          inputId='portfolio-upload'
          files={portfolios}
          onUpload={handlePortfolioUpload}
          onRemove={removePortfolio}
        />
      </div>
      <div className='mt-8 flex flex-col md:flex-row gap-4'>
        <div className='w-full md:w-1/2'>
          <NewProjectModal ownerId={personId} ownerType='person' />
        </div>

        <div className='w-full md:w-1/2'>
          <UploadVideo ownerId={personId} ownerType='person' />
        </div>
      </div>
      <div className='mt-6'>
        <ProjectList />
        <UploadedVideoPreview />
      </div>
      <div className='flex gap-3 pt-10'>
        <button
          disabled={saving}
          onClick={() => {
            handleSubmit()
            setEditinPersonId(null)
            setActiveTab('companies')
          }}
          className='px-4 py-3 flex-1 rounded-2xl bg-white text-[#173A46]  text-xs md:text-sm'
        >
          {saving ? 'در حال ذخیره...' : 'ثبت مشخصات'}
        </button>

        <button
          onClick={() => {
            setEditinPersonId(null)
            setActiveTab('members')
          }}
          className='px-4 py-3 flex-1 rounded-2xl bg-[#242424]
           text-white text-xs md:text-sm'
        >
          انصراف
        </button>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { supabase } from '../data/supabaseClient'
import UploadSection from './UploadSection'
import NewProjectModal from './NewProjects'
import UploadVideo from './UploadVideo'
import ProjectList from './ProjectList'
import UploadedVideoPreview from './UploadedVideoPreview'

export default function UploadContent({
  companyId,
  onUpdate,
  setEditingCompanyId,
  setActiveTab,
  contactNumber,
}: {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
  companyId: string
  onUpdate?: (files: { url: string; path: string }[]) => void
  setEditingCompanyId: React.Dispatch<React.SetStateAction<string | null>>
  contactNumber: string
}) {
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
      const filePath = `images/${contactNumber}/${Date.now()}_${file.name}`

      // آپلود فایل
      const { error: uploadError } = await supabase.storage
        .from('projects')
        .upload(filePath, file, { upsert: true })
      if (uploadError) throw uploadError

      // دریافت URL عمومی
      const { data } = supabase.storage.from('projects').getPublicUrl(filePath)
      if (!data?.publicUrl) throw new Error('خطا در دریافت URL عمومی')

      // آپدیت state
      setPortfolios((prev) => {
        const updated = [
          ...prev,
          {
            url: data.publicUrl, // حالا URL عمومی
            path: filePath, // path داخل bucket برای حذف
          },
        ].slice(0, 5) // حداکثر ۵ فایل

        onUpdate?.(updated) // اطلاع دادن به parent
        return updated
      })
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
      const filePath = `images/${contactNumber}/${Date.now()}_${file.name}`

      const { error: uploadError } = await supabase.storage
        .from('certificates')
        .upload(filePath, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('certificates')
        .getPublicUrl(filePath)
      if (!data?.publicUrl) throw new Error('خطا در گرفتن URL فایل')

      setCertificates((prev) => {
        const updated = [
          ...prev,
          {
            url: data.publicUrl,
            path: filePath,
          },
        ].slice(0, 5) // حداکثر ۵ فایل

        onUpdate?.(updated) // اطلاع دادن به parent
        return updated
      })
    } catch (err) {
      console.error(err)
      alert('خطا در آپلود فایل')
    } finally {
      setSaving(false)
    }
  }

  const removePortfolio = async (path: string) => {
    const fileToRemove = portfolios.find((p) => p.path === path)
    if (!fileToRemove) return

    // 1. حذف از Supabase Storage
    const { error } = await supabase.storage
      .from('projects')
      .remove([fileToRemove.path])

    if (error) {
      console.error('Supabase delete error:', error)
      return
    }

    // 2. حذف از UI
    const updatedPortfolios = portfolios.filter((p) => p.path !== path)
    setPortfolios(updatedPortfolios)

    await supabase
      .from('companies')
      .update({ portfolios: updatedPortfolios })
      .eq('id', companyId)
  }

  const removeCertificate = async (path: string) => {
    const fileToRemove = certificates.find((p) => p.path === path)
    if (!fileToRemove) return

    // 1. حذف از Supabase Storage
    const { error } = await supabase.storage
      .from('certificates')
      .remove([fileToRemove.path])

    if (error) {
      console.error('Supabase delete error:', error)
      return
    }

    // 2. حذف از UI
    const updatedCertificates = certificates.filter((p) => p.path !== path)

    setCertificates(updatedCertificates)

    await supabase
      .from('companies')
      .update({ certificates: updatedCertificates })
      .eq('id', companyId)
  }

  const handleSubmit = async () => {
    try {
      await supabase
        .from('companies')
        .update({
          certificates: certificates, // آرایه URL‌های موجود در state
          portfolios: portfolios,
        })
        .eq('id', companyId)

      alert('اطلاعات ذخیره شدند!')
    } catch (err) {
      console.error(err)
      alert('خطا در ذخیره اطلاعات')
    }
  }

  useEffect(() => {
    const fetchPersonUploads = async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('certificates, portfolios')
        .eq('id', companyId)
        .single()

      if (error) {
        console.error('Fetch uploads error:', error)
        return
      }

      setCertificates(data.certificates || [])
      setPortfolios(data.portfolios || [])
    }

    if (companyId) {
      fetchPersonUploads()
    }
  }, [companyId])

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

      <div className='mt-8 flex gap-4'>
        <div className='w-1/2'>
          <NewProjectModal ownerId={companyId} ownerType='company' />
        </div>

        <div className='w-1/2'>
          <UploadVideo ownerId={companyId} ownerType='company' />
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
            setEditingCompanyId(null)
            setActiveTab('companies')
          }}
          className='px-4 py-3 flex-1 rounded-2xl bg-white text-[#173A46]  text-xs md:text-sm'
        >
          {saving ? 'در حال ذخیره...' : 'ثبت مشخصات'}
        </button>

        <button
          onClick={() => {
            setEditingCompanyId(null)
            setActiveTab('companies')
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

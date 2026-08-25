import { supabase } from '../data/supabaseClient'

type EditForm = {
  id: string
  name: string
  foundationYear: string
  address: string
  nationalId: string
  email: string
  contactNumber: string
  registrationNumber: string
  resume: string
  desc: string
  logo: string
  logoPath: string
  aboutCo: string
}

interface Props {
  editForm: EditForm
  setEditForm: React.Dispatch<React.SetStateAction<EditForm>>
  setSaving: React.Dispatch<React.SetStateAction<boolean>>
  editingCompanyId: string
  saving: boolean
  handleUpdateCompany: (companyId: string) => void
  setEditingCompanyId: React.Dispatch<React.SetStateAction<string | null>>
  company: EditForm
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

export default function CompanyInfoEdit({
  editForm,
  setEditForm,
  setSaving,
  editingCompanyId,
  saving,
  handleUpdateCompany,
  setEditingCompanyId,
  company,
  setActiveTab,
}: Props) {
  return (
    <div className=' flex flex-col justify-between  border-white/20 '>
      <div className='grid md:grid-cols-2 gap-4'>
        <input
          value={editForm.name}
          placeholder='نام شرکت'
          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
          className='w-full bg-transparent border-b border-white/30 px-1 py-1 text-sm'
        />

        <input
          value={editForm.desc}
          placeholder='حوزه تخصص'
          onChange={(e) =>
            setEditForm({
              ...editForm,
              desc: e.target.value,
            })
          }
          className='w-full bg-transparent border-b border-white/30 px-1 py-1 text-sm'
        />
        <input
          value={editForm.foundationYear}
          placeholder='سال تاسیس'
          onChange={(e) =>
            setEditForm({
              ...editForm,
              foundationYear: e.target.value,
            })
          }
          className='w-full bg-transparent border-b border-white/30 px-1 py-1 text-sm'
        />

        <input
          value={editForm.address}
          placeholder='آدرس'
          onChange={(e) =>
            setEditForm({
              ...editForm,
              address: e.target.value,
            })
          }
          className='w-full bg-transparent border-b border-white/30 px-1 py-1 text-sm'
        />

        <input
          value={editForm.nationalId}
          placeholder='شناسه ملی'
          onChange={(e) =>
            setEditForm({
              ...editForm,
              nationalId: e.target.value,
            })
          }
          className='w-full bg-transparent border-b border-white/30 px-1 py-1 text-sm'
        />

        <textarea
          value={editForm.aboutCo}
          placeholder='درباره ی شرکت'
          className='bg-transparent w-full border-b-2 placeholder:text-gray-200 border-b-gray-400 outline-none'
          onChange={(e) =>
            setEditForm({
              ...editForm,
              aboutCo: e.target.value,
            })
          }
        ></textarea>

        <div className='flex items-center gap-2'>
          {editForm.logo && (
            <img
              src={editForm.logo + '?t=' + Date.now()}
              alt='Company Logo'
              className='w-16 h-16 object-cover rounded-full border border-white/30'
            />
          )}
          <input
            type='file'
            accept='image/*'
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (!file) return

              try {
                setSaving(true)

                // حذف عکس قبلی اگر وجود داشته باشه
                if (editForm.logo) {
                  const oldPath = editForm.logo.split('/files/')[1] // logos/xxx.png
                  if (oldPath) {
                    const { error: removeError } = await supabase.storage
                      .from('files')
                      .remove([oldPath])
                    if (removeError)
                      console.error('خطا در حذف لوگوی قدیمی:', removeError)
                  }
                }

                // مسیر جدید
                const ext = file.name.split('.').pop()
                const filePath = `logos/${editingCompanyId}_${Date.now()}.${ext}`

                // آپلود عکس جدید
                const { error: uploadError } = await supabase.storage
                  .from('files')
                  .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: true,
                  })

                if (uploadError) throw uploadError

                // دریافت public URL واقعی
                const { data } = supabase.storage
                  .from('files')
                  .getPublicUrl(filePath)
                if (!data || !data.publicUrl)
                  throw new Error('خطا در دریافت URL لوگو')

                // آپدیت فرم
                setEditForm((prev) => ({
                  ...prev,
                  logo: data.publicUrl,
                  logoPath: filePath,
                }))
              } catch (err) {
                console.error(err)
                alert('خطا در جایگزینی لوگو')
              } finally {
                setSaving(false)
              }
            }}
          />
        </div>
      </div>
      <div className='flex gap-3 pt-10'>
        <button
          disabled={saving}
          onClick={() => handleUpdateCompany(company.id)}
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

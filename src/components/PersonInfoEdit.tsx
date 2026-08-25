import { supabase } from '../data/supabaseClient'

type EditPersonForm = {
  id: string
  name: string
  aboutPerson: string
  desc: string
  phoneNumber: string
  nationalId: string
  education: string
  email: string
  img: string
  skillDescs: string
}

interface Props {
  editPersonForm: EditPersonForm
  setEditPersonForm: React.Dispatch<React.SetStateAction<EditPersonForm>>
  handleUpdatePerson: (personId: string) => Promise<void> | void
  saving: boolean
  setSaving: React.Dispatch<React.SetStateAction<boolean>>
  editingPersonId: string
  setEditingPersonId: React.Dispatch<React.SetStateAction<string | null>>
  person: EditPersonForm
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

export default function PersonInfoEdit({
  editPersonForm,
  setEditPersonForm,
  handleUpdatePerson,
  saving,
  setSaving,
  editingPersonId,
  setEditingPersonId,
  person,
  setActiveTab,
}: Props) {
  return (
    <div className='flex flex-col gap-6'>
      <div className='grid md:grid-cols-2 gap-4'>
        <div className='flex flex-col gap-2'>
          <input
            value={editPersonForm.name}
            placeholder='نام و نام خانوادگی'
            onChange={(e) =>
              setEditPersonForm({ ...editPersonForm, name: e.target.value })
            }
            className='w-full bg-transparent border-b border-white/30 px-1 py-1 text-sm'
          />
        </div>

        <input
          value={editPersonForm.desc}
          placeholder='سمت / تخصص'
          onChange={(e) =>
            setEditPersonForm({
              ...editPersonForm,
              desc: e.target.value,
            })
          }
          className='w-full bg-transparent border-b border-white/30 px-1 py-1 text-sm'
        />

        <input
          value={editPersonForm.nationalId}
          placeholder='کدملی'
          onChange={(e) =>
            setEditPersonForm({
              ...editPersonForm,
              nationalId: e.target.value,
            })
          }
          className='w-full bg-transparent border-b border-white/30 px-1 py-1 text-sm'
        />

        <input
          value={editPersonForm.phoneNumber}
          placeholder='شماره تماس'
          onChange={(e) =>
            setEditPersonForm({
              ...editPersonForm,
              phoneNumber: e.target.value,
            })
          }
          className='w-full bg-transparent border-b border-white/30 px-1 py-1 text-sm'
        />

        <input
          value={editPersonForm.education}
          placeholder='تحصیلات'
          onChange={(e) =>
            setEditPersonForm({
              ...editPersonForm,
              education: e.target.value,
            })
          }
          className='w-full bg-transparent border-b border-white/30 px-1 py-1 text-sm'
        />

        <textarea
          value={editPersonForm.aboutPerson}
          placeholder='درباره ی فرد'
          className='bg-transparent w-full border-b-2 placeholder:text-gray-200 border-b-gray-400 outline-none'
          onChange={(e) =>
            setEditPersonForm({
              ...editPersonForm,
              aboutPerson: e.target.value,
            })
          }
        ></textarea>
        <textarea
          value={editPersonForm.skillDescs}
          placeholder='درباره ی مهارت های فرد'
          className='bg-transparent w-full border-b-2 placeholder:text-gray-200 border-b-gray-400 outline-none'
          onChange={(e) =>
            setEditPersonForm({
              ...editPersonForm,
              skillDescs: e.target.value,
            })
          }
        ></textarea>
        <div className='flex items-center gap-2'>
          {editPersonForm.img && (
            <img
              src={editPersonForm.img + '?t=' + Date.now()}
              alt='Person img'
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
                if (editPersonForm.img) {
                  const oldPath = editPersonForm.img.split('/files/')[1] // logos/xxx.png
                  if (oldPath) {
                    const { error: removeError } = await supabase.storage
                      .from('people')
                      .remove([oldPath])
                    if (removeError)
                      console.error('خطا در حذف لوگوی قدیمی:', removeError)
                  }
                }

                // مسیر جدید
                const ext = file.name.split('.').pop()
                const filePath = `images/${editingPersonId}_${Date.now()}.${ext}`

                // آپلود عکس جدید
                const { error: uploadError } = await supabase.storage
                  .from('people')
                  .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: true,
                  })

                if (uploadError) throw uploadError

                // دریافت public URL واقعی
                const { data } = supabase.storage
                  .from('people')
                  .getPublicUrl(filePath)
                if (!data || !data.publicUrl)
                  throw new Error('خطا در دریافت URL لوگو')

                // آپدیت فرم
                setEditPersonForm((prev) => ({
                  ...prev,
                  img: data.publicUrl,
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
      <div className='flex gap-3 pt-2'>
        <button
          disabled={saving}
          onClick={() => handleUpdatePerson(person.id)}
          className='px-4 py-3 flex-1 rounded-2xl bg-white text-[#173A46]  text-xs md:text-sm'
        >
          {saving ? 'در حال ذخیره...' : 'ثبت تغییرات'}
        </button>

        <button
          onClick={() => {
            setEditingPersonId(null)
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

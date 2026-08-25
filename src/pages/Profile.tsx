import { useEffect, useState } from 'react'
import { supabase } from '../data/supabaseClient'
import CompanyInfoEdit from '../components/CompanyInfoEdit'
import UploadContent from '../components/UploadContent'
import PersonInfoEdit from '../components/PersonInfoEdit'
import UploadPersonContent from '../components/UploadPersonContent'

type Company = {
  name: string
  img: string
  id: string
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
  imgPath: string
}

type Member = {
  id: string
  name: string
  contactNumber: string
  address: string
  nationalId: string
  resume: string
  logo: string
  desc: string
  logoPath: string
  aboutPerson: string
  education: string
  img: string
  phoneNumber: string
  email: string
  skillDescs: string
}

type EditForm = Pick<
  Company,
  | 'id'
  | 'name'
  | 'email'
  | 'foundationYear'
  | 'contactNumber'
  | 'registrationNumber'
  | 'address'
  | 'nationalId'
  | 'resume'
  | 'desc'
  | 'logo'
  | 'logoPath'
  | 'aboutCo'
>

type EditPersonForm = Pick<
  Member,
  | 'id'
  | 'name'
  | 'aboutPerson'
  | 'desc'
  | 'phoneNumber'
  | 'nationalId'
  | 'education'
  | 'email'
  | 'img'
  | 'skillDescs'
>

export default function Profile() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('companies')
  const [loading, setLoading] = useState(true)
  const [editingCompanyId, setEditingCompanyId] = useState<string | null>(null)
  const [editingPersonId, setEditingPersonId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<EditForm>({
    id: '',
    name: '',
    email: '',
    foundationYear: '',
    contactNumber: '',
    registrationNumber: '',
    address: '',
    nationalId: '',
    resume: '',
    logo: '',
    desc: '',
    logoPath: '',
    aboutCo: '',
  })
  const [editPersonForm, setEditPersonForm] = useState<EditPersonForm>({
    id: '',
    name: '',
    aboutPerson: '',
    desc: '',
    phoneNumber: '',
    nationalId: '',
    education: '',
    email: '',
    img: '',
    skillDescs: '',
  })
  const [saving, setSaving] = useState(false)
  // const [profileForm, setProfileForm] = useState({
  //   firstName: user?.user_metadata?.first_name ?? '',
  //   lastName: user?.user_metadata?.last_name ?? '',
  //   avatar: user?.user_metadata?.avatar_url ?? '',
  // })

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!user) return

    const fetchMyData = async () => {
      const { data: companies } = await supabase
        .from('companies')
        .select('*')
        .eq('user_id', user.id)

      const { data: people } = await supabase
        .from('people')
        .select('*')
        .eq('user_id', user.id)

      setCompanies(companies ?? [])
      setMembers(people ?? [])
    }

    fetchMyData()
  }, [user])

  const handleUpdateCompany = async (companyId: string) => {
    try {
      setSaving(true)

      const { error } = await supabase
        .from('companies')
        .update({
          name: editForm.name,
          desc: editForm.desc,
          foundationYear: editForm.foundationYear,
          address: editForm.address,
          nationalId: editForm.nationalId,
          img: editForm.logo, // public URL جدید
          aboutCo: editForm.aboutCo,
        })
        .eq('id', companyId)
        .eq('user_id', user.id)

      if (error) throw error

      // آپدیت UI
      setCompanies((prev) =>
        prev.map((c) => {
          if (c.id !== companyId) return c

          return {
            ...c,
            name: editForm.name ?? c.name,
            foundationYear: editForm.foundationYear ?? c.foundationYear,
            address: editForm.address ?? c.address,
            nationalId: editForm.nationalId ?? c.nationalId,
            email: editForm.email ?? c.email,
            contactNumber: editForm.contactNumber ?? c.contactNumber,
            registrationNumber:
              editForm.registrationNumber ?? c.registrationNumber,
            resume: editForm.resume ?? c.resume,
            desc: editForm.desc ?? c.desc,
            aboutCo: editForm.aboutCo ?? c.aboutCo,

            // mapping صحیح لوگو
            img: editForm.logo ?? c.img,
            imgPath: editForm.logoPath ?? c.imgPath,
          }
        })
      )

      setEditingCompanyId(null)
      setActiveTab('companies')
    } catch (err) {
      console.error(err)
      alert('خطا در ذخیره تغییرات')
    } finally {
      setSaving(false)
    }
  }

  // const handleAvatarUpload = async (file: File) => {
  //   const ext = file.name.split('.').pop()
  //   const filePath = `images/${user.id}.${ext}`

  //   const { error: uploadError } = await supabase.storage
  //     .from('avatars')
  //     .upload(filePath, file, { upsert: true })

  //   if (uploadError) throw uploadError

  //   const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)

  //   setProfileForm((prev) => ({
  //     ...prev,
  //     avatar: data.publicUrl,
  //   }))
  // }

  // const handleUpdateProfile = async () => {
  //   try {
  //     setSaving(true)

  //     const { error, data } = await supabase.auth.updateUser({
  //       data: {
  //         user_metadata: {
  //           first_name: profileForm.firstName,
  //           last_name: profileForm.lastName,
  //           avatar_url: profileForm.avatar,
  //         },
  //       },
  //     })

  //     if (error) throw error

  //     alert('اطلاعات با موفقیت ذخیره شد')
  //   } catch (err) {
  //     console.error(err)
  //     alert('خطا در ذخیره اطلاعات')
  //   } finally {
  //     setSaving(false)
  //   }
  // }

  const handleUpdatePerson = async (personId: string) => {
    try {
      setSaving(true)

      const { error } = await supabase
        .from('people')
        .update({
          name: editPersonForm.name,
          desc: editPersonForm.desc,
          nationalId: editPersonForm.nationalId,
          img: editPersonForm.img, // public URL جدید
          education: editPersonForm.education,
          aboutPerson: editPersonForm.aboutPerson,
          phoneNumber: editPersonForm.phoneNumber,
          skillDescs: editPersonForm.skillDescs,
        })
        .eq('id', personId)
        .eq('user_id', user.id)

      if (error) throw error

      // آپدیت UI
      setMembers((prev) =>
        prev.map((p) => {
          if (p.id !== personId) return p

          return {
            ...p,
            name: editPersonForm.name ?? p.name,
            nationalId: editPersonForm.nationalId ?? p.nationalId,
            desc: editPersonForm.desc ?? p.desc,
            aboutPerson: editPersonForm.aboutPerson ?? p.aboutPerson,
            img: editPersonForm.img ?? p.img,
            skillDescs: editPersonForm.skillDescs ?? p.skillDescs,
          }
        })
      )
      setEditingPersonId(null)
      setActiveTab('members')
    } catch (err) {
      console.error(err)
      alert('خطا در ذخیره تغییرات')
    } finally {
      setSaving(false)
    }
  }

  const editTabs = editingCompanyId
    ? [
        { key: 'company-info', label: 'اطلاعات شرکت' },
        { key: 'company-content', label: 'انتشار محتوا' },
      ]
    : editingPersonId
    ? [
        { key: 'person-info', label: 'اطلاعات فرد' },
        { key: 'person-content', label: 'انتشار محتوا' },
      ]
    : [
        { key: 'companies', label: 'شرکت‌ها' },
        { key: 'members', label: 'افراد' },
      ]

  return (
    <section
      dir='rtl'
      className='relative min-h-screen w-full flex overflow-hidden justify-center items-start py-24 px-4 text-white'
    >
      {/* Background */}
      <div className='absolute inset-0'>
        <img
          src='/hero-background-image.webp'
          className='w-full h-full object-cover scale-105'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40' />
      </div>

      {/* Main Glass Card */}
      <div
        className='relative z-10 w-full max-w-6xl rounded-3xl
    bg-white/10 backdrop-blur-2xl
    border border-white/20
    shadow-[0_20px_80px_rgba(0,0,0,0.45)]
    grid grid-cols-1 md:grid-cols-[300px_1fr]
    overflow-hidden'
      >
        {/* Sidebar */}
        <aside
          className='p-8 border-l border-white/15 flex flex-col gap-8
      bg-white/5'
        >
          <div className='flex flex-col items-center gap-4'>
            {loading ? (
              <span className='inline-block w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin' />
            ) : (
              <>
                <div className='relative'>
                  <img
                    src={user?.user_metadata.avatar_url || '/user.webp'}
                    className='w-24 h-24 rounded-full object-cover
                ring-2 ring-white/40
                shadow-lg'
                  />
                  <span className='absolute bottom-1 left-1 w-3 h-3 rounded-full bg-green-400 ring-2 ring-black/40' />
                </div>

                <div className='text-center space-y-1'>
                  <p className='font-semibold text-lg tracking-tight'>
                    {user?.user_metadata.name || 'نام کاربر'}
                  </p>
                  <p className='text-xs text-white/60'>{user?.email}</p>
                </div>
              </>
            )}
          </div>

          {/* Tabs */}

          <div className='flex flex-col gap-2'>
            {editTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full py-2.5 rounded-xl text-sm font-medium
        transition-all duration-300
        ${
          activeTab === tab.key
            ? 'bg-white text-black shadow-md scale-[1.02]'
            : 'bg-white/10 hover:bg-white/20 hover:translate-x-1'
        }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </aside>

        <main className='p-0 md:p-10 '>
          {/* {activeTab === 'personal' && (
            <div className='space-y-6 animate-fadeIn'>
              <h2 className='text-xl font-semibold tracking-tight'>
                اطلاعات شخصی
              </h2>

              <div className='grid md:grid-cols-2 gap-6'>
                <input
                  value={profileForm.firstName}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      firstName: e.target.value,
                    })
                  }
                  placeholder='نام'
                  className='w-full bg-transparent border-b border-white/30 px-1 py-2 text-sm'
                />

                <input
                  value={profileForm.lastName}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, lastName: e.target.value })
                  }
                  placeholder='نام خانوادگی'
                  className='w-full bg-transparent border-b border-white/30 px-1 py-2 text-sm'
                />
              </div>

              <div className='flex items-center gap-4'>
                {profileForm.avatar && (
                  <img
                    src={profileForm.avatar}
                    className='w-16 h-16 rounded-full object-cover border border-white/30'
                  />
                )}

                <input
                  type='file'
                  accept='image/*'
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleAvatarUpload(file)
                  }}
                />
              </div>

              <button
                onClick={handleUpdateProfile}
                className='inline-flex items-center gap-2 px-8 py-2.5 rounded-xl
      bg-white/90 text-black hover:bg-white transition shadow-lg'
              >
                ثبت اطلاعات
              </button>
            </div>
          )} */}

          {editingCompanyId && activeTab === 'company-info' ? (
            <CompanyInfoEdit
              saving={saving}
              handleUpdateCompany={handleUpdateCompany}
              setEditingCompanyId={setEditingCompanyId}
              editingCompanyId={editingCompanyId}
              setSaving={setSaving}
              editForm={editForm}
              setEditForm={setEditForm}
              company={companies.find((c) => c.id === editingCompanyId)!}
              setActiveTab={setActiveTab}
            />
          ) : activeTab === 'companies' ? (
            <>
              <h2 className='text-xl font-semibold mb-6'>شرکت‌ها</h2>
              <div className='grid md:grid-cols-2 gap-6'>
                {companies.map((company) => (
                  <div
                    key={company.id}
                    className='rounded-2xl p-2 bg-white/10 border border-white/15'
                  >
                    <div className='flex justify-between items-start'>
                      <div className='flex flex-col items-center gap-2'>
                        <img
                          src={company.img}
                          alt=''
                          className='w-12 h-12 object-cover rounded-full border border-white/30'
                        />
                        <p className='text-sm text-white/60'>{company.name}</p>
                      </div>
                      <button
                        onClick={() => {
                          setEditingCompanyId(company.id)
                          setEditForm({
                            id: company.id,
                            name: company.name,
                            email: company.email,
                            desc: company.desc,
                            foundationYear: company.foundationYear,
                            address: company.address,
                            nationalId: company.nationalId,
                            logo: company.img,
                            logoPath: company.imgPath,
                            resume: company.resume,
                            aboutCo: company.aboutCo,
                            contactNumber: company.contactNumber,
                            registrationNumber: company.registrationNumber,
                          })
                          setActiveTab('company-info')
                        }}
                        className='text-xs text-blue-300 hover:text-blue-200 self-center'
                      >
                        ویرایش
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : editingPersonId && activeTab === 'person-info' ? (
            <PersonInfoEdit
              setEditPersonForm={setEditPersonForm}
              editPersonForm={editPersonForm}
              saving={saving}
              handleUpdatePerson={handleUpdatePerson}
              setSaving={setSaving}
              editingPersonId={editingPersonId}
              setEditingPersonId={setEditingPersonId}
              person={members.find((p) => p.id === editingPersonId)!}
              setActiveTab={setActiveTab}
            />
          ) : activeTab === 'members' ? (
            <div className='animate-fadeIn'>
              <h2 className='text-xl font-semibold mb-6'>افراد</h2>

              <div className='grid md:grid-cols-2 gap-6'>
                {members.map((person) => {
                  return (
                    <div
                      key={person.id}
                      className='rounded-2xl p-2 bg-white/10 border border-white/15'
                    >
                      <div className='flex justify-between items-start'>
                        <div className='flex flex-col items-center gap-2'>
                          <img
                            src={person.img}
                            alt=''
                            className='w-12 h-12 object-cover rounded-full border border-white/30'
                          />
                          <p className='text-sm text-white/60'>{person.name}</p>
                        </div>
                        <button
                          onClick={() => {
                            setEditingPersonId(person.id)
                            setEditPersonForm({
                              id: person.id,
                              email: person.email,
                              name: person.name,
                              desc: person.desc,
                              nationalId: person.nationalId,
                              aboutPerson: person.aboutPerson,
                              education: person.education,
                              img: person.img,
                              phoneNumber: person.phoneNumber,
                              skillDescs: person.skillDescs,
                            })
                            setActiveTab('person-info')
                          }}
                          className='text-xs text-blue-300 hover:text-blue-200 self-center'
                        >
                          ویرایش
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : activeTab === 'company-content' ? (
            <UploadContent
              companyId={editingCompanyId || ''}
              contactNumber={editForm.contactNumber || ''}
              setActiveTab={setActiveTab}
              setEditingCompanyId={setEditingCompanyId}
              onUpdate={(urls) =>
                setEditForm((prev) => ({ ...prev, certificates: urls }))
              }
            />
          ) : activeTab === 'person-content' ? (
            <UploadPersonContent
              setActiveTab={setActiveTab}
              email={editPersonForm.email || ''}
              personId={editingPersonId || ''}
              onUpdate={(urls) =>
                setEditPersonForm((prev) => ({ ...prev, certificates: urls }))
              }
              setEditinPersonId={setEditingPersonId}
            />
          ) : null}
        </main>
      </div>
    </section>
  )
}

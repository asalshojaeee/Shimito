import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { supabase } from '../data/supabaseClient'
import Loader from '../components/Loader'

type Person = {
  id: string
  name: string
  desc?: string
  aboutPerson?: string
  img: string
}

const CommitteeMembers = () => {
  const { committeeSlug } = useParams()
  const [members, setMembers] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!committeeSlug) return

    const fetchMembers = async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from('people')
        .select('id, name, desc, aboutPerson ,img')
        .eq('committee_final', committeeSlug)

      if (error) {
        console.error('Error fetching members:', error)
      } else {
        setMembers(data || [])
      }

      setLoading(false)
    }

    fetchMembers()
  }, [committeeSlug])

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Loader />
      </div>
    )
  }

  return (
    <div
      className='mt-36'
      dir='rtl'
    >
      <h1 className='text-3xl text-white text-center mb-10'>اعضای کمیته</h1>

      {members.length === 0 ? (
        <p className='text-center text-gray-300'>
          در حال حاضر عضوی برای این کمیته ثبت نشده است
        </p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {members.map((member) => (
            <div
              key={member.id}
              className='bg-[#345C5D]/70 w-48 md:w-52  rounded-2xl p-6 flex flex-col gap-3 text-center text-white shadow-lg'
            >
              <img
                src={member.img}
                className='h-24 w-24 rounded-full object-cover ring-4 ring-white/10 mx-auto'
                alt=''
              />
              <h2 className='text-xl font-extrabold mb-2'>{member.name}</h2>
              {member.desc && (
                <p className='text-sm text-gray-200 mb-2'>{member.desc}</p>
              )}
            
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CommitteeMembers

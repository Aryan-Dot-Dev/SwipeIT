import { useEffect, useState } from 'react'
import supabase from '../utils/supabaseClient'

export default function ProfilePage() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error
      } = await supabase.auth.getUser()

      if (error) {
        console.error('Failed to fetch user:', error.message)
      } else {
        setUser(user)
      }
    }

    fetchUser()
  }, [])

  if (!user) return <div className="text-center py-10">Loading profile...</div>

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center gap-4">
        <img
          src={user.user_metadata.avatar_url}
          alt="Profile"
          className="w-16 h-16 rounded-full shadow-md"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{user.user_metadata.display_name || user.user_metadata.name }</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
      <button
        className="mt-8 px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
        onClick={async () => {
          const { error } = await supabase.auth.signOut();
          if (!error) {
            window.location.href = '/';
          } else {
            alert('Logout failed.');
          }
        }}
      >
        Logout
      </button>
    </div>
  )
}

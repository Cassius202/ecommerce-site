'use client'

import { useState } from "react"
import { UserDetails } from "@/constants/assets"
import { toast } from "react-hot-toast"

interface Props {
  initialData: UserDetails;
}

const EditUserProfileForm = ({ initialData }: Props) => {
  // Use standard useState initialized with the server data
  const [userData, setUserData] = useState<UserDetails>(initialData);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // Here you would call your update action
    // const result = await updateProfile(userData);
    
    // For now, let's simulate success
    toast.success("Profile updated successfully!");
    setLoading(false);
  }

  return (
    <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
        <div>
          <label className="text-xs uppercase text-zinc-500 font-bold">Full Name</label>
          <input
            className="w-full bg-black border border-zinc-800 p-3 rounded-lg text-white"
            type="text"
            value={userData.full_name || ""}
            onChange={(e) => setUserData({ ...userData, full_name: e.target.value })}
          />
        </div>
        
        {/* Add inputs for phone, username, etc. */}

        <button 
          disabled={loading}
          className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold p-3 rounded-lg transition-colors"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  )
}

export default EditUserProfileForm;
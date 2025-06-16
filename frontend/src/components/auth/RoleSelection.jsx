import React, { useState } from 'react'
import supabase from '../../utils/supabaseClient.js'

const roles = [
  { key: 'job_seeker', label: 'Job Seeker' },
  { key: 'recruiter', label: 'Recruiter' }
];

const RoleSelection = ({ onRoleSelected }) => {
  const [selected, setSelected] = useState(null);

  const handleRole = async (role) => {
    setSelected(role);
    // Update user metadata in Supabase session
    const user = supabase.auth.user?.() || (await supabase.auth.getUser())?.data?.user;
    if (user) {
      await supabase.auth.updateUser({
        data: { role }
      });
    }
    if (onRoleSelected) {
      // Small delay for selection animation
      setTimeout(() => onRoleSelected(role), 400);
    }
  };

  return (
    <div className="flex flex-1 min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center w-full max-w-md">
        <h2 className="text-2xl font-bold mb-8 text-gray-900">Select Your Role</h2>
        <div className="flex gap-6 w-full">
          {roles.map((role) => (
            <button
              key={role.key}
              type="button"
              className={`flex-1 px-6 py-4 rounded-xl border-2 transition-all duration-200 text-lg font-semibold
                ${
                  selected === role.key
                    ? 'bg-[#242124] border-[#111] text-white scale-105 shadow-lg'
                    : 'bg-white border-gray-300 text-gray-800 hover:bg-[#242124] hover:border-[#111] hover:text-[#fff] hover:scale-105'
                }
              `}
              onClick={() => handleRole(role.key)}
              disabled={!!selected}
            >
              {role.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelection
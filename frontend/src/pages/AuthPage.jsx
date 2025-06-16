import { useState } from 'react'
import AuthForm from '../components/auth/AuthForm.jsx'
import { FaCheck } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import RoleSelection from '../components/auth/RoleSelection.jsx'
import supabase from '../utils/supabaseClient.js'
import SplitText from '../components/SplitText.jsx'
import ShinyText from '../components/ShinyText.jsx'

const SuccessCheckmark = () => {
  return (
    <div className="mt-6 flex justify-center animate-checkmark">
      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
        <FaCheck className="text-white text-xl" />
      </div>
    </div>
  )
}

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const navigate = useNavigate();

  // When signup is successful, redirect to role selection
  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setShowRoleSelection(true);
    }, 1000); // Show checkmark briefly before redirect
  };

  const handleRoleSelected = async (role) => {
  const user = supabase.auth.user?.() || (await supabase.auth.getUser())?.data?.user;
  if (user) {
    await supabase.auth.updateUser({
      data: { role }
    });
  }
  navigate('/dashboard');
};

  return (
    <div className="flex flex-col md:flex-row  min-h-screen overflow-hidden ">
      <div className="bg-gradient-to-br from-[#111111] to-[#434343] flex-1 flex flex-col pb-12 items-center justify-center text-white relative">
        <div className="z-10 text-center items-center justify-center p-16 flex flex-col ">
          <div className="bg-white w-40 h-40 flex items-center justify-center rounded-full text-5xl mb-6 animate-bounce-in">
            <img src="logo.png" alt="" className='w-38 h-38 mt-6 object-cover text-[white] ' />
          </div>
          <SplitText className="text-4xl font-semibold mb-6" delay={20} text="Welcome to SwipeIt" />
          <ShinyText className="text-lg leading-relaxed"
           text={"Join thousands of professionals who trust SwipeIT to supercharge their hiring process and connect talent with the right opportunity"}
           speed={5}
          />
        </div>
      </div>

      {showRoleSelection && (
        <RoleSelection onRoleSelected={handleRoleSelected} />
      )}

      {!showRoleSelection && (
        <div className="flex-1 p-5 flex flex-col justify-center">
          <AuthForm isSignup={isSignup} setIsSignup={setIsSignup} setSuccess={handleSuccess} />
          {/* {success && <SuccessCheckmark />} */}
        </div>
      )}
    </div>
  )
}
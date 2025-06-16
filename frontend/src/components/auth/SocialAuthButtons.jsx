import { FaGoogle, FaApple } from 'react-icons/fa'
import supabase from '../../utils/supabaseClient';


export default function SocialAuthButtons() {
const handleGoogleSignIn = async () => {
    const {data, error} = await supabase.auth.signInWithOAuth({
        provider: 'google',
        queryParams: {
            prompt: 'select_account',
        },
        options: {
            redirectTo: window.location.origin + '/dashboard'
        },
    });
    if (error) {
      console.error('Google Sign-In Error:', error.message)
      alert('Failed to sign in with Google.')
    }

    if (data) {
      console.log('Google sign-in successful:', data);
    }
    console.log('Google sign-in');
};

const handleAppleSignIn = async () => {
    // Implement Apple sign-in logic
    console.log('Apple sign-in');
};

return (
    <div className="flex flex-col gap-4 mt-6">
        <button
            onClick={handleGoogleSignIn}
            className="py-3 px-4 border rounded-xl flex justify-center items-center gap-3 hover:bg-gray-50 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-label="Continue with Google"
        >
            <FaGoogle className="text-[#111111]" />
            <span className="font-medium">Continue with Google</span>
        </button>
        <button
            onClick={handleAppleSignIn}
            className="py-3 px-4 border rounded-xl flex justify-center items-center gap-3 hover:bg-gray-50 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-label="Continue with Apple"
        >
            <FaApple className="text-black" />
            <span className="font-medium">Continue with Apple</span>
        </button>
    </div>
)
}
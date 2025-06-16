/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import SocialAuthButtons from './SocialAuthButtons'
import supabase from '../../utils/supabaseClient.js'
import { useNavigate } from 'react-router-dom'

const PasswordField = ({ placeholder, value, onChange, name }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      <input
        type={visible ? 'text' : 'password'}
        placeholder={placeholder}
        autoComplete="off"
        required
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border rounded-xl"
      />
      <button
        type="button"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        onClick={() => setVisible(!visible)}
        tabIndex={-1} // Prevent button from being focused
      >
        {visible ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  )
}

export default function AuthForm({ isSignup, setIsSignup, setSuccess }) {
  // const [selectedRole, setSelectedRole] = useState('job_seeker')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (isSignup && form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      let response, errorObj;

      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: {
              display_name: form.name,
              // role: selectedRole
            }
          }
        })
        response = data;
        errorObj = error;
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password
        })
        response = data;
        errorObj = error;
      }

      if (errorObj) {
        setError(errorObj.message || 'An error occurred. Please try again.')
        return
      }

      if (!isSignup) {
        navigate('/dashboard')
      }

      if (isSignup) {
        setSuccess(true)
        setForm({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        })
        // setSelectedRole('job_seeker')
      }

    } catch (err) {
      console.error('Auth Error:', err)
      setError('An unexpected error occurred. Please try again later.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-[500px] mx-auto w-full">
      <div className="text-center mb-8">
        <div className="text-3xl font-semibold text-gray-800 mb-2">
          {isSignup ? (
            <span>
              Create an Account{' '}
              <span className="inline box">🚀</span>
            </span>
          ) : (
            <span>
              Welcome Back{' '}
              <span className="inline box">👋</span>
            </span>
          )}
        </div>
      </div>

      {isSignup && <input type="text" placeholder="Full Name" required name='name' value={form.name} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl" />}

      <input autoFocus="off" type="email" placeholder="Email Address" required name='email' value={form.email} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl" />

      <PasswordField placeholder="Password" name='password' value={form.password} onChange={handleChange} className="flex-1" />

      {isSignup && <PasswordField placeholder="Confirm Password" name='confirmPassword' value={form.confirmPassword} onChange={handleChange} />}

      {/* {isSignup && (
        <div className="flex gap-4">
          <button type="button" onClick={() => setSelectedRole('job_seeker')} className={`flex-1 px-4 py-2 rounded-xl border ${selectedRole === 'job_seeker' ? 'bg-[#111111] text-white' : 'bg-gray-100'}`}>Job Seeker</button>
          <button type="button" onClick={() => setSelectedRole('recruiter')} className={`flex-1 px-4 py-2 rounded-xl border ${selectedRole === 'recruiter' ? 'bg-[#111111] text-white' : 'bg-gray-100'}`}>Recruiter</button>
        </div>
      )} */}

      {!isSignup && (
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>
          <a href="#forgot-password" className="text-sm text-blue-500">Forgot Password?</a>
        </div>
      )}

      <button type="submit" className="w-full mb-0 bg-gradient-to-r bg-[#100C08] text-[#FEFEFA] py-3 rounded-xl font-semibold text-lg shadow-lg">{isSignup ? 'Create Account' : 'Login'}</button>

      <div className="flex items-center gap-4 my-6">
        <hr className="flex-1 border-gray-300" />
        <span className="text-gray-500 text-sm">or continue with</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      <SocialAuthButtons />

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          {isSignup ? 'Already have an account?' : `Don't have an account?`}{' '}
          <button onClick={() => {
            setIsSignup(!isSignup)
            setForm({
              name: '',
              email: '',
              password: '',
              confirmPassword: ''
            })
            setError('')
          }} className="text-blue-500 underline">
            {isSignup ? 'Login here' : 'Sign up'}
          </button>
        </p>
      </div>
    </form>
  )
}
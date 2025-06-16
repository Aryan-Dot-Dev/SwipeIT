import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mb-6">Welcome to your dashboard! Here you can manage your account, view your activity, and access exclusive features.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/profile" className="bg-blue-100 rounded-lg p-4 flex flex-col items-center">
            <span className="text-2xl font-semibold text-blue-700">Profile</span>
            <p className="text-sm text-blue-700 mt-2">View and edit your profile information.</p>
          </Link>
          <Link to="/activity" className="bg-green-100 rounded-lg p-4 flex flex-col items-center">
            <span className="text-2xl font-semibold text-green-700">Activity</span>
            <p className="text-sm text-green-700 mt-2">Check your recent activity and stats.</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

import AuthPage from '../pages/AuthPage.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';

const routes = [{
    path: '/', element: <AuthPage />,
  },
  {
    path: '/dashboard', element: <Dashboard />,
  },
  {
    path: '/profile', element: <ProfilePage />,
  }
]

export { routes };
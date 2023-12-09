import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EcoPage from './pages/EcoPage';
import GlobalPage from './pages/GlobalPage';
import RootLayout from './pages/RootLayout';
import ProfilePage from './pages/ProfilePage';
import { AccountProvider } from './contexts/AccountContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <GlobalPage />,
        loader: () => {
          window.scrollTo(0, 0);
          return null;
        },
      },
      {
        path: '/profile',
        element: <ProfilePage />,
        loader: () => {
          window.scrollTo(0, 0);
          return null;
        },
      },
      {
        path: '/ecosystem',
        element: <EcoPage />,
        loader: () => {
          window.scrollTo(0, 0);
          return null;
        },
      },
    ],
  },
]);

function App() {
  return (
    <AccountProvider>
      <RouterProvider router={router} />
    </AccountProvider>
  );
}

export default App;

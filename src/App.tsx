import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '@/pages/Auth';
import UploadPage from '@/pages/UploadPage';
import { useUserStore } from '@/stores/user.store';
import { LOGIN, UPLOAD , NOT_FOUND, PRICES} from '@/constants.ts';
import { RouterProvider } from 'react-router-dom';
import { type ReactNode } from "react";
import NotFound from '@/pages/NotFound';
import Layout from './pages/Layout';
import Prices from './pages/Prices';
type Props = {
  children: ReactNode;
};
const ProtectedRoute = ({ children }:Props) => {
  const { token } = useUserStore();
  return token ? <>
  <Layout>{children}</Layout>

  </> : <Navigate to={LOGIN} />;
};
const UnProtectedRoute = ({ children }:Props) => {
  const { token } = useUserStore();
  return !token ? children : <Navigate to={UPLOAD} />;
};

 const router = createBrowserRouter([
  {
    path: LOGIN,
    element: <UnProtectedRoute><Login /></UnProtectedRoute>,
  },
  {
    path: UPLOAD,
    element: (
      <ProtectedRoute>
        <UploadPage />
      </ProtectedRoute>
    ),
  },
    {
    path: PRICES,
    element: (
      <ProtectedRoute>
        <Prices />
      </ProtectedRoute>
    ),
  },
   {
    path: NOT_FOUND,
    element: (
        <NotFound/>
    ),
  },
]);
const App  =()=>{
  return <RouterProvider router={router} />;
}
export default App
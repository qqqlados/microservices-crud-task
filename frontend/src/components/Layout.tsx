import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { ToastContainer } from 'react-toastify';
import { getUserCookie } from '../utils/auth';
export const Layout = () => {
  const user = getUserCookie();
  const location = useLocation();

  // If user is authenticated, prevent access to auth pages (sign-in / sign-up)
  if (user && (location.pathname === '/auth/sign-in' || location.pathname === '/auth/sign-up')) {
    return <Navigate to="/users" replace />;
  }

  // If there's no user cookie, redirect from protected pages to sign-in
  if (!user && location.pathname !== '/auth/sign-in' && location.pathname !== '/auth/sign-up') {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return (
    <div className="flex flex-col gap-5 px-10 mx-auto h-screen overflow-hidden">
      <Header />
      <main className="relative">
        <Outlet />
      </main>
      <ToastContainer position="top-center" />
    </div>
  );
};

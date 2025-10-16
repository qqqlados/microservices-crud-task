import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const Layout = () => {
  return (
    <div className="flex flex-col gap-5 px-10 mx-auto h-screen overflow-hidden">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

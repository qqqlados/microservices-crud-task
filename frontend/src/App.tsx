import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import { Layout } from './components/Layout';
import { Users } from './pages/Users';
import { Vehicles } from './pages/Vehicles';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/auth/sign-up" element={<SignUp />} />
          <Route path="/auth/sign-in" element={<SignIn />} />
          <Route path="/users" element={<Users />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

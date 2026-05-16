import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from '@/components/layout/PublicLayout';
import HomePage from '@/pages/HomePage';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminProjects from '@/pages/admin/AdminProjects';
import AdminSkills from '@/pages/admin/AdminSkills';
import AdminAbout from '@/pages/admin/AdminAbout';
import AdminLayout from '@/components/layout/AdminLayout';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="about" element={<AdminAbout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

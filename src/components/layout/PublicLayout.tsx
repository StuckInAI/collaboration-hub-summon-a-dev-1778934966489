import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ParticleBackground from '@/components/ui/ParticleBackground';

export default function PublicLayout() {
  return (
    <>
      <ParticleBackground />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

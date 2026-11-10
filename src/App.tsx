import { useTheme } from './hooks/useTheme';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Education from './components/Education/Education';
import Skills from './components/Skills/Skills';
import CodingProfiles from './components/CodingProfiles/CodingProfiles';
import Projects from './components/Projects/Projects';
import Achievements from './components/Achievements/Achievements';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import BackToTop from './components/UI/BackToTop';

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${theme === 'dark' ? 'dark' : 'light'}`}>
      <Navbar theme={theme} onToggleTheme={toggle} />

      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <CodingProfiles />
        <Projects />
        <Achievements />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

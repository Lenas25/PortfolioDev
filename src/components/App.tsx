import { useState } from 'react';
import type { Lang } from '../data/i18n';
import { useLenis } from '../hooks/useLenis';
import Nav from './Nav';
import Hero from './Hero';
import Marquee from './Marquee';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import { Toolbox, Contact, Footer } from './Sections';

export default function App() {
  const [lang, setLang] = useState<Lang>('es');
  useLenis();

  return (
    <>
      <Nav lang={lang} onLangChange={setLang} />
      <main>
        <Hero lang={lang} />
        <Marquee />
        <About lang={lang} />
        <Skills lang={lang} />
        <Projects lang={lang} />
        <Experience lang={lang} />
        <Toolbox lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}

import type { Metadata } from 'next';
import Hero from '../components/sections/hero';
import Features from '../components/sections/features';
import Cta from '../components/sections/cta';

export const metadata: Metadata = {
  title: 'EduFlow AI — Your AI-Powered Student Assistant',
  description:
    'Plan smarter, solve doubts instantly, generate clean notes, and track daily productivity — all in one beautifully simple workspace.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Cta />
    </>
  );
}

import { About } from "./components/About";
import { Attorneys } from "./components/Attorneys";
import { CtaBanner } from "./components/CtaBanner";
import { Hero } from "./components/Hero";
import { Insights } from "./components/Insights";
import { Services } from "./components/Services";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { Testimonials } from "./components/Testimonials";

export default function App() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <About />
        <Attorneys />
        <Testimonials />
        <Insights />
        <CtaBanner />
      </main>
      <SiteFooter />
    </>
  );
}

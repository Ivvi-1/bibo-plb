import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ValueProps from "@/components/ValueProps";
import Models from "@/components/Models";
import Products from "@/components/Products";
import Process from "@/components/Process";
import Trust from "@/components/Trust";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <ValueProps />
        <Models />
        <Products />
        <Process />
        <Trust />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

import P2Navbar from "@/components/p2/P2Navbar";
import P2Hero from "@/components/p2/P2Hero";
import P2Capabilities from "@/components/p2/P2Capabilities";
import P2Products from "@/components/p2/P2Products";
import P2Process from "@/components/p2/P2Process";
import P2Partnership from "@/components/p2/P2Partnership";
import P2Contact from "@/components/p2/P2Contact";
import P2Footer from "@/components/p2/P2Footer";

export default function HomePage() {
  return (
    <>
      <P2Navbar />
      <main>
        <P2Hero />
        <P2Capabilities />
        <P2Products />
        <P2Process />
        <P2Partnership />
        <P2Contact />
      </main>
      <P2Footer />
    </>
  );
}

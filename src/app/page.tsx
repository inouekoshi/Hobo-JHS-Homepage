import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EventOverview from "@/components/EventOverview";
import TeachersMessage from "@/components/TeachersMessage";
import Schedule from "@/components/Schedule";
import Access from "@/components/Access";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <EventOverview />
        <TeachersMessage />
        <Schedule />
        <Access />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

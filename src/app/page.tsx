import Access from "@/components/Access";
import ContactForm from "@/components/ContactForm";
import EventOverview from "@/components/EventOverview";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OpSplash from "@/components/OpSplash";
import Schedule from "@/components/Schedule";
import TeachersMessage from "@/components/TeachersMessage";
import { Divider } from "@/components/ui";

export default function Home() {
  return (
    <>
      <OpSplash />
      <Header />
      <main>
        <Hero />
        <Divider color="pink" />
        <EventOverview />
        <Divider color="green" />
        <TeachersMessage />
        <Divider color="pink" />
        <Schedule />
        <Divider color="green" />
        <Access />
        <Divider color="pink" />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

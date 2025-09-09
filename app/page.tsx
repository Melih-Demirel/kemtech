import Head from "next/head";
import NavBar from "@/components/Navbar"; // Zorg ervoor dat het pad klopt naar je NavBar component
import { Socials } from "@/components/Socials";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  title: 'Kemtech'
}

export default function Home() {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <NavBar />

      <section id="electricity" className="pt-36 pb-20 bg-red-900">
        <div className="container mx-auto">
          <h2>Elektriciteitswerk</h2>
          <p>Beschrijving van de elektriciteitsdiensten...</p>
        </div>
      </section>

      <section id="solar-panels" className="py-20 bg-red-100">
        <div className="container mx-auto">
          <h2>Zonnepanelen</h2>
          <p>Beschrijving van de zonnepanelen installatie...</p>
        </div>
      </section>

      <section id="aircos" className="py-20">
        <div className="container mx-auto">
          <h2>Airco's</h2>
          <p>Beschrijving van de airco-installatie en onderhoud...</p>
        </div>
      </section>

      <section id="charging-stations" className="py-20 bg-gray-100">
        <div className="container mx-auto">
          <h2>Laadpalen</h2>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="container mx-auto">
          <h2>Contact</h2>
          <p>Contactformulier of contactgegevens...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>

          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
        </div>
      </section>

      <section id="quote" className="py-20 bg-gray-100">
        <div className="container mx-auto">
          <h2>Maak een Offerte</h2>
          <p>Informatie over hoe een offerte aan te vragen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
          <p>Beschrijving van de installatie van laadpalen...</p>
        </div>
      </section>
      <section className="py-12">
        <h2 className="text-2xl font-semibold text-center mb-4">Contact Me</h2>
        <ContactForm />
      </section>
      <section className="">
        <Footer />
      </section>
    </>
  );
}

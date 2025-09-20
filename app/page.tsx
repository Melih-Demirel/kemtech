import Head from "next/head";
import NavBar from "@/components/Navbar";
import { Socials } from "@/components/Socials";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/FormContact";
import { ContactQuoteSection } from "@/components/ContactQuoteSection";
import { ChevronRightIcon, BoltIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

import Link from "next/link";
import Logo from "@/components/Logo";


export const metadata = {
  title: "Home | Kemtech.be",
};

const ctaStyle =
  "group cursor-pointer rounded-full border border-[#e97500ff] bg-[#e97500ff] text-black font-bold shadow-sm " +
  "px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 " +
  "transform transition-all duration-300 ease-out hover:scale-105 hover:bg-black hover:text-[#e97500ff] hover:border-black " +
  "inline-flex items-center gap-2";

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
        <meta
          name="description"
          content="Kemtech: Elektriciteitswerken, Airco (lucht-lucht), Ventilatie en Laadpalen. Actief in heel België."
        />
      </Head>

      <NavBar bgClass="bg-neutral-100" textClass="text-black" />

      {/* Hero */}
      <header className="pt-28 pb-8 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold">
            Elektriciteit • Airco • Ventilatie • Laadpalen
          </h1>
          <p className="mt-4 text-lg opacity-90">
            Professionele installatie en service – overal in België.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a href="#offerte" className={ctaStyle} aria-label="Ga naar offerte">
              <BoltIcon className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black transition-all duration-300 transform group-hover:text-[#e97500ff] group-hover:rotate-6 group-hover:scale-110" />
              Offerte aanvragen
            </a>
          </div>
        </div>
      </header>

      {/* Elektriciteitswerken */}
      <section id="elektriciteitswerken" className="scroll-mt-24 pt-16 pb-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Elektriciteitswerken (algemeen)</h2>
          <p className="text-gray-700 mb-4">
            Van <strong>bekabeling</strong> en <strong>schema’s tekenen</strong> tot zekeringkasten,
            renovaties en uitbreidingen. Netjes volgens AREI en klaar voor keuring.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-6">
            <li>Nieuwbouw & renovatie – bekabeling, stopcontacten, verlichting</li>
            <li>Schema’s (ééndraads & situatieschema) en keuring klaar maken</li>
            <li>Automatisatie/domotica (optioneel), storingen opsporen</li>
          </ul>
          {/* <a href="#quote" className="inline-block px-4 py-2 rounded-md bg-gray-900 text-white hover:opacity-90">
            Offerte voor elektriciteitswerken
          </a> */}
        </div>
      </section>

      {/* Airco (lucht-lucht) */}
      <section id="airco" className="scroll-mt-24 py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Airco (lucht-lucht)</h2>
          <p className="text-gray-700 mb-4">
            Efficiënte koeling én verwarming met split- en multi-split airco’s. Strakke afwerking, fluisterstil,
            inclusief opstart en uitleg.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-6">
            <li>Advies en juiste dimensionering per ruimte</li>
            <li>Installatie, vacuümtest en inbedrijfstelling</li>
            <li>Onderhoud & reiniging voor langdurige prestaties</li>
          </ul>
          {/* <a href="#quote" className="inline-block px-4 py-2 rounded-md bg-gray-900 text-white hover:opacity-90">
            Offerte voor airco
          </a> */}
        </div>
      </section>

      {/* Ventilatie */}
      <section id="ventilatie" className="scroll-mt-24 py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ventilatie</h2>
          <p className="text-gray-700 mb-4">
            Gezonde binnenlucht met systemen <strong>C</strong> en <strong>D</strong> (balansventilatie met warmterecuperatie).
            Netjes ingeregeld voor optimaal comfort en energiezuinigheid.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-6">
            <li>Ontwerp & plaatsing van kanalen en units</li>
            <li>Metingen, inregeling en filters</li>
            <li>Onderhoud en storingsdienst</li>
          </ul>
          {/* <a href="#quote" className="inline-block px-4 py-2 rounded-md bg-gray-900 text-white hover:opacity-90">
            Offerte voor ventilatie
          </a> */}
        </div>
      </section>

      {/* Laadpalen */}
      <section id="laadpalen" className="scroll-mt-24 py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Laadpalen</h2>
          <p className="text-gray-700 mb-4">
            Thuis of op het werk – veilige en toekomstbestendige laadoplossingen, met slimme <em>load balancing</em> en keuringsdossier.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-6">
            <li>Analyse zekeringkast en kabeltraject</li>
            <li>Installatie wallbox/paal, configuratie en app-koppeling</li>
            <li>Keuring en documentatie inbegrepen</li>
          </ul>
          {/* <a href="#quote" className="inline-block px-4 py-2 rounded-md bg-gray-900 text-white hover:opacity-90">
            Offerte voor laadpalen
          </a> */}
        </div>
      </section>

      {/* Regio / service area (kort in tekst) */}
      <section className="py-10 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">
            Actief <strong>overal in België</strong> – snelle planning en duidelijke communicatie.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section>
        <ContactQuoteSection />
      </section>
      <section className="">
        <Footer />
      </section>
    </>
  );
}

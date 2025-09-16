// app/privacy/page.tsx
import type { Metadata } from "next";
import NavBar from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Kemtech",
  description:
    "Privacybeleid van Kemtech: uitleg over welke persoonsgegevens we verzamelen, waarom en hoe we ze verwerken.",
};

export default function PrivacyPage() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <NavBar />

      {/* Hero */}
      <header className="pt-28 pb-10 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <nav className="text-sm opacity-80 mb-2">
            <a href="/" className="hover:text-orange-400 italic">Home</a>
            <span className="mx-2">/</span>
            <span className="italic">Privacy Policy</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-extrabold italic">Privacy Policy</h1>
        </div>
      </header>

      {/* Content card */}
      <main className="container mx-auto px-4 py-8">
        <article className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="prose prose-neutral max-w-none">
            <h2 className="font-bold text-lg">Inleiding</h2>
            <p>
              <strong>Kemtech</strong> hecht veel waarde aan de bescherming van uw
              persoonsgegevens. In dit privacybeleid leggen we uit welke gegevens we
              verzamelen, waarom, hoe lang we ze bewaren en welke rechten u heeft.
            </p>

            <h2 className="font-bold text-lg mt-8 mb-2">Wie is verantwoordelijke?</h2>
            <p>
              <strong>Kemtech</strong><br />
              E-mail: <a href="mailto:info@kemtech.be" className="hover:text-orange-600">info@kemtech.be</a><br />
              Ondernemingsnummer: BE 1026.389.563
            </p>

            <h2 className="font-bold text-lg mt-8 mb-2">Welke gegevens verzamelen we?</h2>
            <ul>
              <li><strong>Contact- en offerteformulier:</strong> naam, e-mailadres, telefoonnummer en uw bericht of projectomschrijving.</li>
              <li><strong>Technisch:</strong> enkel noodzakelijke gegevens voor het functioneren van de website (bijv. beveiligingslogboeken). We gebruiken geen trackingcookies zonder toestemming.</li>
            </ul>

            <h2 className="font-bold text-lg mt-8 mb-2">Waarom verwerken we uw gegevens?</h2>
            <ul>
              <li><strong>Om uw vraag te beantwoorden</strong> en een offerte te bezorgen.</li>
              <li><strong>Voor communicatie en planning</strong> rond de werken.</li>
              <li><strong>Voor beveiliging en misbruikpreventie</strong> van de website.</li>
            </ul>

            <h2 className="font-bold text-lg mt-8 mb-2">Rechtsgrond</h2>
            <ul>
              <li><strong>Toestemming:</strong> wanneer u ons formulier verstuurt (u vinkt aan dat u akkoord gaat met dit privacybeleid).</li>
              <li><strong>Contractuele noodzaak:</strong> voor opvolging van uw offerte-aanvraag.</li>
              <li><strong>Gerechtvaardigd belang:</strong> voor beveiliging en misbruikpreventie.</li>
            </ul>

            <h2 className="font-bold text-lg mt-8 mb-2">Bewaartermijn</h2>
            <p>
              Wij bewaren uw gegevens niet langer dan nodig: in principe maximaal{" "}
              <strong>24 maanden</strong> na het laatste contact, tenzij een langere
              bewaartermijn wettelijk vereist is (bijv. voor facturatie of garantie).
            </p>

            <h2 className="font-bold text-lg mt-8 mb-2">Delen van gegevens</h2>
            <p>
              Wij verkopen uw gegevens niet. Uw gegevens worden enkel gedeeld met
              dienstverleners die nodig zijn om communicatie of IT-diensten te verzorgen
              (bijv. e-mailprovider, hostingpartij). Met deze partijen sluiten wij
              verwerkersovereenkomsten en gegevens blijven waar mogelijk binnen de EU/EER.
            </p>

            <h2 className="font-bold text-lg mt-8 mb-2">Uw rechten</h2>
            <ul>
              <li>Recht op inzage, correctie of wissing van uw gegevens</li>
              <li>Recht op beperking van de verwerking en bezwaar</li>
              <li>Recht op gegevensoverdraagbaarheid</li>
              <li>Recht om uw toestemming in te trekken</li>
            </ul>
            <p>
              U kunt uw rechten uitoefenen door een e-mail te sturen naar{" "}
              <a href="mailto:info@kemtech.be" className="hover:text-orange-600">info@kemtech.be</a>.
              Wij reageren zo snel mogelijk en uiterlijk binnen de wettelijke termijn.
            </p>

            <h2 className="font-bold text-lg mt-8 mb-2">Beveiliging</h2>
            <p>
              Wij nemen passende technische en organisatorische maatregelen om uw
              gegevens te beschermen, zoals versleuteling en toegangsbeheer.
            </p>

            <h2 className="font-bold text-lg mt-8 mb-2">Wijzigingen</h2>
            <p>
              Dit privacybeleid kan worden aangepast. Belangrijke wijzigingen worden
              aangekondigd via deze pagina. Versie: {currentYear}.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}

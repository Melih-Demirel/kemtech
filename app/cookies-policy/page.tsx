// app/cookies/page.tsx
import type { Metadata } from "next";
import NavBar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy | Kemtech",
  description:
    "Cookiebeleid van Kemtech: uitleg over (het ontbreken van) trackingcookies en functionele cookies.",
};

export default function CookiesPage() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <NavBar />
      {/* Hero */}
      <header className="pt-32 pb-10 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <nav className="text-sm opacity-80 mb-2">
            <Link href="/" className="hover:text-orange-400 italic">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="italic">Cookie Policy</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-extrabold italic ">Cookie Policy</h1>
        </div>
      </header>

      {/* Status badge */}
      <section className="bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl mt-8 mb-6">
            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
              <strong className="font-semibold">Goed om te weten:</strong>{" "}
              Kemtech plaatst momenteel <u>geen</u> marketing- of trackingcookies. Alleen
              functionele/essentiële cookies die nodig zijn voor de werking van de site.
            </div>
          </div>
        </div>
      </section>

      {/* Content card */}
      <main className="container mx-auto px-4 py-8">
        <article className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="prose prose-neutral max-w-none">

            <h2 className="font-bold text-lg">Wat zijn cookies?</h2>
            <p>
              Cookies zijn kleine tekstbestanden die bij het bezoeken van websites op uw
              apparaat worden geplaatst. Ze helpen om de website goed te laten werken en
              kunnen ook gebruikt worden om gebruik te analyseren of te personaliseren.
            </p>

            <h2 className="font-bold text-lg mt-8 mb-2">Welke cookies gebruikt Kemtech?</h2>
            <ul>
              <li>
                <strong>Functionele/essentiële cookies</strong>: noodzakelijk om de site
                technisch correct te laten werken (bijv. beveiliging, formulierverzending,
                basisinstellingen). Deze plaatsen we zonder toestemming.
              </li>
            </ul>
            <p>
              <strong>
                We gebruiken momenteel géén marketingcookies of trackingcookies
              </strong>{" "}
              (zoals advertentiecookies). Indien we in de toekomst analytische of
              marketingcookies willen inzetten, zullen we eerst uw toestemming vragen via
              een cookiebanner en dit beleid bijwerken.
            </p>

            <h3 className="font-bold text-md mt-8">Overzicht (huidige situatie)</h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border-b border-gray-200 p-2 text-left">Categorie</th>
                    <th className="border-b border-gray-200 p-2 text-left">Doel</th>
                    <th className="border-b border-gray-200 p-2 text-left">Voorbeeld</th>
                    <th className="border-b border-gray-200 p-2 text-left">Bewaartermijn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b border-gray-200 p-2">Functioneel / Essentieel</td>
                    <td className="border-b border-gray-200 p-2">
                      Basiswerking van de site (beveiliging, formulierverzending).
                    </td>
                    <td className="border-b border-gray-200 p-2">Sessiecookies</td>
                    <td className="border-b border-gray-200 p-2">Sessieduur</td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-200 p-2">Analytics (cookieloos)</td>
                    <td className="border-b border-gray-200 p-2">
                      Optioneel, geaggregeerde statistieken zonder trackingcookies.
                    </td>
                    <td className="border-b border-gray-200 p-2">
                      Plausible/Umami (indien geactiveerd)
                    </td>
                    <td className="border-b border-gray-200 p-2">n.v.t. (cookieloos)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-bold text-lg mt-10">Cookieloze analytics (optioneel)</h2>
            <p>
              Als we privacyvriendelijke, cookieloze statistieken gebruiken (bv. om
              geaggregeerd bezoekersaantal te zien), worden er geen trackingcookies
              geplaatst en is geen toestemming vereist. Dit beleid wordt bijgewerkt wanneer
              relevant.
            </p>

            <h2 className="font-bold text-lg mt-10">Beheer van cookies</h2>
            <p>
              U kunt cookies beheren of verwijderen via uw browserinstellingen. Houd er
              rekening mee dat het uitschakelen van essentiële cookies de werking van de
              site kan beïnvloeden.
            </p>

            <h2 className="font-bold text-lg mt-10">Contact</h2>
            <p>
              Vragen? Mail ons op{" "}
              <a href="mailto:info@kemtech.be" className="hover:text-orange-600">
                info@kemtech.be
              </a>
              . Versie: {currentYear}.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

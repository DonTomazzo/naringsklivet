import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Database, Eye, Trash2, Mail, Globe, Lock, UserCheck } from 'lucide-react';

const sections = [
  {
    icon: Shield,
    title: '1. Personuppgiftsansvarig',
    content: [
      {
        text: 'Styrelsekörkortet ("vi", "oss") är personuppgiftsansvarig för behandlingen av dina personuppgifter. Vi behandlar dina uppgifter i enlighet med dataskyddsförordningen (GDPR, EU 2016/679) och kompletterande svensk lagstiftning.',
      },
      {
        text: 'Kontaktuppgifter: [Företagsnamn] · Org.nr [XXX] · [Adress] · [e-post] · styrelsekörkortet.se',
      },
    ],
  },
  {
    icon: Database,
    title: '2. Vilka uppgifter vi samlar in',
    content: [
      {
        subtitle: 'Vid köp och registrering',
        text: 'Namn, e-postadress, faktureringsadress, telefonnummer och betalningsinformation. Betalkortsuppgifter hanteras direkt av vår betalningsleverantör och lagras aldrig hos oss.',
      },
      {
        subtitle: 'Vid användning av plattformen',
        text: 'Kursframsteg, genomförda quiz, resultat på slutprov, inloggningshistorik och teknisk information som IP-adress och webbläsartyp.',
      },
      {
        subtitle: 'Vid kontakt med oss',
        text: 'Namn, e-postadress och innehållet i ditt meddelande när du kontaktar oss via e-post eller kontaktformulär.',
      },
      {
        subtitle: 'Cookies och spårning',
        text: 'Vi använder nödvändiga cookies för att plattformen ska fungera, samt analytiska cookies för att förstå hur tjänsten används. Se vår cookiepolicy för mer information.',
      },
    ],
  },
  {
    icon: UserCheck,
    title: '3. Varför vi behandlar dina uppgifter',
    content: [
      {
        subtitle: 'Fullgöra avtal (Art. 6.1b)',
        text: 'Vi behandlar dina uppgifter för att leverera kursen, hantera din betalning, ge dig tillgång till plattformen och utfärda ditt certifikat.',
      },
      {
        subtitle: 'Rättslig förpliktelse (Art. 6.1c)',
        text: 'Vi sparar bokföringsunderlag i enlighet med bokföringslagen (7 år) och hanterar moms enligt skattelagstiftningen.',
      },
      {
        subtitle: 'Berättigat intresse (Art. 6.1f)',
        text: 'Vi kan skicka relevant information om uppdateringar av kursmaterial och relaterade utbildningar. Du kan när som helst avregistrera dig från sådana utskick.',
      },
      {
        subtitle: 'Samtycke (Art. 6.1a)',
        text: 'För marknadsföringsutskick och nyhetsbrev inhämtar vi ditt uttryckliga samtycke. Du kan när som helst återkalla ditt samtycke.',
        highlight: true,
      },
    ],
  },
  {
    icon: Globe,
    title: '4. Delning av personuppgifter',
    content: [
      {
        text: 'Vi säljer aldrig dina personuppgifter till tredje part. Vi kan dela uppgifter med följande kategorier av mottagare:',
      },
      {
        subtitle: 'Betalningsleverantörer',
        text: 'För att hantera betalningar delar vi nödvändiga uppgifter med vår betalningsleverantör. De agerar som självständiga personuppgiftsansvariga för sin del av behandlingen.',
      },
      {
        subtitle: 'Tekniska leverantörer',
        text: 'Vi använder molntjänster och tekniska plattformar (bl.a. Supabase för databas) för att driva vår tjänst. Dessa agerar som personuppgiftsbiträden enligt ingångna biträdesavtal.',
      },
      {
        subtitle: 'Myndigheter',
        text: 'Vi kan lämna ut uppgifter om vi är skyldiga att göra det enligt lag eller myndighetsbeslut.',
      },
    ],
  },
  {
    icon: Lock,
    title: '5. Överföring utanför EU/EES',
    content: [
      {
        text: 'Vi strävar efter att hålla all databehandling inom EU/EES. Om uppgifter överförs till ett tredjeland säkerställer vi att lämpliga skyddsåtgärder finns på plats, exempelvis genom EU-kommissionens standardavtalsklausuler (SCC).',
      },
    ],
  },
  {
    icon: Trash2,
    title: '6. Hur länge vi sparar dina uppgifter',
    content: [
      {
        subtitle: 'Kunduppgifter och kursdata',
        text: 'Dina kontouppgifter och kursframsteg sparas så länge du har ett aktivt konto hos oss, samt en rimlig period därefter för att hantera eventuella ärenden.',
      },
      {
        subtitle: 'Bokföringsunderlag',
        text: 'Fakturor och betalningsunderlag sparas i 7 år enligt bokföringslagen.',
      },
      {
        subtitle: 'Certifikat',
        text: 'Uppgifter kopplade till utfärdade certifikat sparas för att möjliggöra verifiering av genomförd utbildning.',
      },
      {
        subtitle: 'Marknadsföring',
        text: 'Uppgifter för marknadsföringsändamål sparas tills du avregistrerar dig eller återkallar ditt samtycke.',
        highlight: true,
      },
    ],
  },
  {
    icon: Eye,
    title: '7. Dina rättigheter',
    content: [
      {
        subtitle: 'Rätt till tillgång',
        text: 'Du har rätt att begära ett kostnadsfritt registerutdrag över de personuppgifter vi behandlar om dig.',
      },
      {
        subtitle: 'Rätt till rättelse',
        text: 'Du har rätt att begära att felaktiga eller ofullständiga uppgifter om dig korrigeras.',
      },
      {
        subtitle: 'Rätt till radering ("rätten att bli glömd")',
        text: 'Du kan begära att vi raderar dina personuppgifter. Observera att vi kan ha en skyldighet att behålla vissa uppgifter, exempelvis bokföringsunderlag.',
      },
      {
        subtitle: 'Rätt till begränsning',
        text: 'Du kan begära att vi begränsar behandlingen av dina uppgifter i vissa situationer.',
      },
      {
        subtitle: 'Rätt till dataportabilitet',
        text: 'Du har rätt att få ut dina uppgifter i ett maskinläsbart format för att överföra dem till annan tjänst.',
      },
      {
        subtitle: 'Rätt att invända',
        text: 'Du kan invända mot behandling som grundar sig på berättigat intresse, inklusive direktmarknadsföring.',
        highlight: true,
      },
    ],
  },
  {
    icon: Mail,
    title: '8. Hur du utövar dina rättigheter',
    content: [
      {
        text: 'Skicka din begäran till [e-post]. Vi besvarar din begäran inom 30 dagar. Vi kan behöva verifiera din identitet innan vi behandlar din begäran.',
      },
      {
        text: 'Om du anser att vi behandlar dina personuppgifter på ett felaktigt sätt har du rätt att lämna in ett klagomål till Integritetsskyddsmyndigheten (IMY) på imy.se.',
      },
    ],
  },
  {
    icon: Shield,
    title: '9. Säkerhet',
    content: [
      {
        text: 'Vi vidtar lämpliga tekniska och organisatoriska säkerhetsåtgärder för att skydda dina personuppgifter mot obehörig åtkomst, förlust eller förstöring. Bland annat använder vi krypterad kommunikation (HTTPS), åtkomstkontroller och regelbundna säkerhetsöversyner.',
      },
      {
        text: 'Vid en personuppgiftsincident som kan innebära hög risk för dig kommer vi att informera dig utan onödigt dröjsmål.',
      },
    ],
  },
  {
    icon: Shield,
    title: '10. Cookies',
    content: [
      {
        subtitle: 'Nödvändiga cookies',
        text: 'Krävs för att plattformen ska fungera – inloggning, sessionshantering och säkerhet. Dessa kan inte stängas av.',
      },
      {
        subtitle: 'Analytiska cookies',
        text: 'Hjälper oss förstå hur besökare använder webbplatsen. Vi använder anonymiserad data och kräver ditt samtycke för dessa cookies.',
      },
      {
        subtitle: 'Marknadsföringscookies',
        text: 'Används för att visa relevanta annonser. Vi kräver ditt uttryckliga samtycke och du kan när som helst ändra dina inställningar.',
        highlight: true,
      },
    ],
  },
  {
    icon: Shield,
    title: '11. Ändringar av integritetspolicyn',
    content: [
      {
        text: 'Vi kan komma att uppdatera denna policy. Väsentliga ändringar meddelas via e-post till registrerade användare. Senaste version finns alltid tillgänglig på styrelsekörkortet.se/integritetspolicy.',
      },
    ],
  },
];

const IntegritetspolicyPage = () => {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-[#E9ECF1]">

      {/* Header */}
      <div className="bg-[#171f32] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Tillbaka
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#FF5421' + '1A' }}>
              <Shield size={20} style={{ color: '#FF5421' }} />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#FF5421' }}>
              GDPR & Dataskydd
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Integritetspolicy
          </h1>
          <p className="text-white/50 text-sm">
            Senast uppdaterad: {today} · <span className="font-semibold text-white/70">Styrelsekörkortet</span>
          </p>
        </div>
      </div>

      {/* Intro-box */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <p className="text-gray-600 text-sm leading-relaxed">
            Din integritet är viktig för oss. Den här policyn förklarar vilka personuppgifter vi samlar in,
            varför vi gör det, hur länge vi sparar dem och vilka rättigheter du har. Vi behandlar dina uppgifter
            i enlighet med EU:s dataskyddsförordning (GDPR).
          </p>
        </div>
      </div>

      {/* Sektioner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 space-y-4">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#FF5421' + '1A' }}>
                  <Icon size={16} style={{ color: '#FF5421' }} />
                </div>
                <h2 className="font-bold text-gray-900 text-base">{section.title}</h2>
              </div>

              <div className="px-6 py-5 space-y-4">
                {section.content.map((block, i) => (
                  <div key={i}>
                    {block.subtitle && (
                      <p className="text-sm font-bold text-gray-900 mb-1">{block.subtitle}</p>
                    )}
                    <p className={`text-sm leading-relaxed ${
                      block.highlight
                        ? 'bg-orange-50 border-l-4 border-[#FF5421] pl-4 py-3 rounded-r-lg text-gray-700 font-medium'
                        : 'text-gray-600'
                    }`}>
                      {block.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* Footer-not */}
        <div className="bg-[#171f32] rounded-2xl p-6 text-center">
          <p className="text-white/50 text-xs mb-2">Frågor om vår hantering av personuppgifter?</p>
          <p className="text-white font-semibold text-sm">
            Kontakta oss på{' '}
            <span style={{ color: '#FF5421' }}>[e-post]</span>
            {' '}– vi svarar inom 1–2 vardagar.
          </p>
          <p className="text-white/30 text-xs mt-3">
            Du kan också kontakta Integritetsskyddsmyndigheten (IMY) på{' '}
            <span className="text-white/50">imy.se</span>
          </p>
          <p className="text-white/30 text-xs mt-4">
            Styrelsekörkortet · Org.nr [XXX] · styrelsekörkortet.se
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntegritetspolicyPage;
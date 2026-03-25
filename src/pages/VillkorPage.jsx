import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, FileText, CreditCard, Lock, AlertTriangle, Users, Gavel } from 'lucide-react';

const sections = [
  {
    icon: Users,
    title: '1. Parter',
    content: [
      {
        text: 'Dessa allmänna villkor gäller mellan Styrelsekörkortet ("vi", "oss", "Tjänsteleverantören") och den fysiska eller juridiska person ("Kunden") som genomför ett köp via styrelsekörkortet.se.',
      },
      {
        text: 'Genom att genomföra ett köp godkänner Kunden dessa villkor i sin helhet. Vid frågor om villkoren, kontakta oss på [e-post].',
      },
    ],
  },
  {
    icon: FileText,
    title: '2. Tjänstens beskrivning',
    content: [
      {
        subtitle: 'Vad ingår',
        text: 'Styrelsekörkortet är en digital utbildning bestående av förinspelat videomaterial, interaktiva quiz, kursdokument och övrigt digitalt kursmaterial som levereras via vår onlineplattform.',
      },
      {
        subtitle: 'Tillgång',
        text: 'Kunden erhåller livstidsåtkomst till det kursmaterial som ingick vid köptillfället, så länge plattformen är i drift. Vi förbehåller oss rätten att uppdatera och förbättra materialet löpande.',
      },
      {
        subtitle: 'Certifikat',
        text: 'Vid godkänt slutprov (minst 80% rätt) utfärdas ett digitalt utbildningsdiplom. Diplomet är personligt och får inte överlåtas.',
      },
    ],
  },
  {
    icon: FileText,
    title: '3. Beställning och bekräftelse',
    content: [
      {
        text: 'Ett avtal anses ingånget när Kunden genomfört betalning och erhållit en orderbekräftelse via e-post. Kunden ansvarar för att angiven e-postadress är korrekt.',
      },
      {
        text: 'Tillgång till kursmaterialet aktiveras automatiskt efter genomförd betalning, normalt inom några minuter. Vid tekniska problem kontakta oss på [e-post].',
      },
    ],
  },
  {
    icon: CreditCard,
    title: '4. Pris och betalning',
    content: [
      {
        subtitle: 'Priser',
        text: 'Alla priser anges i svenska kronor (SEK) inklusive moms (25%) om inget annat anges. För företagskunder kan priser exklusive moms visas separat.',
      },
      {
        subtitle: 'Betalningsmetoder',
        text: 'Betalning sker via de betalningsmetoder som anges vid köptillfället. Betalning ska erläggas i samband med beställningen.',
      },
      {
        subtitle: 'Utebliven betalning',
        text: 'Vid utebliven eller misslyckad betalning aktiveras inte kursen. Vid dröjsmål med betalning förbehåller vi oss rätten att debitera dröjsmålsränta enligt räntelagen (för närvarande referensränta + 8 procentenheter).',
      },
    ],
  },
  {
    icon: Shield,
    title: '5. Ångerrätt och avbokning',
    content: [
      {
        subtitle: 'Privatpersoner – 14 dagars ångerrätt',
        text: 'Som privatperson har du enligt distansavtalslagen rätt att ångra ditt köp inom 14 dagar från köpdatum, förutsatt att du inte påbörjat nyttjandet av det digitala innehållet.',
      },
      {
        subtitle: 'Viktigt – avstående av ångerrätt',
        text: 'Genom att bocka i rutan "Jag godkänner att leveransen påbörjas omedelbart och att ångerrätten därmed upphör" i samband med köpet, samtycker du till att ångerrätten upphör i samma stund som du får tillgång till kursmaterialet. Detta är i enlighet med 2 kap. 11 § distansavtalslagen.',
        highlight: true,
      },
      {
        subtitle: 'Företagskunder',
        text: 'Juridiska personer (företag, föreningar och organisationer) har ingen lagstadgad ångerrätt. Köpet är bindande från det att orderbekräftelse skickats.',
      },
      {
        subtitle: 'Avbokning av uppstartsmöte',
        text: 'Bokade uppstartsmöten kan avbokas kostnadsfritt senast 48 timmar före bokad tid. Vid senare avbokning eller uteblivet möte debiteras en avbokningsavgift om 500 kr exkl. moms.',
      },
    ],
  },
  {
    icon: Lock,
    title: '6. Immateriella rättigheter',
    content: [
      {
        text: 'Allt material på plattformen – inklusive videolektioner, texter, bilder, quiz och dokument – är Tjänsteleverantörens egendom och skyddat av upphovsrätt.',
      },
      {
        subtitle: 'Din licens',
        text: 'Kunden erhåller en personlig, icke-överlåtbar licens att ta del av materialet för privat och internt bruk. Licensen är strikt personlig.',
      },
      {
        subtitle: 'Förbjudet',
        text: 'Det är strikt förbjudet att: (1) kopiera, reproducera eller distribuera kursmaterialet, (2) sälja eller vidarebefordra inloggningsuppgifter till annan person, (3) använda materialet i kommersiellt syfte utan skriftligt tillstånd, (4) spela in videolektioner eller ta skärmdumpar i spridningssyfte.',
        highlight: true,
      },
      {
        text: 'Överträdelse av dessa bestämmelser kan leda till omedelbar stängning av kontot utan återbetalning samt skadeståndsansvar.',
      },
    ],
  },
  {
    icon: AlertTriangle,
    title: '7. Driftavbrott och tekniska förutsättningar',
    content: [
      {
        text: 'Vi strävar efter hög tillgänglighet men kan inte garantera att plattformen är tillgänglig utan avbrott. Planerat underhåll meddelas i förväg när möjligt.',
      },
      {
        text: 'Kunden ansvarar för att ha tillgång till en fungerande internetuppkoppling, kompatibel webbläsare och de tekniska förutsättningar som krävs för att nyttja tjänsten.',
      },
      {
        text: 'Vi ansvarar inte för eventuella förluster som uppstår till följd av tillfälliga driftavbrott, tekniska fel hos tredjepartstjänster eller omständigheter utanför vår kontroll.',
      },
    ],
  },
  {
    icon: Shield,
    title: '8. Ansvarsbegränsning',
    content: [
      {
        text: 'Kursmaterialet är framtaget för utbildningsändamål och baserat på gällande lagstiftning och praxis vid produktionstillfället. Det utgör inte juridisk rådgivning.',
      },
      {
        text: 'Vi garanterar inte specifika resultat av genomförd utbildning. Varje förening och situation är unik och utfallet beror på hur kunskapen tillämpas.',
      },
      {
        text: 'Vårt skadeståndsansvar är under alla omständigheter begränsat till det belopp Kunden erlagt för tjänsten.',
      },
    ],
  },
  {
    icon: Shield,
    title: '9. Behandling av personuppgifter (GDPR)',
    content: [
      {
        text: 'Vi behandlar dina personuppgifter i enlighet med vår integritetspolicy och dataskyddsförordningen (GDPR). Genom att genomföra ett köp samtycker du till behandling av nödvändiga personuppgifter för att fullgöra avtalet.',
      },
      {
        text: 'Vi delar inte dina personuppgifter med tredje part utan ditt samtycke, förutom vad som krävs för betalningshantering och teknisk drift av plattformen.',
      },
      {
        text: 'Du har rätt att begära utdrag, rättelse eller radering av dina personuppgifter. Kontakta oss på [e-post] för sådana ärenden.',
      },
    ],
  },
  {
    icon: Gavel,
    title: '10. Tvistelösning och tillämplig lag',
    content: [
      {
        text: 'Dessa villkor regleras av svensk rätt. Vid tvist ska parterna i första hand försöka lösa denna genom förhandling.',
      },
      {
        text: 'Som privatperson har du rätt att vända dig till Allmänna reklamationsnämnden (ARN) om du är missnöjd med vår hantering av ett klagomål. Mer information finns på arn.se.',
      },
      {
        text: 'Om tvist inte kan lösas i godo ska den avgöras av allmän domstol med Lunds tingsrätt som första instans.',
      },
    ],
  },
  {
    icon: FileText,
    title: '11. Ändringar av villkor',
    content: [
      {
        text: 'Vi förbehåller oss rätten att uppdatera dessa villkor. Väsentliga ändringar meddelas via e-post till registrerade användare minst 30 dagar innan de träder i kraft.',
      },
      {
        text: 'Fortsatt nyttjande av tjänsten efter att ändringar trätt i kraft anses som godkännande av de nya villkoren.',
      },
    ],
  },
];

const VillkorPage = () => {
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
            <div className="w-10 h-10 rounded-xl bg-[#FF5421]/20 flex items-center justify-center">
              <FileText size={20} style={{ color: '#FF5421' }} />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#FF5421' }}>
              Juridisk information
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Allmänna villkor
          </h1>
          <p className="text-white/50 text-sm">
            Gäller från och med {today} · <span className="font-semibold text-white/70">Styrelsekörkortet</span>
          </p>
        </div>
      </div>

      {/* Intro-box */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <p className="text-gray-600 text-sm leading-relaxed">
            Dessa allmänna villkor ("Villkoren") gäller för alla köp och användning av tjänster från Styrelsekörkortet.
            Läs igenom dem noggrant innan du genomför ett köp. Genom att slutföra en beställning accepterar du dessa villkor.
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
              {/* Sektion-header */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#FF5421' + '1A' }}>
                  <Icon size={16} style={{ color: '#FF5421' }} />
                </div>
                <h2 className="font-bold text-gray-900 text-base">{section.title}</h2>
              </div>

              {/* Innehåll */}
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
          <p className="text-white/50 text-xs mb-2">Frågor om dessa villkor?</p>
          <p className="text-white font-semibold text-sm">
            Kontakta oss på{' '}
            <span style={{ color: '#FF5421' }}>[e-post]</span>
            {' '}– vi svarar inom 1–2 vardagar.
          </p>
          <p className="text-white/30 text-xs mt-4">
            Styrelsekörkortet · Org.nr [XXX] · styrelsekörkortet.se
          </p>
        </div>
      </div>
    </div>
  );
};

export default VillkorPage;
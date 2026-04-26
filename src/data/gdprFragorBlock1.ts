// src/data/gdprFragorBlock1.ts
// Block 1: Grunderna
// 12 scenarier om GDPR:s grundprinciper, personuppgifter, rättsliga
// grunder och medlemmarnas rättigheter — anpassade till SlideK-format
// utifrån det 50-frågors GDPR-material som redan finns.

import type { SlideKFraga } from '../components/CourseElements/SlideTemplates';

export const gdprFragorBlock1: SlideKFraga[] = [

  // ── 1. Privat mejl (klassisk Privacy by Design) ──────
  {
    id: 1,
    persona: 'Lisa',
    roll: 'Nyvald ordförande, BRF Solgläntan',
    bild: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    kategori: 'Privacy by Design',
    rubrik: 'Privat mejl för',
    rubrikOrange: 'styrelsearbete?',
    bubbla: '"Jag börjar direkt använda min privata mejl lisa.andersson@gmail.com för allt styrelsearbete. Det är enklare så."',
    fraga: 'Är detta okej enligt GDPR?',
    typ: 'single',
    alternativ: [
      { text: 'Ja — om Lisa är försiktig med sina mejl', korrekt: false },
      { text: 'Nej — styrelsen bör använda föreningsmejl', korrekt: true },
      { text: 'Ja — om hon aktiverar tvåfaktorsinloggning', korrekt: false },
      { text: 'Det spelar ingen roll vilken mejl som används', korrekt: false },
    ],
    feedback: {
      rubrik: 'Föreningsmejl är Privacy by Design',
      sammanfattning: 'Privata mejlkonton skapar tre problem: föreningen tappar kontroll över informationen när Lisa slutar, säkerheten är utanför föreningens ansvar, och åtkomsten försvinner om hon är sjuk eller borta. Föreningsmejl är den enda hållbara lösningen.',
      sektioner: [
        {
          rubrik: 'Kontrollförlust',
          text: 'När Lisa slutar i styrelsen tar hon med sig all information i sin inkorg. Nästa ordförande börjar från noll.',
        },
        {
          rubrik: 'Säkerhet',
          text: 'Föreningen har ingen kontroll över säkerheten i Lisas privata konto — delade lösenord, saknad kryptering, mejlen kan redan vara hackade.',
        },
      ],
      exempel: 'Rätt: ordforande@brf-solglantan.se — informationen stannar i föreningen, säkerheten kontrolleras av er, och byten mellan ordförande blir sömlösa.',
    },
  },

  // ── 2. Vad är personuppgift? (multiple) ──────────────
  {
    id: 2,
    persona: 'Styrelsen',
    roll: 'Diskuterar personuppgifter',
    bild: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80',
    kategori: 'Personuppgifter',
    bubbla: '"Vi är osäkra — vilka av uppgifterna i vårt system räknas egentligen som personuppgifter enligt GDPR?"',
    fraga: 'Vilka av följande är personuppgifter?',
    typ: 'multiple',
    alternativ: [
      { text: 'Lägenhetsnummer (t.ex. 1402)', korrekt: true },
      { text: 'Tvättstugebokningar kopplade till lägenhetsnummer', korrekt: true },
      { text: 'Loggar från passersystemet med tidsstämplar', korrekt: true },
      { text: 'Försenade avgiftsbetalningar', korrekt: true },
      { text: 'Aggregerad statistik utan koppling till enskilda', korrekt: false },
    ],
    feedback: {
      rubrik: 'Alla fyra första är personuppgifter',
      sammanfattning: 'GDPR är bredare än många tror. Allt som direkt eller indirekt kan kopplas till en levande fysisk person är en personuppgift — oavsett format eller om kopplingen är uppenbar.',
      sektioner: [
        {
          rubrik: 'Direkta vs indirekta',
          text: 'Direkta: namn, personnummer. Indirekta: lägenhetsnummer, IP-adress, MAC-adress. Båda skyddas av GDPR eftersom de kan kopplas till en person.',
        },
        {
          rubrik: 'Aggregerad data är inte personuppgift',
          text: 'Statistik som "47 bokningar per månad" utan koppling till enskilda personer är inte personuppgifter. Om den kan anonymiseras är det bättre ur GDPR-perspektiv.',
        },
      ],
      exempel: 'Regeln: om informationen kan kopplas till en identifierbar person — direkt eller indirekt — är det en personuppgift. Då gäller GDPR.',
    },
  },

  // ── 3. Rättslig grund för medlemsförteckning ─────────
  {
    id: 3,
    persona: 'Ny medlem',
    roll: 'Ifrågasätter registrering',
    bild: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80',
    kategori: 'Rättslig grund',
    rubrik: 'Behöver vi',
    rubrikOrange: 'samtycke?',
    bubbla: '"Måste medlemmarna ge samtycke för att ni ska få föra medlemsförteckningen? Jag tycker inte om att ni har mina uppgifter."',
    fraga: 'Vilken rättslig grund gäller för medlemsförteckningen?',
    typ: 'single',
    alternativ: [
      { text: 'Samtycke — alla medlemmar måste godkänna', korrekt: false },
      { text: 'Rättslig förpliktelse — Bostadsrättslagen kräver det', korrekt: true },
      { text: 'Berättigat intresse — föreningens nytta väger tyngre', korrekt: false },
      { text: 'Avtal — medlemskapet är ett avtal', korrekt: false },
    ],
    feedback: {
      rubrik: 'Rättslig förpliktelse — inget samtycke krävs',
      sammanfattning: 'Bostadsrättslagen (BRL) kräver att föreningen för en medlemsförteckning. När lagen kräver behandlingen behövs inget samtycke — och medlemmen kan inte vägra.',
      sektioner: [
        {
          rubrik: 'Sex rättsliga grunder',
          text: 'GDPR har sex lagliga grunder: samtycke, avtal, rättslig förpliktelse, skydd av vitala intressen, allmänt intresse och berättigat intresse. Välj den starkaste som passar syftet.',
        },
        {
          rubrik: 'Undvik samtycke när möjligt',
          text: 'Samtycke är ofta den svagaste grunden eftersom det kan återkallas. Använd avtal eller rättslig förpliktelse där det passar.',
        },
      ],
      exempel: 'Praktisk konsekvens: medlemmar kan inte säga "jag vill inte stå i ert register" — lagen kräver det. Ni är däremot skyldiga att behandla uppgifterna säkert.',
    },
  },

  // ── 4. Kameraövervakning — proportionalitetsbedömning ─
  {
    id: 4,
    persona: 'Styrelsen',
    roll: 'Vill sätta upp kamera',
    bild: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    kategori: 'Kameraövervakning',
    bubbla: '"Cykelstölder har blivit ett problem. Vi vill sätta upp en kamera i cykelförrådet. Vad måste vi göra först?"',
    fraga: 'Vilket är första steget innan kameran sätts upp?',
    typ: 'single',
    alternativ: [
      { text: 'Anmäla kameran till IMY innan installation', korrekt: false },
      { text: 'Be alla medlemmar om samtycke', korrekt: false },
      { text: 'Göra och dokumentera en proportionalitetsbedömning', korrekt: true },
      { text: 'Sätta upp kameran direkt — det är föreningens egendom', korrekt: false },
    ],
    feedback: {
      rubrik: 'Proportionalitet kommer först — alltid',
      sammanfattning: 'Kameraövervakning är ett integritetsintrång. Innan ni installerar måste ni dokumentera varför intrånget är motiverat, vilka alternativ ni övervägt och varför nyttan väger tyngre än integriteten.',
      sektioner: [
        {
          rubrik: 'Bedömning att dokumentera',
          text: 'Är behandlingen laglig, korrekt, rimlig och berättigad? Väger föreningens intresse (stoppa stölder) tyngre än medlemmarnas integritet? Finns alternativ — bättre lås, belysning, rondering?',
        },
        {
          rubrik: 'Skylta tydligt',
          text: 'Kameraövervakning kräver synlig skyltning med kontaktuppgifter till den personuppgiftsansvarige. Utan skylt är bevakningen otillåten oavsett syfte.',
        },
      ],
      exempel: 'Rätt: styrelseprotokoll där ni skriver "Alternativ A: bättre lås (30 000 kr) — B: belysning (15 000 kr) — C: kamera med skyltning (25 000 kr). Väljer C efter tre cykelstölder senaste halvåret."',
    },
  },

  // ── 5. Registerutdrag — tidsfrist ─────────────────
  {
    id: 5,
    persona: 'Erik',
    roll: 'Medlem som begär registerutdrag',
    bild: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    kategori: 'Rättigheter',
    rubrik: 'En månad på er att',
    rubrikOrange: 'svara',
    bubbla: '"Jag vill ha ett registerutdrag — kopia på allt ni har om mig. Hur snabbt får jag det?"',
    fraga: 'Vilken tidsfrist har styrelsen enligt GDPR?',
    typ: 'single',
    alternativ: [
      { text: '2 dagar', korrekt: false },
      { text: '1 vecka', korrekt: false },
      { text: '1 månad', korrekt: true },
      { text: '3 månader', korrekt: false },
    ],
    feedback: {
      rubrik: 'En månad — kostnadsfritt',
      sammanfattning: 'GDPR ger medlemmen en absolut rätt att få registerutdrag inom en månad. Ni kan inte neka med hänvisning till arbetsbelastning, och det ska vara kostnadsfritt.',
      sektioner: [
        {
          rubrik: 'Vad ska ingå?',
          text: 'Allt ni har om personen: medlemsregister, ekonomi, protokoll där hen nämns, mejlkonversationer, fritextkommentarer. Om det är mycket kan ni förlänga med 2 månader — men måste informera inom den första månaden.',
        },
        {
          rubrik: 'Förberedelse sparar tid',
          text: 'Ha en rutin för vem som hanterar begäran, var informationen finns, och en mall för själva utdraget. Då tar varje begäran minuter istället för dagar.',
        },
      ],
      exempel: 'Rätt rutin: en ansvarig person i styrelsen, dokumenterad process, standardiserad mall. Då blir GDPR-förfrågningar aldrig akuta utan bara rutinärenden.',
    },
  },

  // ── 6. Rätt att bli glömd — inte absolut ────────────
  {
    id: 6,
    persona: 'Per',
    roll: 'Tidigare medlem, flyttat',
    bild: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    kategori: 'Radering',
    bubbla: '"Jag flyttade för 6 månader sedan. Ni måste radera ALLT ni har om mig — GDPR säger ju det."',
    fraga: 'Vad gäller för Pers begäran?',
    typ: 'single',
    alternativ: [
      { text: 'Ja — rätten att bli glömd är absolut', korrekt: false },
      { text: 'Nej — föreningen får spara uppgifter hur länge som helst', korrekt: false },
      { text: 'Delvis — vissa uppgifter måste sparas enligt bokföringslagen', korrekt: true },
      { text: 'Ja — men bara om han var medlem i mindre än ett år', korrekt: false },
    ],
    feedback: {
      rubrik: 'Rätten att bli glömd är inte absolut',
      sammanfattning: 'Medlemmar har rätt till radering, men den rätten måste vägas mot andra lagkrav. Bokföringslagen kräver att ekonomiska uppgifter sparas 7 år — det är starkare än rätten att bli glömd.',
      sektioner: [
        {
          rubrik: 'Vad måste sparas?',
          text: 'Ekonomiska handlingar (7 år från räkenskapsårets slut): fakturor, betalningar, avgifter, överlåtelseavtal. Stämmoprotokoll bevaras permanent som juridiska dokument.',
        },
        {
          rubrik: 'Vad kan/ska raderas?',
          text: 'Kontaktuppgifter (telefon, mejl) som inte längre behövs, fritextkommentarer utan ekonomisk relevans, information om uthyrning och störningar efter att ärendet avslutats.',
        },
      ],
      exempel: 'Svar till Per: "Vi raderar kontaktuppgifter och fritextdata omedelbart. Ekonomiska handlingar måste vi enligt lag spara till [datum]. Därefter raderas allt."',
    },
  },

  // ── 7. Protokollets språkbruk ─────────────────────
  {
    id: 7,
    persona: 'Sekreteraren',
    roll: 'Skriver styrelseprotokoll',
    bild: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
    kategori: 'Protokoll',
    rubrik: 'Subjektivt',
    rubrikOrange: 'språkbruk',
    bubbla: '"Klagomål från lgh 301 på buller från 401. Grannen verkar ha psykiska problem och luktar ofta alkohol."',
    fraga: 'Vad är fel med den här formuleringen?',
    typ: 'multiple',
    alternativ: [
      { text: 'Känsliga personuppgifter om hälsa har registrerats', korrekt: true },
      { text: 'Personliga tolkningar och värderingar i protokollet', korrekt: true },
      { text: 'Bryter mot uppgiftsminimering', korrekt: true },
      { text: 'Inget fel — det är viktigt att dokumentera allt', korrekt: false },
    ],
    feedback: {
      rubrik: 'Tre GDPR-problem i en mening',
      sammanfattning: 'Protokoll ska dokumentera fakta, inte värderingar. Formuleringen ovan bryter mot flera GDPR-principer samtidigt — och om personen begär registerutdrag är det svårförsvarat.',
      sektioner: [
        {
          rubrik: 'Känsliga uppgifter',
          text: '"Psykiska problem" är en hälsouppgift. Hälsa är en särskild kategori i GDPR med generellt förbud mot att registrera — störningsärenden är sällan ett godtagbart undantag.',
        },
        {
          rubrik: 'Värderingar vs fakta',
          text: '"Verkar ha" och "luktar ofta" är subjektiva tolkningar. Protokollet ska innehålla fakta: vad som hänt, när, vilka åtgärder som vidtagits.',
        },
      ],
      exempel: 'Rätt: "Klagomål från lgh 301 angående höga ljud från lgh 401 den 15/3 kl 23:00. Påminnelse om ordningsregler skickad till lgh 401."',
    },
  },

  // ── 8. Personuppgiftsincident — anmälan ─────────────
  {
    id: 8,
    persona: 'Styrelsen',
    roll: 'Upptäcker felsändning',
    bild: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    kategori: 'Incidenter',
    bubbla: '"Vi råkade skicka en lista med alla medlemmars avgiftsskulder till fel mejladress. Vad gör vi nu?"',
    fraga: 'Vilken är styrelsens viktigaste skyldighet?',
    typ: 'single',
    alternativ: [
      { text: 'Ingenting — det var ju ett misstag', korrekt: false },
      { text: 'Kontakta mottagaren och hoppas att de raderar', korrekt: false },
      { text: 'Bedöma risken och anmäla till IMY inom 72 timmar om anmälningspliktigt', korrekt: true },
      { text: 'Vänta och se om någon klagar', korrekt: false },
    ],
    feedback: {
      rubrik: '72-timmarsregeln gäller anmälningspliktiga incidenter',
      sammanfattning: 'När personuppgifter läcker har ni 72 timmar att anmäla till IMY — om incidenten innebär en risk för de registrerade. Ekonomiska uppgifter är integritetskänsliga, så denna incident är troligen anmälningspliktig.',
      sektioner: [
        {
          rubrik: 'Stegen',
          text: '1) Bedöm allvar — hur känsliga uppgifter, hur många drabbade? 2) Begränsa skadan — kontakta mottagaren, be om radering. 3) Anmäl till IMY om risk för de registrerade. 4) Informera de drabbade. 5) Dokumentera allt.',
        },
        {
          rubrik: 'Ha planen klar i förväg',
          text: 'Vid tvivel: anmäl. Bättre att anmäla en incident för mycket än att missa en anmälningspliktig. IMY bedömer sedan allvaret.',
        },
      ],
      exempel: 'Ha en incidentmall färdig INNAN något händer: vem anmäler, var dokumenteras, vilka informeras, hur formuleras ursäkten till medlemmarna.',
    },
  },

  // ── 9. Lagringsminimering & gamla handlingar ────────
  {
    id: 9,
    persona: 'Kassören',
    roll: 'Ärver gammalt arkiv',
    bild: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80',
    kategori: 'Lagringsminimering',
    bubbla: '"Vi har ekonomiska handlingar från 2005 i arkivet. Bättre att spara — man vet aldrig när man behöver dem."',
    fraga: 'Är det okej att spara så länge?',
    typ: 'single',
    alternativ: [
      { text: 'Ja — ju mer dokumentation desto bättre', korrekt: false },
      { text: 'Ja — om det finns plats', korrekt: false },
      { text: 'Nej — lagringsminimering kräver gallring', korrekt: true },
      { text: 'Ja — om medlemmarna gett samtycke', korrekt: false },
    ],
    feedback: {
      rubrik: 'Gallra — varje personuppgift är ett intrång',
      sammanfattning: 'Lagringsminimering är en kärnprincip i GDPR. Ni får inte spara personuppgifter "för säkerhets skull". Bokföringslagen säger max 7 år — sedan ska de gallras.',
      sektioner: [
        {
          rubrik: 'Bokföringslagens 7-årsregel',
          text: '7 år räknas från räkenskapsårets slut. Handling från räkenskapsår 2005 skulle varit gallrad senast 2013-12-31. 13 år för sent.',
        },
        {
          rubrik: 'Årsrutin i januari',
          text: 'Boka en timme varje januari: gå igenom register, radera det som passerat gallringstid, dokumentera vad som gallrats. Då blir det aldrig en katastrof — bara rutin.',
        },
      ],
      exempel: 'Rätt: gallringsplan per kategori (ekonomi 7 år, hyresgäster 3 år efter avtal, störningsärenden vid avslut), kalender-påminnelse i januari, checklista som bockas av.',
    },
  },

  // ── 10. Personuppgiftsbiträde ─────────────────────
  {
    id: 10,
    persona: 'Anna',
    roll: 'Förvaltare hos extern byrå',
    bild: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    kategori: 'Roller',
    rubrik: 'Vem bär',
    rubrikOrange: 'ansvaret?',
    bubbla: '"Jag är förvaltare åt er BRF och har tillgång till medlemsregister och ekonomisystem. Vilken roll har jag enligt GDPR?"',
    fraga: 'Vad är Annas roll?',
    typ: 'single',
    alternativ: [
      { text: 'Personuppgiftsansvarig', korrekt: false },
      { text: 'Personuppgiftsbiträde', korrekt: true },
      { text: 'Dataskyddsombud', korrekt: false },
      { text: 'Registeransvarig', korrekt: false },
    ],
    feedback: {
      rubrik: 'Biträde — behandlar åt er',
      sammanfattning: 'Föreningen är personuppgiftsansvarig (bestämmer varför och hur). Förvaltaren är personuppgiftsbiträde (behandlar uppgifter åt er). Det är en avgörande distinktion eftersom biträdet kräver ett skriftligt avtal.',
      sektioner: [
        {
          rubrik: 'Personuppgiftsbiträdesavtal (PUB-avtal)',
          text: 'Krävs enligt GDPR artikel 28. Ska reglera: vad biträdet får göra, hur uppgifterna skyddas, vad som händer vid uppdragets slut, att biträdet bara agerar på er instruktion.',
        },
        {
          rubrik: 'Vilka är era biträden?',
          text: 'Förvaltare, IT-leverantörer, molntjänster (Dropbox, Google Drive), bokningssystem för tvättstuga, ekonomisystem, revisorer. Alla som hanterar era personuppgifter.',
        },
      ],
      exempel: 'Gå igenom era leverantörer. Saknar ni PUB-avtal? Be om deras standardavtal — de flesta seriösa leverantörer har ett. Underteckna och arkivera.',
    },
  },

  // ── 11. Känsliga personuppgifter (multiple) ─────────
  {
    id: 11,
    persona: 'Styrelsen',
    roll: 'Diskuterar vad som är känsligt',
    bild: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    kategori: 'Känsliga uppgifter',
    bubbla: '"Vi är osäkra — vilka av dessa uppgifter räknas som känsliga personuppgifter enligt GDPR?"',
    fraga: 'Vilka är känsliga personuppgifter med särskilt skydd?',
    typ: 'multiple',
    alternativ: [
      { text: 'Medlem har begärt ramptillgång pga rörelsehinder', korrekt: true },
      { text: 'Medlem är vegetarian', korrekt: true },
      { text: 'Medlem har begärt tillgång till lokal för religiös bön', korrekt: true },
      { text: 'Medlem kandiderade offentligt för ett parti i valet', korrekt: false },
      { text: 'Medlem har förtida betalat sin avgift', korrekt: false },
    ],
    feedback: {
      rubrik: 'Hälsa, religion/filosofi och politik — särskild kategori',
      sammanfattning: 'GDPR har ett generellt förbud mot att behandla känsliga personuppgifter (hälsa, etnicitet, religion, politik, sexualitet, biometri). Undantag finns men är smala — i BRF-sammanhang är dessa kategorier starkt begränsade.',
      sektioner: [
        {
          rubrik: 'Indirekt avslöjande räknas',
          text: 'Ramptillgång avslöjar funktionsnedsättning = hälsouppgift. Vegetarianism kan avslöja religiös eller filosofisk övertygelse. Religiös bön är direkt kopplad till religion.',
        },
        {
          rubrik: 'Offentliggjorda uppgifter',
          text: 'Politisk kandidatur är offentlig. När den registrerade själv gjort uppgiften offentlig är det inte längre känslig personuppgift i GDPR:s mening.',
        },
      ],
      exempel: 'Om ni måste registrera en känslig uppgift (t.ex. ramptillgång för tillgänglighet): dokumentera varför, begränsa åtkomst, skydda extra noga, gallra när behovet upphör.',
    },
  },

  // ── 12. IMY och böter ──────────────────────────────
  {
    id: 12,
    persona: 'Ordföranden',
    roll: 'Orolig för konsekvenser',
    bild: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&q=80',
    kategori: 'Tillsyn',
    bubbla: '"Vad är egentligen konsekvensen om vi missar något? Vem är det som granskar oss?"',
    fraga: 'Vilken myndighet utövar tillsyn av GDPR i Sverige?',
    typ: 'single',
    alternativ: [
      { text: 'Datainspektionen', korrekt: false },
      { text: 'Integritetsskyddsmyndigheten (IMY)', korrekt: true },
      { text: 'Konsumentverket', korrekt: false },
      { text: 'Justitiedepartementet', korrekt: false },
    ],
    feedback: {
      rubrik: 'IMY — sedan 2021',
      sammanfattning: 'Datainspektionen bytte namn till Integritetsskyddsmyndigheten (IMY) 2021. Det är IMY som utreder klagomål, granskar verksamheter och utdömer sanktionsavgifter.',
      sektioner: [
        {
          rubrik: 'Sanktionsnivåer',
          text: 'Max 10 miljoner euro eller 2% av global omsättning (lägre nivån), max 20 miljoner euro eller 4% (högre nivån). För BRF:er är beloppen i praktiken mycket lägre — men även kritik, förelägganden och skadeståndskrav från medlemmar påverkar föreningen.',
        },
        {
          rubrik: 'Förtroendet är värre än böterna',
          text: 'En GDPR-incident blir ofta allmänt känd i föreningen. Skadad tillit mellan medlemmar och styrelse är svårare att reparera än en sanktionsavgift.',
        },
      ],
      exempel: 'Använd IMY:s egna resurser: imy.se har mallar för registerförteckning, vägledningar för olika branscher, och ni kan kontakta dem för råd INNAN problem uppstår.',
    },
  },

];
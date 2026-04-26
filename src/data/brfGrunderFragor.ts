// src/data/brfGrunderFragor.ts
// 12 scenario-situationer som täcker kursens första avsnitt:
// "Så fungerar bostadsrättsföreningen"
//
// Täcker: egendom, medlemskap, stämma, styrelse, förvaltare,
// beslut, ansvar, andrahand, ekonomi, kommunikation

import type { SlideJFraga } from '../components/CourseElements/SlideTemplates';

export const brfGrunderFragor: SlideJFraga[] = [
  // ── 1. Fast vs lös egendom ────────────────────────
  {
    id: 1,
    persona: 'Fatima',
    roll: 'Ny bostadsrättsinnehavare, BRF Lönnen',
    bild: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    kategori: 'Ägande',
    rubrik: 'Fatima funderar på',
    rubrikOrange: 'vad hon äger',
    bubbla: '"Jag köpte lägenheten för 3 miljoner — den är ju min. Jag kan väl göra precis vad jag vill med den?"',
    fraga: 'Vad äger egentligen Fatima?',
    alternativ: [
      { text: 'Lägenheten och sin andel av hela fastigheten', korrekt: false, feedback: 'Inte riktigt. Lägenheten i sig är fast egendom och ägs av föreningen.' },
      { text: 'En bostadsrätt — en andel i föreningen med nyttjanderätt', korrekt: true, feedback: 'Precis rätt. Bostadsrätten är lös egendom och ger rätten att bo i lägenheten, men själva lägenheten ägs av föreningen.' },
      { text: 'Ingenting — hon hyr av föreningen', korrekt: false, feedback: 'Fel. Bostadsrätt och hyresrätt är helt olika juridiska konstruktioner.' },
      { text: 'Lägenheten, men inte marken den står på', korrekt: false, feedback: 'Fel. Föreningen äger hela fastigheten — mark och byggnad tillsammans.' },
    ],
    tips: [
      'Fastigheten = fast egendom, ägs av föreningen',
      'Bostadsrätten = lös egendom, ägs av dig',
      'Du äger rätten att bo — inte lägenheten i fysisk mening',
    ],
  },

  // ── 2. Medlemskap ────────────────────────────────
  {
    id: 2,
    persona: 'Lars',
    roll: 'Svärson till medlem, bor i BRF Ekbacken',
    bild: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    kategori: 'Medlemskap',
    rubrik: 'Lars bor i',
    rubrikOrange: 'lägenheten',
    bubbla: '"Jag har bott här i tre år tillsammans med min sambo som äger lägenheten. Då är väl jag också medlem?"',
    fraga: 'Är Lars medlem i föreningen?',
    alternativ: [
      { text: 'Ja, eftersom han bor i lägenheten permanent', korrekt: false, feedback: 'Fel. Att bo i en lägenhet gör dig inte automatiskt till medlem.' },
      { text: 'Ja, sambor blir automatiskt medlemmar', korrekt: false, feedback: 'Fel. Medlemskap följer bostadsrätten — inte personerna som bor i lägenheten.' },
      { text: 'Nej — bara den som står i medlemsregistret är medlem', korrekt: true, feedback: 'Rätt! Medlemskap följer bostadsrätten, inte bostaden. Lars sambo är medlem, men Lars själv är det inte.' },
      { text: 'Ja, efter två års boende blir man medlem', korrekt: false, feedback: 'Fel. Det finns ingen sådan regel — medlemskap beviljas bara genom förvärv av bostadsrätt.' },
    ],
    tips: [
      'Medlemskap följer bostadsrätten, inte personen',
      'Sambor, barn och inneboende är inte automatiskt medlemmar',
      'Medlemsregistret är det som gäller juridiskt',
    ],
  },

  // ── 3. Rösträtt på stämman ──────────────────────
  {
    id: 3,
    persona: 'Gunnar',
    roll: 'Äger den största lägenheten i BRF Björken',
    bild: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&q=80',
    kategori: 'Demokrati',
    rubrik: 'Gunnar tänker',
    rubrikOrange: 'på stämman',
    bubbla: '"Jag har den största lägenheten och betalar mest i avgift. Då borde jag väl ha mer att säga till om på stämman?"',
    fraga: 'Hur fungerar Gunnars rösträtt?',
    alternativ: [
      { text: 'Han har fler röster eftersom lägenheten är större', korrekt: false, feedback: 'Fel. Det finns inget samband mellan lägenhetens storlek och antal röster.' },
      { text: 'Rösträtten är proportionell mot insatsen', korrekt: false, feedback: 'Fel. Det är så det fungerar i aktiebolag — men inte i bostadsrättsföreningar.' },
      { text: 'En medlem har en röst, oavsett lägenhetens storlek', korrekt: true, feedback: 'Rätt! Den kooperativa principen: en medlem, en röst. Precis samma demokratiska makt som alla andra medlemmar.' },
      { text: 'Den som äger mer har större ansvar och därmed fler röster', korrekt: false, feedback: 'Fel. Ansvaret kan variera, men rösträtten är alltid en per medlem.' },
    ],
    tips: [
      'Kooperativa principen: en medlem = en röst',
      'Lägenhetens storlek påverkar avgift men inte röst',
      'Detta skiljer BRF från aktiebolag',
    ],
  },

  // ── 4. Föreningsstämman ─────────────────────────
  {
    id: 4,
    persona: 'Birgitta',
    roll: 'Nyvald ordförande, BRF Kastanjen',
    bild: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    kategori: 'Beslutsmässighet',
    rubrik: 'Birgitta planerar',
    rubrikOrange: 'sin första stämma',
    bubbla: '"När måste vi egentligen hålla stämman? Kan vi flytta den om det är svårt att hitta en tid som passar?"',
    fraga: 'När måste den ordinarie föreningsstämman hållas?',
    alternativ: [
      { text: 'Senast 31 december varje år', korrekt: false, feedback: 'Fel. Tidpunkten beror på räkenskapsåret, inte på kalenderåret.' },
      { text: 'Senast sex månader efter räkenskapsårets slut', korrekt: true, feedback: 'Rätt! Stämman måste enligt lag hållas senast 6 månader efter räkenskapsårets slut. För en förening med kalenderårsbokslut blir det senast 30 juni.' },
      { text: 'När som helst under året, så länge den hålls en gång', korrekt: false, feedback: 'Fel. Det finns en tydlig tidsgräns.' },
      { text: 'Senast tre månader efter räkenskapsårets slut', korrekt: false, feedback: 'Nära, men fel. Det är sex månader som gäller.' },
    ],
    tips: [
      'Ordinarie stämma: senast 6 mån efter räkenskapsårets slut',
      'Extrastämma kan hållas när som helst vid behov',
      'Kallelse enligt stadgarnas tidsgräns — oftast 2–4 veckor',
    ],
  },

  // ── 5. Ansvarsfrihet ────────────────────────────
  {
    id: 5,
    persona: 'Mikael',
    roll: 'Avgående ledamot, BRF Almen',
    bild: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    kategori: 'Ansvar',
    rubrik: 'Mikael undrar över',
    rubrikOrange: 'ansvarsfrihet',
    bubbla: '"Stämman gav oss inte ansvarsfrihet. Vad betyder det egentligen för oss som satt i styrelsen?"',
    fraga: 'Vad innebär det att styrelsen inte får ansvarsfrihet?',
    alternativ: [
      { text: 'Styrelsen måste omedelbart avgå', korrekt: false, feedback: 'Fel. Ansvarsfriheten handlar inte om tjänstgöring utan om rättsligt skydd.' },
      { text: 'Styrelsen kan inte väljas om nästa år', korrekt: false, feedback: 'Fel. Stämman kan välja om samma personer om den vill.' },
      { text: 'Föreningen behåller rätten att kräva skadestånd av styrelsen', korrekt: true, feedback: 'Rätt! Ansvarsfrihet betyder att stämman godkänner styrelsens förvaltning. Utan ansvarsfrihet kan föreningen senare kräva skadestånd för brister.' },
      { text: 'Ingenting — det är bara en formalitet', korrekt: false, feedback: 'Fel. Det är en viktig rättslig prövning med reella konsekvenser.' },
    ],
    tips: [
      'Ansvarsfrihet = stämman godkänner styrelsens förvaltning',
      'Utan ansvarsfrihet: rätt att kräva skadestånd kvarstår',
      'Beslutet protokollförs och gäller retroaktivt för året',
    ],
  },

  // ── 6. Förvaltaren ──────────────────────────────
  {
    id: 6,
    persona: 'Anette',
    roll: 'Nybliven kassör, BRF Syrenen',
    bild: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
    kategori: 'Förvaltning',
    rubrik: 'Anette frågar om',
    rubrikOrange: 'förvaltaren',
    bubbla: '"Vi har en förvaltare som sköter bokföringen. Då är det väl de som bär ansvaret om något går fel?"',
    fraga: 'Vem bär det juridiska ansvaret för föreningens ekonomi?',
    alternativ: [
      { text: 'Förvaltaren — det är därför ni anlitat dem', korrekt: false, feedback: 'Fel. Förvaltaren utför — styrelsen ansvarar.' },
      { text: 'Revisorn — de granskar allt i efterhand', korrekt: false, feedback: 'Fel. Revisorn granskar men bär inte ansvaret.' },
      { text: 'Styrelsen — alltid, oavsett vem som utför arbetet', korrekt: true, feedback: 'Rätt! Styrelsen kan delegera uppgifter men aldrig ansvar. Det juridiska ansvaret för ekonomin vilar alltid på styrelsen.' },
      { text: 'Ansvaret delas lika mellan styrelsen och förvaltaren', korrekt: false, feedback: 'Fel. Det finns inget juridiskt delat ansvar — styrelsen är ytterst ansvarig.' },
    ],
    tips: [
      'Förvaltaren är leverantör — inte del av föreningen',
      'Delegera uppgifter, aldrig ansvar',
      'Styrelsen måste förstå siffrorna även när förvaltaren bokför',
    ],
  },

  // ── 7. Årsavgift vs hyra ──────────────────────
  {
    id: 7,
    persona: 'Roger',
    roll: 'Ny i styrelsen, BRF Pilträdet',
    bild: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    kategori: 'Ekonomi',
    rubrik: 'Roger skriver',
    rubrikOrange: 'infobrev',
    bubbla: '"Jag höll på att skriva hyran i nyhetsbrevet. Är det rätt ord? Det är ju ändå det alla kallar det."',
    fraga: 'Vad är den korrekta termen — och varför spelar det roll?',
    alternativ: [
      { text: 'Hyra — alla säger det, det spelar ingen roll', korrekt: false, feedback: 'Fel. Begreppen har olika juridisk innebörd.' },
      { text: 'Årsavgift — och det är en fundamental juridisk skillnad', korrekt: true, feedback: 'Rätt! Årsavgift är din del av föreningens kostnader — inte en hyra för en vara. Skillnaden speglar att du är delägare, inte hyresgäst.' },
      { text: 'Både hyra och avgift fungerar lika bra', korrekt: false, feedback: 'Fel. I officiell kommunikation ska "årsavgift" användas.' },
      { text: 'Månadskostnad — det är det mest neutrala ordet', korrekt: false, feedback: 'Nej — det är ingen officiell term.' },
    ],
    tips: [
      'Årsavgift = din del av föreningens gemensamma kostnader',
      'Hyra = betalning till hyresvärd för bostad',
      'Skillnaden är juridisk och principiell',
    ],
  },

  // ── 8. Medlemsansökan ──────────────────────────
  {
    id: 8,
    persona: 'Sandra',
    roll: 'Sekreterare, BRF Granen',
    bild: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80',
    kategori: 'Medlemsprövning',
    rubrik: 'Sandra hanterar',
    rubrikOrange: 'en medlemsansökan',
    bubbla: '"En köpare ansöker om medlemskap. Vi tyckte inte om hennes tidigare uppträdande i området. Kan vi neka?"',
    fraga: 'På vilken grund får styrelsen neka medlemskap?',
    alternativ: [
      { text: 'Om styrelsen känner ovilja mot personen', korrekt: false, feedback: 'Fel. Beslutet måste vara sakligt grundat.' },
      { text: 'Enbart på sakliga grunder enligt stadgar och lag', korrekt: true, feedback: 'Rätt! Prövningen ska vara saklig och stödja sig på föreningens stadgar. Diskrimineringslagen förbjuder nekanden baserade på kön, etnicitet, religion m.m.' },
      { text: 'Om köparen inte är svensk medborgare', korrekt: false, feedback: 'Fel — det är diskriminering och olagligt.' },
      { text: 'Om majoriteten av medlemmarna röstar emot', korrekt: false, feedback: 'Fel. Beslutet fattas av styrelsen, inte medlemmarna.' },
    ],
    tips: [
      'Prövning ska vara saklig och stadgeenlig',
      'Diskrimineringslagen gäller — aldrig kön, etnicitet, religion',
      'Vid tveksamhet — anlita jurist innan ni nekar',
    ],
  },

  // ── 9. Stämmobeslut vs styrelsebeslut ─────────
  {
    id: 9,
    persona: 'Tobias',
    roll: 'Ordförande, BRF Hasseln',
    bild: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    kategori: 'Beslutsordning',
    rubrik: 'Tobias vill göra',
    rubrikOrange: 'en stor satsning',
    bubbla: '"Vi i styrelsen vill installera solpaneler för 2 miljoner kronor. Kan vi besluta om det själva?"',
    fraga: 'Kan styrelsen fatta beslut om en sådan investering?',
    alternativ: [
      { text: 'Ja, styrelsen förvaltar föreningen mellan stämmorna', korrekt: false, feedback: 'Inte så enkelt. Styrelsen förvaltar — men större investeringar tillhör stämmans område.' },
      { text: 'Nej, beslut av den storleken hör till stämman', korrekt: true, feedback: 'Rätt! Större investeringar som väsentligt påverkar föreningens ekonomi eller fastighetens karaktär bör beslutas av stämman. Kontrollera alltid stadgarna.' },
      { text: 'Ja, så länge det finns pengar i kassan', korrekt: false, feedback: 'Fel. Beslutsmandatet styrs av beslutets storlek och karaktär, inte likviditeten.' },
      { text: 'Bara om revisorn godkänner', korrekt: false, feedback: 'Fel. Revisorn granskar — men beslutar inte om investeringar.' },
    ],
    tips: [
      'Stora investeringar: stämman beslutar',
      'Löpande förvaltning: styrelsen beslutar',
      'Läs stadgarna — de anger ofta beloppsgränser',
    ],
  },

  // ── 10. Andrahandsuthyrning ──────────────────
  {
    id: 10,
    persona: 'Emma',
    roll: 'Medlem, BRF Eken',
    bild: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    kategori: 'Andrahand',
    rubrik: 'Emma vill hyra ut',
    rubrikOrange: 'i andra hand',
    bubbla: '"Jag ska jobba utomlands i 6 månader. Det räcker väl om jag mejlar styrelsen och berättar det?"',
    fraga: 'Vad krävs för andrahandsuthyrning?',
    alternativ: [
      { text: 'Ett mejl räcker som information till styrelsen', korrekt: false, feedback: 'Fel. Det krävs mer än information.' },
      { text: 'Skriftlig ansökan och styrelsens skriftliga tillstånd', korrekt: true, feedback: 'Rätt! Skriftlig ansökan ska beviljas av styrelsen skriftligt. Arbete utomlands är normalt ett beaktansvärt skäl.' },
      { text: 'Muntligt godkännande från ordförande', korrekt: false, feedback: 'Fel. Styrelsen måste fatta beslutet formellt och skriftligt.' },
      { text: 'Ingen åtgärd behövs om det är kortare än ett år', korrekt: false, feedback: 'Fel. Alla andrahandsuthyrningar kräver tillstånd.' },
    ],
    tips: [
      'Alltid skriftlig ansökan och skriftligt tillstånd',
      'Beaktansvärda skäl: arbete, studier, samboskap',
      'Protokollför beslutet på styrelsemötet',
    ],
  },

  // ── 11. Underhållsansvar ─────────────────────
  {
    id: 11,
    persona: 'Kenneth',
    roll: 'Medlem, BRF Tallen',
    bild: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    kategori: 'Underhåll',
    rubrik: 'Kenneth har',
    rubrikOrange: 'en läckande radiator',
    bubbla: '"Min radiator läcker. Det är ju inne i min lägenhet — då är det väl jag som ska betala reparationen?"',
    fraga: 'Vem ansvarar för reparationen av radiatorn?',
    alternativ: [
      { text: 'Kenneth — den är inne i hans lägenhet', korrekt: false, feedback: 'Fel. Gränsen går inte vid lägenhetens väggar utan vid vad som hör till fastighetens system.' },
      { text: 'Föreningen — radiatorer hör till värmesystemet', korrekt: true, feedback: 'Rätt! Stammar, ledningar och radiatorer är del av fastighetens gemensamma system. Föreningen ansvarar för reparationen.' },
      { text: 'De delar på kostnaden 50/50', korrekt: false, feedback: 'Fel. Det finns ingen sådan delningsregel.' },
      { text: 'Försäkringsbolaget avgör alltid', korrekt: false, feedback: 'Fel. Försäkring är en annan fråga — först måste ansvaret avgöras.' },
    ],
    tips: [
      'Ytskikt inne i lägenheten: medlemmens ansvar',
      'Stammar, radiatorer, ledningar: föreningens ansvar',
      'Stadgarna specificerar exakt var gränsen går',
    ],
  },

  // ── 12. Information till medlemmar ──────────
  {
    id: 12,
    persona: 'Ingrid',
    roll: 'Nyvald ledamot, BRF Almen',
    bild: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    kategori: 'Kommunikation',
    rubrik: 'Ingrid fick en',
    rubrikOrange: 'förfrågan från medlem',
    bubbla: '"En medlem vill se det senaste styrelseprotokollet. Jag är osäker — har hen rätt att få ta del av det?"',
    fraga: 'Har en enskild medlem rätt att läsa styrelsens protokoll?',
    alternativ: [
      { text: 'Ja, föreningen är medlemmarnas', korrekt: false, feedback: 'Fel. Styrelseprotokoll är inte offentliga för medlemmarna.' },
      { text: 'Nej — styrelseprotokoll är interna dokument', korrekt: true, feedback: 'Rätt! Styrelsen avgör vilken information som ska delas. Stämmoprotokoll däremot har alla medlemmar rätt att se.' },
      { text: 'Ja, om medlemmen betalat in sin årsavgift', korrekt: false, feedback: 'Fel. Avgiften påverkar inte rätten till interna dokument.' },
      { text: 'Bara om revisorn godkänner det', korrekt: false, feedback: 'Fel. Styrelsen — inte revisorn — avgör vad som lämnas ut.' },
    ],
    tips: [
      'Styrelseprotokoll: interna, styrelsen avgör',
      'Stämmoprotokoll: alla medlemmar har rätt att se',
      'Årsredovisningen är däremot offentlig',
    ],
  },
];
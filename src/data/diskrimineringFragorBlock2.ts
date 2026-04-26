// src/data/diskrimineringFragorBlock2.ts
// Block 2: Komplexa avvägningar
// 12 scenarier där flera intressen ska vägas — störningsärenden,
// lokaluthyrning, tillgänglighet, repressalier, trakasserier.

import type { SlideKFraga } from '../components/CourseElements/SlideTemplates';

export const diskrimineringFragorBlock2: SlideKFraga[] = [

  // ── 1. Störningsärende med flera lager ────────────
  {
    id: 1,
    persona: 'Styrelsen',
    roll: 'Bedömer störningsärende',
    bild: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80',
    kategori: 'Störningsärenden',
    rubrik: 'Klagomål mot',
    rubrikOrange: 'muslimsk familj',
    bubbla: '"Familjen i 2A har fått tre bullerklagomål. Grannen säger att det är "onormalt många barn" som springer omkring."',
    fraga: 'Hur bör styrelsen gå vidare?',
    typ: 'multiple',
    alternativ: [
      { text: 'Handlägga ärendet på samma sätt som andra bullerklagomål', korrekt: true },
      { text: 'Ignorera klagomålet eftersom det verkar ha diskriminerande undertoner', korrekt: false },
      { text: 'Dokumentera klagomålen objektivt — datum, tid, typ av ljud', korrekt: true },
      { text: 'Granska om "onormalt många barn" är en legitim grund eller en fördom', korrekt: true },
      { text: 'Skicka varning direkt för att visa handlingskraft', korrekt: false },
    ],
    feedback: {
      rubrik: 'Behandla klagomålet — men granska språket',
      sammanfattning: 'Även när ett klagomål är formulerat med diskriminerande undertoner får ni inte ignorera det — men ni får inte heller acceptera dess premisser okritiskt. Hantera den konkreta störningen, separera fakta från fördomar.',
      sektioner: [
        {
          rubrik: 'Dubbel lojalitet',
          text: 'Styrelsen har ansvar både för att utreda störningar (som berör alla) och för att inte agera på fördomar (diskrimineringsskyddet). Det är inte en konflikt — det är två sidor av samma sakliga hantering.',
        },
        {
          rubrik: 'Vad ska dokumenteras?',
          text: 'Datum, tid, typ av ljud, varaktighet. Aldrig: "många barn", "typ av familj", personliga värderingar. Fakta om störningen — inte fördomar om familjen.',
        },
      ],
      exempel: 'Rätt protokoll: "2023-05-14, kl 22:30–23:15, höga röster och spring i lägenhet 2A. Standardrutin för bullerklagomål tillämpas."',
    },
  },

  // ── 2. Lokaluthyrning med svår avvägning ──────────
  {
    id: 2,
    persona: 'Styrelsen',
    roll: 'Bokningsansvarig',
    bild: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=400&q=80',
    kategori: 'Lokaluthyrning',
    bubbla: '"Samma medlem har bokat festlokalen fem gånger det senaste året. Andra medlemmar börjar klaga på att de aldrig kommer åt den."',
    fraga: 'Kan styrelsen neka nästa bokning?',
    typ: 'single',
    alternativ: [
      { text: 'Ja — alla medlemmar ska ha lika chans', korrekt: false },
      { text: 'Ja, om det finns en rotations- eller maxregel som gäller alla', korrekt: true },
      { text: 'Nej, först-till-kvarn gäller alltid', korrekt: false },
      { text: 'Bara om medlemmen tillhör en majoritetsgrupp', korrekt: false },
    ],
    feedback: {
      rubrik: 'Regler måste gälla lika — och finnas i förväg',
      sammanfattning: 'Att begränsa en enskild medlems användning kan vara motiverat, men det kräver en regel som gäller alla och som fanns innan konflikten uppstod. Annars riskerar ni att begränsningen uppfattas som riktad mot en specifik person.',
      sektioner: [
        {
          rubrik: 'Förhandsregler',
          text: 'Inför t.ex. "max en helghyra per medlem och kvartal" som en allmän regel. Då blir nästa avslag en konsekvens av regeln, inte en bedömning av personen.',
        },
        {
          rubrik: 'Varför i förväg?',
          text: 'Om regeln införs mitt i en konflikt kan den uppfattas som riktad mot den pågående bokaren — särskilt om personen tillhör en skyddad grupp. Risk för indirekt diskriminering.',
        },
      ],
    },
  },

  // ── 3. Tillgänglighet & kostnad ───────────────────
  {
    id: 3,
    persona: 'Föreningen',
    roll: 'Liten BRF, 12 lägenheter',
    bild: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80',
    kategori: 'Tillgänglighet',
    rubrik: 'Rullstolsramp',
    rubrikOrange: 'skulle kosta 400 000 kr',
    bubbla: '"En medlem behöver en permanent ramp. Kostnadsberäkning: 400 000 kr. Föreningen har 180 000 kr i kassan."',
    fraga: 'Vad är styrelsens skyldighet?',
    typ: 'single',
    alternativ: [
      { text: 'Bygga rampen oavsett — tillgänglighet går före ekonomi', korrekt: false },
      { text: 'Neka — kostnaden är uppenbart orimlig', korrekt: false },
      { text: 'Utreda alternativ och dokumentera bedömningen av vad som är skäligt', korrekt: true },
      { text: 'Be medlemmen bekosta rampen själv', korrekt: false },
    ],
    feedback: {
      rubrik: '"Skäligt" är en bedömning — inte ett ja/nej',
      sammanfattning: 'Lagen kräver skäliga tillgänglighetsåtgärder, inte alla åtgärder till varje pris. Styrelsens skyldighet är att genomföra en riktig bedömning av kostnad, nytta och alternativ — och att dokumentera den.',
      sektioner: [
        {
          rubrik: 'Bedömningsgrunder',
          text: 'Föreningens ekonomi, åtgärdens kostnad i förhållande till total budget, nyttan för den enskilde och för andra medlemmar, om alternativ finns (t.ex. enklare ramp, bärbar lösning, annan ingång).',
        },
        {
          rubrik: 'Riskerna vid avslag',
          text: 'Ett avslag utan utredning är alltid ett rättsligt problem. Ett avslag efter grundlig utredning är ofta försvarbart — men bara om dokumentationen finns.',
        },
      ],
      exempel: 'Rätt: anlita arkitekt för alternativ, undersök bidrag (Boverket), för dialog med medlemmen, dokumentera allt. Då är även ett avslag rättsligt hållbart.',
    },
  },

  // ── 4. Medlemsansökan ─────────────────────────────
  {
    id: 4,
    persona: 'Föreningen',
    roll: 'Prövar ny medlem',
    bild: 'https://images.unsplash.com/photo-1552960562-daf630e9278b?w=400&q=80',
    kategori: 'Medlemsansökan',
    bubbla: '"Den sökande har alla papper i ordning, men kommer från ett land där vi aldrig haft medlemmar. Får vi neka?"',
    fraga: 'Vilka grunder är tillåtna att neka medlemskap på?',
    typ: 'multiple',
    alternativ: [
      { text: 'Dokumenterad bristande ekonomisk förmåga att betala avgiften', korrekt: true },
      { text: 'Tidigare dömd för brott mot BRF eller hyresrätt', korrekt: true },
      { text: 'Ursprungsland eller etnicitet', korrekt: false },
      { text: 'Föreningens stadgar har sakliga krav som inte uppfylls (t.ex. medlem i viss kategori)', korrekt: true },
      { text: 'Styrelsens magkänsla', korrekt: false },
    ],
    feedback: {
      rubrik: 'Sakliga skäl — inte personliga bedömningar',
      sammanfattning: 'Att neka medlemskap är en stor åtgärd som kräver sakliga skäl. Ursprungsland, etnicitet, ålder eller religion är aldrig tillåtna grunder. Ekonomisk oförmåga och tidigare dokumenterade problem kan däremot vara det.',
      sektioner: [
        {
          rubrik: 'Bevisbördan vänder',
          text: 'Om en nekad sökande anmäler kan bevisbördan flyttas till er. Ni måste då kunna visa att beslutet grundades på sakliga skäl — inte på sökandens bakgrund.',
        },
        {
          rubrik: 'Dokumentera varje steg',
          text: 'Skriv ner vilka handlingar ni fått, vilken bedömning ni gjort, vilka stadgar ni tillämpat. Utan dokumentation är det i praktiken omöjligt att försvara ett nekande.',
        },
      ],
      exempel: 'Rätt formulering: "Ansökan avslås med stöd av stadgarnas § X. Sökande har inte kunnat styrka tillräcklig ekonomisk förmåga enligt vår policy som tillämpas på alla sökande."',
    },
  },

  // ── 5. Trakasserier i gemensamma utrymmen ─────────
  {
    id: 5,
    persona: 'Hassan',
    roll: 'Medlem som utsätts för kränkningar',
    bild: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    kategori: 'Trakasserier',
    rubrik: 'Nedsättande ord',
    rubrikOrange: 'i trapphuset',
    bubbla: '"Min granne skriker nedsättande saker om min religion när vi möts i trapphuset. Jag har berättat det för styrelsen — de säger att det är en privat grannkonflikt."',
    fraga: 'Har styrelsen något ansvar för situationen?',
    typ: 'single',
    alternativ: [
      { text: 'Nej, det är en privat konflikt mellan grannar', korrekt: false },
      { text: 'Ja, föreningen kan ha ansvar för trakasserier i gemensamma utrymmen', korrekt: true },
      { text: 'Endast om Hassan anmält till polisen först', korrekt: false },
      { text: 'Ja, men bara om grannen är styrelseledamot', korrekt: false },
    ],
    feedback: {
      rubrik: 'Föreningens ansvar för gemensamma utrymmen',
      sammanfattning: 'Trapphus, tvättstuga, gård och andra gemensamma utrymmen är föreningens ansvar. När trakasserier sker där och styrelsen informeras men inte agerar kan föreningen hållas ansvarig — utöver ansvaret för den enskilda personen som utfört trakasserierna.',
      sektioner: [
        {
          rubrik: 'Agera — dokumentera — följ upp',
          text: 'Kontakta båda parter, förklara vad som är trakasserier, dokumentera att ni agerat, följ upp om beteendet upphör. Om det fortsätter: formell varning, och vid behov rättsliga åtgärder.',
        },
        {
          rubrik: 'Passivitet är ett aktivt val',
          text: 'Att hänvisa till "grannkonflikt" när trakasserier är kopplade till en skyddad grund är inte neutralt — det är att välja sida. Lagen ser detta som bristande ansvar.',
        },
      ],
      exempel: 'Rätt: skriftlig varning till trakasseraren, möte med Hassan om hans trygghet, uppföljning efter 30 dagar, allt dokumenterat.',
    },
  },

  // ── 6. Indirekt diskriminering i stadgar ──────────
  {
    id: 6,
    persona: 'Stämman',
    roll: 'Röstar om stadgeändring',
    bild: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=400&q=80',
    kategori: 'Stadgar',
    bubbla: '"Förslag: styrelseledamöter ska ha fullständig svenska i tal och skrift för att säkerställa effektivt arbete."',
    fraga: 'Är förslaget problematiskt?',
    typ: 'single',
    alternativ: [
      { text: 'Nej, bra språk är rimligt att kräva', korrekt: false },
      { text: 'Ja, det är direkt diskriminering på etnisk grund', korrekt: false },
      { text: 'Ja, risk för indirekt diskriminering om kravet är strängare än nödvändigt', korrekt: true },
      { text: 'Nej, stadgeändringar är alltid lagliga om stämman röstar igenom dem', korrekt: false },
    ],
    feedback: {
      rubrik: 'Indirekt diskriminering genom språkkrav',
      sammanfattning: 'Ett krav på "fullständig" svenska går längre än vad som är nödvändigt för styrelsearbete. Det drabbar systematiskt personer med annan språklig bakgrund — indirekt diskriminering på etnisk grund.',
      sektioner: [
        {
          rubrik: 'Proportionalitet',
          text: 'Styrelsearbete kräver kommunikationsförmåga, inte fullständig språkbehärskning. Ett rimligt krav är "kan följa styrelsemöten och läsa styrelsematerial". Inte mer.',
        },
        {
          rubrik: 'Stämmobeslut skyddar inte',
          text: 'Även om stämman röstar igenom ett diskriminerande krav blir det inte lagligt. Lagar går före stadgar.',
        },
      ],
      exempel: 'Rätt formulering: "Styrelseledamöter ska kunna kommunicera effektivt i styrelsearbetet" — öppnar för olika sätt att uppfylla kravet.',
    },
  },

  // ── 7. Repressalier efter anmälan ─────────────────
  {
    id: 7,
    persona: 'Styrelsen',
    roll: 'Efter DO-anmälan',
    bild: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80',
    kategori: 'Repressalier',
    bubbla: '"En medlem har anmält oss till DO. Några i styrelsen tycker vi ska granska henne extra noga framöver — "för säkerhets skull"."',
    fraga: 'Hur bör styrelsen agera?',
    typ: 'multiple',
    alternativ: [
      { text: 'Fortsätta behandla hennes ärenden precis som andra medlemmars', korrekt: true },
      { text: 'Dokumentera varje steg så att ni kan visa likvärdig behandling', korrekt: true },
      { text: 'Granska hennes ärenden extra noga för att skydda föreningen', korrekt: false },
      { text: 'Informera alla ledamöter om att hon gjort en anmälan', korrekt: false },
      { text: 'Undvika att vara över-tillmötesgående för att inte verka partiska', korrekt: false },
    ],
    feedback: {
      rubrik: 'Efter en anmälan: full neutralitet',
      sammanfattning: 'Att straffa en anmälare är repressalier — uttryckligen förbjudet och en separat överträdelse. Men att överdrivet tillmötesgå är också problematiskt: det antyder att ni normalt sett skulle ha behandlat henne annorlunda. Mål: samma behandling som alla andra.',
      sektioner: [
        {
          rubrik: 'Intern hantering',
          text: 'Informera ledamöterna om det formella — att en anmälan finns. Men inte på ett sätt som uppmuntrar särbehandling eller skapar en "vi och hon"-mentalitet.',
        },
        {
          rubrik: 'Separation',
          text: 'Hennes ombyggnadsansökan, avgiftsdiskussioner, klagomål — allt hanteras i sina egna processer, av sina ordinarie handläggare, med sina ordinarie kriterier. DO-frågan hålls helt separat.',
        },
      ],
    },
  },

  // ── 8. Konflikt mellan medlemmar ──────────────────
  {
    id: 8,
    persona: 'Styrelsen',
    roll: 'Tvist mellan två medlemmar',
    bild: 'https://images.unsplash.com/photo-1573164713619-24c711fe7878?w=400&q=80',
    kategori: 'Medlingsansvar',
    rubrik: 'En medlem kallar',
    rubrikOrange: 'en annan för',
    bubbla: '"Två medlemmar bråkar. Den ena använder ett rasistiskt öknamn om den andra. Är det verkligen styrelsens sak?"',
    fraga: 'Vad bör styrelsen göra?',
    typ: 'single',
    alternativ: [
      { text: 'Ingenting — privata konflikter ska parterna lösa själva', korrekt: false },
      { text: 'Agera när det sker i gemensamma utrymmen eller föreningens kanaler', korrekt: true },
      { text: 'Bara agera om polisanmälan görs', korrekt: false },
      { text: 'Medla utan att ta ställning till språkbruket', korrekt: false },
    ],
    feedback: {
      rubrik: 'Språkbruk i föreningens kontext angår styrelsen',
      sammanfattning: 'Rasistiska och diskriminerande uttryck i föreningens kontext — gemensamma utrymmen, facebookgrupper, mail, stämmor — är styrelsens ansvar att hantera. Att vara neutral i frågan om språkbruk är att acceptera det.',
      sektioner: [
        {
          rubrik: 'Vad innebär "agera"?',
          text: 'Kontakta den som uttrycker sig kränkande, förklara att det inte accepteras, dokumentera samtalet. Erbjuda den drabbade stöd. Vid upprepning: formell varning.',
        },
        {
          rubrik: 'Neutralitet är ingen väg framåt',
          text: 'Att "inte ta ställning" till rasistiska uttryck innebär i praktiken att välja sida med den som uttrycker dem. Föreningen blir då en plats där vissa medlemmar inte är trygga.',
        },
      ],
      exempel: 'Rätt: skriftligt meddelande till båda parter — en om konfliktens sakfrågor, en tydlig markering om språkbruket som separat fråga.',
    },
  },

  // ── 9. Funktionsnedsättning & djurförbud ──────────
  {
    id: 9,
    persona: 'Lena',
    roll: 'Medlem med ledarhund',
    bild: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
    kategori: 'Tillgänglighet',
    bubbla: '"Jag har fått en ledarhund. Stadgarna förbjuder hundar i föreningen. Vad händer nu?"',
    fraga: 'Vad gäller?',
    typ: 'single',
    alternativ: [
      { text: 'Stadgarna gäller — Lena får flytta eller bli av med hunden', korrekt: false },
      { text: 'Stadgarna måste ändras på nästa stämma innan ledarhunden tillåts', korrekt: false },
      { text: 'Ledarhund är ett hjälpmedel — stadgarnas djurförbud gäller inte', korrekt: true },
      { text: 'Lena får ha hunden om majoriteten i föreningen röstar ja', korrekt: false },
    ],
    feedback: {
      rubrik: 'Ledarhund är ett hjälpmedel, inte ett husdjur',
      sammanfattning: 'Assistans- och ledarhundar räknas inte som vanliga sällskapsdjur utan som hjälpmedel för personer med funktionsnedsättning. Djurförbud i stadgarna gäller inte dem — annars skulle det vara diskriminering på grund av funktionsnedsättning.',
      sektioner: [
        {
          rubrik: 'Andra hjälpmedel omfattas också',
          text: 'Rollatorer i trapphus, ramper vid entréer, hissar. Allt som är nödvändigt för att personer med funktionsnedsättning ska kunna bo likvärdigt måste accepteras — oavsett vad stadgarna säger om "ordning".',
        },
        {
          rubrik: 'Intyg kan krävas',
          text: 'Styrelsen får fråga om hundens status som hjälpmedel (ledarhundsintyg, servicehundsintyg). Men ni får inte kräva bevis på själva funktionsnedsättningen.',
        },
      ],
    },
  },

  // ── 10. Intersektionell diskriminering ────────────
  {
    id: 10,
    persona: 'Styrelsen',
    roll: 'Bedömer klagomål',
    bild: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    kategori: 'Flera grunder',
    bubbla: '"En äldre kvinna med utländsk bakgrund klagar på att hon behandlas sämre än andra — på flera plan samtidigt."',
    fraga: 'Hur hanteras klagomål som rör flera diskrimineringsgrunder?',
    typ: 'single',
    alternativ: [
      { text: 'Hon måste välja vilken grund hon anmäler på', korrekt: false },
      { text: 'Flera grunder kan åberopas samtidigt — även att de samverkar', korrekt: true },
      { text: 'Den starkaste grunden väljs ut för prövning', korrekt: false },
      { text: 'Flerfaldig diskriminering är inte reglerad i svensk rätt', korrekt: false },
    ],
    feedback: {
      rubrik: 'Flera grunder kan samverka',
      sammanfattning: 'Diskriminering sker ofta i korsningen mellan flera grunder. En äldre kvinna med utländsk bakgrund kan uppleva behandling som varken "enbart" åldersdiskriminering eller "enbart" etnisk diskriminering — utan båda samtidigt, förstärkande. Lagen och praxis erkänner detta.',
      sektioner: [
        {
          rubrik: 'Vad innebär det praktiskt?',
          text: 'När ni utreder ett klagomål ska ni inte välja en grund och ignorera andra. Alla relevanta grunder analyseras. Skadeståndsbedömningen kan ta hänsyn till den förstärkta kränkningen av flera samverkande grunder.',
        },
        {
          rubrik: 'Risk i handläggningen',
          text: 'Det är lätt att avfärda en klagande som "känslig" när hen upplever mönster som var för sig är subtila. Att ta klagomål på allvar innebär att inte reducera dem till en enda dimension.',
        },
      ],
    },
  },

  // ── 11. Förebyggande arbete ───────────────────────
  {
    id: 11,
    persona: 'Ny styrelse',
    roll: 'Vill göra rätt från start',
    bild: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80',
    kategori: 'Förebyggande',
    rubrik: 'Vad gör en',
    rubrikOrange: 'inkluderande styrelse?',
    bubbla: '"Vi vill inte bara reagera när det blivit fel — vi vill förebygga. Vad är viktigast?"',
    fraga: 'Vilka åtgärder förebygger diskriminering i en BRF?',
    typ: 'multiple',
    alternativ: [
      { text: 'Skriftliga rutiner för uthyrning, varningar och klagomål', korrekt: true },
      { text: 'Att styrelsen genomgår utbildning om diskrimineringslagen', korrekt: true },
      { text: 'Informella regler som anpassas från fall till fall', korrekt: false },
      { text: 'Att dokumentera alla beslut som rör enskilda medlemmar', korrekt: true },
      { text: 'Regelbunden granskning av ordningsregler och stadgar', korrekt: true },
    ],
    feedback: {
      rubrik: 'Förebyggande: struktur, kunskap, granskning',
      sammanfattning: 'Det mesta som leder till diskrimineringsärenden är inte ond vilja — det är brist på rutiner. När styrelsen har skriftliga processer, kunskap om lagen och dokumenterar sina beslut minskar både risken för diskriminering och risken att ni inte kan försvara era beslut om något ifrågasätts.',
      sektioner: [
        {
          rubrik: 'Informella regler är riskfyllda',
          text: 'Varje gång styrelsen "gör en bedömning i det enskilda fallet" utan att luta sig mot en nedskriven regel, skapas risk för att bedömningen omedvetet påverkas av fördomar. Skriftliga regler skyddar både medlemmarna och styrelsen.',
        },
        {
          rubrik: 'Granska regelbundet',
          text: 'Ordningsregler som gjordes för 20 år sedan kan innehålla krav som idag uppfattas som diskriminerande. Ta upp dem till granskning minst vartannat år.',
        },
      ],
    },
  },

  // ── 12. När ett fel redan har begåtts ─────────────
  {
    id: 12,
    persona: 'Styrelsen',
    roll: 'Insett att de felat',
    bild: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80',
    kategori: 'Efterhantering',
    bubbla: '"Vi har insett att vårt beslut förra månaden faktiskt var diskriminerande. Vad gör vi nu?"',
    fraga: 'Vad är rätt sätt att hantera situationen?',
    typ: 'multiple',
    alternativ: [
      { text: 'Medge felet och ompröva beslutet', korrekt: true },
      { text: 'Kontakta den drabbade direkt och be om ursäkt', korrekt: true },
      { text: 'Förneka att felet skedde för att undvika skadestånd', korrekt: false },
      { text: 'Granska rutinerna så att samma fel inte upprepas', korrekt: true },
      { text: 'Dokumentera insikten och åtgärderna', korrekt: true },
    ],
    feedback: {
      rubrik: 'Att medge fel är både rätt och klokt',
      sammanfattning: 'När ni inser att ett beslut varit fel är bästa vägen framåt att medge det, ompröva, och åtgärda. Att försöka dölja fel förvärrar nästan alltid situationen — både relationen till medlemmen och den rättsliga ställningen.',
      sektioner: [
        {
          rubrik: 'Rättsligt perspektiv',
          text: 'En förening som själv identifierar och åtgärdar fel står betydligt bättre om en anmälan ändå görs. DO och domstolar ser på åtgärderna som visar att föreningen tar ansvar. Förnekande efter att felet är uppenbart är tvärtom ett försvårande moment.',
        },
        {
          rubrik: 'Förtroendearbete',
          text: 'Föreningar lever på förtroende mellan grannar. En ärlig hantering av misstag bygger förtroende på lång sikt, även om det känns obekvämt i stunden.',
        },
      ],
      exempel: 'Rätt: brev till drabbad medlem med ursäkt, beslutet omprövas på nästa möte, protokollför både insikten och åtgärden, diskutera lärdomar i hela styrelsen.',
    },
  },

];
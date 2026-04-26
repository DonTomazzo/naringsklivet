// src/data/diskrimineringFragorBlock1.ts
// Block 1: Grundläggande situationer
// 12 scenarier som tränar förmågan att identifiera diskriminering —
// de sju grunderna, direkt vs indirekt, vanliga missuppfattningar.

import type { SlideKFraga } from '../components/CourseElements/SlideTemplates';

export const diskrimineringFragorBlock1: SlideKFraga[] = [

  // ── 1. Direkt diskriminering ──────────────────────
  {
    id: 1,
    persona: 'Ahmed',
    roll: 'Sökande hyresgäst, festlokalen',
    bild: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    kategori: 'Direkt diskriminering',
    rubrik: 'Styrelsen nekar',
    rubrikOrange: 'lokaluthyrning',
    bubbla: '"Jag vill hyra festlokalen för min 40-årsfest på lördag. Alla krav uppfylls, jag har betalat depositionen."',
    fraga: 'Styrelsen nekar Ahmed med motiveringen "vi vill inte ha bråk". Vad är problemet?',
    typ: 'single',
    alternativ: [
      { text: 'Inget problem — styrelsen får neka om de vill', korrekt: false },
      { text: 'Direkt diskriminering på etnisk grund', korrekt: true },
      { text: 'Okej om styrelsen röstat enigt om beslutet', korrekt: false },
      { text: 'Problem endast om Ahmed kan bevisa avsikt', korrekt: false },
    ],
    feedback: {
      rubrik: 'Direkt diskriminering med vaga motiv',
      sammanfattning: 'Att neka med hänvisning till "bråk" är en subjektiv bedömning som riskerar bottna i förutfattade meningar. Om Ahmed uppfyller uthyrningskriterierna och jämförbara sökande godkänns, är detta direkt diskriminering.',
      sektioner: [
        {
          rubrik: 'Lagrum',
          text: 'Diskrimineringslagen 2 kap 12 § förbjuder diskriminering vid tillhandahållande av varor och tjänster till allmänheten — dit räknas uthyrning av föreningslokaler.',
        },
        {
          rubrik: 'Avsikt spelar ingen roll',
          text: 'Det är effekten av beslutet som avgör, inte om styrelsen "menade väl". Även utan medveten fördom kan beslutet vara diskriminerande.',
        },
      ],
      exempel: 'Rätt: dokumentera sakliga skäl — t.ex. lokalen redan bokad, tidigare misskötsel av specifik person, eller beläggningsrotation. Tillämpa kriterierna lika för alla.',
    },
  },

  // ── 2. De sju grunderna ──────────────────────────
  {
    id: 2,
    persona: 'Valberedningen',
    roll: 'Föreningen BRF Björken',
    bild: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    kategori: 'Skyddade grunder',
    bubbla: '"Vi vill säkerställa en balanserad styrelse. Vilka egenskaper skyddas egentligen av diskrimineringslagen?"',
    fraga: 'Vilka av följande är skyddade diskrimineringsgrunder enligt lagen?',
    typ: 'multiple',
    alternativ: [
      { text: 'Kön och könsöverskridande identitet', korrekt: true },
      { text: 'Etnisk tillhörighet och religion', korrekt: true },
      { text: 'Politisk åsikt', korrekt: false },
      { text: 'Ålder och sexuell läggning', korrekt: true },
      { text: 'Funktionsnedsättning', korrekt: true },
      { text: 'Utbildningsnivå', korrekt: false },
    ],
    feedback: {
      rubrik: 'Sju grunder — inte politik eller utbildning',
      sammanfattning: 'Diskrimineringslagen skyddar sju specifika grunder. Politisk åskådning och utbildningsnivå ingår inte — även om vissa av dem skyddas av annan lagstiftning (t.ex. yttrandefrihet).',
      sektioner: [
        {
          rubrik: 'De sju grunderna',
          text: 'Kön · Könsöverskridande identitet/uttryck · Etnisk tillhörighet · Religion/trosuppfattning · Funktionsnedsättning · Sexuell läggning · Ålder.',
        },
        {
          rubrik: 'Varför just dessa?',
          text: 'Lagen skyddar grupper som historiskt utsatts för systematisk diskriminering. Grunderna är uttömmande — det finns inga fler.',
        },
      ],
    },
  },

  // ── 3. Indirekt diskriminering ────────────────────
  {
    id: 3,
    persona: 'Styrelsen',
    roll: 'Ordningsregler, BRF Ekbacken',
    bild: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    kategori: 'Indirekt diskriminering',
    rubrik: 'En regel som',
    rubrikOrange: 'drabbar olika',
    bubbla: '"För att bli valberedningsledamot krävs minst 5 års boende i föreningen. Det gäller ju alla lika."',
    fraga: 'Kravet "5 års boende" — är det problematiskt?',
    typ: 'single',
    alternativ: [
      { text: 'Nej, samma krav för alla = ingen diskriminering', korrekt: false },
      { text: 'Ja, det är direkt diskriminering på etnisk grund', korrekt: false },
      { text: 'Ja, det kan vara indirekt diskriminering om det inte är motiverat', korrekt: true },
      { text: 'Nej, föreningen får själv sätta krav', korrekt: false },
    ],
    feedback: {
      rubrik: 'Indirekt diskriminering — neutralt på ytan',
      sammanfattning: 'Regler som verkar neutrala kan ändå drabba vissa grupper oproportionerligt. Ett 5-årskrav kan systematiskt utesluta nyanlända medlemmar — vilket kan vara indirekt diskriminering på etnisk grund.',
      sektioner: [
        {
          rubrik: 'Testet: proportionalitet',
          text: 'Indirekt diskriminering är tillåten endast om regeln har ett legitimt syfte och är både nödvändig och proportionerlig för att uppnå det syftet.',
        },
        {
          rubrik: 'Fråga er tre saker',
          text: '1) Drabbar regeln en skyddad grupp mer än andra? 2) Finns ett legitimt syfte? 3) Kan syftet nås på mindre ingripande sätt?',
        },
      ],
      exempel: 'Alternativ formulering: "Valberedningen ska ha god kännedom om föreningen" — ett mål snarare än ett rigidt årskrav.',
    },
  },

  // ── 4. Avsikt vs effekt ──────────────────────────
  {
    id: 4,
    persona: 'Ordföranden',
    roll: 'BRF Kastanjen',
    bild: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    kategori: 'Avsikt vs effekt',
    bubbla: '"Vi menade inte alls att diskriminera. Det var ett välmenande beslut att skydda föreningen."',
    fraga: 'Kan välmenande avsikt rädda föreningen från diskrimineringsansvar?',
    typ: 'single',
    alternativ: [
      { text: 'Ja, uppsåt krävs för att det ska räknas som diskriminering', korrekt: false },
      { text: 'Ja, om föreningen kan dokumentera sin goda avsikt', korrekt: false },
      { text: 'Nej, det är effekten som avgör — inte avsikten', korrekt: true },
      { text: 'Det beror på vilken diskrimineringsgrund det handlar om', korrekt: false },
    ],
    feedback: {
      rubrik: 'Effekten avgör — inte avsikten',
      sammanfattning: 'Diskrimineringslagen är objektiv. Om ett beslut eller en handling leder till sämre behandling av någon på grund av en skyddad egenskap är det diskriminering — oavsett om avsikten var god.',
      sektioner: [
        {
          rubrik: 'Varför är lagen utformad så?',
          text: 'Om uppsåt krävdes skulle diskriminering bli nästan omöjlig att bevisa. Lagen fokuserar istället på det som går att mäta: behandlingen och dess konsekvenser.',
        },
        {
          rubrik: 'Praktisk konsekvens',
          text: 'Granska era beslut utifrån "hur uppfattas detta av den drabbade?" — inte "vad menade vi?".',
        },
      ],
    },
  },

  // ── 5. Funktionsnedsättning ──────────────────────
  {
    id: 5,
    persona: 'Karin',
    roll: 'Medlem, nyligen fått rullstol',
    bild: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    kategori: 'Funktionsnedsättning',
    rubrik: 'Stämman hålls',
    rubrikOrange: 'utan rampåtkomst',
    bubbla: '"Jag kom till stämman men kunde inte ta mig upp för trappan till lokalen. Ingen hade tänkt på rullstolsanpassning."',
    fraga: 'Har föreningen brutit mot diskrimineringslagen?',
    typ: 'single',
    alternativ: [
      { text: 'Nej, stämmor är interna möten utan krav på tillgänglighet', korrekt: false },
      { text: 'Ja, brist på skäliga tillgänglighetsåtgärder är diskriminering', korrekt: true },
      { text: 'Ja, men bara om Karin informerat om sin funktionsnedsättning i förväg', korrekt: false },
      { text: 'Nej, så länge Karin kan få protokollet efteråt', korrekt: false },
    ],
    feedback: {
      rubrik: 'Bristande tillgänglighet är diskriminering',
      sammanfattning: 'Sedan 2015 räknas bristande tillgänglighet som en form av diskriminering. Föreningen är skyldig att vidta skäliga åtgärder så att personer med funktionsnedsättning kan delta på likvärdiga villkor.',
      sektioner: [
        {
          rubrik: '"Skäligt" — vad menas?',
          text: 'Vad som är skäligt beror på föreningens ekonomi, åtgärdens kostnad och nytta. Men "vi tänkte inte på det" är aldrig skäl att låta bli att utreda.',
        },
        {
          rubrik: 'Alternativa lösningar',
          text: 'Om huvudalternativet inte är möjligt måste likvärdigt alternativ erbjudas — t.ex. digitalt deltagande eller alternativ lokal.',
        },
      ],
      exempel: 'Rätt: boka tillgänglig lokal i förväg, erbjud digital anslutning, informera alla medlemmar om möjligheten att anmäla särskilda behov.',
    },
  },

  // ── 6. Religion ──────────────────────────────────
  {
    id: 6,
    persona: 'Föreningen',
    roll: 'BRF Tallen',
    bild: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80',
    kategori: 'Religion',
    bubbla: '"Några medlemmar vill hyra gemensamhetslokalen en timme per fredag för muslimsk bön. Kan styrelsen neka?"',
    fraga: 'Vilka motiv är godtagbara att neka begäran?',
    typ: 'multiple',
    alternativ: [
      { text: 'Lokalen är redan uthyrd fredagar kl 12–13', korrekt: true },
      { text: 'Styrelsen tycker inte om religion i föreningens lokaler', korrekt: false },
      { text: 'Ordningsregler förbjuder återkommande privata evenemang av alla slag', korrekt: true },
      { text: 'Vi oroar oss för att andra medlemmar kan reagera', korrekt: false },
      { text: 'Lokalen är i så dåligt skick att all uthyrning pausats', korrekt: true },
    ],
    feedback: {
      rubrik: 'Sakliga skäl, tillämpade lika',
      sammanfattning: 'Religiösa ändamål har inte starkare rätt än andra — men de har inte heller svagare. Kärnan är att föreningen måste tillämpa samma regler på alla. Att neka religiöst bruk när motsvarande sekulära bruk tillåts är diskriminering.',
      sektioner: [
        {
          rubrik: 'Godtagbara skäl',
          text: 'Bokningskonflikt, generellt förbud som gäller alla, lokalstatus. Samma skäl som skulle motivera avslag för en yoga-grupp eller en pokerklubb.',
        },
        {
          rubrik: 'Ej godtagbara skäl',
          text: 'Personlig motvilja mot religion, oro för andra medlemmars reaktioner, rädsla för "konflikt" — allt detta är indirekta uttryck för diskriminering.',
        },
      ],
    },
  },

  // ── 7. Ålder ─────────────────────────────────────
  {
    id: 7,
    persona: 'Rolf',
    roll: 'Pensionär, vill sitta i styrelsen',
    bild: 'https://images.unsplash.com/photo-1559076294-0608b1dafbcb?w=400&q=80',
    kategori: 'Ålder',
    rubrik: 'Stadgar som',
    rubrikOrange: 'utestänger',
    bubbla: '"Jag är 72 år och vill kandidera till styrelsen, men stadgarna säger max 70. Är det okej?"',
    fraga: 'Är åldersgränsen i stadgarna tillåten?',
    typ: 'single',
    alternativ: [
      { text: 'Ja, stadgebeslut från stämman är alltid giltiga', korrekt: false },
      { text: 'Ja, om åldersgränsen har ett sakligt motiverat syfte', korrekt: true },
      { text: 'Nej, åldersgränser är alltid olagliga', korrekt: false },
      { text: 'Nej, men stämman kan besluta om undantag för Rolf', korrekt: false },
    ],
    feedback: {
      rubrik: 'Åldersgränser kan tillåtas — men bara med sakliga skäl',
      sammanfattning: 'Ålder är en skyddad grund, men lagen tillåter åldersgränser när de har ett berättigat syfte och medlen är lämpliga och nödvändiga. Ren ålderism är dock förbjuden.',
      sektioner: [
        {
          rubrik: 'Vad räknas som sakligt?',
          text: 'Syften som skydd av ungdomars anställningsmöjligheter, pensionsbestämmelser eller säkerhetskrav kan motivera åldersgränser. För styrelseuppdrag i BRF är det dock svårt att hitta ett sakligt syfte.',
        },
        {
          rubrik: 'Granska stadgarna',
          text: 'Åldersgränser som införts på vaga grunder ("det brukar vara så") klarar sällan en rättslig prövning. Ta gärna bort dem vid nästa stadgeändring.',
        },
      ],
    },
  },

  // ── 8. Missuppfattning om "tradition" ────────────
  {
    id: 8,
    persona: 'Sekreteraren',
    roll: 'Långvarig styrelseledamot',
    bild: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
    kategori: 'Praxis & tradition',
    bubbla: '"Vi har alltid gjort så här i föreningen. Det kan väl inte plötsligt vara fel?"',
    fraga: 'Skyddar långvarig praxis mot diskrimineringsansvar?',
    typ: 'single',
    alternativ: [
      { text: 'Ja, om praxisen är äldre än diskrimineringslagen från 2008', korrekt: false },
      { text: 'Ja, sedvanerätt går före skriven lag', korrekt: false },
      { text: 'Nej, praxis ger inget rättsligt skydd', korrekt: true },
      { text: 'Nej, men det kan minska skadeståndet', korrekt: false },
    ],
    feedback: {
      rubrik: 'Tradition är inget försvar',
      sammanfattning: 'Att en rutin har följts länge gör den inte laglig. Diskrimineringslagen gäller oavsett föreningens praxis och ålder. Tvärtom — längre diskriminering kan innebära större ansvar.',
      sektioner: [
        {
          rubrik: 'Varför tänker vi så?',
          text: 'Människor tenderar att rättfärdiga det vi gör av vana. Men lagen frågar inte "har ni alltid gjort så?" utan "var behandlingen likvärdig?".',
        },
        {
          rubrik: 'Förändringsarbete',
          text: 'Ta regelbundet upp era rutiner och regler för granskning. Fråga: tjänar detta ett syfte idag? Drabbar det någon grupp oproportionerligt?',
        },
      ],
    },
  },

  // ── 9. Sexuell läggning ──────────────────────────
  {
    id: 9,
    persona: 'Emma och Lisa',
    roll: 'Samboende medlemmar',
    bild: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    kategori: 'Sexuell läggning',
    bubbla: '"Vi vill hyra festlokalen för vårt bröllop. Styrelsen säger att det är "bäst att inte göra en stor grej" av det."',
    fraga: 'Vad är problemet med styrelsens respons?',
    typ: 'single',
    alternativ: [
      { text: 'Inget — styrelsen får ge personliga råd', korrekt: false },
      { text: 'Trakasserier — kränkande kommentar kopplad till sexuell läggning', korrekt: true },
      { text: 'Bara problem om uthyrningen faktiskt nekas', korrekt: false },
      { text: 'Problem endast om någon i styrelsen sa det öppet', korrekt: false },
    ],
    feedback: {
      rubrik: 'Trakasserier — även utan nekande',
      sammanfattning: 'Uppmaningen "att inte göra en stor grej" av ett samkönat bröllop är en kränkande kommentar kopplad till sexuell läggning. Det räknas som trakasserier enligt diskrimineringslagen — även om själva uthyrningen godkänns.',
      sektioner: [
        {
          rubrik: 'Definition av trakasserier',
          text: 'Ett uppträdande som kränker någons värdighet och har samband med en skyddad grund. Det behöver inte vara upprepat, och det behöver inte vara avsiktligt.',
        },
        {
          rubrik: 'Föreningens ansvar',
          text: 'När styrelsen eller dess representanter uttalar sig på föreningens vägnar blir föreningen ansvarig för kommentarens innebörd — oavsett vem som sa den.',
        },
      ],
      exempel: 'Rätt: "Välkomna! Här är bokningsblanketten och våra standardvillkor." Samma välkomnande oavsett vilka som gifter sig.',
    },
  },

  // ── 10. Etnicitet & störningsärenden ─────────────
  {
    id: 10,
    persona: 'Styrelsen',
    roll: 'Hanterar störningsärenden',
    bild: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    kategori: 'Etnicitet',
    rubrik: 'Olika trösklar',
    rubrikOrange: 'för olika familjer',
    bubbla: '"Vi har skickat varning till familjen Hassan efter två klagomål, men familjen Andersson har fått fem klagomål utan varning."',
    fraga: 'Vad är fel i styrelsens hantering?',
    typ: 'multiple',
    alternativ: [
      { text: 'Olika tröskel för olika medlemmar', korrekt: true },
      { text: 'Behandlingen kan vara indirekt diskriminering på etnisk grund', korrekt: true },
      { text: 'Bristande dokumentation av bedömningsgrunder', korrekt: true },
      { text: 'Inget fel — styrelsen får bedöma från fall till fall', korrekt: false },
    ],
    feedback: {
      rubrik: 'Konsekvent handläggning är kärnan',
      sammanfattning: 'När samma typ av ärende behandlas olika beroende på vem som är inblandad uppstår stor risk för diskriminering. Även utan medveten partiskhet blir mönstret diskriminerande.',
      sektioner: [
        {
          rubrik: 'Mönster spelar roll',
          text: 'En enskild bedömning kan försvaras. Ett mönster där en viss grupp konsekvent behandlas hårdare kan vara diskriminering — även om varje enskilt beslut "verkade rimligt i stunden".',
        },
        {
          rubrik: 'Bevisbördan',
          text: 'Om Hassan anmäler till DO måste föreningen kunna visa att tröskeln varit densamma för alla. Utan dokumentation blir det svårt att försvara sig.',
        },
      ],
      exempel: 'Rätt: skriv ner tröskeln i förväg (t.ex. "första muntliga påminnelse efter 1 klagomål, skriftlig varning efter 3") och tillämpa den lika för alla.',
    },
  },

  // ── 11. Repressalier ─────────────────────────────
  {
    id: 11,
    persona: 'Maria',
    roll: 'Medlem som anmält föreningen',
    bild: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    kategori: 'Repressalier',
    bubbla: '"Efter att jag anmält föreningen till DO har styrelsen plötsligt börjat krångla med min ombyggnadsansökan."',
    fraga: 'Vad heter denna form av reaktion — och är den tillåten?',
    typ: 'single',
    alternativ: [
      { text: 'Berättigat försvar — styrelsen får skydda sig', korrekt: false },
      { text: 'Repressalier — uttryckligen förbjudet', korrekt: true },
      { text: 'Motfordran — tillåten om föreningen också drabbas', korrekt: false },
      { text: 'Okänslig hantering — inte olagligt men olämpligt', korrekt: false },
    ],
    feedback: {
      rubrik: 'Repressalier — en separat överträdelse',
      sammanfattning: 'Diskrimineringslagen förbjuder uttryckligen repressalier mot den som anmält, påtalat eller medverkat i utredning av diskriminering. Repressalier kan ge ytterligare skadeståndsansvar utöver den ursprungliga överträdelsen.',
      sektioner: [
        {
          rubrik: 'Vad räknas som repressalier?',
          text: 'Alla former av sämre behandling som har samband med anmälan — försenad handläggning, extra byråkrati, uteslutning från gemenskap, negativa kommentarer, hotfulla uttalanden.',
        },
        {
          rubrik: 'Lagrum',
          text: 'Diskrimineringslagen 2 kap 18–19 §. Skyddet gäller även den som medverkat eller anmält å någon annans vägnar.',
        },
      ],
      exempel: 'Rätt: hantera Marias ombyggnadsansökan exakt som andra jämförbara ansökningar, dokumentera alla steg, och låt frågan om DO-anmälan hållas helt separat.',
    },
  },

  // ── 12. Könsöverskridande identitet ──────────────
  {
    id: 12,
    persona: 'Kim',
    roll: 'Icke-binär medlem',
    bild: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&q=80',
    kategori: 'Könsidentitet',
    bubbla: '"Jag identifierar mig som icke-binär. På stämman använde ordföranden "han" om mig fast jag bett om "hen". Spelar det roll?"',
    fraga: 'Är detta en diskrimineringsfråga?',
    typ: 'single',
    alternativ: [
      { text: 'Nej, pronomen är en privat fråga utan rättslig betydelse', korrekt: false },
      { text: 'Ja, könsöverskridande identitet är en skyddad grund', korrekt: true },
      { text: 'Bara om Kim genomgått juridisk könskorrigering', korrekt: false },
      { text: 'Ja, men bara om det är upprepat och avsiktligt', korrekt: false },
    ],
    feedback: {
      rubrik: 'Könsöverskridande identitet är skyddad',
      sammanfattning: 'Diskrimineringslagen skyddar könsöverskridande identitet och uttryck. Det innefattar personer som inte identifierar sig med sitt juridiska kön och personer som uttrycker sitt kön på ett sätt som avviker från normen. Att ignorera en medlems pronomen kan utgöra trakasserier.',
      sektioner: [
        {
          rubrik: 'Juridisk status spelar ingen roll',
          text: 'Skyddet gäller oavsett om personen genomgått könskorrigering, hen-registrering eller inte. Det är identiteten och uttrycket som skyddas.',
        },
        {
          rubrik: 'Praktisk hantering',
          text: 'Respektera den enskildes önskemål om pronomen. Om ni är osäkra — fråga. Det är inte kränkande att fråga, men det kan vara kränkande att anta.',
        },
      ],
      exempel: 'Rätt: när Kim bett om "hen" används det konsekvent i protokoll, kallelser och samtal. Felsägningar rättas till och en kort ursäkt ges.',
    },
  },

];
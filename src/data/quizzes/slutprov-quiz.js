// data/quizzes/slutprov-quiz.js
// Styrelsekörkortet – Slutprov
// ~40 frågor: single_choice, multiple_choice, scenario-baserade
// Täcker: BRF-grunderna, stadgar, stämman, beslutsförhet, revisorn,
//         ansvarsfrihet, lägenhetsförteckning, GDPR, diskriminering,
//         andrahandsuthyrning, störningar, pantsättning, underhållsplan m.fl.

export const slutprovQuiz = {
  id: 'slutprov',
  title: 'Slutprov – Styrelsekörkortet',
  slug: 'html-slutprov',
  passing_score: 75, // procent för godkänt
  questions: [

    // ─── BRF-GRUNDERNA ───────────────────────────────────────────

    {
      id: 'sp1',
      question_text: 'Enligt bostadsrättslagen – vad är det primära syftet med en bostadsrättsförening?',
      question_type: 'single_choice',
      question_order: 1,
      options: {
        choices: [
          'Att hyra ut lägenheter till allmänheten',
          'Att upplåta lägenheter med bostadsrätt till sina medlemmar',
          'Att äga och förvalta fastigheter för vinstmaximering',
          'Att ge kommunen möjlighet att reglera boendet'
        ]
      },
      correct_answer: 'Att upplåta lägenheter med bostadsrätt till sina medlemmar',
      explanation: 'En bostadsrättsförenings huvudsyfte enligt bostadsrättslagen är att upplåta lägenheter med bostadsrätt till sina medlemmar – inte att hyra ut eller generera vinst.',
      points: 100
    },

    {
      id: 'sp2',
      question_text: 'Vilken juridisk associationsform är en bostadsrättsförening?',
      question_type: 'single_choice',
      question_order: 2,
      options: {
        choices: [
          'Aktiebolag',
          'Ideell förening',
          'Ekonomisk förening',
          'Stiftelse'
        ]
      },
      correct_answer: 'Ekonomisk förening',
      explanation: 'En bostadsrättsförening är en ekonomisk förening och lyder därmed under lagen om ekonomiska föreningar (LEF) – inte under aktiebolagslagen eller regler för ideella föreningar.',
      points: 100
    },

    {
      id: 'sp3',
      question_text: 'Vilka lagar gäller primärt för bostadsrättsföreningar? Markera två alternativ.',
      question_type: 'multiple_choice',
      question_order: 3,
      options: {
        choices: [
          'Aktiebolagslagen',
          'Lagen om ekonomiska föreningar',
          'Lagen om ideella föreningar',
          'Bostadsrättslagen',
          'Fastighetslagen'
        ]
      },
      correct_answer: ['Lagen om ekonomiska föreningar', 'Bostadsrättslagen'],
      explanation: 'BRF:er styrs framförallt av bostadsrättslagen (BRL) och lagen om ekonomiska föreningar (LEF). Bostadsrättslagen är speciallag och går före LEF där de är motstridiga.',
      points: 150
    },

    {
      id: 'sp4',
      question_text: 'Vilka av följande dokument är lagstadgat obligatoriska i en bostadsrättsförening? Markera tre alternativ.',
      question_type: 'multiple_choice',
      question_order: 4,
      options: {
        choices: [
          'Stadgar',
          'Underhållsplan',
          'Sekretessavtal för styrelseledamöter',
          'Medlemsförteckning',
          'Lägenhetsförteckning'
        ]
      },
      correct_answer: ['Stadgar', 'Medlemsförteckning', 'Lägenhetsförteckning'],
      explanation: 'Stadgar, medlemsförteckning och lägenhetsförteckning är lagstadgade krav. Underhållsplan är viktig men inte lagstadgat obligatorisk på samma sätt, och sekretessavtal finns inget lagkrav på.',
      points: 150
    },

    // ─── STADGAR ────────────────────────────────────────────────

    {
      id: 'sp5',
      question_text: 'Maja är ny i styrelsen och undrar om hon kan läsa föreningens stadgar. Lisa, som suttit länge, säger att stadgarna "bara är för styrelsen". Vad gäller?',
      question_type: 'single_choice',
      question_order: 5,
      options: {
        choices: [
          'Lisa har rätt – stadgarna är ett internt styrelsedokument',
          'Stadgarna ska finnas tillgängliga för alla medlemmar, inte bara styrelsen',
          'Stadgarna är offentlig handling och ska registreras hos Bolagsverket',
          'Stadgarna är hemliga och får inte visas utanför föreningen'
        ]
      },
      correct_answer: 'Stadgarna ska finnas tillgängliga för alla medlemmar, inte bara styrelsen',
      explanation: 'Stadgarna ska vara tillgängliga för samtliga medlemmar i föreningen. Det är ett grundläggande krav – inte ett internt styrelsdokument.',
      points: 100
    },

    {
      id: 'sp6',
      question_text: 'Styrelseordföranden i BRF Solen vill ensam ändra en paragraf i stadgarna som hon tycker är otidsenlig. Vad gäller?',
      question_type: 'single_choice',
      question_order: 6,
      options: {
        choices: [
          'Ordföranden kan ändra stadgarna om övriga styrelseledamöter inte protesterar',
          'Styrelsen kan gemensamt ändra stadgarna på ett styrelsemöte',
          'Ändring av stadgar kräver beslut på två på varandra följande föreningsstämmor',
          'Bolagsverket måste godkänna ändringen innan stämman behandlar den'
        ]
      },
      correct_answer: 'Ändring av stadgar kräver beslut på två på varandra följande föreningsstämmor',
      explanation: 'Stadgeändring är ett av de tyngsta besluten i en BRF. Det krävs beslut på två på varandra följande stämmor – detta skyddar medlemmarna från förhastade ändringar.',
      points: 100
    },

    // ─── FÖRENINGSSTÄMMAN ────────────────────────────────────────

    {
      id: 'sp7',
      question_text: 'Vilka punkter måste enligt lag alltid finnas med på den ordinarie föreningsstämman (årsstämman)? Markera fyra alternativ.',
      question_type: 'multiple_choice',
      question_order: 7,
      options: {
        choices: [
          'Fastställa resultat- och balansräkning',
          'Fastställa marknadsvärdet på fastigheten',
          'Ta ställning till ansvarsfrihet för styrelsen',
          'Välja styrelse och revisor',
          'Besluta hur årsresultatet ska disponeras'
        ]
      },
      correct_answer: [
        'Fastställa resultat- och balansräkning',
        'Ta ställning till ansvarsfrihet för styrelsen',
        'Välja styrelse och revisor',
        'Besluta hur årsresultatet ska disponeras'
      ],
      explanation: 'Dessa fyra punkter är lagstadgade för den ordinarie föreningsstämman. Fastighetens marknadsvärde är däremot inte ett lagkrav.',
      points: 150
    },

    {
      id: 'sp8',
      question_text: 'Föreningens revisor Martin anser att styrelsen fattat ett allvarligt felaktigt beslut om en stor renovering. Han vill kalla till en extrastämma. Har han rätt att göra det?',
      question_type: 'single_choice',
      question_order: 8,
      options: {
        choices: [
          'Nej, endast styrelsen kan kalla till stämma',
          'Nej, revisorn har ingen rätt att kalla till stämma',
          'Ja, revisorn har rätt att begära att styrelsen kallar till extrastämma',
          'Ja, revisorn kan självmant kalla till stämma utan att gå via styrelsen'
        ]
      },
      correct_answer: 'Ja, revisorn har rätt att begära att styrelsen kallar till extrastämma',
      explanation: 'Revisorn har rätt att begära att styrelsen kallar till extrastämma. Det är styrelsen som formellt utfärdar kallelsen, men revisorn kan initiera processen.',
      points: 100
    },

    // ─── STYRELSELEDAMÖTER – INVAL & UTTRÄDE ────────────────────

    {
      id: 'sp9',
      question_text: 'Kan vem som helst i föreningen engagera sig i styrelsen? Markera tre alternativ som stämmer.',
      question_type: 'multiple_choice',
      question_order: 9,
      options: {
        choices: [
          'Ja, så länge man betalar avgiften i tid',
          'Ja, så länge man är myndig',
          'Ja, så länge man inte är egenföretagare som gått i konkurs',
          'Ja, så länge man inte är försatt i personlig konkurs',
          'Ja, så länge man inte har ett förvaltarskap enligt 11 kap. 7 § föräldrabalken',
          'Ja, så länge man inte har näringsförbud'
        ]
      },
      correct_answer: [
        'Ja, så länge man är myndig',
        'Ja, så länge man inte är försatt i personlig konkurs',
        'Ja, så länge man inte har ett förvaltarskap enligt 11 kap. 7 § föräldrabalken'
      ],
      explanation: 'Lagkraven för att sitta i styrelsen är: man ska vara myndig, får inte vara i personlig konkurs, ha näringsförbud eller ha en förvaltare enligt föräldrabalken. En företagskonkurs hindrar inte i sig.',
      points: 150
    },

    {
      id: 'sp10',
      question_text: 'Medlemmen Erik drev tidigare en pizzeria som gick i konkurs under Coronapandemin. Nu vill han kandidera till styrelsen. Internrevisorn Johanna hävdar att han inte får. Vad gäller?',
      question_type: 'single_choice',
      question_order: 10,
      options: {
        choices: [
          'Erik kan inte sitta i styrelsen eftersom han haft en konkurs',
          'Erik kan sitta i styrelsen utan problem, så länge han uppfyller de juridiska formkraven',
          'Erik kan sitta i styrelsen men utan rösträtt',
          'Erik behöver dispens från tingsrätten för att kandidera'
        ]
      },
      correct_answer: 'Erik kan sitta i styrelsen utan problem, så länge han uppfyller de juridiska formkraven',
      explanation: 'En företagskonkurs och en personlig konkurs är helt olika saker. Eriks pizzeria gick i konkurs – inte Erik personligen. Så länge han inte har personlig konkurs, näringsförbud eller förvaltare finns inga juridiska hinder.',
      points: 100
    },

    {
      id: 'sp11',
      question_text: 'Vilket organ fattar beslut om inval av styrelseledamöter i en BRF? Markera två alternativ.',
      question_type: 'multiple_choice',
      question_order: 11,
      options: {
        choices: [
          'Valberedningen',
          'Styrelsen',
          'Ordinarie föreningsstämma',
          'Extra föreningsstämma',
          'Revisorn'
        ]
      },
      correct_answer: ['Ordinarie föreningsstämma', 'Extra föreningsstämma'],
      explanation: 'Det är föreningsstämman – ordinarie eller extra – som väljer styrelseledamöter. Valberedningen nominerar men har ingen beslutanderätt.',
      points: 150
    },

    // ─── JURIDISKT ANSVAR ────────────────────────────────────────

    {
      id: 'sp12',
      question_text: 'Vilka i styrelsen har ett juridiskt ansvar? Markera tre alternativ.',
      question_type: 'multiple_choice',
      question_order: 12,
      options: {
        choices: [
          'Varje styrelseledamot bär sitt eget individuella ansvar',
          'Alla ledamöter har alltid exakt samma ansvar',
          'Sekreteraren har inget ansvar',
          'En adjungerad person i styrelsen har inget juridiskt ansvar',
          'Suppleanter som ersätter en ordinarie ledamot på mötet har fullt ansvar'
        ]
      },
      correct_answer: [
        'Varje styrelseledamot bär sitt eget individuella ansvar',
        'En adjungerad person i styrelsen har inget juridiskt ansvar',
        'Suppleanter som ersätter en ordinarie ledamot på mötet har fullt ansvar'
      ],
      explanation: 'Ansvaret är individuellt per ledamot. Adjungerade personer deltar men bär inget juridiskt ansvar. Suppleanter som träder in och deltar på ett möte tar på sig samma ansvar som ordinarie ledamöter under det mötet.',
      points: 150
    },

    {
      id: 'sp13',
      question_text: 'Styrelseordföranden Anna vill fatta ett beslut ensam om att köpa en ny städmaskin för 85 000 kr. Har hon rätt att göra det?',
      question_type: 'single_choice',
      question_order: 13,
      options: {
        choices: [
          'Ja, ordföranden kan alltid fatta beslut ensam',
          'Ja, om beloppet understiger 100 000 kr',
          'Nej, beslut om inköp ska fattas av hela styrelsen gemensamt om inte stadgarna föreskriver annat',
          'Nej, sådana beslut måste alltid tas på föreningsstämman'
        ]
      },
      correct_answer: 'Nej, beslut om inköp ska fattas av hela styrelsen gemensamt om inte stadgarna föreskriver annat',
      explanation: 'Ordföranden har ett särskilt ansvar men kan inte ensam fatta ekonomiska beslut av den här typen. Styrelsen fattar beslut gemensamt – ordföranden leder processen men är inte ensam beslutsfattare.',
      points: 100
    },

    // ─── ANSVARSFRIHET ───────────────────────────────────────────

    {
      id: 'sp14',
      question_text: 'Vad stämmer om ansvarsfrihet för styrelsen? Markera tre alternativ.',
      question_type: 'multiple_choice',
      question_order: 14,
      options: {
        choices: [
          'Frågan om ansvarsfrihet kan tas upp på alla föreningsstämmor',
          'Ansvarsfriheten handlar om hela det gångna kalenderåret för alla',
          'Ansvarsfriheten gäller enbart den tid varje ledamot varit verksam i styrelsen',
          'Ansvarsfriheten kan återkallas under vissa förhållanden',
          'Om ansvarsfrihet inte beviljas har föreningen möjlighet att väcka talan'
        ]
      },
      correct_answer: [
        'Frågan om ansvarsfrihet kan tas upp på alla föreningsstämmor',
        'Ansvarsfriheten gäller enbart den tid varje ledamot varit verksam i styrelsen',
        'Om ansvarsfrihet inte beviljas har föreningen möjlighet att väcka talan'
      ],
      explanation: 'Ansvarsfriheten är individuell och tidsbunden – den gäller bara den period ledamoten faktiskt suttit. Om den nekas kan föreningen väcka skadeståndstalan. Ansvarsfriheten kan återkallas om information undanhållits.',
      points: 150
    },

    // ─── REVISORN ────────────────────────────────────────────────

    {
      id: 'sp15',
      question_text: 'Vad gäller för revisorn i en BRF? Markera tre alternativ som stämmer.',
      question_type: 'multiple_choice',
      question_order: 15,
      options: {
        choices: [
          'En BRF ska ha minst två auktoriserade revisorer',
          'En BRF ska ha minst en revisor',
          'Till revisor kan även ett registrerat revisionsbolag utses',
          'Styrelsen kan fatta beslut om att BRF:en inte längre ska ha en revisor',
          'Styrelsen kan ensamt avsätta en revisor som inte fungerar bra'
        ]
      },
      correct_answer: [
        'En BRF ska ha minst en revisor',
        'Till revisor kan även ett registrerat revisionsbolag utses',
        'Styrelsen kan fatta beslut om att BRF:en inte längre ska ha en revisor'
      ],
      explanation: 'En BRF behöver minst en revisor – antingen en fysisk person eller ett registrerat revisionsbolag. Under vissa förutsättningar (färre lägenheter, låg omsättning) kan styrelsen besluta att slippa revisor. Styrelsen kan inte ensam avsätta revisorn.',
      points: 150
    },

    // ─── BESLUTSFÖRHET ───────────────────────────────────────────

    {
      id: 'sp16',
      question_text: 'BRF Ljungbackens styrelse har sju ledamöter. Tre är på semester. Hur många måste närvara för att styrelsen ska vara beslutför?',
      question_type: 'single_choice',
      question_order: 16,
      options: {
        choices: [
          'Alla sju ledamöterna måste vara på plats',
          'Minst tre ledamöter – dvs hälften av de sju minus en',
          'Mer än hälften – alltså minst fyra av sju',
          'Det räcker med att ordföranden och en ledamot är närvarande'
        ]
      },
      correct_answer: 'Mer än hälften – alltså minst fyra av sju',
      explanation: 'Styrelsen är beslutför när mer än hälften av samtliga ledamöter är närvarande. Med sju ledamöter krävs alltså minst fyra. De tre på semester innebär att man precis klarar beslutförheten med fyra kvar.',
      points: 100
    },

    {
      id: 'sp17',
      question_text: 'Vilka ytterligare kriterier måste vara uppfyllda för att styrelsen ska kunna ta giltiga beslut? Markera tre alternativ.',
      question_type: 'multiple_choice',
      question_order: 17,
      options: {
        choices: [
          'Alla ledamöter ska få möjlighet att delta i ärendets behandling',
          'Alla ledamöter måste få tillfredsställande underlag',
          'Beslut blir alltid gällande om ordföranden bifaller förslaget',
          'Om inte alla är närvarande krävs att mer än hälften av totala antalet ledamöter bifaller',
          'Stadgarna kan aldrig ändra dessa kriterier'
        ]
      },
      correct_answer: [
        'Alla ledamöter ska få möjlighet att delta i ärendets behandling',
        'Alla ledamöter måste få tillfredsställande underlag',
        'Om inte alla är närvarande krävs att mer än hälften av totala antalet ledamöter bifaller'
      ],
      explanation: 'Beslut kräver att alla ledamöter fått chans att delta och fått tillräckligt underlag. Dessutom måste mer än hälften av det totala antalet ledamöter bifalla – inte bara de som är på plats.',
      points: 150
    },

    // ─── PROTOKOLL ───────────────────────────────────────────────

    {
      id: 'sp18',
      question_text: 'Vad säger lagen om styrelseprotokoll? Markera fyra alternativ.',
      question_type: 'multiple_choice',
      question_order: 18,
      options: {
        choices: [
          'Protokollet ska skrivas under av ordförande, sekreterare och justeringsperson',
          'Protokollen ska föras i nummerföljd',
          'Styrelseprotokoll är offentlig handling och ska registreras hos Bolagsverket',
          'Alla beslut ska antecknas i protokollet',
          'Protokollen ska förvaras på ett betryggande sätt'
        ]
      },
      correct_answer: [
        'Protokollet ska skrivas under av ordförande, sekreterare och justeringsperson',
        'Protokollen ska föras i nummerföljd',
        'Alla beslut ska antecknas i protokollet',
        'Protokollen ska förvaras på ett betryggande sätt'
      ],
      explanation: 'Styrelseprotokoll är INTE offentlig handling och behöver inte registreras hos Bolagsverket – det är ett vanligt missförstånd. Övriga fyra stämmer väl med lagens krav.',
      points: 150
    },

    // ─── LÄGENHETSFÖRTECKNING & MEDLEMSFÖRTECKNING ──────────────

    {
      id: 'sp19',
      question_text: 'Vem har rätt att ta del av lägenhetsförteckningen? Markera två alternativ.',
      question_type: 'multiple_choice',
      question_order: 19,
      options: {
        choices: [
          'Alla – förteckningen är en offentlig handling',
          'Alla bostadsrättsinnehavare i fastigheten',
          'Endast bostadsrättsinnehavaren själv har rätt till utdrag om sin lägenhet',
          'En mäklare som fått fullmakt av bostadsrättsinnehavaren',
          'Bolagsverket'
        ]
      },
      correct_answer: [
        'Endast bostadsrättsinnehavaren själv har rätt till utdrag om sin lägenhet',
        'En mäklare som fått fullmakt av bostadsrättsinnehavaren'
      ],
      explanation: 'Lägenhetsförteckningen är inte offentlig. Innehavaren har rätt till uppgifter om sin egen lägenhet, och kan ge fullmakt till t.ex. en mäklare vid försäljning.',
      points: 150
    },

    {
      id: 'sp20',
      question_text: 'Styrelsen i BRF Björken är osäker på när lägenhetsförteckningen behöver uppdateras. Markera de två situationer som stämmer.',
      question_type: 'multiple_choice',
      question_order: 20,
      options: {
        choices: [
          'När en bostadsrätt säljs (överlåts)',
          'När innehavaren byter köksutrustning',
          'När fastigheten byter lås i ytterdörrarna',
          'När en lägenhet pantsätts',
          'När innehavaren gör lägenheten till enskild egendom'
        ]
      },
      correct_answer: ['När en bostadsrätt säljs (överlåts)', 'När en lägenhet pantsätts'],
      explanation: 'Lägenhetsförteckningen ska uppdateras vid överlåtelse och pantsättning – det är de två viktigaste händelserna som påverkar vem som äger och belånar bostadsrätten.',
      points: 150
    },

    // ─── ÅRSAVGIFT & EKONOMI ─────────────────────────────────────

    {
      id: 'sp21',
      question_text: 'Ordföranden i BRF Eken påstår att "stämman alltid måste godkänna årsavgiften". Stämmer det?',
      question_type: 'single_choice',
      question_order: 21,
      options: {
        choices: [
          'Ja, årsavgiften är alltid en stående punkt på stämman',
          'Nej, styrelsen beslutar om årsavgiften om inget annat sägs i stadgarna',
          'Ja, 2/3 majoritet krävs alltid för att ändra årsavgiften',
          'Nej, revisorn beslutar om årsavgiften varje år'
        ]
      },
      correct_answer: 'Nej, styrelsen beslutar om årsavgiften om inget annat sägs i stadgarna',
      explanation: 'Som huvudregel är det styrelsen som beslutar om årsavgiften – inte stämman. Stadgarna kan dock ange annat, men det är undantaget snarare än regeln.',
      points: 100
    },

    {
      id: 'sp22',
      question_text: 'Vilka avgifter kan en BRF lagligt ta ut av sina medlemmar? Markera tre alternativ.',
      question_type: 'multiple_choice',
      question_order: 22,
      options: {
        choices: [
          'Avgift för pantsättning när föreningen underrättas',
          'Avgift för att lämna ut kopior av medlemsförteckningen',
          'Avgift vid överlåtelse av bostadsrätt om mäklare sköter överlåtelsen',
          'Avgift vid överlåtelse oavsett vem som hanterar den',
          'Avgift för medlemmar som inte hjälper till vid städdagar'
        ]
      },
      correct_answer: [
        'Avgift för pantsättning när föreningen underrättas',
        'Avgift vid överlåtelse av bostadsrätt om mäklare sköter överlåtelsen',
        'Avgift vid överlåtelse oavsett vem som hanterar den'
      ],
      explanation: 'Föreningen kan ta ut avgift vid pantsättning och överlåtelse. Avgift för städdagar eller för att lämna ut förteckningar är inte lagliga.',
      points: 150
    },

    // ─── ANDRAHANDSUTHYRNING ─────────────────────────────────────

    {
      id: 'sp23',
      question_text: 'Lisa vill hyra ut sin bostadsrätt i andra hand till sin kusin under ett år medan hon arbetar utomlands. Vad gäller?',
      question_type: 'single_choice',
      question_order: 23,
      options: {
        choices: [
          'Lisa kan hyra ut fritt – det är hennes lägenhet',
          'Lisa behöver styrelsens samtycke för andrahandsuthyrning',
          'Andrahandsuthyrning är alltid förbjuden i bostadsrättsföreningar',
          'Om kommunen godkänner behövs inget styrelsegodkännande'
        ]
      },
      correct_answer: 'Lisa behöver styrelsens samtycke för andrahandsuthyrning',
      explanation: 'Andrahandsuthyrning kräver styrelsens samtycke. Lisa måste alltså ansöka och invänta beslut. Styrelsen kan bevilja uthyrning om skäliga skäl föreligger, t.ex. arbete utomlands.',
      points: 100
    },

    // ─── RENOVERINGAR & INGREPP ──────────────────────────────────

    {
      id: 'sp24',
      question_text: 'Kalle vill renovera sin lägenhet. Vilka åtgärder kräver styrelsens godkännande? Markera tre alternativ.',
      question_type: 'multiple_choice',
      question_order: 24,
      options: {
        choices: [
          'Ändra en bärande konstruktion',
          'Byta ut köksinredningen mot en ny modell',
          'Ändra befintliga avloppsledningar i fastigheten',
          'Installera LED-belysning i taket',
          'Sätta upp en ny balkong'
        ]
      },
      correct_answer: [
        'Ändra en bärande konstruktion',
        'Ändra befintliga avloppsledningar i fastigheten',
        'Sätta upp en ny balkong'
      ],
      explanation: 'Ingrepp som påverkar fastighetens konstruktion, gemensamma ledningar eller yttre utseende kräver styrelsens tillstånd. Att byta köksinredning eller sätta in LED-lampor räknas som normalt underhåll.',
      points: 150
    },

    // ─── STÖRNINGAR ──────────────────────────────────────────────

    {
      id: 'sp25',
      question_text: 'Grannen till Stina spelar musik på hög volym varje natt. Vem har ansvar att agera? Markera tre alternativ.',
      question_type: 'multiple_choice',
      question_order: 25,
      options: {
        choices: [
          'Styrelsen har skyldighet att agera vid störningar',
          'Alla bostadsrättsinnehavare har skyldighet att ingripa vid störningar',
          'Polisen kan tillkallas om situationen kräver det',
          'Störningsjour kan tillkallas',
          'Styrelseordföranden ansvarar ensam för alla åtgärder'
        ]
      },
      correct_answer: [
        'Styrelsen har skyldighet att agera vid störningar',
        'Polisen kan tillkallas om situationen kräver det',
        'Störningsjour kan tillkallas'
      ],
      explanation: 'Styrelsen har en aktiv skyldighet att hantera störningar. Polisen eller störningsjour kan kallas in som stöd. Alla bostadsrättsinnehavare har skyldighet att inte störa – men inte skyldighet att ingripa mot grannar.',
      points: 150
    },

    // ─── UNDERHÅLLSPLAN ──────────────────────────────────────────

    {
      id: 'sp26',
      question_text: 'Vad gäller för föreningens underhållsplan? Markera två alternativ.',
      question_type: 'multiple_choice',
      question_order: 26,
      options: {
        choices: [
          'Underhållsplanen ska fastställas av föreningsstämman',
          'Styrelsen ansvarar för att upprätta och hålla underhållsplanen aktuell',
          'Planen ska visa fastighetens underhåll för de kommande 20–50 åren',
          'Revisorn ska granska och godkänna underhållsplanen',
          'Underhållsplanen regleras i bostadsrättslagen'
        ]
      },
      correct_answer: [
        'Styrelsen ansvarar för att upprätta och hålla underhållsplanen aktuell',
        'Planen ska visa fastighetens underhåll för de kommande 20–50 åren'
      ],
      explanation: 'Det är styrelsen – inte stämman – som ansvarar för underhållsplanen. Den ska typiskt sträcka sig 20–50 år framåt. Det finns inget lagkrav på att revisorn granskar den.',
      points: 150
    },

    // ─── GDPR I FÖRENINGEN ───────────────────────────────────────

    {
      id: 'sp27',
      question_text: 'Styrelsen i BRF Linden vill publicera en lista med alla medlemmars namn och telefonnummer på en anslagstavla i trapphuset. Vad gäller enligt GDPR?',
      question_type: 'single_choice',
      question_order: 27,
      options: {
        choices: [
          'Det är tillåtet – det är föreningens interna angelägenhet',
          'Det är inte tillåtet utan medlemmarnas samtycke, då det rör personuppgifter',
          'Det är tillåtet om stämman beslutat om det',
          'Det är tillåtet om informationen redan är offentlig'
        ]
      },
      correct_answer: 'Det är inte tillåtet utan medlemmarnas samtycke, då det rör personuppgifter',
      explanation: 'GDPR gäller för bostadsrättsföreningar. Att publicera personuppgifter som namn och telefonnummer utan rättslig grund eller samtycke strider mot dataskyddsförordningen.',
      points: 100
    },

    {
      id: 'sp28',
      question_text: 'En BRF behandlar personuppgifter om sina medlemmar. Vilka av följande stämmer om GDPR? Markera tre alternativ.',
      question_type: 'multiple_choice',
      question_order: 28,
      options: {
        choices: [
          'BRF:en är personuppgiftsansvarig för de uppgifter föreningen behandlar',
          'Medlemmar har rätt att begära ut vilka uppgifter föreningen har om dem',
          'Föreningen får spara personuppgifter hur länge som helst',
          'Uppgifter ska inte sparas längre än nödvändigt',
          'GDPR gäller inte för små bostadsrättsföreningar'
        ]
      },
      correct_answer: [
        'BRF:en är personuppgiftsansvarig för de uppgifter föreningen behandlar',
        'Medlemmar har rätt att begära ut vilka uppgifter föreningen har om dem',
        'Uppgifter ska inte sparas längre än nödvändigt'
      ],
      explanation: 'GDPR gäller alla organisationer som behandlar personuppgifter – inklusive BRF:er. Föreningen är personuppgiftsansvarig, medlemmar har rätt till insyn och uppgifter ska rensas när de inte längre behövs.',
      points: 150
    },

    // ─── DISKRIMINERINGSLAGSTIFTNING ─────────────────────────────

    {
      id: 'sp29',
      question_text: 'Föreningen ska godkänna en ny medlem. Styrelseledamoten Per föreslår att man nekar en sökande på grund av att hon bär slöja. Vad gäller?',
      question_type: 'single_choice',
      question_order: 29,
      options: {
        choices: [
          'Styrelsen kan neka utan att ange skäl',
          'Det är tillåtet om stämman röstat för det',
          'Det strider mot diskrimineringslagen – religion är en skyddad grund',
          'Det är tillåtet om det anges i stadgarna'
        ]
      },
      correct_answer: 'Det strider mot diskrimineringslagen – religion är en skyddad grund',
      explanation: 'Diskrimineringslagen förbjuder diskriminering på sju grunder: kön, könsöverskridande identitet, etnicitet, religion, funktionsnedsättning, sexuell läggning och ålder. Religion är en av grunderna – att neka någon på religiös grund är olagligt.',
      points: 100
    },

    {
      id: 'sp30',
      question_text: 'Vilka är de sju diskrimineringsgrunderna i diskrimineringslagen? Markera alla sju.',
      question_type: 'multiple_choice',
      question_order: 30,
      options: {
        choices: [
          'Kön',
          'Etnicitet',
          'Religion eller annan trosuppfattning',
          'Funktionsnedsättning',
          'Sexuell läggning',
          'Ålder',
          'Könsöverskridande identitet eller uttryck',
          'Inkomst',
          'Politisk åsikt'
        ]
      },
      correct_answer: [
        'Kön',
        'Etnicitet',
        'Religion eller annan trosuppfattning',
        'Funktionsnedsättning',
        'Sexuell läggning',
        'Ålder',
        'Könsöverskridande identitet eller uttryck'
      ],
      explanation: 'Diskrimineringslagen skyddar mot diskriminering på exakt dessa sju grunder. Inkomst och politisk åsikt är inte med bland de lagstadgade diskrimineringsgrunderna.',
      points: 150
    },

    {
      id: 'sp31',
      question_text: 'Föreningen ska installera en ramp för rullstolar. Ledamoten Gunnar hävdar att "det är frivilligt för föreningen". Stämmer det?',
      question_type: 'single_choice',
      question_order: 31,
      options: {
        choices: [
          'Ja, tillgänglighetsanpassning är alltid frivillig för BRF:er',
          'Nej, föreningen har en skyldighet att vidta skäliga tillgänglighetsåtgärder',
          'Ja, om stämman röstar emot behöver inget göras',
          'Nej, kommunen ansvarar för alla ramper i bostadsområden'
        ]
      },
      correct_answer: 'Nej, föreningen har en skyldighet att vidta skäliga tillgänglighetsåtgärder',
      explanation: 'Diskrimineringslagen kräver att bostadsrättsföreningar vidtar skäliga åtgärder för tillgänglighet för personer med funktionsnedsättning. Det är inte frivilligt.',
      points: 100
    },

    // ─── PANTSÄTTNING ────────────────────────────────────────────

    {
      id: 'sp32',
      question_text: 'Vad gäller när en bostadsrätt pantsätts? Markera två alternativ.',
      question_type: 'multiple_choice',
      question_order: 32,
      options: {
        choices: [
          'Pantsättningen sker automatiskt när ett lån beviljas – föreningen behöver inte informeras',
          'Föreningen ska underrättas om pantsättningen och anteckna det i lägenhetsförteckningen',
          'Föreningen kan ta ut en avgift för hantering av pantsättningsunderrättelsen',
          'Pantsättning kräver stämmans godkännande',
          'Banken ansvarar för att uppdatera föreningens register'
        ]
      },
      correct_answer: [
        'Föreningen ska underrättas om pantsättningen och anteckna det i lägenhetsförteckningen',
        'Föreningen kan ta ut en avgift för hantering av pantsättningsunderrättelsen'
      ],
      explanation: 'Vid pantsättning ska föreningen underrättas och registrera det i lägenhetsförteckningen. Föreningen har rätt att ta ut en administrativ avgift för detta.',
      points: 150
    },

    // ─── SJÄLVKOSTNADSPRINCIPEN ──────────────────────────────────

    {
      id: 'sp33',
      question_text: 'Vad innebär självkostnadsprincipen i en BRF?',
      question_type: 'single_choice',
      question_order: 33,
      options: {
        choices: [
          'Varje ledamot betalar själv för sina styrelseuppdrag',
          'Föreningen får inte ta ut avgifter som överstiger de faktiska kostnaderna',
          'Medlemmarna ska dela lika på alla kostnader oavsett lägenhetsstorlek',
          'Föreningen ska alltid gå med vinst för att täcka framtida kostnader'
        ]
      },
      correct_answer: 'Föreningen får inte ta ut avgifter som överstiger de faktiska kostnaderna',
      explanation: 'Självkostnadsprincipen innebär att föreningen inte får ta ut mer i avgifter än vad som behövs för att täcka föreningens faktiska kostnader. Föreningen ska inte generera vinst på bekostnad av sina medlemmar.',
      points: 100
    },

    // ─── ÄKTA VS OÄKTA FÖRENING ─────────────────────────────────

    {
      id: 'sp34',
      question_text: 'Vad skiljer en äkta från en oäkta bostadsrättsförening?',
      question_type: 'single_choice',
      question_order: 34,
      options: {
        choices: [
          'En äkta förening har revisorer, en oäkta har det inte',
          'I en äkta förening utgör bostadsrätterna mer än 60% av taxeringsvärdet, i en oäkta är andelen lägre',
          'En äkta förening är registrerad hos Bolagsverket, en oäkta är inte det',
          'En äkta förening har fler än 20 lägenheter, en oäkta färre'
        ]
      },
      correct_answer: 'I en äkta förening utgör bostadsrätterna mer än 60% av taxeringsvärdet, i en oäkta är andelen lägre',
      explanation: 'Skillnaden är skattemässig. I en äkta BRF utgör bostadsändamålet mer än 60% av taxeringsvärdet, vilket ger skattefördelar för medlemmarna. I en oäkta (privatbostadsföretag) är andelen lägre och beskattningen sker annorlunda.',
      points: 100
    },

    // ─── OVK ─────────────────────────────────────────────────────

    {
      id: 'sp35',
      question_text: 'Vad är OVK och vem ansvarar för det?',
      question_type: 'single_choice',
      question_order: 35,
      options: {
        choices: [
          'OVK är obligatorisk ventilationskontroll – fastighetsägaren/styrelsen ansvarar',
          'OVK är en frivillig energibesiktning som kommunen erbjuder',
          'OVK är en granskning av värmesystemet som görs av Energimyndigheten',
          'OVK innebär att varje lägenhet besiktigas av kommunen vart femte år'
        ]
      },
      correct_answer: 'OVK är obligatorisk ventilationskontroll – fastighetsägaren/styrelsen ansvarar',
      explanation: 'OVK (Obligatorisk VentilationsKontroll) är ett lagkrav. Fastighetsägaren – i en BRF alltså styrelsen – ansvarar för att OVK genomförs med rätt intervall av en certifierad kontrollant.',
      points: 100
    },

    // ─── INRE & YTTRE FOND ───────────────────────────────────────

    {
      id: 'sp36',
      question_text: 'Vad är skillnaden mellan inre fond och yttre fond (underhållsfond) i en BRF? Markera två alternativ.',
      question_type: 'multiple_choice',
      question_order: 36,
      options: {
        choices: [
          'Den inre fonden avser underhåll av lägenheternas inre delar',
          'Den yttre fonden avser underhåll av fastighetens gemensamma delar och exteriör',
          'Den inre fonden bestäms av Bolagsverket',
          'Den yttre fonden är detsamma som föreningens likvida medel',
          'Båda fonderna är obligatoriska enligt lag'
        ]
      },
      correct_answer: [
        'Den inre fonden avser underhåll av lägenheternas inre delar',
        'Den yttre fonden avser underhåll av fastighetens gemensamma delar och exteriör'
      ],
      explanation: 'Inre fond (inre reparationsfond) är avsatt för underhåll inne i lägenheterna. Yttre fond (underhållsfond) är för fastighetens gemensamma delar. Fonderna är inte alltid obligatoriska per lag men rekommenderas starkt.',
      points: 150
    },

    // ─── PER CAPSULAM ────────────────────────────────────────────

    {
      id: 'sp37',
      question_text: 'Styrelsen i BRF Almen behöver fatta ett brådskande beslut om en vattenläcka men kan inte samlas fysiskt. Vad innebär "per capsulam"-beslut?',
      question_type: 'single_choice',
      question_order: 37,
      options: {
        choices: [
          'Beslut som fattas muntligt per telefon utan protokoll',
          'Beslut som fattas skriftligen utanför ett formellt möte, t.ex. via e-post',
          'Beslut som ordföranden fattar ensam i nödsituationer',
          'Beslut som måste godkännas av revisor i efterhand'
        ]
      },
      correct_answer: 'Beslut som fattas skriftligen utanför ett formellt möte, t.ex. via e-post',
      explanation: 'Per capsulam innebär att styrelsen fattar beslut utan att samlas fysiskt, vanligtvis via e-post eller liknande. Beslutet ska dokumenteras och justeras på nästkommande ordinarie möte.',
      points: 100
    },

    // ─── ANDELSTAL ───────────────────────────────────────────────

    {
      id: 'sp38',
      question_text: 'Vad styr hur stor årsavgift varje bostadsrättsinnehavare betalar?',
      question_type: 'single_choice',
      question_order: 38,
      options: {
        choices: [
          'Varje lägenhet betalar lika mycket oavsett storlek',
          'Andelstalet för varje lägenhet – som ofta baseras på lägenhetens storlek',
          'Marknadsvärdet på lägenheten vid senaste överlåtelse',
          'Antalet boende i lägenheten'
        ]
      },
      correct_answer: 'Andelstalet för varje lägenhet – som ofta baseras på lägenhetens storlek',
      explanation: 'Andelstalet avgör varje lägenhets andel av föreningens kostnader och därmed årsavgiftens storlek. Det baseras vanligtvis på lägenhetens yta men kan även inkludera andra faktorer.',
      points: 100
    },

    // ─── MOTIONER ────────────────────────────────────────────────

    {
      id: 'sp39',
      question_text: 'Medlemmen Sara vill lyfta ett förslag om att föreningen ska installera laddstolpar. Hur går hon tillväga?',
      question_type: 'single_choice',
      question_order: 39,
      options: {
        choices: [
          'Sara skickar ett mejl till ordföranden som automatiskt sätter upp det på stämman',
          'Sara lämnar in en motion till styrelsen inom den tidsfrist som stadgarna anger, för behandling på föreningsstämman',
          'Sara tar upp frågan på nästa styrelsemöte där hon har rätt att delta',
          'Sara behöver samla underskrifter från minst hälften av alla medlemmar'
        ]
      },
      correct_answer: 'Sara lämnar in en motion till styrelsen inom den tidsfrist som stadgarna anger, för behandling på föreningsstämman',
      explanation: 'Motioner ska lämnas in skriftligt till styrelsen före en viss tidpunkt (anges i stadgarna) för att kunna behandlas på föreningsstämman. Styrelsen bereder motionen och stämman tar beslut.',
      points: 100
    },

    // ─── SBA ─────────────────────────────────────────────────────

    {
      id: 'sp40',
      question_text: 'Vad är SBA och vem ansvarar för det i en BRF?',
      question_type: 'single_choice',
      question_order: 40,
      options: {
        choices: [
          'SBA är Systematiskt BrandskyddsArbete – styrelsen ansvarar för att det bedrivs i fastigheten',
          'SBA är Statlig BostadsAvgift – hanteras av Boverket',
          'SBA är en frivillig brandutbildning för styrelseledamöter',
          'SBA är Styrelsens BeslutssArkiv och ska registreras hos Bolagsverket'
        ]
      },
      correct_answer: 'SBA är Systematiskt BrandskyddsArbete – styrelsen ansvarar för att det bedrivs i fastigheten',
      explanation: 'SBA (Systematiskt BrandskyddsArbete) är ett lagkrav enligt lagen om skydd mot olyckor. Fastighetsägaren – styrelsen i en BRF – ansvarar för att brandskyddsarbetet dokumenteras och följs upp kontinuerligt.',
      points: 100
    }

  ],

  userid: 'system',
  image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80'
};
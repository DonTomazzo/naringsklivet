export const aktiemarknadenQuiz = {
  id: 'aktiemarknaden-grunderna',
  title: 'Quiz: Aktiemarknaden och börsen',
  description: 'Testa dina kunskaper om hur börsen fungerar',
  questions: [
    {
      id: 1,
      question: 'Vad är en börs?',
      options: [
        'En bank som lånar ut pengar',
        'En marknadsplats där köpare och säljare möts för att handla värdepapper',
        'Ett företag som tillverkar aktier',
        'En typ av investmentbolag'
      ],
      correctAnswer: 1,
      explanation: 'En börs är en marknadsplats där köpare och säljare möts för att handla med värdepapper som aktier och obligationer. Det fungerar som en digital torghandel.'
    },
    {
      id: 2,
      question: 'Vilken är Sveriges främsta börs?',
      options: [
        'NYSE',
        'NASDAQ',
        'Stockholmsbörsen (Nasdaq Stockholm)',
        'London Stock Exchange'
      ],
      correctAnswer: 2,
      explanation: 'Stockholmsbörsen, som numera heter Nasdaq Stockholm, är Sveriges största börs där de flesta svenska företag är listade.'
    },
    {
      id: 3,
      question: 'Vad är ett börsindex?',
      options: [
        'En lista över alla företag på börsen',
        'Ett mått som följer utvecklingen för en grupp aktier',
        'En avgift för att handla på börsen',
        'En typ av aktie'
      ],
      correctAnswer: 1,
      explanation: 'Ett börsindex är ett mått som följer prisutvecklingen för en utvald grupp aktier. Det ger en översikt över hur marknaden eller en del av marknaden utvecklas.'
    },
    {
      id: 4,
      question: 'Vilket av följande är ett svenskt börsindex?',
      options: [
        'Dow Jones',
        'FTSE 100',
        'OMX Stockholm 30 (OMXS30)',
        'DAX'
      ],
      correctAnswer: 2,
      explanation: 'OMX Stockholm 30 (OMXS30) är Sveriges ledande börsindex och följer de 30 mest omsatta aktierna på Stockholmsbörsen.'
    },
    {
      id: 5,
      question: 'Vad kallas det när ett företag för första gången säljer aktier till allmänheten?',
      options: [
        'Börsintroduktion eller IPO',
        'Aktiesplit',
        'Emission',
        'Buyback'
      ],
      correctAnswer: 0,
      explanation: 'En börsintroduktion (Initial Public Offering, IPO) är när ett privat företag för första gången säljer aktier till allmänheten och blir börsnoterat.'
    },
    {
      id: 6,
      question: 'Vad är skillnaden mellan primärmarknaden och sekundärmarknaden?',
      options: [
        'Det finns ingen skillnad',
        'Primärmarknaden är där nya aktier säljs första gången, sekundärmarknaden är där befintliga aktier handlas',
        'Primärmarknaden är för stora investerare, sekundärmarknaden för privatpersoner',
        'Primärmarknaden är i Sverige, sekundärmarknaden i utlandet'
      ],
      correctAnswer: 1,
      explanation: 'Primärmarknaden är där nya aktier säljs första gången (som vid en IPO), medan sekundärmarknaden är där befintliga aktier handlas mellan investerare på börsen.'
    },
    {
      id: 7,
      question: 'Vilka är börsens öppettider på Stockholmsbörsen?',
      options: [
        '24 timmar per dygn',
        'Cirka 09:00-17:30 på vardagar',
        'Endast på helger',
        '00:00-12:00'
      ],
      correctAnswer: 1,
      explanation: 'Stockholmsbörsen har öppet för handel cirka kl 09:00-17:30 på vardagar. Börsen är stängd på helger och helgdagar.'
    },
    {
      id: 8,
      question: 'Vad är courtage?',
      options: [
        'Skatten på aktievinster',
        'Avgiften som mäklaren tar för att utföra en aktieaffär',
        'Aktiens pris',
        'Utdelningen från företaget'
      ],
      correctAnswer: 1,
      explanation: 'Courtage är den avgift som din mäklare (bank eller nätmäklare) tar för att utföra en köp- eller säljorder av aktier.'
    }
  ]
};

export const aktiemarknadenSlutprovQuiz = {
  id: 'aktiemarknaden-slutprov',
  title: 'Slutprov: Aktiemarknaden och börsen',
  description: 'Ett omfattande prov om hur börsen och aktiemarknaden fungerar',
  questions: [
    {
      id: 1,
      question: 'Vilken av följande är INTE en funktion som börsen fyller?',
      options: [
        'Marknadsplats för handel',
        'Prissättning genom utbud och efterfrågan',
        'Garantera att aktierna alltid går upp',
        'Skapa likviditet'
      ],
      correctAnswer: 2,
      explanation: 'Börsen garanterar inte att aktierna går upp. Börsens funktioner är att vara en marknadsplats, möjliggöra prissättning och skapa likviditet.'
    },
    {
      id: 2,
      question: 'Vilket är världens största börs?',
      options: [
        'Stockholmsbörsen',
        'London Stock Exchange',
        'New York Stock Exchange (NYSE)',
        'Tokyo Stock Exchange'
      ],
      correctAnswer: 2,
      explanation: 'New York Stock Exchange (NYSE) är världens största börs mätt i totalt börsvärde för de noterade företagen.'
    },
    {
      id: 3,
      question: 'Vad betyder S&P 500?',
      options: [
        'Sveriges 500 största företag',
        'Ett amerikanskt index som följer 500 stora amerikanska företag',
        'Ett index med 500 svenska företag',
        '500 kronor per aktie'
      ],
      correctAnswer: 1,
      explanation: 'S&P 500 är ett amerikanskt börsindex som följer de 500 största börsnoterade företagen i USA. Det är ett av världens mest följda index.'
    },
    {
      id: 4,
      question: 'När ett företag gör en IPO, vart går pengarna som investerare betalar för aktierna?',
      options: [
        'Till andra investerare som säljer',
        'Till företaget (och delvis till bankerna som hjälper till)',
        'Till staten som skatt',
        'Till börsen'
      ],
      correctAnswer: 1,
      explanation: 'Vid en IPO går pengarna direkt till företaget (minus avgifter till investmentbanker och andra kostnader). Företaget får in nytt kapital för expansion.'
    },
    {
      id: 5,
      question: 'Vad innebär T+2 vid aktiehandel?',
      options: [
        'Att man kan handla i 2 timmar',
        'Att affären avvecklas 2 bankdagar efter handelsdagen',
        'Att man måste hålla aktien i 2 år',
        'Att courtaget är 2%'
      ],
      correctAnswer: 1,
      explanation: 'T+2 betyder att affären avvecklas (pengarna och aktierna överförs) 2 bankdagar efter handelsdagen (T = Trade day).'
    },
    {
      id: 6,
      question: 'Vad är en marknadsorder (market order)?',
      options: [
        'En order som endast gäller på fredagar',
        'En order att köpa eller sälja omedelbart till bästa tillgängliga pris',
        'En order som aldrig genomförs',
        'En order som kostar 1000 kr extra'
      ],
      correctAnswer: 1,
      explanation: 'En marknadsorder är en order att köpa eller sälja aktier omedelbart till det bästa tillgängliga priset på marknaden just nu.'
    },
    {
      id: 7,
      question: 'Vad är en limitorder (limit order)?',
      options: [
        'En order med ett maxpris för köp eller minpris för sälj',
        'En order som bara gäller i 10 minuter',
        'En order som är begränsad till 100 aktier',
        'En order som aldrig används'
      ],
      correctAnswer: 0,
      explanation: 'En limitorder anger det högsta pris du är villig att betala vid köp, eller det lägsta pris du accepterar vid försäljning. Ordern genomförs endast om priset når din limit.'
    },
    {
      id: 8,
      question: 'Varför är likviditet viktigt på aktiemarknaden?',
      options: [
        'För att aktier ska kunna köpas och säljas snabbt utan stor påverkan på priset',
        'För att företag ska få mer pengar',
        'För att sänka skatten',
        'Det är inte viktigt'
      ],
      correctAnswer: 0,
      explanation: 'Likviditet innebär att det finns många köpare och säljare, vilket gör att du kan köpa eller sälja aktier snabbt till ett rättvist pris utan att påverka aktiekursen markant.'
    },
    {
      id: 9,
      question: 'Vad händer med aktiekursen om fler vill köpa än sälja?',
      options: [
        'Kursen går ner',
        'Kursen går upp',
        'Kursen står still',
        'Aktien försvinner'
      ],
      correctAnswer: 1,
      explanation: 'Om efterfrågan (fler vill köpa) är större än utbudet (antal som vill sälja) stiger priset. Detta är grundläggande utbud och efterfrågan.'
    },
    {
      id: 10,
      question: 'Vilket påstående om börsindex är SANT?',
      options: [
        'Index kan aldrig gå ner',
        'Man kan inte investera i index',
        'Index ger en överblick över marknadens utveckling',
        'Alla index innehåller samma aktier'
      ],
      correctAnswer: 2,
      explanation: 'Börsindex är viktiga verktyg för att få en snabb överblick över hur en hel marknad eller sektor utvecklas, även om de kan både stiga och falla.'
    },
    {
      id: 11,
      question: 'Vad är Nasdaq?',
      options: [
        'Ett svenskt företag',
        'En amerikansk börs som fokuserar på teknologiföretag',
        'Ett börsindex i Japan',
        'En typ av aktie'
      ],
      correctAnswer: 1,
      explanation: 'Nasdaq är en amerikansk börs som är känd för sina många teknologiföretag som Apple, Microsoft, Amazon och Google.'
    },
    {
      id: 12,
      question: 'Kan man handla aktier på natten i Sverige?',
      options: [
        'Ja, Stockholmsbörsen är öppen 24/7',
        'Nej, men vissa mäklare erbjuder handel på utländska börser som har öppet',
        'Ja, men bara på helger',
        'Nej, det är olagligt'
      ],
      correctAnswer: 1,
      explanation: 'Stockholmsbörsen har stängt på natten, men vissa mäklare erbjuder handel på amerikanska börser som är öppna under svensk natt (tidsskillnad).'
    },
    {
      id: 13,
      question: 'Vad är spread (köp/sälj-spread)?',
      options: [
        'Skillnaden mellan köp- och säljpris',
        'Skillnaden mellan aktiens högsta och lägsta pris någonsin',
        'Courtaget',
        'Utdelningen'
      ],
      correctAnswer: 0,
      explanation: 'Spread är skillnaden mellan högsta köpkurs (bid) och lägsta säljkurs (ask). En mindre spread innebär bättre likviditet.'
    },
    {
      id: 14,
      question: 'Varför kan courtaget vara viktigt att tänka på?',
      options: [
        'Det påverkar inte din avkastning',
        'Höga avgifter kan äta upp vinsten, särskilt vid många små affärer',
        'Courtage får man alltid tillbaka',
        'Courtage är alltid 0 kr'
      ],
      correctAnswer: 1,
      explanation: 'Courtage är en kostnad som minskar din avkastning. Höga avgifter kan bli betydande, särskilt om du handlar ofta eller med små belopp.'
    },
    {
      id: 15,
      question: 'Vad är OMXS30?',
      options: [
        'Ett amerikanskt index',
        'Sveriges ledande börsindex med de 30 mest omsatta aktierna',
        'Ett företag på börsen',
        'En avgift'
      ],
      correctAnswer: 1,
      explanation: 'OMXS30 (OMX Stockholm 30) är Sveriges främsta aktieindex och innehåller de 30 mest omsatta aktierna på Stockholmsbörsen, som H&M, Volvo och Ericsson.'
    }
  ]
};

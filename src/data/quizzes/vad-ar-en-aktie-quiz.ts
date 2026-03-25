export const vadArEnAktieQuiz = {
  id: 'vad-ar-en-aktie-grunderna',
  title: 'Quiz: Grunderna om aktier',
  description: 'Testa dina kunskaper om vad aktier är och hur de fungerar',
  questions: [
    {
      id: 1,
      question: 'Vad är en aktie?',
      options: [
        'Ett lån till ett företag',
        'En ägarandel i ett företag',
        'En typ av obligation',
        'Ett sparande på banken'
      ],
      correctAnswer: 1,
      explanation: 'En aktie är en ägarandel i ett företag. När du köper en aktie blir du delägare och får rätt till en del av företagets vinst och tillgångar.'
    },
    {
      id: 2,
      question: 'Vad får du som aktieägare rätt till?',
      options: [
        'Endast rätt att sälja aktien',
        'Utdelning och rösträtt på bolagsstämman',
        'Garanterad avkastning',
        'Ränta varje månad'
      ],
      correctAnswer: 1,
      explanation: 'Som aktieägare har du rätt till utdelning (om företaget delar ut vinst) och rösträtt på bolagsstämman där viktiga beslut fattas.'
    },
    {
      id: 3,
      question: 'Vad kallas det när ett företag först säljer sina aktier till allmänheten?',
      options: [
        'Börsintroduktion eller IPO',
        'Aktieutförsäljning',
        'Företagsstart',
        'Aktiesplit'
      ],
      correctAnswer: 0,
      explanation: 'En börsintroduktion (IPO - Initial Public Offering) är när ett företag för första gången säljer sina aktier till allmänheten på börsen.'
    },
    {
      id: 4,
      question: 'Vad är skillnaden mellan stamaktier och preferensaktier?',
      options: [
        'Ingen skillnad alls',
        'Stamaktier ger rösträtt, preferensaktier ger ofta högre utdelning',
        'Preferensaktier är billigare',
        'Stamaktier kan bara köpas av företag'
      ],
      correctAnswer: 1,
      explanation: 'Stamaktier ger vanligtvis rösträtt på bolagsstämman, medan preferensaktier ofta ger högre eller säkrare utdelning men begränsad eller ingen rösträtt.'
    },
    {
      id: 5,
      question: 'Vad betyder "börsvärde" eller "market cap"?',
      options: [
        'Företagets årsomsättning',
        'Det totala värdet av alla aktier i företaget',
        'Hur mycket företaget lånat',
        'Aktiekursen'
      ],
      correctAnswer: 1,
      explanation: 'Börsvärdet (market capitalization) är det totala marknadsvärdet av alla aktier i företaget. Det beräknas som aktiekurs × antal aktier.'
    },
    {
      id: 6,
      question: 'Kan aktiekursen både öka och minska?',
      options: [
        'Nej, den kan bara öka',
        'Nej, den är alltid fast',
        'Ja, aktiekursen fluktuerar baserat på utbud och efterfrågan',
        'Nej, den kan bara minska'
      ],
      correctAnswer: 2,
      explanation: 'Ja, aktiekursen kan både öka och minska. Den påverkas av utbud och efterfrågan på marknaden samt företagets prestation och framtidsutsikter.'
    },
    {
      id: 7,
      question: 'Vad är utdelning?',
      options: [
        'När man säljer sina aktier',
        'En del av företagets vinst som betalas ut till aktieägarna',
        'Skatten på aktier',
        'Avgiften för att köpa aktier'
      ],
      correctAnswer: 1,
      explanation: 'Utdelning är den del av företagets vinst som betalas ut till aktieägarna, vanligtvis en gång eller flera gånger per år.'
    },
    {
      id: 8,
      question: 'På vilken marknad handlas aktier efter en börsintroduktion?',
      options: [
        'Primärmarknaden',
        'Sekundärmarknaden',
        'Bankmarknaden',
        'Lånemarknaden'
      ],
      correctAnswer: 1,
      explanation: 'Efter börsintroduktionen handlas aktier på sekundärmarknaden, där investerare köper och säljer aktier mellan varandra på börsen.'
    }
  ]
};

export const vadArEnAktieSlutprovQuiz = {
  id: 'vad-ar-en-aktie-slutprov',
  title: 'Slutprov: Vad är en aktie?',
  description: 'Ett omfattande prov om grunderna kring aktier',
  questions: [
    {
      id: 1,
      question: 'Om ett företag har 1 miljon aktier och varje aktie kostar 50 kr, vad är företagets börsvärde?',
      options: [
        '1 miljon kr',
        '50 miljoner kr',
        '500 miljoner kr',
        '5 miljoner kr'
      ],
      correctAnswer: 1,
      explanation: 'Börsvärdet beräknas som aktiekurs × antal aktier = 50 kr × 1 000 000 = 50 miljoner kr.'
    },
    {
      id: 2,
      question: 'Du äger 100 aktier i ett företag som delar ut 5 kr per aktie. Hur mycket utdelning får du?',
      options: [
        '5 kr',
        '50 kr',
        '500 kr',
        '5 000 kr'
      ],
      correctAnswer: 2,
      explanation: 'Din utdelning = antal aktier × utdelning per aktie = 100 × 5 kr = 500 kr.'
    },
    {
      id: 3,
      question: 'Varför ger företag ut aktier istället för att bara ta lån?',
      options: [
        'Aktier är alltid billigare',
        'För att få in kapital utan att behöva betala tillbaka eller betala ränta',
        'För att slippa betala skatt',
        'Det är ett lagkrav'
      ],
      correctAnswer: 1,
      explanation: 'Genom att ge ut aktier kan företag få in kapital utan att ta på sig skulder. Aktieägare behöver inte få tillbaka sina pengar, men de blir delägare.'
    },
    {
      id: 4,
      question: 'Vad händer med dina aktier om företaget går i konkurs?',
      options: [
        'Du får tillbaka alla pengar du investerat',
        'Du blir först i kön att få tillbaka pengar',
        'Aktieägare kommer sist efter borgenärer',
        'Staten garanterar dina pengar'
      ],
      correctAnswer: 2,
      explanation: 'Vid konkurs kommer aktieägare sist i prioritetsordningen, efter att alla borgenärer (långivare) fått betalt. Oftast förlorar aktieägare hela sin investering.'
    },
    {
      id: 5,
      question: 'Vad innebär det att ha rösträtt som aktieägare?',
      options: [
        'Att man kan rösta i politiska val',
        'Att man kan rösta på bolagsstämman om viktiga företagsfrågor',
        'Att man automatiskt får högre utdelning',
        'Att man kan sälja sina aktier när som helst'
      ],
      correctAnswer: 1,
      explanation: 'Rösträtt innebär att du kan rösta på bolagsstämman om viktiga frågor som val av styrelse, utdelning och stora företagsbeslut.'
    },
    {
      id: 6,
      question: 'Vad är en "blue chip"-aktie?',
      options: [
        'En aktie som kostar mindre än 1 kr',
        'En aktie i ett stort, stabilt och välkänt företag',
        'En aktie i ett nystartadt företag',
        'En aktie som är blåfärgad på börsen'
      ],
      correctAnswer: 1,
      explanation: '"Blue chip"-aktier är aktier i stora, stabila och välrenommerade företag med lång historia av pålitliga resultat.'
    },
    {
      id: 7,
      question: 'Vad avgör en akties pris på börsen från minut till minut?',
      options: [
        'Företagets styrelse beslutar',
        'Regeringen sätter priset',
        'Utbud och efterfrågan bland köpare och säljare',
        'Det är alltid samma pris'
      ],
      correctAnswer: 2,
      explanation: 'Aktiekursen bestäms av utbud och efterfrågan. Om fler vill köpa än sälja stiger priset, och vice versa.'
    },
    {
      id: 8,
      question: 'Vad är en aktiesplit?',
      options: [
        'När ett företag går i konkurs',
        'När en aktie delas upp i flera aktier till lägre pris',
        'När man säljer halva sina aktier',
        'När två företag slås ihop'
      ],
      correctAnswer: 1,
      explanation: 'Vid en aktiesplit delas befintliga aktier upp i flera aktier. T.ex. vid en 2:1-split får du 2 aktier för varje aktie du hade, men till halva priset.'
    },
    {
      id: 9,
      question: 'Vad är skillnaden mellan kurs och värde på en aktie?',
      options: [
        'Det är samma sak',
        'Kurs är vad marknaden betalar, värde är vad aktien egentligen är värd',
        'Värde är alltid högre än kurs',
        'Kurs är viktigare än värde'
      ],
      correctAnswer: 1,
      explanation: 'Kursen är det aktuella marknadspriset, medan värdet är vad aktien egentligen är värd baserat på företagets fundamenta. De kan skilja sig åt.'
    },
    {
      id: 10,
      question: 'Vilken av följande är INTE en fördel med att äga aktier?',
      options: [
        'Potential för hög avkastning',
        'Utdelningar',
        'Ägarinflytande',
        'Garanterad vinst'
      ],
      correctAnswer: 3,
      explanation: 'Det finns ingen garanti för vinst när man investerar i aktier. Aktiekursen kan både stiga och falla, vilket innebär risk för förlust.'
    },
    {
      id: 11,
      question: 'Vad händer på en bolagsstämma?',
      options: [
        'Företaget säljer sina produkter',
        'Aktieägare röstar om viktiga företagsfrågor',
        'Nya aktier skapas automatiskt',
        'Utdelning betalas ut direkt'
      ],
      correctAnswer: 1,
      explanation: 'På bolagsstämman samlas aktieägare (eller röstar digitalt) för att fatta viktiga beslut om företaget, som val av styrelse och godkännande av utdelning.'
    },
    {
      id: 12,
      question: 'Kan du förlora mer pengar än du investerat när du köper aktier?',
      options: [
        'Ja, alltid',
        'Nej, du kan som mest förlora det du investerat',
        'Endast om du köper på kredit',
        'Ja, om företaget går i konkurs'
      ],
      correctAnswer: 1,
      explanation: 'När du köper aktier kan du som mest förlora hela beloppet du investerat (om aktien blir värdelös). Du kan inte förlora mer än det, om du inte handlar med lånade pengar.'
    },
    {
      id: 13,
      question: 'Vad är ett "teckningsemission"?',
      options: [
        'När företaget köper tillbaka egna aktier',
        'När företaget erbjuder befintliga aktieägare rätt att köpa nya aktier',
        'När företaget delar ut extra utdelning',
        'När företaget byter namn'
      ],
      correctAnswer: 1,
      explanation: 'Vid en teckningsemission (nyemission med företrädesrätt) erbjuds befintliga aktieägare möjlighet att köpa nya aktier, ofta till rabatterat pris.'
    },
    {
      id: 14,
      question: 'Varför kan en aktiekurs sjunka trots att företaget går bra?',
      options: [
        'Det kan aldrig hända',
        'På grund av marknadssentiment, rädsla eller makroekonomiska faktorer',
        'För att företaget ljuger',
        'Endast om VD avgår'
      ],
      correctAnswer: 1,
      explanation: 'Aktiekurser påverkas av många faktorer utöver företagets prestation, som marknadssentiment, räntehöjningar, geopolitiska händelser och branschspecifika nyheter.'
    },
    {
      id: 15,
      question: 'Vad är "likviditet" när det gäller aktier?',
      options: [
        'Hur mycket kontanter företaget har',
        'Hur lätt det är att köpa och sälja aktien',
        'Aktiens pris',
        'Företagets vinst'
      ],
      correctAnswer: 1,
      explanation: 'Likviditet beskriver hur lätt och snabbt en aktie kan köpas eller säljas utan att påverka priset märkbart. Stora företag har ofta hög likviditet.'
    }
  ]
};

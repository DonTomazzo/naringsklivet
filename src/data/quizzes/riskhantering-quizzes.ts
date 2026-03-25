export const riskhanteringQuiz = {
  id: 'riskhantering-grunderna',
  title: 'Quiz: Riskhantering',
  description: 'Testa dina kunskaper om risk och kapitalskydd',
  questions: [
    {
      id: 1,
      question: 'Enligt Warren Buffett, vad är regel nummer 1 i investering?',
      options: [
        'Tjäna så mycket som möjligt',
        'Förlora aldrig pengar',
        'Köp billigt, sälj dyrt',
        'Investera bara i tech-aktier'
      ],
      correctAnswer: 1,
      explanation: 'Warren Buffetts första regel är "Förlora aldrig pengar" och regel 2 är "Glöm aldrig regel 1". Detta visar vikten av kapitalskydd.'
    },
    {
      id: 2,
      question: 'Om du förlorar 50% på en investering, hur mycket måste du vinna för att komma tillbaka?',
      options: [
        '50%',
        '75%',
        '100%',
        '150%'
      ],
      correctAnswer: 2,
      explanation: 'Om du förlorar 50% (från 100kr till 50kr) måste du vinna 100% (från 50kr till 100kr) för att komma tillbaka. Matematiken gör att förluster är värre än vinster!'
    },
    {
      id: 3,
      question: 'Vad är marknadsrisk (systematisk risk)?',
      options: [
        'Risken att ett specifikt företag går dåligt',
        'Risken att hela marknaden faller och påverkar alla aktier',
        'Risken att du inte kan sälja dina aktier',
        'Risken för valutaförändringar'
      ],
      correctAnswer: 1,
      explanation: 'Marknadsrisk är risken att hela marknaden faller, vilket påverkar nästan alla aktier. Exempel: finanskriser, pandemier, geopolitiska kriser.'
    },
    {
      id: 4,
      question: 'Vad är den BÄSTA strategin för att hantera företagsspecifik risk?',
      options: [
        'Investera bara i ett företag',
        'Diversifiera över många företag i olika branscher',
        'Sälja så fort det går ner',
        'Köpa bara småbolagsaktier'
      ],
      correctAnswer: 1,
      explanation: 'Diversifiering är det bästa sättet att hantera företagsspecifik risk. Genom att äga 15-20+ aktier i olika branscher minskar du risken att ett enskilt företagsproblem förstör din portfölj.'
    },
    {
      id: 5,
      question: 'Vad betyder volatilitet?',
      options: [
        'Hur mycket en aktie kostar',
        'Hur mycket aktiekursen rör sig upp och ner',
        'Hur många aktier som handlas',
        'Företagets vinst'
      ],
      correctAnswer: 1,
      explanation: 'Volatilitet mäter hur mycket en aktiekurs rör sig upp och ner. Hög volatilitet = stora prissvängningar = högre risk (men också potential för högre avkastning).'
    },
    {
      id: 6,
      question: 'Vad är beta (β)?',
      options: [
        'Ett mått på företagets skulder',
        'Ett mått på hur mycket en aktie rör sig jämfört med marknaden',
        'P/E-talet',
        'Utdelningen'
      ],
      correctAnswer: 1,
      explanation: 'Beta mäter hur mycket en aktie rör sig i förhållande till marknaden. Beta 1.0 = rör sig som marknaden, Beta 1.5 = rör sig 50% mer än marknaden.'
    },
    {
      id: 7,
      question: 'Vad är en "stop loss"?',
      options: [
        'Ett sätt att tjäna pengar',
        'En order som automatiskt säljer om priset faller till en viss nivå',
        'En typ av fond',
        'Ett sätt att köpa aktier billigt'
      ],
      correctAnswer: 1,
      explanation: 'Stop loss är en säljorder som automatiskt triggas om priset faller till din förutbestämda nivå. Det skyddar dig från stora förluster.'
    },
    {
      id: 8,
      question: 'Hur stor del av din portfölj bör du maximalt riskera på EN enskild trade enligt många experter?',
      options: [
        '50%',
        '25%',
        '10%',
        '1-2%'
      ],
      correctAnswer: 3,
      explanation: 'De flesta professionella traders riskerar max 1-2% av sin totala portfölj per trade. Detta innebär att även 10 förluster i rad bara kostar 10-20% av kapitalet.'
    }
  ]
};

export const riskhanteringSlutprovQuiz = {
  id: 'riskhantering-slutprov',
  title: 'Slutprov: Riskhantering',
  description: 'Ett omfattande prov om riskhantering och kapitalskydd',
  questions: [
    {
      id: 1,
      question: 'Varför är kapitalskydd viktigare än att jaga stora vinster?',
      options: [
        'Det är det inte, vinster är viktigast',
        'För att förluster tar exponentiellt längre tid att återhämta sig från',
        'För att det låter coolt',
        'För att Warren Buffett sa det'
      ],
      correctAnswer: 1,
      explanation: 'Stora förluster kräver extremt stora vinster för att återhämta sig. En 80% förlust kräver 400% vinst för att komma tillbaka! Därför är det viktigt att skydda kapitalet först.'
    },
    {
      id: 2,
      question: 'Vilket påstående om diversifiering är SANT?',
      options: [
        'Diversifiering eliminerar all risk',
        'Diversifiering minskar företagsspecifik risk men inte marknadsrisk',
        'Man behöver bara äga 2-3 aktier för att vara diversifierad',
        'Diversifiering sänker alltid avkastningen'
      ],
      correctAnswer: 1,
      explanation: 'Diversifiering minskar företagsspecifik risk (osystematisk) genom att sprida investeringar, men eliminerar inte marknadsrisk (systematisk) som påverkar hela marknaden.'
    },
    {
      id: 3,
      question: 'Du har 100 000 kr att investera. Hur mycket bör du maximalt investera i EN enskild aktie enligt diversifieringsprinciper?',
      options: [
        '100 000 kr - sätt allt på en',
        '50 000 kr - hälften',
        '10 000 kr - 10%',
        '5 000-6 667 kr - 5-6.7%'
      ],
      correctAnswer: 3,
      explanation: 'Med 15-20 aktier i portföljen bör varje position vara cirka 5-6.7% av totalen. Detta ger tillräcklig diversifiering att skydda mot enskilda företagskollapser.'
    },
    {
      id: 4,
      question: 'Vad är "maximum drawdown"?',
      options: [
        'Den största vinsten du gjort',
        'Den största nedgången från topp till botten',
        'Hur mycket courtage du betalar',
        'Din genomsnittliga avkastning'
      ],
      correctAnswer: 1,
      explanation: 'Maximum drawdown är den största procentuella nedgången från en tidigare topp till efterföljande botten. Det visar den värsta förlusten du skulle ha upplevt.'
    },
    {
      id: 5,
      question: 'Du köper en aktie för 100 kr och sätter stop loss på 92 kr. Hur stor är din risk i procent?',
      options: [
        '2%',
        '5%',
        '8%',
        '10%'
      ],
      correctAnswer: 2,
      explanation: 'Risk = (100 - 92) / 100 = 8 / 100 = 8%. Du riskerar att förlora 8% av ditt investerade kapital om stop loss triggas.'
    },
    {
      id: 6,
      question: 'Vad är Sharpe Ratio?',
      options: [
        'Ett mått på företagets vinst',
        'Ett mått på riskjusterad avkastning',
        'Ett sätt att räkna P/E-tal',
        'En typ av aktie'
      ],
      correctAnswer: 1,
      explanation: 'Sharpe Ratio mäter hur mycket avkastning du får per enhet risk. Högre Sharpe Ratio = bättre riskjusterad avkastning. Över 2.0 är utmärkt.'
    },
    {
      id: 7,
      question: 'Vad betyder det om en aktie har beta 0.5?',
      options: [
        'Den rör sig dubbelt så mycket som marknaden',
        'Den rör sig hälften så mycket som marknaden (defensiv)',
        'Den går alltid upp',
        'Den är riskfri'
      ],
      correctAnswer: 1,
      explanation: 'Beta 0.5 betyder att aktien i genomsnitt rör sig hälften så mycket som marknaden. Om marknaden går upp 10% går denna aktie upp cirka 5%. Det är en defensiv aktie.'
    },
    {
      id: 8,
      question: 'Vilken typ av risk KAN inte diversifieras bort?',
      options: [
        'Företagsspecifik risk',
        'Marknadsrisk (systematisk risk)',
        'Branschrisk',
        'Ledningsrisk'
      ],
      correctAnswer: 1,
      explanation: 'Marknadsrisk (systematisk risk) påverkar hela marknaden och kan inte diversifieras bort. När en finanskris slår till faller nästan alla aktier oavsett diversifiering.'
    },
    {
      id: 9,
      question: 'Vad är likviditetsrisk?',
      options: [
        'Risken att företaget går i konkurs',
        'Risken att du inte kan sälja dina aktier när du vill',
        'Risken att aktien går ner',
        'Risken för inflation'
      ],
      correctAnswer: 1,
      explanation: 'Likviditetsrisk är risken att du inte kan sälja dina aktier snabbt eller till ett rimligt pris. Vanligast i tunt handlade småbolagsaktier.'
    },
    {
      id: 10,
      question: 'Du har en portfölj på 200 000 kr. Med 2% risk per trade, hur mycket är du villig att förlora på EN affär?',
      options: [
        '40 000 kr',
        '20 000 kr',
        '10 000 kr',
        '4 000 kr'
      ],
      correctAnswer: 3,
      explanation: '2% av 200 000 kr = 4 000 kr. Detta är maximalt du bör riskera på EN enskild trade för att skydda din portfölj från stora förluster.'
    },
    {
      id: 11,
      question: 'Vad är psykologisk risk?',
      options: [
        'Risken att bli deprimerad',
        'Risken att dina känslor leder till dåliga investeringsbeslut',
        'Risken att glömma lösenordet',
        'Risken för marknadsmanipulation'
      ],
      correctAnswer: 1,
      explanation: 'Psykologisk risk är risken att rädsla, girighet eller panik driver dig till dåliga beslut som panikförsäljning på botten eller köp i toppen av bubblor.'
    },
    {
      id: 12,
      question: 'Varför är det viktigt att bara investera pengar du har råd att förlora?',
      options: [
        'För att det låter bra',
        'För att emotionella beslut förvärras när det är pengar du BEHÖVER',
        'För att det är lag',
        'Det är inte viktigt'
      ],
      correctAnswer: 1,
      explanation: 'Om du investerar pengar du behöver för hyra eller mat blir emotionell stress extrem, vilket leder till panikbeslut. Investera bara överskottspengar du kan se falla utan panik.'
    },
    {
      id: 13,
      question: 'Vad är en trailing stop loss?',
      options: [
        'En stop loss som inte fungerar',
        'En stop loss som följer priset uppåt men inte nedåt',
        'En stop loss på 100%',
        'En typ av köporder'
      ],
      correctAnswer: 1,
      explanation: 'En trailing stop loss följer aktiekursen uppåt men inte nedåt. Om aktien stiger från 100kr till 120kr med 10% trailing stop, flyttas stop loss från 90kr till 108kr automatiskt.'
    },
    {
      id: 14,
      question: 'Vilket påstående är SANT om risk och avkastning?',
      options: [
        'Man kan få hög avkastning utan risk',
        'Högre potentiell avkastning kommer alltid med högre risk',
        'Risk och avkastning är inte relaterade',
        'Låg risk ger alltid hög avkastning'
      ],
      correctAnswer: 1,
      explanation: 'Det finns ingen "free lunch" på marknaden. Högre potentiell avkastning innebär ALLTID högre risk. Om någon lovar hög avkastning utan risk - det är en bluff!'
    },
    {
      id: 15,
      question: 'Hur många aktier behöver man för att vara väl diversifierad enligt de flesta experter?',
      options: [
        '3-5 aktier',
        '8-10 aktier',
        '15-20 aktier',
        '100+ aktier'
      ],
      correctAnswer: 2,
      explanation: 'De flesta experter rekommenderar 15-20 aktier spridda över olika branscher för god diversifiering. Över 30 aktier ger marginell ytterligare diversifieringseffekt.'
    },
    {
      id: 16,
      question: 'Vad är rebalansering av portföljen?',
      options: [
        'Att sälja allt och börja om',
        'Att återställa portföljen till sina ursprungliga vikter',
        'Att bara köpa mer aktier',
        'Att räkna hur mycket man tjänat'
      ],
      correctAnswer: 1,
      explanation: 'Rebalansering innebär att sälja lite av vad som stigit mycket och köpa mer av vad som sjunkit för att återställa din planerade allokering. Detta tvingar dig sälja högt och köpa lågt.'
    },
    {
      id: 17,
      question: 'Vad är en "Black Swan"-händelse?',
      options: [
        'En fågel som är svart',
        'En extremt sällsynt och oväntad händelse med enorm påverkan',
        'En normal marknadsnedgång',
        'En ny aktie'
      ],
      correctAnswer: 1,
      explanation: 'En Black Swan är en extrem, oväntad händelse som nästan ingen förutsåg men som får massiv påverkan. Exempel: 9/11, finanskrisen 2008, Covid-19 pandemin.'
    },
    {
      id: 18,
      question: 'Hur kan du skydda dig mot en Black Swan-händelse?',
      options: [
        'Det går inte - därför diversifiera brett och ha stopp-loss',
        'Genom att sälja allt innan',
        'Genom att bara äga en aktie',
        'Genom att inte investera alls'
      ],
      correctAnswer: 0,
      explanation: 'Black Swans går inte att förutspå, därför är bästa skyddet bred diversifiering, stop-loss strategier, och att inte investera allt kapital samtidigt.'
    },
    {
      id: 19,
      question: 'Varför ska man INTE kolla sin portfölj för ofta?',
      options: [
        'För att det kostar pengar',
        'För att det ökar risken för emotionella beslut baserade på kortsiktig volatilitet',
        'För att det är olagligt',
        'Man ska kolla den varje minut'
      ],
      correctAnswer: 1,
      explanation: 'Att kolla portföljen dagligen ökar risken för panikbeslut vid normal volatilitet. Långsiktiga investerare bör kolla månatligt eller kvartalsvis för att undvika känslomässiga reaktioner.'
    },
    {
      id: 20,
      question: 'Vad är den viktigaste lärdomen från denna modul?',
      options: [
        'Att tjäna pengar snabbt',
        'Att skydda sitt kapital är viktigare än att jaga vinster',
        'Att aldrig investera',
        'Att timing är allt'
      ],
      correctAnswer: 1,
      explanation: 'Kapitalskydd är grunden för långsiktig framgång. Förlora aldrig mer än du har råd med, diversifiera brett, och hantera risk smart - så kommer vinsterna med tiden!'
    }
  ]
};
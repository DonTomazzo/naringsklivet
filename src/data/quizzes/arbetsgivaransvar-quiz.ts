export const arbetsgivaransvarQuiz = {
  id: 'arbetsgivaransvar-grunderna',
  title: 'Quiz: Anställning vs Uppdrag',
  description: 'Testa dina kunskaper om skillnaden mellan anställning och uppdrag',
  questions: [
    {
      id: 1,
      question: 'Vad är det viktigaste kännetecknet för en anställning?',
      options: [
        'Att personen har F-skatt',
        'Att arbetet utförs under ledning och kontroll',
        'Att ersättningen är hög',
        'Att det finns ett skriftligt avtal'
      ],
      correctAnswer: 1,
      explanation: 'Det avgörande för en anställning är att arbetet utförs under arbetsgivarens ledning och kontroll. Detta är viktigare än vad avtalet säger eller om personen har F-skatt.'
    },
    {
      id: 2,
      question: 'En person arbetar varje tisdag 09-15 hos föreningen och använder föreningens verktyg. Personen har F-skatt och fakturerar. Vad gäller?',
      options: [
        'Detta är alltid ett uppdrag eftersom personen har F-skatt',
        'Detta kan vara en anställning trots F-skatten',
        'Det spelar ingen roll',
        'Endast om personen vill'
      ],
      correctAnswer: 1,
      explanation: 'Trots F-skatt kan detta räknas som anställning om arbetet är regelbundet, personen arbetar under ledning och använder föreningens verktyg. Skatteverket bedömer arbetets karaktär, inte vad ni kallar det.'
    },
    {
      id: 3,
      question: 'Hur stor är arbetsgivaravgiften som föreningen måste betala vid anställning?',
      options: [
        'Cirka 15%',
        'Cirka 25%',
        'Cirka 31,42%',
        'Cirka 50%'
      ],
      correctAnswer: 2,
      explanation: 'Arbetsgivaravgiften är cirka 31,42% av lönen och täcker socialavgifter, pensionsavgifter och andra lagstadgade avgifter.'
    },
    {
      id: 4,
      question: 'Vilket är INTE ett kännetecken för ett uppdrag (konsultuppdrag)?',
      options: [
        'Personen arbetar självständigt',
        'Personen kan anlita ersättare',
        'Personen arbetar enligt fast schema',
        'Personen använder egna verktyg'
      ],
      correctAnswer: 2,
      explanation: 'Fast schema är ett kännetecken för anställning, inte uppdrag. Vid uppdrag bestämmer konsulten själv när och hur arbetet utförs.'
    },
    {
      id: 5,
      question: 'Vad krävs för att en person ska kunna fakturera föreningen för uppdrag?',
      options: [
        'Endast ett konsultavtal',
        'F-skattsedel',
        'Inget särskilt',
        'Godkännande från Skatteverket'
      ],
      correctAnswer: 1,
      explanation: 'För att kunna fakturera som egen företagare krävs F-skattsedel (godkänd för F-skatt). Utan F-skatt måste föreningen göra skatteavdrag som vid anställning.'
    },
    {
      id: 6,
      question: 'Vem ansvarar för arbetsmiljön vid ett konsultuppdrag?',
      options: [
        'Föreningen har fullt ansvar',
        'Konsulten ansvarar själv',
        'Båda delar på ansvaret',
        'Ingen har ansvar'
      ],
      correctAnswer: 1,
      explanation: 'Vid uppdrag ansvarar konsulten själv för sin arbetsmiljö och sina försäkringar. Föreningen har endast arbetsmiljöansvar för anställda.'
    },
    {
      id: 7,
      question: 'Vad händer om föreningen felaktigt behandlar en anställning som uppdrag?',
      options: [
        'Ingenting, det är föreningens val',
        'Föreningen kan bli skyldig att betala arbetsgivaravgifter i efterhand',
        'Endast böter',
        'Personen förlorar sin lön'
      ],
      correctAnswer: 1,
      explanation: 'Om Skatteverket bedömer att det var en anställning kan föreningen bli skyldig att betala arbetsgivaravgifter i efterhand, plus ränta och eventuellt skattetillägg.'
    },
    {
      id: 8,
      question: 'Vilket påstående är SANT om anställning?',
      options: [
        'Anställd kan alltid säga upp sig utan uppsägningstid',
        'Anställd har rätt till semester och sjuklön enligt lag',
        'Anställd fakturerar för sitt arbete',
        'Anställd har inga rättigheter enligt LAS'
      ],
      correctAnswer: 1,
      explanation: 'Anställda har enligt lag rätt till semester, semesterersättning och sjuklön. De omfattas också av LAS (lagen om anställningsskydd).'
    }
  ]
};

export const arbetsgivaransvarSlutprovQuiz = {
  id: 'arbetsgivaransvar-slutprov',
  title: 'Slutprov: Föreningens arbetsgivaransvar',
  description: 'Ett omfattande prov om alla aspekter av arbetsgivaransvaret',
  questions: [
    {
      id: 1,
      question: 'Föreningen anlitar en person för fastighetsskötsel 25h/vecka enligt schema. Personen har F-skatt och säger att hen driver eget företag. Vad gäller?',
      options: [
        'Detta är alltid ett uppdrag eftersom personen har F-skatt',
        'Skatteverket kan ändå bedöma det som anställning baserat på arbetets utförande',
        'Det är föreningens fria val',
        'F-skatten gör att det automatiskt är ett uppdrag'
      ],
      correctAnswer: 1,
      explanation: 'Fast schema och regelbundet arbete talar starkt för anställning. Skatteverket gör en helhetsbedömning av arbetets karaktär, inte vad avtalet säger eller om personen har F-skatt.'
    },
    {
      id: 2,
      question: 'Vilka försäkringar MÅSTE föreningen teckna för en anställd?',
      options: [
        'Endast arbetsskadeförsäkring',
        'Arbetsskade-, tjänstegruppliv- och trygghetsförsäkring',
        'Inga försäkringar krävs',
        'Endast om kollektivavtal finns'
      ],
      correctAnswer: 1,
      explanation: 'För anställda krävs arbetsskadeförsäkring (obligatorisk enligt lag) samt normalt även tjänstegrupplivförsäkring och trygghetsförsäkring vid arbetsskada (TFA).'
    },
    {
      id: 3,
      question: 'Vad innebär det att någon har "F-skatt"?',
      options: [
        'Att personen betalar fast skatt',
        'Att personen är godkänd för F-skatt och driver eget företag',
        'Att personen är fritagen från skatt',
        'Att personen har förhöjd skatt'
      ],
      correctAnswer: 1,
      explanation: 'F-skatt (F står för företag) innebär att Skatteverket godkänt att personen driver eget företag och sköter sin egen skattedeklaration och betalning.'
    },
    {
      id: 4,
      question: 'Föreningen anlitar en elektriker för att byta en armatur. Elektrikern kommer, gör jobbet på 2 timmar och fakturerar. Vad är detta?',
      options: [
        'En anställning',
        'Ett uppdrag',
        'Måste vara anställning om det tar mer än 1 timme',
        'Beror på om det är morgon eller kväll'
      ],
      correctAnswer: 1,
      explanation: 'Detta är ett klassiskt uppdrag - tidsbegränsat, specifik uppgift, elektrikern bestämmer själv hur arbetet utförs med egna verktyg.'
    },
    {
      id: 5,
      question: 'Vad är skillnaden mellan tillsvidareanställning och visstidsanställning?',
      options: [
        'Ingen skillnad i praktiken',
        'Tillsvidare gäller tills vidare, visstid är tidsbegränsad',
        'Visstid kräver F-skatt',
        'Tillsvidare är alltid heltid'
      ],
      correctAnswer: 1,
      explanation: 'Tillsvidareanställning gäller tills vidare (utan slutdatum) medan visstidsanställning är tidsbegränsad. Båda är anställningsformer som kräver arbetsgivaravgifter.'
    },
    {
      id: 6,
      question: 'Hur lång är den lagstadgade sjuklöneperioden för anställda?',
      options: [
        '7 dagar',
        '14 dagar',
        '30 dagar',
        '90 dagar'
      ],
      correctAnswer: 1,
      explanation: 'Arbetsgivaren betalar sjuklön under de första 14 dagarna (dag 2-14, dag 1 är karensdag). Efter det tar Försäkringskassan över med sjukpenning.'
    },
    {
      id: 7,
      question: 'Vad är en arbetsgivardeklaration?',
      options: [
        'Ett avtal mellan arbetsgivare och anställd',
        'En månadsrapport till Skatteverket om löner och avgifter',
        'Ett intyg om att man är arbetsgivare',
        'En försäkring'
      ],
      correctAnswer: 1,
      explanation: 'Arbetsgivardeklarationen är en månadsrapport till Skatteverket där föreningen redovisar utbetalda löner, innehållen skatt och arbetsgivaravgifter.'
    },
    {
      id: 8,
      question: 'Kan föreningen säga upp en tillsvidareanställd utan saklig grund?',
      options: [
        'Ja, när som helst',
        'Nej, det krävs saklig grund enligt LAS',
        'Ja, men bara under de första 6 månaderna',
        'Ja, om man betalar extra mycket'
      ],
      correctAnswer: 1,
      explanation: 'LAS (lagen om anställningsskydd) kräver saklig grund för uppsägning, antingen arbetsbrist eller personliga skäl. Detta gäller efter eventuell provanställning.'
    },
    {
      id: 9,
      question: 'Vad händer om en konsult som föreningen anlitar inte har F-skatt?',
      options: [
        'Ingenting särskilt',
        'Föreningen måste göra skatteavdrag som vid anställning',
        'Det är förbjudet att anlita personen',
        'Konsulten måste ansöka om F-skatt inom en vecka'
      ],
      correctAnswer: 1,
      explanation: 'Om konsulten saknar F-skatt måste föreningen göra skatteavdrag (preliminärskatt) från ersättningen och betala in den till Skatteverket, precis som vid anställning.'
    },
    {
      id: 10,
      question: 'Vad innebär RUT-avdrag för en bostadsrättsförening?',
      options: [
        'Föreningen får avdrag för alla kostnader',
        'Medlemmarna kan få skattereduktion för vissa tjänster',
        'Föreningen slipper betala moms',
        'RUT gäller inte för bostadsrättsföreningar'
      ],
      correctAnswer: 1,
      explanation: 'RUT-avdrag (Rengöring, Underhåll, Tvätt) innebär att enskilda medlemmar kan få skattereduktion för vissa hushållsnära tjänster. Föreningen kan hjälpa till att administrera detta.'
    },
    {
      id: 11,
      question: 'Vad är kollektivavtal?',
      options: [
        'Ett avtal mellan flera arbetsgivare',
        'Ett avtal mellan arbetsgivare och fackförbund om villkor',
        'Ett standardavtal från Skatteverket',
        'Ett avtal mellan anställda'
      ],
      correctAnswer: 1,
      explanation: 'Kollektivavtal är ett avtal mellan arbetsgivarorganisation och fackförbund som reglerar löner, arbetstider och andra anställningsvillkor.'
    },
    {
      id: 12,
      question: 'Hur lång kan en provanställning maximalt vara?',
      options: [
        '1 månad',
        '3 månader',
        '6 månader',
        '12 månader'
      ],
      correctAnswer: 2,
      explanation: 'Provanställning får enligt LAS vara högst 6 månader. Under denna tid gäller kortare uppsägningstid och det är lättare att avsluta anställningen.'
    },
    {
      id: 13,
      question: 'Vem ska föreningen kontakta för förhandsbesked om anställning eller uppdrag?',
      options: [
        'Arbetsförmedlingen',
        'Skatteverket',
        'Försäkringskassan',
        'Polisen'
      ],
      correctAnswer: 1,
      explanation: 'Skatteverket kan ge förhandsbesked om hur de kommer att bedöma en viss arbetssituation - om det är anställning eller uppdrag. Detta är juridiskt bindande.'
    },
    {
      id: 14,
      question: 'Vad gäller för arbetsmiljöansvar vid anställning?',
      options: [
        'Endast den anställde ansvarar',
        'Arbetsgivaren har det fulla arbetsmiljöansvaret enligt arbetsmiljölagen',
        'Ingen har ansvar',
        'Ansvaret delas lika'
      ],
      correctAnswer: 1,
      explanation: 'Enligt arbetsmiljölagen har arbetsgivaren det fulla ansvaret för arbetsmiljön. Detta inkluderar systematiskt arbetsmiljöarbete, skyddsåtgärder och förebyggande arbete.'
    },
    {
      id: 15,
      question: 'Vad händer om Skatteverket vid revision upptäcker att föreningen behandlat anställda som konsulter?',
      options: [
        'Endast varning',
        'Föreningen blir skyldig att betala arbetsgivaravgifter i efterhand plus ränta',
        'Ingenting om det var oavsiktligt',
        'Endast de anställda får problem'
      ],
      correctAnswer: 1,
      explanation: 'Föreningen kan bli skyldig att i efterhand betala alla arbetsgivaravgifter, sociala avgifter och skatter som ska ha betalats, plus ränta och eventuellt skattetillägg (straffavgift).'
    }
  ]
};

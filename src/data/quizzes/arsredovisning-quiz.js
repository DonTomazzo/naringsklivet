// data/quiz/arsredovisning-quiz.js

export const arsredovisningQuiz = {
  id: 'quiz-arsredovisning',
  title: 'Quiz: Årsredovisningen',
  slug: 'arsredovisning-quiz',
  questions: [
    {
      id: 'q1',
      question_text: 'Vad visar resultaträkningen?',
      question_type: 'single_choice',
      question_order: 1,
      options: {
        choices: [
          'Föreningens tillgångar och skulder',
          'Intäkter och kostnader under ett år',
          'Revisorns utlåtande om förvaltningen',
          'Styrelsens berättelse om verksamheten'
        ]
      },
      correct_answer: 'Intäkter och kostnader under ett år',
      explanation: 'Resultaträkningen visar alla intäkter (t.ex. årsavgifter) och kostnader (t.ex. drift, räntor) under ett år och räknar fram årets resultat.',
      points: 100
    },
    {
      id: 'q2',
      question_text: 'Vad innebär en "ren" revisionsberättelse?',
      question_type: 'single_choice',
      question_order: 2,
      options: {
        choices: [
          'Att revisorn har hittat allvarliga fel i bokföringen',
          'Att revisorn inte har godkänt bokslutet',
          'Att räkenskaperna är korrekta och styrelsen har skött sitt uppdrag',
          'Att årsredovisningen lämnades in för sent'
        ]
      },
      correct_answer: 'Att räkenskaperna är korrekta och styrelsen har skött sitt uppdrag',
      explanation: 'En ren revisionsberättelse är det normala och önskvärda utfallet. Revisorn bekräftar att allt är i ordning och att styrelsen föreslås beviljas ansvarsfrihet.',
      points: 100
    },
    {
      id: 'q3',
      question_text: 'Vad är "fond för yttre underhåll"?',
      question_type: 'single_choice',
      question_order: 3,
      options: {
        choices: [
          'Pengar för att betala löpande el och vatten',
          'Sparade medel för framtida renovering av fastigheten',
          'Styrelsens arvode för årets arbete',
          'Bankens utlåning till föreningen'
        ]
      },
      correct_answer: 'Sparade medel för framtida renovering av fastigheten',
      explanation: 'Fond för yttre underhåll är avsättningar som föreningen gör varje år för att finansiera framtida underhåll av fastigheten – tak, fasad, stammar m.m. En stor fond är ett positivt tecken.',
      points: 100
    },
    {
      id: 'q4',
      question_text: 'Vad visar nyckeltalet "skuldsättning kr/kvm"?',
      question_type: 'single_choice',
      question_order: 4,
      options: {
        choices: [
          'Hur mycket föreningen betalar i ränta per år',
          'Föreningens totala lån i förhållande till boytan',
          'Hur stor årsavgiften är per kvadratmeter',
          'Fastighetens marknadsvärde per kvadratmeter'
        ]
      },
      correct_answer: 'Föreningens totala lån i förhållande till boytan',
      explanation: 'Skuldsättning kr/kvm är ett av de viktigaste nyckeltalen för att bedöma föreningens risk. Ju lägre värde desto bättre – branschsnittet ligger på 3 000–8 000 kr/kvm.',
      points: 100
    },
    {
      id: 'q5',
      question_text: 'Varför kan en BRF ha negativt eget kapital?',
      question_type: 'single_choice',
      question_order: 5,
      options: {
        choices: [
          'Det beror alltid på att föreningen har dålig ekonomi',
          'Föreningen har gått med förlust under många år i rad',
          'Det är normalt och beror på hur insatser och lån bokförs',
          'Styrelsen har gjort fel i bokföringen'
        ]
      },
      correct_answer: 'Det är normalt och beror på hur insatser och lån bokförs',
      explanation: 'Negativt eget kapital i en BRF är normalt och inget farlighetstecken. Det beror på hur insatser och lån bokförs i BRF-modellen. Fokusera istället på likviditet och skuldsättning.',
      points: 100
    },
    {
      id: 'q6',
      question_text: 'Vilken del av årsredovisningen skriver styrelsen med egna ord?',
      question_type: 'single_choice',
      question_order: 6,
      options: {
        choices: [
          'Resultaträkningen',
          'Balansräkningen',
          'Förvaltningsberättelsen',
          'Revisionsberättelsen'
        ]
      },
      correct_answer: 'Förvaltningsberättelsen',
      explanation: 'Förvaltningsberättelsen är styrelsens egen berättelse om hur det gått under året. Här beskrivs viktiga händelser, fastigheten och föreningens situation med egna ord.',
      points: 100
    },
    {
      id: 'q7',
      question_text: 'Vad visar balansräkningen?',
      question_type: 'single_choice',
      question_order: 7,
      options: {
        choices: [
          'Årets alla intäkter och kostnader',
          'Föreningens tillgångar, skulder och eget kapital vid ett visst datum',
          'Revisorns granskning av räkenskaperna',
          'Förklaringar till poster i resultaträkningen'
        ]
      },
      correct_answer: 'Föreningens tillgångar, skulder och eget kapital vid ett visst datum',
      explanation: 'Balansräkningen är en ögonblicksbild av föreningens ekonomi på årets sista dag. Den visar vad föreningen äger (tillgångar) och vad den är skyldig (skulder).',
      points: 100
    },
    {
      id: 'q8',
      question_text: 'Vad är "avskrivning" i en årsredovisning?',
      question_type: 'single_choice',
      question_order: 8,
      options: {
        choices: [
          'Pengar som betalas av på banklånet',
          'En bokföringsmässig kostnad som speglar att fastigheten minskar i bokfört värde',
          'Kostnader för underhåll av fastigheten',
          'Räntekostnaden på föreningens lån'
        ]
      },
      correct_answer: 'En bokföringsmässig kostnad som speglar att fastigheten minskar i bokfört värde',
      explanation: 'Avskrivning är en bokföringsmässig kostnad som påverkar resultatet men inte kassaflödet. Fastigheten skrivs av med ett fast belopp varje år utifrån dess beräknade livslängd.',
      points: 100
    },
  ],
  userid: 'system',
  image_url: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1920&q=80'
};
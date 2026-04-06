// src/data/quizzes/ai-brf-quiz.ts
// Tre quiz för Module5AiBrf:
//   aiBrfQuiz1 – Grunderna (efter slide 3)
//   aiBrfQuiz2 – Verktyg & promptning (efter slide 6)
//   aiBrfQuizSlut – Hela modulen (slide 10)

export interface QuizQuestion {
  id: string;
  question_text: string;
  question_type: 'single_choice' | 'multiple_choice';
  question_order: number;
  options: { choices: string[] };
  correct_answer: string;
  explanation: string;
  points: number;
}

// ─── QUIZ 1: Grunderna ────────────────────────────────────
// Placeras efter slide 3 (Spara tid med AI)
export const aiBrfQuiz1: { questions: QuizQuestion[] } = {
  questions: [
    {
      id: 'ai1-q1',
      question_text: 'Vad menas med att en AI "hallucinerar"?',
      question_type: 'single_choice',
      question_order: 1,
      options: {
        choices: [
          'AI:n är för långsam och tidsfördröjer svaret',
          'AI:n presenterar felaktig information med stor säkerhet',
          'AI:n svarar på fel språk',
          'AI:n vägrar svara på frågan',
        ],
      },
      correct_answer: 'AI:n presenterar felaktig information med stor säkerhet',
      explanation:
        'Hallucination innebär att AI presenterar påhittad information som om den vore sann. Kontrollera alltid viktiga uppgifter – särskilt juridik, datum och personnummer.',
      points: 100,
    },
    {
      id: 'ai1-q2',
      question_text: 'Vilken av dessa uppgifter är AI BÄST lämpad att hjälpa till med i en BRF-styrelse?',
      question_type: 'single_choice',
      question_order: 2,
      options: {
        choices: [
          'Fatta formella beslut å styrelsens vägnar',
          'Skriva utkast till brev och sammanfatta dokument',
          'Ersätta revisorns granskning av årsredovisningen',
          'Automatiskt registrera ändringar hos Bolagsverket',
        ],
      },
      correct_answer: 'Skriva utkast till brev och sammanfatta dokument',
      explanation:
        'AI är ett utmärkt verktyg för att sammanfatta, skriva utkast och strukturera information. Beslut, granskning och juridiska åtgärder kräver alltid mänsklig bedömning.',
      points: 100,
    },
    {
      id: 'ai1-q3',
      question_text: 'Vad är ett "kontextfönster" i AI-sammanhang?',
      question_type: 'single_choice',
      question_order: 3,
      options: {
        choices: [
          'En inställning för att dölja känslig information',
          'Hur mycket text AI:n kan hantera i ett och samma samtal',
          'En säkerhetsfunktion som skyddar personuppgifter',
          'Tidsfönstret då AI:n är tillgänglig',
        ],
      },
      correct_answer: 'Hur mycket text AI:n kan hantera i ett och samma samtal',
      explanation:
        'Kontextfönstret är AI:ns "arbetsminne" – hur mycket text den kan hålla i huvudet under en konversation. Moderna modeller klarar långa dokument, men minnet nollställs vid ny chatt.',
      points: 100,
    },
  ],
};

// ─── QUIZ 2: Verktyg & promptning ────────────────────────
// Placeras efter slide 6 (Protokoll på 10 min)
export const aiBrfQuiz2: { questions: QuizQuestion[] } = {
  questions: [
    {
      id: 'ai2-q1',
      question_text: 'Vilket AI-verktyg rekommenderas särskilt för känsliga BRF-dokument tack vare bättre standardinställningar för integritet?',
      question_type: 'single_choice',
      question_order: 1,
      options: {
        choices: [
          'ChatGPT',
          'Claude',
          'Microsoft Copilot',
          'Google Bard',
        ],
      },
      correct_answer: 'Claude',
      explanation:
        'Claude från Anthropic har bättre standardinställningar för integritet och rekommenderas för känsliga dokument. Men kom ihåg: inga personnummer eller bankuppgifter ska matas in i något AI-verktyg utan att du kontrollerat integritetspolicyn.',
      points: 100,
    },
    {
      id: 'ai2-q2',
      question_text: 'Vilka fyra delar ingår i prompt-formeln som gör AI-svar bättre?',
      question_type: 'single_choice',
      question_order: 2,
      options: {
        choices: [
          'Språk, längd, datum och ämne',
          'Roll, uppgift, kontext och format',
          'Titel, paragraf, bilaga och signatur',
          'Fråga, svar, kontroll och arkivering',
        ],
      },
      correct_answer: 'Roll, uppgift, kontext och format',
      explanation:
        'Prompt-formeln: (1) Roll – vem du är, (2) Uppgift – vad AI ska göra, (3) Kontext – relevant bakgrund, (4) Format – hur svaret ska se ut. Mer kontext ger alltid bättre svar.',
      points: 100,
    },
    {
      id: 'ai2-q3',
      question_text: 'Vad ska sekreteraren alltid göra med ett AI-genererat protokollutkast?',
      question_type: 'single_choice',
      question_order: 3,
      options: {
        choices: [
          'Publicera det direkt på föreningens anslagstavla',
          'Skicka det omedelbart till Bolagsverket',
          'Granska och kontrollera att beslut, datum och namn stämmer',
          'Arkivera det utan granskning för att spara tid',
        ],
      },
      correct_answer: 'Granska och kontrollera att beslut, datum och namn stämmer',
      explanation:
        'AI levererar råmaterialet – sekreteraren ansvarar för innehållet. Kontrollera alltid att beslut är korrekt formulerade och att fakta som datum och namn stämmer. AI kan hallucera även dessa.',
      points: 100,
    },
  ],
};

// ─── SLUTQUIZ: Hela modulen ───────────────────────────────
// Placeras på slide 10 – styr modulens completion
export const aiBrfQuizSlut: { questions: QuizQuestion[] } = {
  questions: [
    {
      id: 'slut-q1',
      question_text: 'Vad kallas ett AI-systems förmåga att generera felaktig information med stor säkerhet?',
      question_type: 'single_choice',
      question_order: 1,
      options: {
        choices: ['Kontextfönster', 'Hallucination', 'Prompt-fel', 'Tokenfel'],
      },
      correct_answer: 'Hallucination',
      explanation:
        'Hallucination är när AI presenterar felaktig information med stor säkerhet. Kontrollera alltid viktiga uppgifter – särskilt juridik, datum och siffror.',
      points: 100,
    },
    {
      id: 'slut-q2',
      question_text: 'Vilken grundregel gäller för GDPR och AI-verktyg i BRF-styrelsearbetet?',
      question_type: 'single_choice',
      question_order: 2,
      options: {
        choices: [
          'Inga personuppgifter får användas med AI överhuvudtaget',
          'Personnummer och känsliga uppgifter ska inte matas in utan att ha kontrollerat verktygets integritetspolicy',
          'Samtycke från alla medlemmar krävs',
          'Enbart kommunala BRF:er får använda AI',
        ],
      },
      correct_answer:
        'Personnummer och känsliga uppgifter ska inte matas in utan att ha kontrollerat verktygets integritetspolicy',
      explanation:
        'Lägg aldrig in personnummer, bankuppgifter eller känsliga personuppgifter utan att ha läst igenom integritetspolicyn och stängt av träningsdelning.',
      points: 100,
    },
    {
      id: 'slut-q3',
      question_text: 'Vad är den viktigaste komponenten i en effektiv AI-prompt?',
      question_type: 'single_choice',
      question_order: 3,
      options: {
        choices: [
          'Att skriva på engelska',
          'Att ge kontext: roll, uppgift och format',
          'Att använda korta meningar',
          'Att upprepa frågan flera gånger',
        ],
      },
      correct_answer: 'Att ge kontext: roll, uppgift och format',
      explanation:
        'Mer kontext = bättre svar. Berätta vem du är, vad du vill ha och vilket format du förväntar dig. Det gör svaret tio gånger bättre.',
      points: 100,
    },
    {
      id: 'slut-q4',
      question_text: 'Hur bör AI-genererade protokoll hanteras?',
      question_type: 'single_choice',
      question_order: 4,
      options: {
        choices: [
          'Publiceras direkt utan granskning',
          'Granskas alltid av sekreteraren innan de justeras',
          'Skickas direkt till alla boende',
          'Lagras automatiskt av AI-verktyget',
        ],
      },
      correct_answer: 'Granskas alltid av sekreteraren innan de justeras',
      explanation:
        'AI levererar råmaterialet – ni granskar och ansvarar. Kontrollera alltid att beslut är korrekt formulerade och att fakta som datum och namn stämmer.',
      points: 100,
    },
    {
      id: 'slut-q5',
      question_text: 'Vilket påstående om AI och juridisk rådgivning är korrekt?',
      question_type: 'single_choice',
      question_order: 5,
      options: {
        choices: [
          'AI kan ersätta juristen helt för BRF-frågor',
          'AI hjälper er ställa rätt frågor men ersätter inte kvalificerad juridisk rådgivning',
          'AI är alltid juridiskt korrekt',
          'AI-svar har samma rättskraft som advokatens yttrande',
        ],
      },
      correct_answer:
        'AI hjälper er ställa rätt frågor men ersätter inte kvalificerad juridisk rådgivning',
      explanation:
        'AI kan ge bakgrundskunskap och hjälpa er formulera rätt frågor – men för bindande juridiska beslut, tvister och avtalsskrivning ska ni alltid anlita jurist eller förvaltare.',
      points: 100,
    },
  ],
};

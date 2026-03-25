const generativquizzes = [

{
  id: "genai1",
  title: "Diskrimineringslagstiftningen",
  slug: "generativ-ai-nyborjare",
  userid: "demo-user",
  image_url: "https://images.unsplash.com/photo-1682687220198-88e9b53b1b26?w=1920&q=80",
  pdf_url: "/kursmaterial/diskrimineringslagstiftningen.pdf", // <-- LÄGG TILL DENNA RAD
  questions: [
    // -----------------------
    // 🧠 LEKTION 1 – INTRODUKTION TILL GENERATIV AI
    // -----------------------
    {
      id: "genai1-v1",
      question_text: "Introduktion till Generativ AI",
      question_type: "videolesson",
      question_order: 1,
      video_url: "https://www.youtube.com/embed/GU4MqB1PQc0",
      points: 0,
    },
    {
      id: "genai1-t1",
      question_text: "Vad är Generativ AI?",
      question_type: "textlesson",
      question_order: 2,
      pause_content:
        "Generativ AI är en typ av artificiell intelligens som kan skapa nytt innehåll – till exempel text, bilder, ljud och video – baserat på den data den tränats på. Den lär sig mönster i data och använder dessa för att generera nya variationer.",
      points: 0,
    },
    {
      id: "genai1-q1",
      question_text: "Vad är den huvudsakliga uppgiften för Generativ AI?",
      question_type: "single_choice",
      question_order: 3,
      options: {
        choices: [
          "Att fatta beslut baserat på data",
          "Att skapa nytt innehåll baserat på data",
          "Att lagra information",
          "Att övervaka processer",
        ],
      },
      correct_answer: "Att skapa nytt innehåll baserat på data",
      explanation:
        "Generativ AI används för att skapa nytt material såsom text, bilder, musik eller kod baserat på inlärda mönster.",
      points: 10,
    },
    {
      id: "genai1-q2",
      question_text: "Vilka typer av innehåll kan generativ AI skapa?",
      question_type: "multiple_choice",
      question_order: 4,
      options: {
        choices: ["Text", "Bilder", "Ljud", "Video"],
      },
      correct_answer: ["Text", "Bilder", "Ljud", "Video"],
      explanation:
        "Moderna generativa modeller kan skapa text (ChatGPT), bilder (DALL·E), ljud (Suno) och till och med video (Pika, Synthesia).",
      points: 15,
    },
    {
      id: "genai1-q3",
      question_text: "Vilken term används för att beskriva hur en AI bearbetar text steg för steg?",
      question_type: "fill_blank",
      question_order: 5,
      correct_answer: "tokenisering",
      explanation:
        "Text delas upp i små delar som kallas tokens. Det är grunden för hur språkmodeller förstår och genererar text.",
      points: 10,
    },
    {
      id: "genai1-q4",
      question_text: "Ordna följande steg i rätt ordning för hur en AI genererar text:",
      question_type: "order_sequence",
      question_order: 6,
      options: {
        wordBank: ["Input", "Bearbetning", "Prediktion", "Utdata"],
      },
      correct_answer: ["Input", "Bearbetning", "Prediktion", "Utdata"],
      explanation:
        "AI tar emot en prompt (input), bearbetar den med sitt nätverk, förutspår nästa ord och genererar text (utdata).",
      points: 15,
    },
    {
      id: "genai1-q5",
      question_text: "Generativ AI är en del av maskininlärning.",
      question_type: "true_false",
      question_order: 7,
      options: { choices: ["Sant", "Falskt"] },
      correct_answer: "Sant",
      explanation:
        "Generativ AI bygger på maskininlärning, en gren av AI som lär sig mönster i data för att skapa nya exempel.",
      points: 5,
    },
    {
      id: "genai1-q6",
      question_text: "Vilket av följande är ett exempel på en generativ AI-tillämpning?",
      question_type: "single_choice",
      question_order: 8,
      options: {
        choices: ["Excel", "ChatGPT", "Google Sheets", "Dropbox"],
      },
      correct_answer: "ChatGPT",
      explanation:
        "ChatGPT är en generativ språkmodell som skapar text baserat på indata från användaren.",
      points: 10,
    },
    {
      id: "genai1-q7",
      question_text: "Vad betyder 'prompt' i sammanhanget generativ AI?",
      question_type: "single_choice",
      question_order: 9,
      options: {
        choices: [
          "Ett program som tränar AI",
          "Texten eller instruktionen du ger till AI:n",
          "Ett neuralt nätverk",
          "En databas med träningsdata",
        ],
      },
      correct_answer: "Texten eller instruktionen du ger till AI:n",
      explanation:
        "Prompten är den text eller instruktion som du skriver in för att styra vad AI:n ska generera.",
      points: 10,
    },
    {
      id: "genai1-q8",
      question_text: "Vilken modelltyp används oftast i moderna generativa AI-system?",
      question_type: "single_choice",
      question_order: 10,
      options: {
        choices: ["Beslutsträd", "Transformer", "Regression", "SVM"],
      },
      correct_answer: "Transformer",
      explanation:
        "Transformer-arkitekturen ligger bakom modeller som ChatGPT, Claude, Gemini och andra moderna språkmodeller.",
      points: 10,
    },

    // -----------------------
    // 🧩 LEKTION 2 – HUR MODELLER TRÄNAS
    // -----------------------
    {
      id: "genai2-v1",
      question_text: "Hur tränas en AI-modell?",
      question_type: "videolesson",
      question_order: 11,
      video_url: "https://www.youtube.com/embed/aircAruvnKk",
      points: 0,
    },
    {
      id: "genai2-q1",
      question_text: "Vilken typ av data används för att träna en språkmodell?",
      question_type: "multiple_choice",
      question_order: 12,
      options: { choices: ["Text", "Bild", "Kod", "Numerisk data"] },
      correct_answer: ["Text", "Kod"],
      explanation:
        "Språkmodeller tränas primärt på textdata, men vissa tränas även på kod eller multimodal data.",
      points: 10,
    },
    {
      id: "genai2-q2",
      question_text: "Vad kallas processen där modellen justerar sina vikter baserat på fel?",
      question_type: "fill_blank",
      question_order: 13,
      correct_answer: "backpropagation",
      explanation:
        "Backpropagation används för att justera modellens vikter så att dess förutsägelser förbättras.",
      points: 10,
    },
    {
      id: "genai2-q3",
      question_text: "Vilken av följande påståenden stämmer bäst?",
      question_type: "single_choice",
      question_order: 14,
      options: {
        choices: [
          "AI lär sig förstå världen som en människa",
          "AI identifierar statistiska mönster i data",
          "AI kan tänka självständigt",
          "AI har medvetande",
        ],
      },
      correct_answer: "AI identifierar statistiska mönster i data",
      explanation:
        "AI fungerar inte som människor, utan analyserar och förutspår mönster baserat på statistik.",
      points: 10,
    },
    {
      id: "genai2-q4",
      question_text: "Vilket begrepp beskriver hur bra en AI presterar på nya, okända data?",
      question_type: "single_choice",
      question_order: 15,
      options: {
        choices: ["Överanpassning", "Generaliseringsförmåga", "Tokenisering", "Fine-tuning"],
      },
      correct_answer: "Generaliseringsförmåga",
      explanation:
        "En AI med god generaliseringsförmåga klarar att prestera bra även på ny data den inte tränats på.",
      points: 10,
    },
    {
      id: "genai2-q5",
      question_text: "Vad innebär 'fine-tuning'?",
      question_type: "single_choice",
      question_order: 16,
      options: {
        choices: [
          "Att träna en ny AI från grunden",
          "Att justera en befintlig modell för ett specifikt syfte",
          "Att rensa träningsdata",
          "Att skapa nya tokens",
        ],
      },
      correct_answer: "Att justera en befintlig modell för ett specifikt syfte",
      explanation:
        "Fine-tuning innebär att man anpassar en färdigtränad modell till ett nytt område, t.ex. juridik eller medicin.",
      points: 10,
    },
    {
      id: "genai2-q6",
      question_text: "Vilken komponent i neurala nätverk inspireras av hjärnans neuroner?",
      question_type: "single_choice",
      question_order: 17,
      options: {
        choices: ["Noder", "Tokens", "Layer normalization", "Loss function"],
      },
      correct_answer: "Noder",
      explanation:
        "Varje nod i ett neuralt nätverk fungerar ungefär som en artificiell neuron som bearbetar signaler.",
      points: 10,
    },
    {
      id: "genai2-q7",
      question_text: "En modell som tränats på alltför liten datamängd riskerar att få...",
      question_type: "single_choice",
      question_order: 18,
      options: {
        choices: ["överanpassning", "underanpassning", "hög precision", "stabilitet"],
      },
      correct_answer: "underanpassning",
      explanation:
        "Underanpassning sker när modellen inte lär sig tillräckligt mycket från datan och presterar dåligt.",
      points: 10,
    },
    {
      id: "genai2-q8",
      question_text: "Valideringsdata används för att testa modellen under träning för att undvika överanpassning.",
      question_type: "true_false",
      question_order: 19,
      options: { choices: ["Sant", "Falskt"] },
      correct_answer: "Sant",
      explanation:
        "Valideringsdata används för att testa modellen under träning för att undvika överanpassning.",
      points: 5,
    },
    {
      id: "genai2-t1",
      question_text: "Sammanfattning: Hur AI lär sig",
      question_type: "textlesson",
      question_order: 20,
      pause_content:
        "Modeller lär sig genom att bearbeta stora datamängder, hitta mönster och justera sina interna vikter. De blir bättre genom feedback och upprepning.",
      points: 0,
    },

    // -----------------------
    // 🤖 LEKTION 3 – SPRÅKMODELLER (LLM)
    // -----------------------
    {
      id: "genai3-v1",
      question_text: "Hur fungerar stora språkmodeller?",
      question_type: "videolesson",
      question_order: 21,
      video_url: "https://www.youtube.com/embed/zjkBMFhNj_g",
      points: 0,
    },
    {
      id: "genai3-q1",
      question_text: "Vad står LLM för?",
      question_type: "fill_blank",
      question_order: 22,
      correct_answer: "Large Language Model",
      explanation: "LLM står för Large Language Model – stora språkmodeller tränade på enorma textmängder.",
      points: 10,
    },
    {
      id: "genai3-q2",
      question_text: "Vilket företag utvecklade ChatGPT?",
      question_type: "single_choice",
      question_order: 23,
      options: { choices: ["Google", "Anthropic", "OpenAI", "Meta"] },
      correct_answer: "OpenAI",
      explanation: "ChatGPT är utvecklad av OpenAI, som även står bakom modeller som GPT-4 och DALL·E.",
      points: 10,
    },
    {
      id: "genai3-q3",
      question_text: "Vilken komponent i en Transformer ansvarar för att väga ordens betydelse?",
      question_type: "single_choice",
      question_order: 24,
      options: { choices: ["Embedding", "Attention", "Normalization", "Loss"] },
      correct_answer: "Attention",
      explanation: "Attention-mekanismen låter modellen fokusera på relevanta ord beroende på kontext.",
      points: 10,
    },
    {
      id: "genai3-q4",
      question_text: "Vilka exempel är språkmodeller?",
      question_type: "multiple_choice",
      question_order: 25,
      options: { choices: ["ChatGPT", "Claude", "Gemini", "Midjourney"] },
      correct_answer: ["ChatGPT", "Claude", "Gemini"],
      explanation: "De tre första är språkmodeller, medan Midjourney är en bildgenerator.",
      points: 15,
    },
    {
      id: "genai3-q5",
      question_text: "En prompt kan jämföras med...",
      question_type: "single_choice",
      question_order: 26,
      options: {
        choices: ["En fråga", "En träningsdata", "En algoritm", "En etikett"],
      },
      correct_answer: "En fråga",
      explanation: "En prompt fungerar som en fråga eller instruktion som styr modellens svar.",
      points: 10,
    },
    {
      id: "genai3-q6",
      question_text: "Vad betyder 'context window' i LLM-sammanhang?",
      question_type: "single_choice",
      question_order: 27,
      options: {
        choices: [
          "Antal användare modellen kan hantera",
          "Maximalt antal tokens modellen kan bearbeta samtidigt",
          "Modellens minne över tid",
          "Antal lager i nätverket",
        ],
      },
      correct_answer: "Maximalt antal tokens modellen kan bearbeta samtidigt",
      explanation:
        "Context window avgör hur mycket text (i tokens) modellen kan hålla i minnet vid varje tillfälle.",
      points: 10,
    },
    {
      id: "genai3-q7",
      question_text: "LLM:er tränas med övervakad inlärning.",
      question_type: "true_false",
      question_order: 28,
      options: { choices: ["Sant", "Falskt"] },
      correct_answer: "Sant",
      explanation:
        "LLM:er tränas med övervakad och självövervakad inlärning där modellen lär sig förutsäga nästa ord i en sekvens.",
      points: 5,
    },
    {
      id: "genai3-t1",
      question_text: "Sammanfattning av språkmodeller",
      question_type: "textlesson",
      question_order: 29,
      pause_content:
        "Språkmodeller fungerar genom att analysera kontext, förutsäga nästa ord och bygga upp text sekventiellt. De tränas på enorma mängder textdata.",
      points: 0,
    },

    // -----------------------
    // 🎨 LEKTION 4 – BILD, LJUD OCH VIDEO
    // -----------------------
    {
      id: "genai4-v1",
      question_text: "Generativ AI för bild, ljud och video",
      question_type: "videolesson",
      question_order: 30,
      video_url: "https://www.youtube.com/embed/2yT8p5KpL1E",
      points: 0,
    },
    {
      id: "genai4-q1",
      question_text: "Vilket verktyg används främst för att skapa bilder?",
      question_type: "single_choice",
      question_order: 31,
      options: {
        choices: ["Midjourney", "ChatGPT", "Suno", "Synthesia"],
      },
      correct_answer: "Midjourney",
      explanation: "Midjourney och DALL·E används för att skapa bilder från textprompter.",
      points: 10,
    },
    {
      id: "genai4-q2",
      question_text: "Vilka verktyg används för att generera ljud eller musik?",
      question_type: "multiple_choice",
      question_order: 32,
      options: {
        choices: ["Suno", "Udio", "ChatGPT", "DALL·E"],
      },
      correct_answer: ["Suno", "Udio"],
      explanation: "Suno och Udio är AI-modeller för musik- och ljudgenerering.",
      points: 15,
    },
    {
      id: "genai4-q3",
      question_text: "Vilken AI används ofta för att skapa videor med avatarer?",
      question_type: "single_choice",
      question_order: 33,
      options: {
        choices: ["Synthesia", "ChatGPT", "Gemini", "D-ID"],
      },
      correct_answer: "Synthesia",
      explanation:
        "Synthesia skapar videor där AI-avatarer talar utifrån text, populärt i utbildningssyfte.",
      points: 10,
    },
    {
      id: "genai4-q4",
      question_text: "Vad menas med 'text-to-image'?",
      question_type: "single_choice",
      question_order: 34,
      options: {
        choices: [
          "Att översätta text till kod",
          "Att generera bilder från textbeskrivningar",
          "Att analysera bilder med text",
          "Att skapa text från bilder",
        ],
      },
      correct_answer: "Att generera bilder från textbeskrivningar",
      explanation: "Text-to-image innebär att AI skapar bilder baserat på en textprompt, som Midjourney eller DALL·E gör.",
      points: 10,
    },
    {
      id: "genai4-q5",
      question_text: "Vilket verktyg kan generera realistiska röster?",
      question_type: "single_choice",
      question_order: 35,
      options: {
        choices: ["ElevenLabs", "Midjourney", "ChatGPT", "Runway"],
      },
      correct_answer: "ElevenLabs",
      explanation: "ElevenLabs är känt för att generera realistiska AI-röster från text.",
      points: 10,
    },
    {
      id: "genai4-q6",
      question_text: "Diffusionsmodeller används främst för...",
      question_type: "single_choice",
      question_order: 36,
      options: {
        choices: ["Textgenerering", "Bildgenerering", "Röstkloning", "Översättning"],
      },
      correct_answer: "Bildgenerering",
      explanation: "Diffusionsmodeller som Stable Diffusion och DALL·E är populära för att skapa bilder.",
      points: 10,
    },
    {
      id: "genai4-q7",
      question_text: "Kan AI generera musik från text?",
      question_type: "true_false",
      question_order: 37,
      options: { choices: ["Sant", "Falskt"] },
      correct_answer: "Sant",
      explanation: "Verktyg som Suno och Udio kan generera komplett musik baserat på textbeskrivningar.",
      points: 5,
    },
    {
      id: "genai4-t1",
      question_text: "Sammanfattning: Multimodala AI",
      question_type: "textlesson",
      question_order: 38,
      pause_content:
        "AI kan idag generera inte bara text, utan även bilder, ljud och video. Dessa modeller använder avancerade tekniker som diffusion och neurala nätverk för att skapa kreativt innehåll.",
      points: 0,
    },

    // -----------------------
    // 💼 LEKTION 5 – PRAKTISKA TILLÄMPNINGAR
    // -----------------------
    {
      id: "genai5-v1",
      question_text: "Praktiska användningsområden för AI",
      question_type: "videolesson",
      question_order: 39,
      video_url: "https://www.youtube.com/embed/5p248yoa3oE",
      points: 0,
    },
    {
      id: "genai5-q1",
      question_text: "Vilka områden kan dra nytta av generativ AI?",
      question_type: "multiple_choice",
      question_order: 40,
      options: {
        choices: ["Marknadsföring", "Utbildning", "Kundservice", "Lagarbete"],
      },
      correct_answer: ["Marknadsföring", "Utbildning", "Kundservice", "Lagarbete"],
      explanation: "Generativ AI används brett inom dessa områden för att automatisera och förbättra arbetsflöden.",
      points: 15,
    },
    {
      id: "genai5-q2",
      question_text: "Vad kallas AI-system som hjälper till med kundinteraktion?",
      question_type: "single_choice",
      question_order: 41,
      options: {
        choices: ["Chatbots", "Plugins", "APIs", "Tokens"],
      },
      correct_answer: "Chatbots",
      explanation: "Chatbots använder AI för att svara på kundfrågor automatiskt, ofta via chatt.",
      points: 10,
    },
    {
      id: "genai5-q3",
      question_text: "Kan AI hjälpa till att skriva kod?",
      question_type: "true_false",
      question_order: 42,
      options: { choices: ["Sant", "Falskt"] },
      correct_answer: "Sant",
      explanation: "Verktyg som GitHub Copilot och ChatGPT kan generera och förklara kod.",
      points: 5,
    },
    {
      id: "genai5-q4",
      question_text: "Vilket verktyg används för AI-assisterad kodning?",
      question_type: "single_choice",
      question_order: 43,
      options: {
        choices: ["GitHub Copilot", "Midjourney", "Suno", "Synthesia"],
      },
      correct_answer: "GitHub Copilot",
      explanation: "GitHub Copilot är en AI-assistent som hjälper utvecklare att skriva kod snabbare.",
      points: 10,
    },
    {
      id: "genai5-q5",
      question_text: "Vad är RAG (Retrieval-Augmented Generation)?",
      question_type: "single_choice",
      question_order: 44,
      options: {
        choices: [
          "En typ av bildgenerator",
          "En metod där AI hämtar information från dokument för att svara mer exakt",
          "Ett programmeringsspråk",
          "En ljudmodell",
        ],
      },
      correct_answer: "En metod där AI hämtar information från dokument för att svara mer exakt",
      explanation: "RAG kombinerar informationshämtning med språkmodeller för att ge mer exakta svar baserat på specifik data.",
      points: 10,
    },
    {
      id: "genai5-q6",
      question_text: "AI kan användas för att automatisera...",
      question_type: "multiple_choice",
      question_order: 45,
      options: {
        choices: ["E-postutskick", "Rapportskrivning", "Dataanalys", "Innehållsskapande"],
      },
      correct_answer: ["E-postutskick", "Rapportskrivning", "Dataanalys", "Innehållsskapande"],
      explanation: "AI kan automatisera repetitiva uppgifter inom alla dessa områden och spara tid.",
      points: 15,
    },
    {
      id: "genai5-t1",
      question_text: "Sammanfattning: AI i praktiken",
      question_type: "textlesson",
      question_order: 46,
      pause_content:
        "Generativ AI revolutionerar arbetsflöden inom många branscher. Från kundservice till kodning och kreativt innehåll – AI blir ett allt viktigare verktyg.",
      points: 0,
    },

    // -----------------------
    // ⚖️ LEKTION 6 – ETIK OCH UTMANINGAR
    // -----------------------
    {
      id: "genai6-v1",
      question_text: "Etiska utmaningar med AI",
      question_type: "videolesson",
      question_order: 47,
      video_url: "https://www.youtube.com/embed/LqjP7O9SxOM",
      points: 0,
    },
    {
      id: "genai6-q1",
      question_text: "Vad innebär 'bias' i AI-sammanhang?",
      question_type: "single_choice",
      question_order: 48,
      options: {
        choices: [
          "Att AI är alltid neutral",
          "Att AI kan spegla fördomar från träningsdata",
          "Att AI inte kan göra fel",
          "Att AI är medveten om sina val",
        ],
      },
      correct_answer: "Att AI kan spegla fördomar från träningsdata",
      explanation: "Om träningsdata innehåller fördomar kan AI reproducera dessa i sina svar.",
      points: 10,
    },
    {
      id: "genai6-q2",
      question_text: "Vilka är vanliga etiska problem med AI?",
      question_type: "multiple_choice",
      question_order: 49,
      options: {
        choices: ["Bias", "Desinformation", "Integritetsfrågor", "Upphovsrättsproblem"],
      },
      correct_answer: ["Bias", "Desinformation", "Integritetsfrågor", "Upphovsrättsproblem"],
      explanation: "Alla dessa är viktiga etiska frågor som måste hanteras när AI används i samhället.",
      points: 15,
    },
    {
      id: "genai6-q3",
      question_text: "Kan AI skapa desinformation?",
      question_type: "true_false",
      question_order: 50,
      options: { choices: ["Sant", "Falskt"] },
      correct_answer: "Sant",
      explanation: "AI kan generera övertygande men felaktig information, vilket är en stor utmaning.",
      points: 5,
    },
    {
      id: "genai6-q4",
      question_text: "Vad kallas fenomenet när AI skapar felaktig information?",
      question_type: "fill_blank",
      question_order: 51,
      correct_answer: "hallucinationer",
      explanation: "När AI genererar påhittad eller felaktig information kallas det för hallucinationer.",
      points: 10,
    },
    {
      id: "genai6-q5",
      question_text: "Vilken princip handlar om att AI-system ska vara transparenta?",
      question_type: "single_choice",
      question_order: 52,
      options: {
        choices: ["Explainability", "Scalability", "Tokenization", "Embedding"],
      },
      correct_answer: "Explainability",
      explanation: "Explainability innebär att AI-system ska kunna förklara sina beslut på ett begripligt sätt.",
      points: 10,
    },
    {
      id: "genai6-q6",
      question_text: "AI-modeller tränas ofta på data från internet utan att fråga upphovspersoner.",
      question_type: "true_false",
      question_order: 53,
      options: { choices: ["Sant", "Falskt"] },
      correct_answer: "Sant",
      explanation: "Detta är en pågående juridisk och etisk debatt kring upphovsrätt och AI-träning.",
      points: 5,
    },
    {
      id: "genai6-t1",
      question_text: "Sammanfattning: Etik och ansvar",
      question_type: "textlesson",
      question_order: 54,
      pause_content:
        "AI för med sig stora möjligheter, men även utmaningar. Vi måste arbeta för transparens, rättvisa och ansvarsfull användning av tekniken.",
      points: 0,
    },

    // -----------------------
    // 🚀 LEKTION 7 – FRAMTIDEN FÖR AI
    // -----------------------
    {
      id: "genai7-v1",
      question_text: "Framtiden för Generativ AI",
      question_type: "videolesson",
      question_order: 55,
      video_url: "https://www.youtube.com/embed/SEkGLj0bwAU",
      points: 0,
    },
    {
      id: "genai7-q1",
      question_text: "Vad är AGI (Artificial General Intelligence)?",
      question_type: "single_choice",
      question_order: 56,
      options: {
        choices: [
          "AI som kan göra en specifik uppgift",
          "AI som kan utföra vilken intellektuell uppgift som helst som en människa kan",
          "AI för bildgenerering",
          "AI som är begränsad till text",
        ],
      },
      correct_answer: "AI som kan utföra vilken intellektuell uppgift som helst som en människa kan",
      explanation: "AGI skulle vara en AI med generell intelligens som kan lösa problem i olika domäner utan specialträning.",
      points: 10,
    },
    {
      id: "genai7-q2",
      question_text: "Multimodala modeller kan hantera...",
      question_type: "multiple_choice",
      question_order: 57,
      options: {
        choices: ["Text", "Bild", "Ljud", "Video"],
      },
      correct_answer: ["Text", "Bild", "Ljud", "Video"],
      explanation: "Multimodala modeller som GPT-4V och Gemini kan arbeta med flera typer av data samtidigt.",
      points: 15,
    },
    {
      id: "genai7-q3",
      question_text: "AI-agenter kan utföra uppgifter autonomt åt användaren.",
      question_type: "true_false",
      question_order: 58,
      options: { choices: ["Sant", "Falskt"] },
      correct_answer: "Sant",
      explanation: "AI-agenter är system som kan planera och utföra komplexa uppgifter med minimal mänsklig input.",
      points: 5,
    },
    {
      id: "genai7-q4",
      question_text: "Vilket företag lanserade en multimodal modell som kan se och förstå bilder?",
      question_type: "single_choice",
      question_order: 59,
      options: {
        choices: ["OpenAI", "Meta", "Adobe", "Spotify"],
      },
      correct_answer: "OpenAI",
      explanation: "OpenAI lanserade GPT-4V (Vision) som kan analysera och förstå bilder tillsammans med text.",
      points: 10,
    },
    {
      id: "genai7-q5",
      question_text: "Vad är en 'AI agent'?",
      question_type: "single_choice",
      question_order: 60,
      options: {
        choices: [
          "En person som jobbar med AI",
          "Ett autonomt AI-system som kan planera och utföra uppgifter",
          "En träningsalgoritm",
          "En typ av databas",
        ],
      },
      correct_answer: "Ett autonomt AI-system som kan planera och utföra uppgifter",
      explanation: "AI-agenter kan ta emot ett mål och självständigt planera steg för att uppnå det, som AutoGPT.",
      points: 10,
    },
    {
      id: "genai7-q6",
      question_text: "Vilken trend förväntas växa mest inom AI de kommande åren?",
      question_type: "single_choice",
      question_order: 61,
      options: {
        choices: [
          "Mindre modeller",
          "Multimodala och agentiska system",
          "Endast textbaserad AI",
          "AI utan internet",
        ],
      },
      correct_answer: "Multimodala och agentiska system",
      explanation: "Framtidens AI kommer att kunna hantera flera datatyper och agera mer självständigt.",
      points: 10,
    },
    {
      id: "genai7-q7",
      question_text: "Ordna utvecklingen av AI i kronologisk ordning:",
      question_type: "order_sequence",
      question_order: 62,
      options: {
        wordBank: ["Regelbaserad AI", "Maskininlärning", "Deep Learning", "Generativ AI"],
      },
      correct_answer: ["Regelbaserad AI", "Maskininlärning", "Deep Learning", "Generativ AI"],
      explanation: "AI har utvecklats från enkla regler till avancerad generativ förmåga över tid.",
      points: 15,
    },
    {
      id: "genai7-t1",
      question_text: "Sammanfattning: Framtidens AI",
      question_type: "textlesson",
      question_order: 63,
      pause_content:
        "AI utvecklas snabbt mot multimodala system och autonoma agenter. Framtiden kan innebära AI som inte bara genererar innehåll, utan också utför komplexa uppgifter i verkliga miljöer.",
      points: 0,
    },

    // -----------------------
    // 🎓 LEKTION 8 – SLUTPROV
    // -----------------------
    {
      id: "genai8-t1",
      question_text: "Grattis! Nu testar vi dina kunskaper",
      question_type: "textlesson",
      question_order: 64,
      pause_content:
        "Du har nu gått igenom grunderna i Generativ AI. Dags att testa dina kunskaper i ett slutprov. Lycka till!",
      points: 0,
    },
    {
      id: "genai8-q1",
      question_text: "Vad är den största skillnaden mellan generativ AI och traditionell AI?",
      question_type: "single_choice",
      question_order: 65,
      options: {
        choices: [
          "Generativ AI kan bara klassificera data",
          "Generativ AI skapar nytt innehåll",
          "Traditionell AI är snabbare",
          "Det finns ingen skillnad",
        ],
      },
      correct_answer: "Generativ AI skapar nytt innehåll",
      explanation: "Till skillnad från traditionell AI som klassificerar eller förutsäger, skapar generativ AI nytt material.",
      points: 10,
    },
    {
      id: "genai8-q2",
      question_text: "Vilka är de viktigaste komponenterna i en modern språkmodell?",
      question_type: "multiple_choice",
      question_order: 66,
      options: {
        choices: ["Transformer-arkitektur", "Attention-mekanism", "Tokens", "Bias"],
      },
      correct_answer: ["Transformer-arkitektur", "Attention-mekanism", "Tokens"],
      explanation: "Dessa tre komponenter är grundläggande för hur moderna språkmodeller fungerar.",
      points: 15,
    },
    {
      id: "genai8-q3",
      question_text: "Vilket verktyg är INTE en generativ AI?",
      question_type: "single_choice",
      question_order: 67,
      options: {
        choices: ["ChatGPT", "Excel", "Midjourney", "Suno"],
      },
      correct_answer: "Excel",
      explanation: "Excel är ett kalkylprogram, inte en generativ AI-modell.",
      points: 10,
    },
    {
      id: "genai8-q4",
      question_text: "Vad kallas processen att göra AI mer anpassad till specifika uppgifter?",
      question_type: "fill_blank",
      question_order: 68,
      correct_answer: "fine-tuning",
      explanation: "Fine-tuning anpassar en förtränad modell till specifika användningsområden.",
      points: 10,
    },
    {
      id: "genai8-q5",
      question_text: "Ordna processen för hur en AI skapar text:",
      question_type: "order_sequence",
      question_order: 69,
      options: {
        wordBank: ["Ta emot prompt", "Tokenisera text", "Bearbeta med attention", "Generera output"],
      },
      correct_answer: ["Ta emot prompt", "Tokenisera text", "Bearbeta med attention", "Generera output"],
      explanation: "Detta är det grundläggande flödet för hur en språkmodell genererar text.",
      points: 15,
    },
    {
      id: "genai8-q6",
      question_text: "AI kan skapa både möjligheter och etiska utmaningar.",
      question_type: "true_false",
      question_order: 70,
      options: { choices: ["Sant", "Falskt"] },
      correct_answer: "Sant",
      explanation: "AI erbjuder stora fördelar men kräver ansvarsfull hantering av etiska frågor.",
      points: 5,
    },
    {
      id: "genai8-q7",
      question_text: "Vilka områden kan generativ AI hjälpa till inom?",
      question_type: "multiple_choice",
      question_order: 71,
      options: {
        choices: ["Kreativt arbete", "Kodning", "Utbildning", "Forskning"],
      },
      correct_answer: ["Kreativt arbete", "Kodning", "Utbildning", "Forskning"],
      explanation: "Generativ AI har bred användning inom alla dessa områden och fler.",
      points: 15,
    },
    {
      id: "genai8-q8",
      question_text: "Vad är den största utmaningen med AI-utveckling idag?",
      question_type: "single_choice",
      question_order: 72,
      options: {
        choices: [
          "Hastighet",
          "Etik och ansvarsfull användning",
          "Kostnad",
          "Tillgänglighet",
        ],
      },
      correct_answer: "Etik och ansvarsfull användning",
      explanation: "Även om alla är viktiga, är etiska frågor och ansvarsfull AI-utveckling den största långsiktiga utmaningen.",
      points: 10,
    },
    {
      id: "genai8-q9",
      question_text: "Multimodala modeller kan arbeta med flera typer av data samtidigt.",
      question_type: "true_false",
      question_order: 73,
      options: { choices: ["Sant", "Falskt"] },
      correct_answer: "Sant",
      explanation: "Multimodala modeller som GPT-4V kan hantera text, bilder och mer samtidigt.",
      points: 5,
    },
    {
      id: "genai8-q10",
      question_text: "Vilket påstående om framtidens AI stämmer bäst?",
      question_type: "single_choice",
      question_order: 74,
      options: {
        choices: [
          "AI kommer att ersätta alla jobb",
          "AI kommer att bli ett viktigt verktyg som förstärker mänskliga förmågor",
          "AI-utvecklingen har stannat av",
          "AI kommer bara användas för underhållning",
        ],
      },
      correct_answer: "AI kommer att bli ett viktigt verktyg som förstärker mänskliga förmågor",
      explanation: "Den mest troliga utvecklingen är att AI blir ett komplement som förstärker vad människor kan göra.",
      points: 10,
    },
    {
      id: "genai8-t2",
      question_text: "Kursen är slutförd! 🎉",
      question_type: "textlesson",
      question_order: 75,
      pause_content:
        "Grattis! Du har nu en solid grund i Generativ AI. Fortsätt utforska och experimentera med olika verktyg. AI-revolutionen har bara börjat, och du är nu väl rustad att vara med på resan!",
      points: 0,
    },
  ],
}
];

export default generativquizzes;
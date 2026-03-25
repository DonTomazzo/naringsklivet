export const tekniskAnalysQuiz = [
  {
    id: "diskr1",
    title: "Diskriminering i föreningen",
    slug: "diskriminering-i-foreningen",
    userid: "demo-user",
    image_url: "https://images.unsplash.com/photo-1581091215367-59ab6c0a86f9?w=1920&q=80",
    questions: [
      {
        id: "diskrv1",
        question_text: "Introduktion till diskriminering i bostadsrättsföreningar",
        question_type: "videolesson",
        question_order: 1,
        video_url: "https://www.youtube.com/embed/dummyVideo",
        points: 0,
      },
      {
        id: "diskrq1",
        question_text: "Lisa har nyligen valts in i styrelsen. Under ett möte skämtar en annan ledamot om hennes ålder och antyder att hon 'inte kan ha så mycket erfarenhet än'. Vilken typ av diskriminering kan detta vara?",
        question_type: "single_choice",
        question_order: 2,
        options: {
          choices: [
            "Direkt diskriminering på grund av ålder",
            "Indirekt diskriminering på grund av kön",
            "Trakasserier på grund av religion",
            "Repressalier efter en anmälan",
          ],
        },
        correct_answer: "Direkt diskriminering på grund av ålder",
        explanation:
          "När någon behandlas sämre direkt på grund av sin ålder är det direkt diskriminering enligt diskrimineringslagen. Uttalandet syftar direkt på Lisas ålder och antyder att den påverkar hennes kompetens.",
        points: 10,
      },
      {
        id: "diskrq2",
        question_text: "Under ett styrelsemöte säger ordföranden att 'det vore bättre om vi inte valde kvinnor till vaktmästaruppdraget, det är för tungt arbete'. Vilken typ av diskriminering är detta?",
        question_type: "single_choice",
        question_order: 3,
        options: {
          choices: [
            "Indirekt diskriminering på grund av kön",
            "Direkt diskriminering på grund av kön",
            "Trakasserier",
            "Repressalier",
          ],
        },
        correct_answer: "Direkt diskriminering på grund av kön",
        explanation:
          "Uttalandet utesluter kvinnor på grund av deras kön. Det är en form av direkt diskriminering enligt 1 kap. 4 § diskrimineringslagen, eftersom beslutet grundas på en stereotyp föreställning om kön.",
        points: 10,
      },
      {
        id: "diskrq3",
        question_text: "En medlem i föreningen får inte hyra föreningens samlingslokal eftersom han använder rullstol. Styrelsen menar att 'det blir för krångligt med tillgängligheten'. Vad är detta ett exempel på?",
        question_type: "single_choice",
        question_order: 4,
        options: {
          choices: [
            "Direkt diskriminering på grund av funktionsnedsättning",
            "Indirekt diskriminering på grund av ålder",
            "Saklig bedömning",
            "Trakasserier",
          ],
        },
        correct_answer: "Direkt diskriminering på grund av funktionsnedsättning",
        explanation:
          "Att neka tillgång till en lokal med hänvisning till någons funktionsnedsättning är direkt diskriminering. Föreningen ska istället se till att skälig tillgänglighetsanpassning görs.",
        points: 10,
      },
      {
        id: "diskrt1",
        question_text: "Diskrimineringsgrunderna – introduktion",
        question_type: "textlesson",
        question_order: 5,
        pause_content: "",
        points: 0,
      },
      {
        id: "diskrq4",
        question_text: "Styrelsen har beslutat att endast personer under 40 år får boka gymmet på kvällstid. Vilken form av diskriminering är detta?",
        question_type: "single_choice",
        question_order: 6,
        options: {
          choices: [
            "Indirekt diskriminering på grund av ålder",
            "Direkt diskriminering på grund av ålder",
            "Trakasserier",
            "Ingen diskriminering – det är tillåtet",
          ],
        },
        correct_answer: "Direkt diskriminering på grund av ålder",
        explanation:
          "Beslutet behandlar personer olika utifrån ålder utan saklig motivering, vilket är direkt diskriminering. Ålder är en skyddad diskrimineringsgrund enligt lagen.",
        points: 10,
      },
      {
        id: "diskrq5",
        question_text: "Styrelsen kräver att alla som vill hyra festlokalen ska kunna visa upp ett svenskt personnummer. Detta utesluter vissa EU-medborgare. Vad är detta ett exempel på?",
        question_type: "single_choice",
        question_order: 7,
        options: {
          choices: [
            "Direkt diskriminering på grund av etnisk tillhörighet",
            "Indirekt diskriminering på grund av etnisk tillhörighet",
            "Trakasserier på grund av religion",
            "Sakligt krav enligt GDPR",
          ],
        },
        correct_answer: "Indirekt diskriminering på grund av etnisk tillhörighet",
        explanation:
          "Kravet verkar neutralt, men det missgynnar personer från andra länder. Det är därför indirekt diskriminering på grund av etnisk tillhörighet.",
        points: 10,
      },
      {
        id: "diskrq6",
        question_text: "En ledamot gör upprepade sexuella anspelningar på en annan styrelseledamot under möten. Vad kallas detta enligt lagen?",
        question_type: "single_choice",
        question_order: 8,
        options: {
          choices: [
            "Sexuella trakasserier",
            "Direkt diskriminering",
            "Repressalier",
            "Indirekt diskriminering",
          ],
        },
        correct_answer: "Sexuella trakasserier",
        explanation:
          "Sexuella trakasserier är en särskild form av diskriminering. Det handlar om ett oönskat uppträdande av sexuell natur som kränker någons värdighet.",
        points: 10,
      },
      {
        id: "diskrq7",
        question_text: "Ali, som är muslim, får kommentarer om sin tro vid varje styrelsemöte. 'Du ber väl hela tiden ändå?' säger en ledamot. Vilken diskrimineringsgrund berörs?",
        question_type: "single_choice",
        question_order: 9,
        options: {
          choices: [
            "Religion eller annan trosuppfattning",
            "Etnisk tillhörighet",
            "Sexuell läggning",
            "Könsidentitet",
          ],
        },
        correct_answer: "Religion eller annan trosuppfattning",
        explanation:
          "Uttalandet syftar direkt på Alis religion och är ett exempel på trakasserier kopplade till diskrimineringsgrunden 'religion eller annan trosuppfattning'.",
        points: 10,
      },
      {
        id: "diskrq8",
        question_text: "En medlem påpekar på stämman att det endast sitter män i styrelsen. Efter det blir hon inte längre inbjuden till gemensamma aktiviteter. Vad är detta ett exempel på?",
        question_type: "single_choice",
        question_order: 10,
        options: {
          choices: [
            "Repressalier (vedergällning)",
            "Direkt diskriminering",
            "Indirekt diskriminering",
            "Sexuella trakasserier",
          ],
        },
        correct_answer: "Repressalier (vedergällning)",
        explanation:
          "Att någon missgynnas för att ha påtalat diskriminering eller bristande jämställdhet är förbjudet som repressalier enligt diskrimineringslagen.",
        points: 10,
      },
    ],
  },
];


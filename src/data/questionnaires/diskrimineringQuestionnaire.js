// src/data/questionnaires/diskrimineringQuestionnaire.js
// Questionnaire-frågor för Diskriminering-modulen

export const diskrimineringQuestions = [
  {
    id: "diskrq1",
    question: "Lisa har nyligen valts in i styrelsen. Under ett möte skämtar en annan ledamot om hennes ålder och antyder att hon 'inte kan ha så mycket erfarenhet än'. Vilken typ av diskriminering kan detta vara?",
    type: "multiple_choice",
    options: [
      "Direkt diskriminering på grund av ålder",
      "Indirekt diskriminering på grund av kön",
      "Trakasserier på grund av religion",
      "Repressalier efter en anmälan"
    ],
    correctAnswer: "Direkt diskriminering på grund av ålder",
    explanation: "När någon behandlas sämre direkt på grund av sin ålder är det direkt diskriminering enligt diskrimineringslagen. Uttalandet syftar direkt på Lisas ålder och antyder att den påverkar hennes kompetens.",
    points: 10
  },
  {
    id: "diskrq2",
    question: "Under ett styrelsemöte säger ordföranden att 'det vore bättre om vi inte valde kvinnor till vaktmästaruppdraget, det är för tungt arbete'. Vilken typ av diskriminering är detta?",
    type: "multiple_choice",
    options: [
      "Indirekt diskriminering på grund av kön",
      "Direkt diskriminering på grund av kön",
      "Trakasserier",
      "Repressalier"
    ],
    correctAnswer: "Direkt diskriminering på grund av kön",
    explanation: "Uttalandet utesluter kvinnor på grund av deras kön. Det är en form av direkt diskriminering enligt 1 kap. 4 § diskrimineringslagen, eftersom beslutet grundas på en stereotyp föreställning om kön.",
    points: 10
  },
  {
    id: "diskrq3",
    question: "En medlem i föreningen får inte hyra föreningens samlingslokal eftersom han använder rullstol. Styrelsen menar att 'det blir för krångligt med tillgängligheten'. Vad är detta ett exempel på?",
    type: "multiple_choice",
    options: [
      "Direkt diskriminering på grund av funktionsnedsättning",
      "Indirekt diskriminering på grund av ålder",
      "Saklig bedömning",
      "Trakasserier"
    ],
    correctAnswer: "Direkt diskriminering på grund av funktionsnedsättning",
    explanation: "Att neka tillgång till en lokal med hänvisning till någons funktionsnedsättning är direkt diskriminering. Föreningen ska istället se till att skälig tillgänglighetsanpassning görs.",
    points: 10
  },
  {
    id: "diskrq4",
    question: "Styrelsen har beslutat att endast personer under 40 år får boka gymmet på kvällstid. Vilken form av diskriminering är detta?",
    type: "multiple_choice",
    options: [
      "Indirekt diskriminering på grund av ålder",
      "Direkt diskriminering på grund av ålder",
      "Trakasserier",
      "Ingen diskriminering – det är tillåtet"
    ],
    correctAnswer: "Direkt diskriminering på grund av ålder",
    explanation: "Beslutet behandlar personer olika utifrån ålder utan saklig motivering, vilket är direkt diskriminering. Ålder är en skyddad diskrimineringsgrund enligt lagen.",
    points: 10
  },
  {
    id: "diskrq5",
    question: "Styrelsen kräver att alla som vill hyra festlokalen ska kunna visa upp ett svenskt personnummer. Detta utesluter vissa EU-medborgare. Vad är detta ett exempel på?",
    type: "multiple_choice",
    options: [
      "Direkt diskriminering på grund av etnisk tillhörighet",
      "Indirekt diskriminering på grund av etnisk tillhörighet",
      "Trakasserier på grund av religion",
      "Sakligt krav enligt GDPR"
    ],
    correctAnswer: "Indirekt diskriminering på grund av etnisk tillhörighet",
    explanation: "Kravet verkar neutralt, men det missgynnar personer från andra länder. Det är därför indirekt diskriminering på grund av etnisk tillhörighet.",
    points: 10
  },
  {
    id: "diskrq6",
    question: "En ledamot gör upprepade sexuella anspelningar på en annan styrelseledamot under möten. Vad kallas detta enligt lagen?",
    type: "multiple_choice",
    options: [
      "Sexuella trakasserier",
      "Direkt diskriminering",
      "Repressalier",
      "Indirekt diskriminering"
    ],
    correctAnswer: "Sexuella trakasserier",
    explanation: "Sexuella trakasserier är en särskild form av diskriminering. Det handlar om ett oönskat uppträdande av sexuell natur som kränker någons värdighet.",
    points: 10
  },
  {
    id: "diskrq7",
    question: "Ali, som är muslim, får kommentarer om sin tro vid varje styrelsemöte. 'Du ber väl hela tiden ändå?' säger en ledamot. Vilken diskrimineringsgrund berörs?",
    type: "multiple_choice",
    options: [
      "Religion eller annan trosuppfattning",
      "Etnisk tillhörighet",
      "Sexuell läggning",
      "Könsidentitet"
    ],
    correctAnswer: "Religion eller annan trosuppfattning",
    explanation: "Uttalandet syftar direkt på Alis religion och är ett exempel på trakasserier kopplade till diskrimineringsgrunden 'religion eller annan trosuppfattning'.",
    points: 10
  },
  {
    id: "diskrq8",
    question: "En medlem påpekar på stämman att det endast sitter män i styrelsen. Efter det blir hon inte längre inbjuden till gemensamma aktiviteter. Vad är detta ett exempel på?",
    type: "multiple_choice",
    options: [
      "Repressalier (vedergällning)",
      "Direkt diskriminering",
      "Indirekt diskriminering",
      "Sexuella trakasserier"
    ],
    correctAnswer: "Repressalier (vedergällning)",
    explanation: "Att någon missgynnas för att ha påtalat diskriminering eller bristande jämställdhet är förbjudet som repressalier enligt diskrimineringslagen.",
    points: 10
  }
];

export default diskrimineringQuestions;

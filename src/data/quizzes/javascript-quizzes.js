const javascriptquizzes = [
  // =======================
  // Spanska Läxa - Glosor & Fraser
  // =======================
  {
    id: "spanish1",
    title: "Spanska Läxa - Glosor & Fraser",
    slug: "spanska-laxa",
    userid: "demo-user",
    image_url: "https://images.unsplash.com/photo-1549488349-e5439a3f2349?w=1920&q=80", // En spansk-relaterad bild
    questions: [
      {
        id: "q1",
        question_text: "Vad betyder frågeordet 'cuántos'?",
        question_type: "single_choice",
        question_order: 1,
        options: {
          choices: ["var", "hur många", "när", "vem"],
        },
        correct_answer: "hur många",
        explanation: "'Cuántos' betyder 'hur många'. Det används t.ex. i 'Cuántos años tienes?' (Hur gammal är du?).",
        points: 10,
      },
      {
        id: "q2",
        question_text: "Vilket ord betyder 'varifrån'?",
        question_type: "single_choice",
        question_order: 2,
        options: {
          choices: ["dónde", "cómo", "de dónde", "qué"],
        },
        correct_answer: "de dónde",
        explanation: "'De dónde' betyder 'varifrån', som i 'De dónde eres?' (Var är du ifrån?).",
        points: 10,
      },
      {
        id: "q3",
        question_text: "Fyll i det spanska ordet: 'Jag mår bra' heter 'Estoy ____'.",
        question_type: "fill_blank",
        question_order: 3,
        correct_answer: "bien", // utgår från att 'bra/ok' är 'bien'
        explanation: "Om du mår bra säger du 'Estoy bien'. Om du mår dåligt säger du 'Estoy mal'.",
        points: 10,
      },
      {
        id: "q4",
        question_text: "Hur svarar man på frågan 'Cómo te llamas?' (Vad heter du?)?",
        question_type: "single_choice",
        question_order: 4,
        options: {
          choices: ["Soy de Dalby.", "Tengo 10 años.", "Me llamo...", "Hablo español."],
        },
        correct_answer: "Me llamo...",
        explanation: "På frågan 'Cómo te llamas?' (Vad heter du?) svarar man 'Me llamo...' (Jag heter...).",
        points: 10,
      },
      {
        id: "q5",
        question_text: "Vilka av följande färger är korrekta översättningar?",
        question_type: "multiple_choice",
        question_order: 5,
        options: {
          choices: ["rojo - röd", "azul - grön", "negro - svart", "blanco - blå"],
        },
        correct_answer: ["rojo - röd", "negro - svart"],
        explanation: "Rojo = röd, negro = svart, azul = blå och blanco = vit.",
        points: 15,
      },
      {
        id: "q6",
        question_text: "Vad betyder den spanska frasen 'igualmente'?",
        question_type: "single_choice",
        question_order: 6,
        options: {
          choices: ["trevlig helg", "tack detsamma", "rakt fram", "vad betyder"],
        },
        correct_answer: "tack detsamma",
        explanation: "'Igualmente' används ofta som svar på en önskan och betyder 'tack detsamma'.",
        points: 10,
      },
      {
        id: "q7",
        question_text: "Översätt 'till vänster' till spanska:",
        question_type: "single_choice",
        question_order: 7,
        options: {
          choices: ["todo recto", "a la derecha", "a la izquierda", "dónde"],
        },
        correct_answer: "a la izquierda",
        explanation: "'A la izquierda' betyder 'till vänster'. 'A la derecha' är 'till höger' och 'todo recto' är 'rakt fram'.",
        points: 10,
      },
      {
        id: "q8",
        question_text: "I frasen 'Hablo sueco, inglés y un poco de español', vad betyder 'un poco de español'?",
        question_type: "single_choice",
        question_order: 8,
        options: {
          choices: ["bara spanska", "lite spanska", "mycket spanska", "ingen spanska"],
        },
        correct_answer: "lite spanska",
        explanation: "'Un poco de' betyder 'lite av'. Hela meningen betyder 'Jag talar svenska, engelska och lite spanska'.",
        points: 10,
      },
      {
        id: "q9",
        question_text: "Sant eller falskt: 'Miércoles' är spanska för måndag.",
        question_type: "true_false",
        question_order: 9,
        options: {
          choices: ["Sant", "Falskt"],
        },
        correct_answer: "Falskt",
        explanation: "'Miércoles' är onsdag. Måndag är 'lunes'.",
        points: 5,
      },
      {
        id: "q10",
        question_text: "Vilka spanska veckodagar är helgdagarna?",
        question_type: "multiple_choice",
        question_order: 10,
        options: {
          choices: ["lunes", "sábado", "domingo", "viernes"],
        },
        correct_answer: ["sábado", "domingo"],
        explanation: "Lunes = måndag, sábado = lördag, domingo = söndag, viernes = fredag. Helgen är lördag ('sábado') och söndag ('domingo').",
        points: 15,
      },
      {
        id: "q11",
        question_text: "Räkneord 1 till 5 i rätt ordning:",
        question_type: "order_sequence",
        question_order: 11,
        options: {
          wordBank: ["dos", "uno", "cinco", "tres", "cuatro"],
        },
        correct_answer: ["uno", "dos", "tres", "cuatro", "cinco"],
        explanation: "Räkneorden är: uno (1), dos (2), tres (3), cuatro (4), cinco (5).",
        points: 20,
      },
      {
        id: "q12",
        question_text: "Vad betyder 'Tienes animales'?",
        question_type: "single_choice",
        question_order: 12,
        options: {
          choices: ["Har du tid?", "Hur mår du?", "Har du djur?", "Var bor du?"],
        },
        correct_answer: "Har du djur?",
        explanation: "'Tienes animales' betyder 'Har du djur?'.",
        points: 10,
      },
      {
        id: "q13",
        question_text: "Vilket av följande är en färg?",
        question_type: "multiple_choice",
        question_order: 13,
        options: {
          choices: ["uno", "verde", "lunes", "amarillo"],
        },
        correct_answer: ["verde", "amarillo"],
        explanation: "Verde är grön och amarillo är gul. Uno är siffran 1, lunes är måndag.",
        points: 15,
      },
      {
        id: "q14",
        question_text: "Vad betyder det när man säger 'No, no tengo' som svar på en fråga om att ha något?",
        question_type: "single_choice",
        question_order: 14,
        options: {
          choices: ["Ja, jag har...", "Nej, jag har inte", "Jag vet inte", "Jag förstår inte"],
        },
        correct_answer: "Nej, jag har inte",
        explanation: "'No, no tengo' betyder 'Nej, jag har inte'.",
        points: 10,
      },
      {
        id: "q15",
        question_text: "Vilken siffra är 'diez'?",
        question_type: "single_choice",
        question_order: 15,
        options: {
          choices: ["5", "10", "15", "20"],
        },
        correct_answer: "10",
        explanation: "Diez är siffran 10.",
        points: 10,
      },
      {
        id: "q16",
        question_text: "Fyll i den spanska frasen: 'Trevlig helg' heter '____ fin de semana'.",
        question_type: "fill_blank",
        question_order: 16,
        correct_answer: "buen",
        explanation: "'Trevlig helg' översätts som 'buen fin de semana'.",
        points: 10,
      },
    ],
  },
];

export default javascriptquizzes;
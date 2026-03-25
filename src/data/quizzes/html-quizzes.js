const htmlquizzes = [
  {
    id: "2",
    title: "HTML och CSS Nybörjarkurs",
    slug: "html-nyborjare",
    userid: "demo-user",
    image_url: "/html2.png",
    author: "Moss Mosher", // Ersätt med det faktiska namnet
    logo_url: "/assets/images/din_organisations_logo.png", // Ersätt med den faktiska sökvägen
    questions: [
      {
        id: "v1",
        question_text: "Välkommen till HTML - Introduktion",
        question_type: "videolesson",
        question_order: 1,
        video_url: "https://www.youtube.com/embed/qz0aGYrrlhU?autoplay=1&mute=1",
        points: 0,
      },
      {
        id: "q1",
        question_text: "Vad står HTML för?",
        question_type: "single_choice",
        question_order: 2,
        options: {
          choices: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
          ],
        },
        correct_answer: "Hyper Text Markup Language",
        explanation: "HTML står för HyperText Markup Language och är standardspråket för att skapa webbsidor.",
        points: 10,
      },
      {
        id: "t1",
        question_text: "HTML-element och taggar",
        question_type: "textlesson",
        question_order: 3,
        pause_content:
          "HTML använder 'taggar' för att märka upp innehåll. En tagg består av ett elementnamn omgivet av vinkelparenteser, till exempel <p> för stycke. De flesta element har både en öppningstagg och en stängningstagg, som <p>...</p>. Vissa element är självstängande, som <img> och <br>.",
        points: 0,
      },
      {
        id: "q2",
        question_text: "Vilka av följande är korrekta HTML-element?",
        question_type: "multiple_choice",
        question_order: 4,
        options: {
          choices: ["<p>", "<div>", "<span>", "<paragraph>", "<section>"],
        },
        correct_answer: ["<p>", "<div>", "<span>", "<section>"],
        explanation: "Alla dessa utom <paragraph> är giltiga HTML-element. HTML använder förkortningar som <p> för paragraph.",
        points: 15,
      },
      {
        id: "q3",
        question_text: "HTML-element måste alltid ha en stängningstagg",
        question_type: "true_false",
        question_order: 5,
        options: {
          choices: ["Sant", "Falskt"],
        },
        correct_answer: "Falskt",
        explanation: "Vissa element som <img>, <br> och <input> är självstängande och behöver inte en separat stängningstagg.",
        points: 5,
      },
      {
        id: "v2",
        question_text: "HTML Dokumentstruktur",
        question_type: "videolesson",
        question_order: 6,
        video_url: "https://www.youtube.com/embed/PlxWf493en4",
        points: 0,
      },
      {
        id: "q4",
        question_text: "Hur många huvud-sektioner har ett HTML-dokument?",
        question_type: "fill_blank",
        question_order: 7,
        correct_answer: "2",
        explanation: "Ett HTML-dokument har två huvudsektioner: <head> för metadata och <body> för synligt innehåll.",
        points: 10,
      },
      {
        id: "t2",
        question_text: "Strukturen i ett HTML-dokument",
        question_type: "textlesson",
        question_order: 8,
        pause_content:
          "Varje HTML-dokument börjar med <!DOCTYPE html> som talar om för webbläsaren att det är HTML5. Sedan kommer <html>-elementet som omsluter allt innehåll. Inuti finns <head> med metadata (titel, stilar, scripts) och <body> med det synliga innehållet. Ordningen är viktig!",
        points: 0,
      },
      {
        id: "q5",
        question_text: "Ordna HTML-strukturen i rätt ordning från början",
        question_type: "order_sequence",
        question_order: 9,
        options: {
          wordBank: ["<!DOCTYPE html>", "<html>", "<head>", "<body>"],
        },
        correct_answer: ["<!DOCTYPE html>", "<html>", "<head>", "<body>"],
        explanation:
          "Rätt ordning är: DOCTYPE-deklaration först, sedan html-element, därefter head för metadata och sist body för innehåll.",
        points: 20,
      },
      {
        id: "q6",
        question_text: "Vilket element används för den största rubriken?",
        question_type: "single_choice",
        question_order: 10,
        options: {
          choices: ["<h1>", "<h6>", "<header>", "<heading>"],
        },
        correct_answer: "<h1>",
        explanation: "<h1> är den största rubriknivån i HTML. Rubriker går från <h1> (störst) till <h6> (minst).",
        points: 10,
      },
      {
        id: "q7",
        question_text: "HTML är ett programmeringsspråk",
        question_type: "true_false",
        question_order: 11,
        options: {
          choices: ["Sant", "Falskt"],
        },
        correct_answer: "Falskt",
        explanation:
          "HTML är ett märkspråk (markup language), inte ett programmeringsspråk. Det beskriver struktur och innehåll, men har ingen logik eller beräkningar.",
        points: 5,
      },
      {
        id: "q8",
        question_text: "Vilka attribut är viktiga för <img>-taggen?",
        question_type: "multiple_choice",
        question_order: 12,
        options: {
          choices: ["src", "alt", "href", "width", "title"],
        },
        correct_answer: ["src", "alt"],
        explanation: "src (källa) och alt (alternativ text) är de viktigaste attributen för bilder. Alt är viktigt för tillgänglighet.",
        points: 15,
      },
    ],
  },
  // Lägg till fler HTML-quiz här om du vill, t.ex.:
  {
    id: "3",
    title: "Avancerad HTML",
    slug: "html-avancerad",
    userid: "demo-user",
    image_url: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1920&q=80",
    questions: [
      {
        id: "adv-q1",
        question_text: "Vad är syftet med semantiska element?",
        question_type: "single_choice",
        question_order: 1,
        options: {
          choices: ["Styling", "Struktur och betydelse", "Animationer", "Skript"],
        },
        correct_answer: "Struktur och betydelse",
        explanation: "Semantiska element som <header>, <footer> och <article> ger struktur och betydelse till webbsidor.",
        points: 10,
      },
      // Fler frågor...
    ],
  },
];

export default htmlquizzes;
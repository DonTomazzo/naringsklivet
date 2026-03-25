const cssquizzes = [
  // =======================
  // CSS Nybörjarkurs
  // =======================
  {
    id: "10",
    title: "CSS Nybörjarkurs",
    slug: "css-nyborjare",
    userid: "demo-user",
    image_url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80",
    questions: [
      {
        id: "v1",
        question_text: "Välkommen till CSS – Introduktion",
        question_type: "videolesson",
        question_order: 1,
        video_url: "https://www.youtube.com/embed/yfoY53QXEnI",
        points: 0,
      },
      {
        id: "q1",
        question_text: "Vad står CSS för?",
        question_type: "single_choice",
        question_order: 2,
        options: {
          choices: [
            "Cascading Style Sheets",
            "Computer Styled Sections",
            "Creative Style System",
            "Colorful Styling Syntax",
          ],
        },
        correct_answer: "Cascading Style Sheets",
        explanation: "CSS står för Cascading Style Sheets och används för att styla HTML-element.",
        points: 10,
      },
      {
        id: "t1",
        question_text: "Vad är CSS?",
        question_type: "textlesson",
        question_order: 3,
        pause_content:
          "CSS beskriver hur HTML-element ska visas. Det kan användas för att ändra färg, typsnitt, layout och mycket mer. Du kan lägga till CSS direkt i HTML med style-attribut, i <style>-taggar i <head> eller i en extern .css-fil.",
        points: 0,
      },
      {
        id: "q2",
        question_text: "Vilket av följande är ett korrekt sätt att länka en extern CSS-fil?",
        question_type: "single_choice",
        question_order: 4,
        options: {
          choices: [
            "<link rel='stylesheet' href='style.css'>",
            "<style src='style.css'>",
            "<css link='style.css'>",
            "<script href='style.css'>",
          ],
        },
        correct_answer: "<link rel='stylesheet' href='style.css'>",
        explanation: "Du länkar externa CSS-filer med <link rel='stylesheet' href='...'> i <head>-sektionen.",
        points: 15,
      },
      {
        id: "q3",
        question_text: "Vilken CSS-egenskap ändrar textfärgen?",
        question_type: "single_choice",
        question_order: 5,
        options: {
          choices: ["text-color", "font-color", "color", "text-style"],
        },
        correct_answer: "color",
        explanation: "Egenskapen 'color' används för att ange textfärg, t.ex. color: red;",
        points: 10,
      },
      {
        id: "v2",
        question_text: "Grundläggande selektorer",
        question_type: "videolesson",
        question_order: 6,
        video_url: "https://www.youtube.com/embed/1Rs2ND1ryYc",
        points: 0,
      },
      {
        id: "t2",
        question_text: "CSS-selektorer",
        question_type: "textlesson",
        question_order: 7,
        pause_content:
          "Selektorer i CSS används för att välja HTML-element som ska stylas. Exempel: 'p' för alla <p>-taggar, '.class' för element med en klass, och '#id' för ett element med ett visst id.",
        points: 0,
      },
      {
        id: "q4",
        question_text: "Vilken selektor används för att välja ett element med id='header'?",
        question_type: "fill_blank",
        question_order: 8,
        correct_answer: "#header",
        explanation: "Tecknet # används för att referera till ett id i CSS, t.ex. #header { color: blue; }",
        points: 10,
      },
      {
        id: "q5",
        question_text: "Vilken ordning är korrekt för CSS-regelns struktur?",
        question_type: "order_sequence",
        question_order: 9,
        options: {
          wordBank: ["selektor", "deklarationsblock", "egenskap", "värde"],
        },
        correct_answer: ["selektor", "deklarationsblock", "egenskap", "värde"],
        explanation:
          "En CSS-regel börjar med en selektor, sedan ett deklarationsblock inom klamrar som innehåller egenskaper och värden.",
        points: 20,
      },
      {
        id: "q6",
        question_text: "CSS kan läggas till på tre sätt: inline, intern och extern.",
        question_type: "true_false",
        question_order: 10,
        options: {
          choices: ["Sant", "Falskt"],
        },
        correct_answer: "Sant",
        explanation: "Det finns tre huvudsätt: inline (style-attribut), intern (i <style>) och extern (egen .css-fil).",
        points: 5,
      },
    ],
  },

  // =======================
  // CSS Medelnivå
  // =======================
  {
    id: "11",
    title: "CSS Medelnivå",
    slug: "css-medelniva",
    userid: "demo-user",
    image_url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80",
    questions: [
      {
        id: "v1",
        question_text: "Introduktion till boxmodellen",
        question_type: "videolesson",
        question_order: 1,
        video_url: "https://www.youtube.com/embed/rIO5326FgPE",
        points: 0,
      },
      {
        id: "t1",
        question_text: "Boxmodellen i CSS",
        question_type: "textlesson",
        question_order: 2,
        pause_content:
          "Varje HTML-element ses som en box i CSS. Boxmodellen består av content, padding, border och margin. Det är viktigt att förstå dessa delar för att hantera layout.",
        points: 0,
      },
      {
        id: "q1",
        question_text: "Vilken del av boxmodellen ligger utanför 'border'?",
        question_type: "single_choice",
        question_order: 3,
        options: {
          choices: ["Padding", "Margin", "Content", "Outline"],
        },
        correct_answer: "Margin",
        explanation: "Margin ligger utanför border och skapar utrymme mellan element.",
        points: 10,
      },
      {
        id: "q2",
        question_text: "Vilken CSS-egenskap används för att ändra bakgrundsfärg?",
        question_type: "single_choice",
        question_order: 4,
        options: {
          choices: ["background-style", "bgcolor", "background-color", "fill-color"],
        },
        correct_answer: "background-color",
        explanation: "Egenskapen background-color används för att ange bakgrundsfärg.",
        points: 10,
      },
      {
        id: "v2",
        question_text: "Positionering och display",
        question_type: "videolesson",
        question_order: 5,
        video_url: "https://www.youtube.com/embed/jx5jmI0UlXU",
        points: 0,
      },
      {
        id: "q3",
        question_text: "Vilka positioneringsvärden finns i CSS?",
        question_type: "multiple_choice",
        question_order: 6,
        options: {
          choices: ["static", "relative", "absolute", "fixed", "floating"],
        },
        correct_answer: ["static", "relative", "absolute", "fixed"],
        explanation: "De fyra huvudsakliga positionstyperna i CSS är static, relative, absolute och fixed.",
        points: 15,
      },
      {
        id: "t2",
        question_text: "Display-egenskapen",
        question_type: "textlesson",
        question_order: 7,
        pause_content:
          "Display bestämmer hur ett element visas. De vanligaste värdena är block, inline och inline-block. Flex och grid används för avancerade layouter.",
        points: 0,
      },
      {
        id: "q4",
        question_text: "Vilket värde på display gör ett element till ett block-element?",
        question_type: "fill_blank",
        question_order: 8,
        correct_answer: "block",
        explanation: "Display: block gör att elementet tar upp hela raden och börjar på en ny rad.",
        points: 10,
      },
      {
        id: "q5",
        question_text: "CSS-specifikitet påverkar vilken stil som gäller när flera regler matchar samma element.",
        question_type: "true_false",
        question_order: 9,
        options: {
          choices: ["Sant", "Falskt"],
        },
        correct_answer: "Sant",
        explanation:
          "Specifikitet avgör vilka regler som har högst prioritet. Inline-stilar väger tyngst, sedan id, klass och sist element.",
        points: 10,
      },
    ],
  },

  // =======================
  // CSS Avancerad
  // =======================
  {
    id: "12",
    title: "Avancerad CSS",
    slug: "css-avancerad",
    userid: "demo-user",
    image_url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80",
    questions: [
      {
        id: "v1",
        question_text: "Flexbox – Introduktion",
        question_type: "videolesson",
        question_order: 1,
        video_url: "https://www.youtube.com/embed/fYq5PXgSsbE",
        points: 0,
      },
      {
        id: "t1",
        question_text: "Flexbox-grunder",
        question_type: "textlesson",
        question_order: 2,
        pause_content:
          "Flexbox används för att skapa flexibla och responsiva layouter. Det bygger på en container (display: flex) som styr hur barn-element placeras, riktas och justeras.",
        points: 0,
      },
      {
        id: "q1",
        question_text: "Vilken CSS-egenskap aktiverar flexbox?",
        question_type: "single_choice",
        question_order: 3,
        options: {
          choices: ["flex-flow", "display: flex", "align-items", "justify-content"],
        },
        correct_answer: "display: flex",
        explanation: "För att använda flexbox måste du sätta display: flex på containern.",
        points: 10,
      },
      {
        id: "q2",
        question_text: "Vilken egenskap används för att styra horisontell placering i flexbox?",
        question_type: "single_choice",
        question_order: 4,
        options: {
          choices: ["align-items", "justify-content", "flex-direction", "align-content"],
        },
        correct_answer: "justify-content",
        explanation: "justify-content styr horisontell placering, medan align-items styr vertikal placering.",
        points: 10,
      },
      {
        id: "v2",
        question_text: "CSS Grid – Introduktion",
        question_type: "videolesson",
        question_order: 5,
        video_url: "https://www.youtube.com/embed/EFafSYg-PkI",
        points: 0,
      },
      {
        id: "t2",
        question_text: "Responsiv design med media queries",
        question_type: "textlesson",
        question_order: 6,
        pause_content:
          "Media queries används för att ändra layout beroende på skärmstorlek. Exempel: @media (max-width: 768px) { ... } används för surfplattor och mobiler.",
        points: 0,
      },
      {
        id: "q3",
        question_text: "Vilket exempel visar korrekt syntax för en media query?",
        question_type: "fill_blank",
        question_order: 7,
        correct_answer: "@media (max-width: 600px)",
        explanation: "Korrekt syntax är: @media (max-width: 600px) { ... }",
        points: 10,
      },
      {
        id: "q4",
        question_text: "Vilka CSS-tekniker används ofta i modern responsiv design?",
        question_type: "multiple_choice",
        question_order: 8,
        options: {
          choices: ["Flexbox", "Grid", "Tables", "Media Queries"],
        },
        correct_answer: ["Flexbox", "Grid", "Media Queries"],
        explanation:
          "Flexbox, Grid och Media Queries är centrala verktyg för att skapa moderna, responsiva webblayouter.",
        points: 15,
      },
      {
        id: "q5",
        question_text: "CSS-animeringar kan endast göras med JavaScript.",
        question_type: "true_false",
        question_order: 9,
        options: {
          choices: ["Sant", "Falskt"],
        },
        correct_answer: "Falskt",
        explanation:
          "CSS kan skapa animeringar med @keyframes och egenskaper som animation-name, duration och timing-function – utan JavaScript.",
        points: 10,
      },
    ],
  },
];

export default cssquizzes;
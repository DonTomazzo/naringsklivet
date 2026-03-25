import htmlQuizzes from "./html-quizzes";
import javascriptQuizzes from "./javascript-quizzes";
import cssQuizzes from "./css-quizzes"; 
import csharpQuizzes from "./csharp-quizzes"; 
import azureQuizzes from "./azure-quizzes"; 
import aiQuizzes from "./diskriminering-quizzes"; // Innehåller troligen AI-relaterat quiz, men behåller namnet
import generativquizzes from "./generativ-quizzes"; 
import aiterms from "./aiterms";


// ==================================
// Importera TED Talk Dummy Data
// ==================================
import ted_ai_tech from "./ted_ai_tech";
import ted_business_hr from "./ted_business_hr";
import ted_health_science from "./ted_health_science";
import ted_society_culture from "./ted_society_culture";
// ==================================


const allQuizzes = [
 
  ...generativquizzes,
  ...aiterms,
  ...htmlQuizzes,
  ...javascriptQuizzes,
  ...cssQuizzes,
  ...aiQuizzes,
  ...csharpQuizzes,
  ...azureQuizzes, 
  
  // ==================================
  // Lägg till de nya TED Talks här
  // ==================================
  ...ted_ai_tech,
  ...ted_business_hr,
  ...ted_health_science,
  ...ted_society_culture,
];

export default allQuizzes;
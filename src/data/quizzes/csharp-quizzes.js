const csharpquizzes = [
  // =======================
  // C# Nybörjarkurs
  // =======================
  {
    id: "csharp1",
    title: "C# Nybörjarkurs",
    slug: "csharp-nyborjare",
    userid: "demo-user",
    image_url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80",
    questions: [
      {
        id: "v1",
        question_text: "Välkommen till C# - Introduktion",
        question_type: "videolesson",
        question_order: 1,
        video_url: "https://www.youtube.com/embed/2mS3m3Qjz0E",
        points: 0,
      },
      {
        id: "q1",
        question_text: "Vilket av följande är korrekt sätt att deklarera en variabel i C#?",
        question_type: "single_choice",
        question_order: 2,
        options: {
          choices: [
            "int number = 5;",
            "number := 5;",
            "let number = 5;",
            "var number => 5;",
          ],
        },
        correct_answer: "int number = 5;",
        explanation:
          "I C# deklarerar du en heltalsvariabel med t.ex. `int number = 5;`. Du kan också använda `var number = 5;` men inte de andra alternativen.",
        points: 10,
      },
      {
        id: "t1",
        question_text: "Grundläggande datatyper i C#",
        question_type: "textlesson",
        question_order: 3,
        pause_content:
          "Vanliga primitiva datatyper i C# är `int`, `double`, `float`, `bool`, `char` och `string`. `int` används för heltal, `double` för flyttal med dubbel precision och `bool` för sanna/falska värden.",
        points: 0,
      },
      {
        id: "q2",
        question_text: "Vilket uttryck skriver ut texten \"Hej världen\" till konsolen?",
        question_type: "fill_blank",
        question_order: 4,
        correct_answer: "Console.WriteLine(\"Hej världen\");",
        explanation:
          "I C# skriver du till konsolen med `Console.WriteLine(...)`. Kom ihåg semikolon i slutet.",
        points: 10,
      },
      {
        id: "q3",
        question_text: "Vad är resultatet av följande uttryck? 5 + 3 * 2",
        question_type: "single_choice",
        question_order: 5,
        options: {
          choices: ["16", "11", "13", "10"],
        },
        correct_answer: "11",
        explanation: "Multiplikation har högre prioritet än addition, så 3*2=6, 5+6=11.",
        points: 10,
      },
      {
        id: "q4",
        question_text: "If-satsens struktur i C#",
        question_type: "order_sequence",
        question_order: 6,
        options: {
          wordBank: [
            "if",
            "(",
            "villkor",
            ")",
            "{",
            "kodblock",
            "}",
            "else",
            "{",
            "annatKodblock",
            "}",
          ],
        },
        correct_answer: [
          "if",
          "(",
          "villkor",
          ")",
          "{",
          "kodblock",
          "}",
          "else",
          "{",
          "annatKodblock",
          "}",
        ],
        explanation:
          "En if-else-sats skrivs `if (villkor) { kodblock } else { annatKodblock }` i C#.",
        points: 20,
      },
      {
        id: "v2",
        question_text: "Variabler, typer och konvertering",
        question_type: "videolesson",
        question_order: 7,
        video_url: "https://www.youtube.com/embed/3IS3pQj2a9g",
        points: 0,
      },
      {
        id: "q5",
        question_text: "Vilken datatype passar bäst för sant/falskt värden?",
        question_type: "single_choice",
        question_order: 8,
        options: {
          choices: ["bool", "int", "string", "char"],
        },
        correct_answer: "bool",
        explanation: "`bool` (boolean) används för `true` / `false`-värden i C#.",
        points: 10,
      },
      {
        id: "q6",
        question_text: "Vilket av följande är en giltig for-loop i C#?",
        question_type: "multiple_choice",
        question_order: 9,
        options: {
          choices: [
            "for (int i = 0; i < 5; i++) { }",
            "for i in range(5):",
            "for (i = 0; i < 5; i++) { }",
            "foreach (var item in collection) { }",
          ],
        },
        correct_answer: [
          "for (int i = 0; i < 5; i++) { }",
          "foreach (var item in collection) { }",
        ],
        explanation:
          "`for (int i = 0; i < 5; i++) { }` och `foreach` är giltiga C#-slingor. `for i in range(5):` är Python-syntax.",
        points: 15,
      },
      {
        id: "t2",
        question_text: "Metoder i C#",
        question_type: "textlesson",
        question_order: 10,
        pause_content:
          "Metoder (functions) i C# deklareras ofta med en returtyp, namn och parameterlista. Exempel: `public int Add(int a, int b) { return a + b; }`. `void` används när inget returneras.",
        points: 0,
      },
      {
        id: "q7",
        question_text: "Fyll i ordningen — hur skapar man en metod som returnerar int och heter Sum:",
        question_type: "order_sequence",
        question_order: 11,
        options: {
          wordBank: ["public", "int", "Sum", "(", "int a", ",", "int b", ")", "{", "return a + b;", "}"],
        },
        correct_answer: [
          "public",
          "int",
          "Sum",
          "(",
          "int a",
          ",",
          "int b",
          ")",
          "{",
          "return a + b;",
          "}",
        ],
        explanation: "En metod definieras `public int Sum(int a, int b) { return a + b; }`.",
        points: 20,
      },
      {
        id: "q8",
        question_text: "Vilket nyckelord används för att deklarera en variabel utan att ange typ (kompilatorn bestämmer typen)?",
        question_type: "single_choice",
        question_order: 12,
        options: {
          choices: ["var", "let", "auto", "dynamic"],
        },
        correct_answer: "var",
        explanation: "`var x = 5;` låter kompilatorn inferera typen. `dynamic` finns också men fungerar annorlunda under runtime.",
        points: 10,
      },
      {
        id: "q9",
        question_text: "Sant eller falskt: C# är statiskt typat.",
        question_type: "true_false",
        question_order: 13,
        options: {
          choices: ["Sant", "Falskt"],
        },
        correct_answer: "Sant",
        explanation: "C# är statiskt typat — typer bestäms vid kompilering (om inte `dynamic` används).",
        points: 5,
      },
      {
        id: "v3",
        question_text: "Grundläggande objektorientering i C#",
        question_type: "videolesson",
        question_order: 14,
        video_url: "https://www.youtube.com/embed/EdQy0bG4zI0",
        points: 0,
      },
      {
        id: "q10",
        question_text: "Vilken syntax skapar en ny instans av en klass Person?",
        question_type: "single_choice",
        question_order: 15,
        options: {
          choices: [
            "Person p = new Person();",
            "Person p = Person();",
            "new Person p = Person();",
            "Person p := new Person();",
          ],
        },
        correct_answer: "Person p = new Person();",
        explanation: "I C# skapar du objekt med `new` operatorn: `Person p = new Person();`.",
        points: 10,
      },
      {
        id: "q11",
        question_text: "Vilket av följande är rätt om strängkonkatenering i C#?",
        question_type: "multiple_choice",
        question_order: 16,
        options: {
          choices: ["\"Hej\" + \"Världen\"", "string.Format(\"{0} {1}\", a, b)", "$\"{a} {b}\"", "concat(\"Hej\",\"Världen\")"],
        },
        correct_answer: ["\"Hej\" + \"Världen\"", "string.Format(\"{0} {1}\", a, b)", "$\"{a} {b}\""],
        explanation:
          "Du kan konkatenera med +, använda string.Format eller interpolering ($\"...\"). concat(...) är inte en C# global funktion.",
        points: 15,
      }
    ],
  },

  // =======================
  // C# Medelnivå
  // =======================
  {
    id: "csharp2",
    title: "C# Medelnivå",
    slug: "csharp-medelniva",
    userid: "demo-user",
    image_url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80",
    questions: [
      {
        id: "v1",
        question_text: "Samlingar och Lists i C#",
        question_type: "videolesson",
        question_order: 1,
        video_url: "https://www.youtube.com/embed/6AvmHqg0jWk",
        points: 0,
      },
      {
        id: "t1",
        question_text: "Array vs List",
        question_type: "textlesson",
        question_order: 2,
        pause_content:
          "En `array` har fast storlek efter skapande medan `List<T>` (från System.Collections.Generic) är dynamisk och tillåter tillägg och borttag.",
        points: 0,
      },
      {
        id: "q1",
        question_text: "Vilken deklaration skapar en lista av int?",
        question_type: "single_choice",
        question_order: 3,
        options: {
          choices: ["List<int> nums = new List<int>();", "int[] nums = new List<int>();", "var nums = [];","List nums = new List<int>();"],
        },
        correct_answer: "List<int> nums = new List<int>();",
        explanation: "Rätt generisk List-deklaration är `List<int> nums = new List<int>();`.",
        points: 10,
      },
      {
        id: "q2",
        question_text: "Vilket metodanrop lägger till ett element till en lista?",
        question_type: "single_choice",
        question_order: 4,
        options: {
          choices: ["nums.Add(5);", "nums.Push(5);", "nums.InsertEnd(5);", "nums.Append(5);"],
        },
        correct_answer: "nums.Add(5);",
        explanation: "I `List<T>` används `Add` för att lägga till ett element i slutet.",
        points: 10,
      },
      {
        id: "q3",
        question_text: "Vilken uppsättning accessmodifierare finns vanligen i C#?",
        question_type: "multiple_choice",
        question_order: 5,
        options: {
          choices: ["public", "private", "protected", "static"],
        },
        correct_answer: ["public", "private", "protected"],
        explanation:
          "`static` är inte en accessmodifierare (det är en medlemsmodifierare). `public`, `private` och `protected` styr åtkomst.",
        points: 15,
      },
      {
        id: "v2",
        question_text: "Konstruktörer och överlagring",
        question_type: "videolesson",
        question_order: 6,
        video_url: "https://www.youtube.com/embed/4W1fC1uO0f4",
        points: 0,
      },
      {
        id: "q4",
        question_text: "Fyll i ordningen för en klassdefinition (minimalt):",
        question_type: "order_sequence",
        question_order: 7,
        options: {
          wordBank: ["accessmodifierare", "class", "Namn", "{", "fält", "konstruktor", "metoder", "}"],
        },
        correct_answer: ["accessmodifierare", "class", "Namn", "{", "fält", "konstruktor", "metoder", "}"],
        explanation:
          "En enkel klass börjar `public class Namn { fält konstruktor metoder }`.",
        points: 20,
      },
      {
        id: "q5",
        question_text: "Vad är arv i C#?",
        question_type: "single_choice",
        question_order: 8,
        options: {
          choices: [
            "Att en klass ärver fält och metoder från en annan klass",
            "Att två klasser delar samma namn",
            "Att skapa generiska typer",
            "Att kompilera flera filer i ett projekt",
          ],
        },
        correct_answer: "Att en klass ärver fält och metoder från en annan klass",
        explanation: "Arv låter en klass (subklass) ärva från en basklass och återanvända eller ändra funktionalitet.",
        points: 10,
      },
      {
        id: "t2",
        question_text: "Exception handling",
        question_type: "textlesson",
        question_order: 9,
        pause_content:
          "Felhantering sker med `try { } catch (Exception ex) { } finally { }`. Du bör fånga specifika undantagstyper i stället för generella `Exception` när det är möjligt.",
        points: 0,
      },
      {
        id: "q6",
        question_text: "Vilken blockstruktur används för att fånga undantag?",
        question_type: "single_choice",
        question_order: 10,
        options: {
          choices: ["try / catch", "if / else", "begin / rescue", "attempt / except"],
        },
        correct_answer: "try / catch",
        explanation: "C# använder `try { } catch { }` för att fånga undantag.",
        points: 10,
      },
      {
        id: "q7",
        question_text: "Vilken metod tillhör List<T> för att ta bort ett element med index?",
        question_type: "single_choice",
        question_order: 11,
        options: {
          choices: ["RemoveAt(index)", "Remove(index)", "Delete(index)", "Pop(index)"],
        },
        correct_answer: "RemoveAt(index)",
        explanation: "`RemoveAt` tar bort elementet på den angivna positionen. `Remove` tar bort ett element med ett visst värde.",
        points: 10,
      },
      {
        id: "v3",
        question_text: "Properties och encapsulation",
        question_type: "videolesson",
        question_order: 12,
        video_url: "https://www.youtube.com/embed/7U5Nf9Y1g0o",
        points: 0,
      },
      {
        id: "q8",
        question_text: "Vilken syntax är korrekt för en automatisk property?",
        question_type: "fill_blank",
        question_order: 13,
        correct_answer: "public int Age { get; set; }",
        explanation: "Automatiska properties definieras t.ex. `public int Age { get; set; }`.",
        points: 10,
      },
      {
        id: "q9",
        question_text: "Sant eller falskt: `protected` betyder att endast samma klass kan komma åt medlemmen.",
        question_type: "true_false",
        question_order: 14,
        options: {
          choices: ["Sant", "Falskt"],
        },
        correct_answer: "Falskt",
        explanation: "`protected` betyder att samma klass och subklasser (ärvande klasser) kan komma åt medlemmen.",
        points: 5,
      },
      {
        id: "q10",
        question_text: "Vilken metod används för att konvertera en sträng till ett heltal (int) säkert?",
        question_type: "single_choice",
        question_order: 15,
        options: {
          choices: ["int.TryParse(str, out value)", "int.Parse(str)", "Convert.ToInt32(str)", "Number.Parse(str)"],
        },
        correct_answer: "int.TryParse(str, out value)",
        explanation:
          "`int.TryParse` försöker pars:a och returnerar false om det misslyckas utan att kasta undantag — bra för säker konvertering.",
        points: 15,
      },
      {
        id: "q11",
        question_text: "Fyll i rätt ordning: skapa en lista, lägg till två värden och iterera med foreach:",
        question_type: "order_sequence",
        question_order: 16,
        options: {
          wordBank: [
            "List<int> nums = new List<int>();",
            "nums.Add(1);",
            "nums.Add(2);",
            "foreach (var n in nums) { Console.WriteLine(n); }",
          ],
        },
        correct_answer: [
          "List<int> nums = new List<int>();",
          "nums.Add(1);",
          "nums.Add(2);",
          "foreach (var n in nums) { Console.WriteLine(n); }",
        ],
        explanation: "Först skapa listan, sedan lägga till elementen och därefter iterera med foreach.",
        points: 20,
      }
    ],
  },

  // =======================
  // C# Avancerad
  // =======================
  {
    id: "csharp3",
    title: "C# Avancerad",
    slug: "csharp-avancerad",
    userid: "demo-user",
    image_url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80",
    questions: [
      {
        id: "v1",
        question_text: "LINQ — Introduktion",
        question_type: "videolesson",
        question_order: 1,
        video_url: "https://www.youtube.com/embed/2PLiXrj7k78",
        points: 0,
      },
      {
        id: "t1",
        question_text: "Vad är LINQ?",
        question_type: "textlesson",
        question_order: 2,
        pause_content:
          "LINQ (Language Integrated Query) gör det möjligt att köra frågor mot arrays, listor och datakällor med en SQL-liknande syntax eller metoder. Exempel: `var q = nums.Where(n => n > 5).Select(n => n * 2);`",
        points: 0,
      },
      {
        id: "q1",
        question_text: "Vilken metod används för att filtrera en lista med LINQ-lambdas?",
        question_type: "single_choice",
        question_order: 3,
        options: {
          choices: ["Where", "Select", "OrderBy", "GroupBy"],
        },
        correct_answer: "Where",
        explanation: "`Where` används för att filtrera element som matchar ett predikat.",
        points: 10,
      },
      {
        id: "q2",
        question_text: "Vilket uttryck skapar en asynkron metod i C#?",
        question_type: "single_choice",
        question_order: 4,
        options: {
          choices: ["async Task MyMethod()", "await MyMethod()", "Task async MyMethod()", "thread MyMethod()"],
        },
        correct_answer: "async Task MyMethod()",
        explanation: "En asynkron metod deklareras `async Task` eller `async Task<T>` (eller `async void` i speciella fall).",
        points: 10,
      },
      {
        id: "v2",
        question_text: "Async / await — bra praxis",
        question_type: "videolesson",
        question_order: 5,
        video_url: "https://www.youtube.com/embed/Dy5gjqJ8b4I",
        points: 0,
      },
      {
        id: "q3",
        question_text: "Vilken syntax väntar på ett Task i en async-metod?",
        question_type: "fill_blank",
        question_order: 6,
        correct_answer: "await someTask;",
        explanation: "I en `async`-metod använder du `await` för att asynkront vänta på att ett `Task` avslutas.",
        points: 10,
      },
      {
        id: "t2",
        question_text: "Delegates och Events",
        question_type: "textlesson",
        question_order: 7,
        pause_content:
          "Delegates är typsäkra pekare till metoder. Events kombinerar delegates med ett publicer-prenumerantmönster för att låta objekt notifiera andra om förändringar.",
        points: 0,
      },
      {
        id: "q4",
        question_text: "Vilket är korrekt sätt att deklarera en delegate som returnerar void och tar en string?",
        question_type: "single_choice",
        question_order: 8,
        options: {
          choices: ["public delegate void MyDel(string s);", "public delegate string MyDel(string s);", "delegate MyDel(string s);", "public MyDel delegate(string s);"],
        },
        correct_answer: "public delegate void MyDel(string s);",
        explanation: "Delegates deklareras med `delegate` följt av returtyp och signatur.",
        points: 10,
      },
      {
        id: "q5",
        question_text: "Vilken av följande är exempel på ett interface i C#?",
        question_type: "multiple_choice",
        question_order: 9,
        options: {
          choices: [
            "public interface ILogger { void Log(string msg); }",
            "public class ILogger { void Log(string msg) {} }",
            "interface IData { int Get(); }",
            "public interface IRun => void Run();",
          ],
        },
        correct_answer: [
          "public interface ILogger { void Log(string msg); }",
          "interface IData { int Get(); }",
        ],
        explanation:
          "Interfaces definieras med `interface` och innehåller metodsignaturer utan implementation. `public interface IRun => void Run();` är felaktig syntax.",
        points: 15,
      },
      {
        id: "v3",
        question_text: "Designmönster — kort översikt",
        question_type: "videolesson",
        question_order: 10,
        video_url: "https://www.youtube.com/embed/3jR5gYBz4yI",
        points: 0,
      },
      {
        id: "q6",
        question_text: "Vilket mönster används ofta för att skapa en klass som bara får en instans?",
        question_type: "single_choice",
        question_order: 11,
        options: {
          choices: ["Singleton", "Factory", "Observer", "Decorator"],
        },
        correct_answer: "Singleton",
        explanation: "Singleton-mönstret säkerställer att endast en instans av en klass finns.",
        points: 10,
      },
      {
        id: "q7",
        question_text: "Fyll i rätt ordning för en enkel async-metod som anropar en HTTP-klient och returnerar resultat:",
        question_type: "order_sequence",
        question_order: 12,
        options: {
          wordBank: [
            "public async Task<string> GetAsync()",
            "{",
            "var response = await httpClient.GetAsync(url);",
            "var content = await response.Content.ReadAsStringAsync();",
            "return content;",
            "}",
          ],
        },
        correct_answer: [
          "public async Task<string> GetAsync()",
          "{",
          "var response = await httpClient.GetAsync(url);",
          "var content = await response.Content.ReadAsStringAsync();",
          "return content;",
          "}",
        ],
        explanation:
          "En async-metod hämtar data asynkront med `await` och returnerar ett Task-objekt med resultatet när det är klart.",
        points: 20,
      },
      {
        id: "q8",
        question_text: "Vilken LINQ-metod returnerar det första elementet som matchar ett villkor (eller default)?",
        question_type: "single_choice",
        question_order: 13,
        options: {
          choices: ["FirstOrDefault", "Single", "Where", "Select"],
        },
        correct_answer: "FirstOrDefault",
        explanation: "`FirstOrDefault` returnerar första elementet matchande villkor eller default(null) om inget matchar.",
        points: 10,
      },
      {
        id: "q9",
        question_text: "Sant eller falskt: `async void` rekommenderas för de flesta asynkrona metoder.",
        question_type: "true_false",
        question_order: 14,
        options: {
          choices: ["Sant", "Falskt"],
        },
        correct_answer: "Falskt",
        explanation:
          "`async void` bör endast användas för event handlers. För övriga metoder rekommenderas `async Task` eller `async Task<T>` för att kunna await:a och fånga undantag.",
        points: 5,
      },
      {
        id: "q10",
        question_text: "Vilken teknik kan användas för att skapa trådsäkra operationer i C#?",
        question_type: "multiple_choice",
        question_order: 15,
        options: {
          choices: ["lock", "Monitor", "SemaphoreSlim", "volatile"],
        },
        correct_answer: ["lock", "Monitor", "SemaphoreSlim"],
        explanation:
          "`lock`, `Monitor` och `SemaphoreSlim` används för att synkronisera trådar. `volatile` hjälper med synkronisering av fält men är inte en fullständig synkroniseringsmekanism.",
        points: 15,
      },
      {
        id: "q11",
        question_text: "Delegates används ofta tillsammans med vilket mönster i .NET?",
        question_type: "single_choice",
        question_order: 16,
        options: {
          choices: ["Observer/event", "Singleton", "Adapter", "Factory"],
        },
        correct_answer: "Observer/event",
        explanation: "Delegates och events implementerar observer/prenumerationsmönster i .NET.",
        points: 10,
      }
    ],
  },
];

export default csharpquizzes;
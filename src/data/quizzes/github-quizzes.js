const githubquizzes = [
  // =======================
  // Git / GitHub Nybörjarkurs
  // =======================
  {
    id: "40",
    title: "Git / GitHub Nybörjarkurs",
    slug: "git-nyborjare",
    userid: "demo-user",
    image_url: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=1920&q=80",
    questions: [
      {
        id: "v1",
        question_text: "Introduktion till Git och GitHub",
        question_type: "videolesson",
        question_order: 1,
        video_url: "https://www.youtube.com/embed/8JJ101D3knE",
        points: 0,
      },
      {
        id: "t1",
        question_text: "Vad är Git och vad är GitHub?",
        question_type: "textlesson",
        question_order: 2,
        pause_content:
          "Git är ett versionshanteringssystem (VCS) som låter dig spåra förändringar i kod. GitHub är en plattform som hostar Git-repositories online och möjliggör samarbete.",
        points: 0,
      },
      {
        id: "q1",
        question_text: "Vilken kommando initierar ett Git-repo i en mapp?",
        question_type: "single_choice",
        question_order: 3,
        options: ["git init", "git start", "git create", "git new"],
        correct_answer: "git init",
        explanation: "`git init` skapar en ny lokal Git-repository i aktuell mapp.",
        points: 10,
      },
      {
        id: "q2",
        question_text: "Vilket kommando lägger till filer till staging area?",
        question_type: "single_choice",
        question_order: 4,
        options: ["git add .", "git commit", "git push", "git stage"],
        correct_answer: "git add .",
        explanation: "`git add .` lägger till alla förändrade filer i staging för commit.",
        points: 10,
      },
      {
        id: "q3",
        question_text: "Vilka av följande är giltiga Git-kommandon?",
        question_type: "multiple_choice",
        question_order: 5,
        options: {
          choices: ["git clone", "git delete", "git status", "git revert"],
        },
        correct_answer: ["git clone", "git status", "git revert"],
        explanation:
          "`git clone` kopierar repo, `git status` visar status, `git revert` kan ångra commits. `git delete` är inte ett standardkommando.",
        points: 15,
      },
      {
        id: "q4",
        question_text: "GitHub används för att lagra repos online.",
        question_type: "true_false",
        question_order: 6,
        options: {
          choices: ["Sant", "Falskt"],
        },
        correct_answer: "Sant",
        explanation: "GitHub är en hostingplattform för Git-repositories och samarbete.",
        points: 5,
      },
    ],
  },

  // =======================
  // Git / GitHub Medelnivå
  // =======================
  {
    id: "41",
    title: "Git / GitHub Medelnivå",
    slug: "git-medelniva",
    userid: "demo-user",
    image_url: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=1920&q=80",
    questions: [
      {
        id: "v1",
        question_text: "Branching och Merge",
        question_type: "videolesson",
        question_order: 1,
        video_url: "https://www.youtube.com/embed/JeznW_7DlB0",
        points: 0,
      },
      {
        id: "t1",
        question_text: "Branches i Git",
        question_type: "textlesson",
        question_order: 2,
        pause_content:
          "Branching gör att du kan ha parallella versioner av din kod. Du kan t.ex. arbeta på en ny funktion i en separat branch utan att påverka main/master.",
        points: 0,
      },
      {
        id: "q1",
        question_text: "Vilket kommando byter till en annan branch?",
        question_type: "single_choice",
        question_order: 3,
        options: ["git switch branch", "git checkout", "git change", "git move"],
        correct_answer: "git checkout",
        explanation: "`git checkout <branch>` byter branch (eller `git switch <branch>` i nyare Git).",
        points: 10,
      },
      {
        id: "q2",
        question_text: "Vilket kommando slår ihop en branch in i aktuell branch?",
        question_type: "single_choice",
        question_order: 4,
        options: ["git merge branch", "git join branch", "git combine branch", "git integrate branch"],
        correct_answer: "git merge branch",
        explanation: "`git merge <branch>` slår ihop den angivna branchen i nuvarande.",
        points: 10,
      },
      {
        id: "q3",
        question_text: "Vilka av följande strategier kan användas för att lösa merge-konflikter?",
        question_type: "multiple_choice",
        question_order: 5,
        options: {
          choices: ["manuellt redigera", "rebase", "force push", "cherry-pick"],
        },
        correct_answer: ["manuellt redigera", "rebase", "cherry-pick"],
        explanation:
          "Du kan manuellt redigera konfliktmarkerade filer, använda `rebase` eller `cherry-pick` beroende på situation. `force push` är riskabelt och löser inte konflikter i sig.",
        points: 15,
      },
      {
        id: "q4",
        question_text: "En pull request (PR) används för att föreslå ändringar till en kodbas.",
        question_type: "true_false",
        question_order: 6,
        options: {
          choices: ["Sant", "Falskt"],
        },
        correct_answer: "Sant",
        explanation: "I GitHub arbetsflöden används PR för kodgranskning och att föreslå ändringar.",
        points: 5,
      },
    ],
  },

  // =======================
  // Git / GitHub Avancerad
  // =======================
  {
    id: "42",
    title: "Git / GitHub Avancerad",
    slug: "git-avancerad",
    userid: "demo-user",
    image_url: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=1920&q=80",
    questions: [
      {
        id: "v1",
        question_text: "Git Rebase & Cherry-pick",
        question_type: "videolesson",
        question_order: 1,
        video_url: "https://www.youtube.com/embed/F3kTlGWNZ00",
        points: 0,
      },
      {
        id: "t1",
        question_text: "Rebase och Cherry-pick",
        question_type: "textlesson",
        question_order: 2,
        pause_content:
          "Rebase gör att du kan applicera commits från en branch ovanpå en annan — det ändrar historiken. Cherry-pick kopierar en enskild commit från en branch till en annan.",
        points: 0,
      },
      {
        id: "q1",
        question_text: "Vilket kommando används för att flytta commits ovanpå en annan branch?",
        question_type: "single_choice",
        question_order: 3,
        options: ["git rebase branch", "git merge branch", "git cherry-pick branch", "git transplant branch"],
        correct_answer: "git rebase branch",
        explanation: "`git rebase <branch>` flyttar commits till basen av den angivna branchen.",
        points: 10,
      },
      {
        id: "q2",
        question_text: "Cherry-pick appliceras på vilken typ av objekt?",
        question_type: "single_choice",
        question_order: 4,
        options: ["commit", "branch", "tag", "repository"],
        correct_answer: "commit",
        explanation: "`git cherry-pick <commit_hash>` kopierar en commit till aktuell branch.",
        points: 10,
      },
      {
        id: "q3",
        question_text: "Vilka är riskerna med rebase på delade brancher?",
        question_type: "multiple_choice",
        question_order: 5,
        options: {
          choices: [
            "ändrar historik",
            "skapar konflikter",
            "bryter fjärr-repo",
            "förlorar commits",
          ],
        },
        correct_answer: ["ändrar historik", "skapar konflikter", "bryter fjärr-repo"],
        explanation:
          "När du rebasar en branch som andra använder kan du ändra historiken, skapa konflikter och göra att fjärr-repo inte längre matchar lokal historik.",
        points: 15,
      },
      {
        id: "q4",
        question_text: "GitHub API låter dig skapa filer via HTTP.",
        question_type: "true_false",
        question_order: 6,
        options: {
          choices: ["Sant", "Falskt"],
        },
        correct_answer: "Sant",
        explanation:
          "GitHub REST API låter dig skapa, uppdatera och ta bort filer i ett repo via endpoints som /repos/:owner/:repo/contents. :contentReference[oaicite:0]{index=0}",
        points: 10,
      },
      {
        id: "q5",
        question_text: "Vilken HTTP-metod används för att skapa eller uppdatera en fil i repo via GitHub API?",
        question_type: "single_choice",
        question_order: 7,
        options: ["POST", "PUT", "PATCH", "DELETE"],
        correct_answer: "PUT",
        explanation:
          "För att lägga till eller uppdatera en fil används `PUT /repos/:owner/:repo/contents/:path`. :contentReference[oaicite:1]{index=1}",
        points: 10,
      },
    ],
  },
];

export default githubquizzes;
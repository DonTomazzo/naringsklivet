const azurequizzes = [
  // 🔹 1. AZURE NYBÖRJARE
  {
    id: "az1",
    title: "Microsoft Azure Nybörjarkurs",
    slug: "azure-nyborjare",
    userid: "demo-user",
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80",
    questions: [
      {
        id: "azv1",
        question_text: "Introduktion till Microsoft Azure",
        question_type: "videolesson",
        question_order: 1,
        video_url: "https://www.youtube.com/embed/2n0tM8w2dNs",
        points: 0,
      },
      {
        id: "azq1",
        question_text: "Vad är Microsoft Azure?",
        question_type: "single_choice",
        question_order: 2,
        options: {
          choices: [
            "En molnplattform från Microsoft",
            "Ett programmeringsspråk",
            "Ett operativsystem",
            "En hårdvaruenhet",
          ],
        },
        correct_answer: "En molnplattform från Microsoft",
        explanation: "Azure är Microsofts molnplattform som erbjuder tjänster för lagring, databaser, AI, virtuella maskiner, med mera.",
        points: 10,
      },
      {
        id: "azt1",
        question_text: "Vad är molntjänster?",
        question_type: "textlesson",
        question_order: 3,
        pause_content:
          "Molntjänster innebär att resurser som servrar, databaser och mjukvara levereras via internet istället för lokalt installerade system. Azure erbjuder detta genom olika tjänstemodeller som IaaS, PaaS och SaaS.",
        points: 0,
      },
      {
        id: "azq2",
        question_text: "Vilken av följande är en typ av molntjänstmodell?",
        question_type: "multiple_choice",
        question_order: 4,
        options: {
          choices: ["IaaS", "SaaS", "CaaS", "PaaS"],
        },
        correct_answer: ["IaaS", "SaaS", "PaaS"],
        explanation: "De tre huvudmodellerna för molntjänster är Infrastructure as a Service (IaaS), Platform as a Service (PaaS) och Software as a Service (SaaS).",
        points: 15,
      },
      {
        id: "azq3",
        question_text: "Azure erbjuder endast lagringstjänster.",
        question_type: "true_false",
        question_order: 5,
        options: {
          choices: ["Sant", "Falskt"],
        },
        correct_answer: "Falskt",
        explanation: "Azure erbjuder många fler tjänster än bara lagring, t.ex. databaser, AI, säkerhet och DevOps-verktyg.",
        points: 5,
      },
      {
        id: "azv2",
        question_text: "Förstå Azure-portalen",
        question_type: "videolesson",
        question_order: 6,
        video_url: "https://www.youtube.com/embed/3gfjv0lN0Uo",
        points: 0,
      },
      {
        id: "azq4",
        question_text: "Vilket verktyg används för att hantera resurser i Azure?",
        question_type: "single_choice",
        question_order: 7,
        options: {
          choices: ["Azure Portal", "Visual Studio Code", "Windows Terminal", "GitHub"],
        },
        correct_answer: "Azure Portal",
        explanation: "Azure Portal är Microsofts webbaserade gränssnitt för att hantera och övervaka molnresurser.",
        points: 10,
      },
      {
        id: "azq5",
        question_text: "Ordna stegen för att skapa en virtuell maskin i Azure",
        question_type: "order_sequence",
        question_order: 8,
        options: {
          wordBank: [
            "Logga in i Azure Portal",
            "Välj 'Create Resource'",
            "Välj 'Virtual Machine'",
            "Konfigurera och starta maskinen",
          ],
        },
        correct_answer: [
          "Logga in i Azure Portal",
          "Välj 'Create Resource'",
          "Välj 'Virtual Machine'",
          "Konfigurera och starta maskinen",
        ],
        explanation:
          "Den korrekta ordningen för att skapa en virtuell maskin i Azure börjar med inloggning, skapande av resurs, val av typ och sedan konfiguration.",
        points: 20,
      },
    ],
  },

  // 🔹 2. AZURE MEDEL
  {
    id: "az2",
    title: "Microsoft Azure Medelkurs",
    slug: "azure-medel",
    userid: "demo-user",
    image_url: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=1920&q=80",
    questions: [
      {
        id: "azmv1",
        question_text: "Azure Resource Groups och resurshantering",
        question_type: "videolesson",
        question_order: 1,
        video_url: "https://www.youtube.com/embed/8qP79rRzz7g",
        points: 0,
      },
      {
        id: "azmq1",
        question_text: "Vad är en 'Resource Group' i Azure?",
        question_type: "single_choice",
        question_order: 2,
        options: {
          choices: [
            "En samling resurser som hanteras gemensamt",
            "En användargrupp för säkerhet",
            "En utvecklingsmiljö",
            "En backup-tjänst",
          ],
        },
        correct_answer: "En samling resurser som hanteras gemensamt",
        explanation: "Resource Groups används för att samla resurser som hör ihop i en applikation eller miljö så att de kan hanteras tillsammans.",
        points: 10,
      },
      {
        id: "azmt1",
        question_text: "Förstå Azure Storage",
        question_type: "textlesson",
        question_order: 3,
        pause_content:
          "Azure Storage tillhandahåller olika typer av lagring: Blob Storage (filer och bilder), Queue Storage (meddelanden), Table Storage (nyckel-värde) och Disk Storage (virtuella diskar).",
        points: 0,
      },
      {
        id: "azmq2",
        question_text: "Vilken typ av Azure-lagring är bäst för ostrukturerade data som bilder?",
        question_type: "single_choice",
        question_order: 4,
        options: {
          choices: ["Blob Storage", "Table Storage", "Queue Storage", "Disk Storage"],
        },
        correct_answer: "Blob Storage",
        explanation: "Blob Storage är optimerat för stora mängder ostrukturerad data, som bilder, videor och backup-filer.",
        points: 10,
      },
      {
        id: "azmq3",
        question_text: "Vilka Azure-tjänster används för att köra kod utan att hantera servrar?",
        question_type: "multiple_choice",
        question_order: 5,
        options: {
          choices: ["Azure Functions", "Azure Logic Apps", "Azure VM", "Azure Blob Storage"],
        },
        correct_answer: ["Azure Functions", "Azure Logic Apps"],
        explanation: "Azure Functions och Logic Apps låter dig köra kod eller flöden serverlöst, utan att hantera underliggande infrastruktur.",
        points: 15,
      },
      {
        id: "azmq4",
        question_text: "Azure CLI används för att...",
        question_type: "fill_blank",
        question_order: 6,
        correct_answer: "hantera Azure-resurser via kommandoraden",
        explanation: "Azure CLI är ett kommandoradsverktyg som gör det möjligt att skapa, konfigurera och hantera resurser direkt via terminalen.",
        points: 10,
      },
      {
        id: "azmq5",
        question_text: "Ordna stegen för att distribuera en app till Azure App Service",
        question_type: "order_sequence",
        question_order: 7,
        options: {
          wordBank: [
            "Skapa App Service-plan",
            "Skapa Web App",
            "Anslut till GitHub eller lokal kod",
            "Publicera appen",
          ],
        },
        correct_answer: [
          "Skapa App Service-plan",
          "Skapa Web App",
          "Anslut till GitHub eller lokal kod",
          "Publicera appen",
        ],
        explanation: "En korrekt app-distribution kräver att du först skapar en plan, en web app och sedan kopplar källkoden innan publicering.",
        points: 20,
      },
    ],
  },

  // 🔹 3. AZURE AVANCERAD
  {
    id: "az3",
    title: "Microsoft Azure Avancerad",
    slug: "azure-avancerad",
    userid: "demo-user",
    image_url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80",
    questions: [
      {
        id: "azav1",
        question_text: "Avancerad säkerhet i Azure",
        question_type: "videolesson",
        question_order: 1,
        video_url: "https://www.youtube.com/embed/xWv7vT5I8bM",
        points: 0,
      },
      {
        id: "azaq1",
        question_text: "Vilken tjänst används för identitets- och åtkomsthantering i Azure?",
        question_type: "single_choice",
        question_order: 2,
        options: {
          choices: ["Azure Active Directory", "Azure Storage", "Azure Firewall", "Azure Defender"],
        },
        correct_answer: "Azure Active Directory",
        explanation: "Azure AD hanterar autentisering, auktorisering och användaridentiteter i molnet.",
        points: 10,
      },
      {
        id: "azaq2",
        question_text: "Vilka metoder används för att säkra applikationer i Azure?",
        question_type: "multiple_choice",
        question_order: 3,
        options: {
          choices: ["Role-Based Access Control (RBAC)", "Network Security Groups", "Öppna alla portar", "Azure Policy"],
        },
        correct_answer: ["Role-Based Access Control (RBAC)", "Network Security Groups", "Azure Policy"],
        explanation: "RBAC, NSG och Azure Policy är centrala verktyg för att styra säkerhet och efterlevnad i Azure.",
        points: 15,
      },
      {
        id: "azaq3",
        question_text: "Vad är Infrastructure as Code (IaC)?",
        question_type: "textlesson",
        question_order: 4,
        pause_content:
          "Infrastructure as Code (IaC) innebär att infrastruktur definieras och hanteras med kod, istället för manuellt i ett GUI. I Azure används t.ex. ARM Templates och Bicep för detta.",
        points: 0,
      },
      {
        id: "azaq4",
        question_text: "Vilka verktyg kan användas för IaC i Azure?",
        question_type: "multiple_choice",
        question_order: 5,
        options: {
          choices: ["ARM Templates", "Terraform", "Bicep", "PowerShell Scripts"],
        },
        correct_answer: ["ARM Templates", "Terraform", "Bicep"],
        explanation: "Azure stöder flera verktyg för IaC, bland annat ARM Templates, Terraform och Bicep för deklarativ infrastruktur.",
        points: 15,
      },
      {
        id: "azaq5",
        question_text: "Ordna stegen för att skapa en CI/CD-pipeline med Azure DevOps",
        question_type: "order_sequence",
        question_order: 6,
        options: {
          wordBank: [
            "Skapa ett projekt i Azure DevOps",
            "Lägg till repository",
            "Skapa pipeline och byggsteg",
            "Koppla till Azure-miljön",
          ],
        },
        correct_answer: [
          "Skapa ett projekt i Azure DevOps",
          "Lägg till repository",
          "Skapa pipeline och byggsteg",
          "Koppla till Azure-miljön",
        ],
        explanation:
          "Azure DevOps låter dig skapa CI/CD-flöden genom att först skapa projekt, lägga till kod, bygga pipeline och ansluta till Azure.",
        points: 20,
      },
      {
        id: "azaq6",
        question_text: "Zero Trust innebär att man automatiskt litar på interna användare.",
        question_type: "true_false",
        question_order: 7,
        options: {
          choices: ["Sant", "Falskt"],
        },
        correct_answer: "Falskt",
        explanation: "Zero Trust bygger på principen att inte lita på någon per automatik, oavsett nätverksplats.",
        points: 5,
      },
    ],
  },
];

export default azurequizzes;
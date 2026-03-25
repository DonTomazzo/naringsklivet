// src/data/posts.ts

export interface UserProfile {
  name: string;
  avatar_url?: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt?: string;
  content?: string;
  header_image_url?: string;
  published_at: string;
  type?: 'article' | 'video' | 'podcast' | 'gallery' | 'tutorial';
  video_url?: string;
  category?: string;
  status: 'published' | 'draft';
  user_profiles: UserProfile;
}

export const posts: Post[] = [
  // ─────────────────────────────────────────────
  // ARTIKEL 1
  // ─────────────────────────────────────────────
  {
    id: '1',
    slug: 'chatgpt-vs-claude-vs-gemini-vilket-verktyg-passar-dig-2026',
    title: 'ChatGPT vs Claude vs Gemini – vilket AI-verktyg passar dig bäst 2026?',
    subtitle: 'En ärlig jämförelse utan reklam',
    excerpt:
      'Tre giganter, tre styrkor. Vi jämför de mest populära AI-verktygen utan att favorisera – och hjälper dig välja rätt för just din arbetsdag.',
    header_image_url:
      'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800',
    published_at: '2026-01-08T09:00:00Z',
    type: 'article',
    category: 'Verktygsguider',
    status: 'published',
    content: `
<h2>Tre verktyg – tre filosofier</h2>
<p>ChatGPT, Claude och Gemini är alla kraftfulla AI-assistenter, men de är byggda med fundamentalt olika prioriteringar. Det märks inte när du ställer en enkel fråga, men det märks tydligt när du försöker lösa ett komplext problem, analysera ett långt dokument eller skriva något som faktiskt ska användas.</p>
<p>Att förstå skillnaderna handlar inte om att hitta det "bästa" verktyget i absolut mening – det handlar om att hitta rätt verktyg för din specifika situation. Den kloka strategin är att förstå styrkor och svagheter, välja ett primärt verktyg och komplettera med de andra när det behövs.</p>

<h2>ChatGPT – allroundern som tog världen med storm</h2>
<p>OpenAIs ChatGPT är fortfarande det mest använda AI-verktyget i världen, och det av goda skäl. Styrkan ligger i bredd: text, kod, bilder via DALL·E, röst, filanalys och ett enormt ekosystem av plugins och integrationer med andra tjänster. GPT-4o – den senaste modellen – är särskilt stark på att resonera steg för steg, lösa matematiska problem och generera kod.</p>
<p><strong>ChatGPT är bäst för:</strong> brainstorming, kreativt skrivande, kodhjälp, bildgenerering, snabba svar på faktafrågor och uppgifter där du vill ha ett brett perspektiv snabbt.</p>
<p><strong>Svagheter:</strong> ChatGPT är mer benäget att hallusinera – presentera felaktig information med total självförtroende – än Claude. Det är också mer benäget att ge dig det svar det tror att du vill höra, snarare än det du behöver höra.</p>
<p><strong>Pris:</strong> Gratisversion finns med GPT-4o. Plus-prenumeration kostar ca 220 kr/månad.</p>

<h2>Claude – analytikern med djup och nuans</h2>
<p>Anthropics Claude är känt bland de som jobbar professionellt med AI för att leverera mer genomtänkta, nyanserade och ärliga svar. Där ChatGPT ibland svarar det du vill höra, säger Claude det du behöver höra – även när det är obekvämt.</p>
<p>Claudes absoluta styrka är hantering av långa dokument. Medan ChatGPT tappar tråden i mycket långa konversationer kan Claude hålla kontexten över hela dokument på hundratals sidor. Det gör det oslagbart för juridiska texter, långa rapporter, bokmanuskript eller teknisk dokumentation. Claude är också känt för sin förmåga att uttrycka osäkerhet ärligt – istället för att hitta på ett svar säger det "det är jag osäker på".</p>
<p><strong>Claude är bäst för:</strong> analys av långa dokument, juridik och policy, känslig kommunikation, texter som kräver nyans och situationer där du vill ha ett ärligt svar snarare än ett bekräftande.</p>
<p><strong>Svagheter:</strong> Claudes ekosystem är mindre – färre integrationer, inga inbyggda bildgenereringsfunktioner. Det kan också vara mer försiktigt än nödvändigt i vissa situationer.</p>
<p><strong>Pris:</strong> Gratisversion finns. Pro-prenumeration kostar ca 220 kr/månad.</p>

<h2>Gemini – Googlarens AI med direktlinje till sökmotorn</h2>
<p>Googles Gemini har en unik fördel: inbyggd koppling till sökmotorn och Google Workspace. Det innebär att Gemini kan hämta aktuell information från webben i realtid. Om du arbetar i Google Docs, Gmail eller Google Sheets är Gemini det naturliga valet – det lever direkt i de verktygen utan att du behöver byta flik.</p>
<p><strong>Gemini är bäst för:</strong> research och faktasökning som kräver aktuell information, Google Workspace-integration, uppgifter som kräver webbsökning i realtid.</p>
<p><strong>Svagheter:</strong> Ojämn kvalitet på svenska jämfört med engelska, sämre på kreativt skrivande, och med Googles datamodell finns integritetsfrågor värda att beakta.</p>
<p><strong>Pris:</strong> Gratisversion finns. Advanced ingår i Google One AI Premium, ca 220 kr/månad.</p>

<h2>Direkt jämförelse: Vad ska du använda för vad?</h2>
<p><strong>Skriva och redigera texter:</strong> Claude för djup och nuans, ChatGPT för snabb kreativitet och volym.</p>
<p><strong>Kod och programmering:</strong> Båda är starka. ChatGPT har något bättre ekosystem, Claude ger ofta mer pedagogiska förklaringar.</p>
<p><strong>Research och faktasökning:</strong> Gemini om du behöver aktuell information, Perplexity AI om du vill ha källhänvisningar.</p>
<p><strong>Analysera ett långt dokument:</strong> Claude, utan tvekan.</p>
<p><strong>Integration i Office-appar:</strong> Microsoft Copilot för Microsoft 365, Gemini för Google Workspace.</p>

<h2>Vilket ska du börja med?</h2>
<p>Om du är ny på AI-verktyg: börja med ChatGPT. Det är mest känt, har bäst dokumentation och det är lättast att hitta hjälp och guider. Testa gratisversionen i en månad. Jobbar du mycket med text och analys? Prova Claude parallellt. Lever du i Google Workspace? Ge Gemini en chans.</p>
<p>Den viktigaste lärdomen är enkel: att äga tre verktyg halvhjärtat är sämre än att behärska ett till fullo. Välj ett, lär dig det ordentligt, och lägg sedan till fler när du vet vad du saknar.</p>
    `,
    user_profiles: {
      name: 'Sara Lindqvist',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara',
    },
  },

  // ─────────────────────────────────────────────
  // ARTIKEL 2
  // ─────────────────────────────────────────────
  {
    id: '2',
    slug: 'promptteknik-fem-principer-som-forandrar-dina-resultat',
    title: '5 promptprinciper som förändrar hur du arbetar med AI',
    subtitle: 'Det är inte verktyget som avgör – det är frågan',
    excerpt:
      'De flesta använder AI som en sökmotor och undrar varför svaren är mediokra. De som verkligen sparar tid har lärt sig att ställa rätt frågor. Här är fem principer som gör störst skillnad.',
    header_image_url:
      'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800',
    published_at: '2026-01-22T10:00:00Z',
    type: 'article',
    category: 'Promptteknik',
    status: 'published',
    content: `
<h2>Varför de flesta är besvikna på AI</h2>
<p>Det finns ett mönster i hur folk introduceras till AI-verktyg. De öppnar ChatGPT, skriver en fråga ungefär som de skulle googla, får ett generiskt svar, tänker "jo, det var ju inte så imponerande" – och stänger fliken. Sedan hör de om någon som sparar tre timmar om dagen med AI och förstår inte varför de inte upplever samma sak.</p>
<p>Skillnaden är nästan aldrig verktyget. Det är prompten – hur du formulerar din fråga och ditt uppdrag. Samma AI-modell kan ge dig ett oanvändbart svar eller ett svar som sparar dig två timmar, beroende helt på hur du kommunicerar med den. Det är som skillnaden mellan att beställa "mat" och att beställa "en vegetarisk pasta med parmesan, al dente, medelstor portion, inte för kryddig". Kocken är densamma. Resultaten är helt olika.</p>

<h2>Princip 1: Ge AI en roll och ett sammanhang</h2>
<p>Det enklaste och kraftfullaste du kan göra är att börja varje prompt med att definiera vem AI ska vara i den konversationen. "Du är en erfaren copywriter som specialiserar sig på B2B-kommunikation" ger dramatiskt bättre resultat än att bara skriva din fråga.</p>
<p>Det fungerar för att AI-modeller är tränade på enorma mängder text från alla möjliga sammanhang. Genom att definiera en roll hjälper du modellen att hitta rätt del av sin träning och aktivera det tankesätt, den ton och de kunskaper som är relevanta. Exempel på roller som fungerar bra: "erfaren projektledare", "skicklig redaktör", "pedagog som förklarar komplexa ämnen enkelt", "kritisk granskare som letar efter svagheter i argument".</p>

<h2>Princip 2: Specificera format, längd och struktur</h2>
<p>AI antar ingenting om hur du vill ha svaret om du inte säger det. Det kan ge dig en essä när du ville ha en lista, eller tre meningar när du ville ha en djupanalys. Var explicit. "Svara i punktlista med max fem punkter" är tydligare än att hoppas att AI gissar rätt. "Strukturera svaret med rubriker" gör långa svar navigerbara. "Ge mig tre alternativ att välja bland" är ovärderligt när du vill ha variation.</p>
<p>Andra formateringskommandon som sparar tid: "Skriv i tabellformat", "Sammanfatta i tre meningar", "Presentera för- och nackdelar separat", "Börja med slutsatsen, förklara sedan varför".</p>

<h2>Princip 3: Ge kontext som en bra briefing</h2>
<p>Tänk dig att du ska anlita en frilansare för en uppgift. Du skulle inte bara skicka uppgiften utan bakgrundsinformation – du skulle förklara vem kunden är, vad syftet är, vilka begränsningar som finns och vad ett bra resultat ser ut. Behandla AI på samma sätt.</p>
<p>Berätta vem målgruppen är, vad syftet är, vilken ton som passar och vad du redan vet. En enkel minnesregel: vad skulle du berätta för en ny, duktig kollega som ska lösa samma uppgift för första gången?</p>

<h2>Princip 4: Visa med exempel</h2>
<p>Exempel är ett av de kraftfullaste verktygen i promptteknik och det är underanvänt. "Skriv en rubrik i stil med: Så sparar du 3 timmar om dagen utan att jobba hårdare" är hundra gånger tydligare än "skriv en bra rubrik". Du ger modellen en mall att matcha – ton, längd, struktur och känsla – istället för en abstrakt instruktion att tolka. Det fungerar för all typ av innehåll: mejl, presentationsrubriker, sammanfattningar, tonalitet.</p>

<h2>Princip 5: Iterera i konversationen – redigera inte prompten</h2>
<p>Det vanligaste misstaget är att skriva om hela prompten från noll när svaret inte är exakt rätt. Det ignorerar en av AI:s största styrkor: förmågan att hålla en konversation och bygga vidare på vad som sagts. Ge istället feedback i konversationen. "Bra, men gör det 30% kortare" fungerar utmärkt. "Tonläget är för formellt – skriv om det mer avslappnat" ger precist resultat. Tänk på det som att samarbeta med en skicklig assistent snarare än att programmera en maskin.</p>

<h2>En mall att spara</h2>
<p>Här är en grundstruktur du kan återanvända för komplexa uppgifter:</p>
<p><strong>[Roll]</strong> Du är en [expert/roll] med erfarenhet av [relevant område].<br>
<strong>[Uppgift]</strong> Din uppgift är att [konkret uppgift].<br>
<strong>[Kontext]</strong> Bakgrunden är [information]. Målgruppen är [vem]. Syftet är [varför].<br>
<strong>[Format]</strong> Svara med [format, längd, struktur].<br>
<strong>[Exempel]</strong> Tonen ska likna: [exempel].</p>
<p>Du behöver inte använda alla delar varje gång. Men ju mer komplex uppgiften är, desto mer lönar det sig att investera 2–3 minuter i en välstrukturerad prompt snarare än att skriva om ett halvbra svar tre gånger.</p>
    `,
    user_profiles: {
      name: 'Jonas Eriksson',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jonas',
    },
  },

  // ─────────────────────────────────────────────
  // ARTIKEL 3
  // ─────────────────────────────────────────────
  {
    id: '3',
    slug: 'ai-sakerhet-gdpr-vad-far-du-lagga-in-pa-jobbet',
    title: 'AI och säkerhet: Vad får du egentligen lägga in i ChatGPT på jobbet?',
    subtitle: 'GDPR, sekretess och sunt förnuft – en praktisk guide',
    excerpt:
      'Många använder AI-verktyg på jobbet utan att veta vad som gäller. Det finns reella risker – men också enkla riktlinjer som gör att du kan använda AI tryggt och effektivt.',
    header_image_url:
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
    published_at: '2026-02-05T11:00:00Z',
    type: 'article',
    category: 'Säkerhet & Policy',
    status: 'published',
    content: `
<h2>Det korta svaret</h2>
<p>Lägg aldrig in personuppgifter, kunddata, affärshemligheter eller konfidentiell information i gratisversioner av AI-verktyg utan att ha kontrollerat datapolicyn. Det långa svaret är mer nyanserat – och mer användbart.</p>

<h2>Vad händer med data du matar in?</h2>
<p>Det är en fråga fler borde ställa sig. Svaret varierar beroende på vilket verktyg du använder, vilken version och om du är inloggad med ett privat konto eller ett företagskonto. Gratisversionerna av ChatGPT kan som standard använda dina konversationer för att förbättra och träna modellerna. Det går att stänga av i inställningarna under "Data controls" – men det kräver att du aktivt gör det, och de flesta vet inte om att inställningen finns.</p>
<p>ChatGPT Team, Enterprise och API-versionen har starkare dataskydd och tränar som standard inte på kunddata. Claude Pro och Anthropic API fungerar liknande. Google Workspace och Microsoft 365 har enterprise-avtal som skyddar din data om din organisation har rätt licens. Den praktiska lärdomen: kontrollera om din organisation har ett dataskyddsavtal med leverantören innan du antar att din data är skyddad.</p>

<h2>GDPR – vad det faktiskt innebär i praktiken</h2>
<p>GDPR kräver att personuppgifter behandlas lagligt, ändamålsenligt och med skydd. Om du klistrar in en lista med kundnamn och e-postadresser i ChatGPT för att "snygga till" ett utskick, har du potentiellt överfört personuppgifter till ett tredjepartsbolag utan en rättslig grund för det. Det kan vara ett GDPR-brott – och det är du och din arbetsgivare som är ansvariga, inte OpenAI.</p>
<p>Personuppgifter som kräver extra försiktighet: namn kombinerat med kontaktuppgifter, personnummer, hälsodata, ekonomisk information, känsliga kategorier som etnicitet, politisk åsikt eller religion.</p>

<h2>Tre enkla regler som löser 90% av problemen</h2>
<p><strong>Regel 1: Anonymisera innan du klistrar in.</strong> Ersätt kundnamn med "Kund A", personnummer med "XXXXXX-XXXX", specifika platser med generiska beskrivningar. Du kan sedan ersätta tillbaka när AI levererat sitt svar.</p>
<p><strong>Regel 2: Kontrollera vad din organisation tillåter.</strong> Allt fler arbetsgivare har AI-policys. Om din organisation inte har en – ta initiativet att fråga IT eller HR. En enkel policy sparar enormt mycket problem.</p>
<p><strong>Regel 3: Dubbelkolla fakta alltid.</strong> AI kan presentera felaktig information med stor självförtroende. Kontrollera siffror, citat och juridisk information mot primärkällor innan du använder dem.</p>

<h2>Vad är det helt okej att använda AI för på jobbet?</h2>
<p>Det är värt att poängtera att det finns enormt mycket du kan göra utan risk:</p>
<ul>
  <li>Skriva och redigera generella texter, mejl och presentationer utan känslig information</li>
  <li>Brainstorming och idégenerering</li>
  <li>Kodning och tekniska problemlösningar</li>
  <li>Research och faktafrågor om offentlig information</li>
  <li>Sammanfatta offentliga rapporter och artiklar</li>
  <li>Anonymiserade kundcase och scenarion</li>
  <li>Förbereda mötesagendor och strukturera presentationer</li>
</ul>

<h2>Hur sätter du upp en AI-policy för ditt team?</h2>
<p>Om du är chef eller ansvarar för ett team är det värt att avsätta en timme för att skriva en enkel AI-policy. Tre punkter räcker för de flesta organisationer:</p>
<p><strong>1. Godkända verktyg:</strong> Specificera vilka AI-verktyg som är okej att använda, gärna företagsversioner med dataskyddsavtal.</p>
<p><strong>2. Vad som aldrig ska läggas in:</strong> Personuppgifter, kunddata, affärshemligheter, lösenord, finansiell information.</p>
<p><strong>3. Verifiering:</strong> Allt AI-genererat innehåll ska granskas av en människa innan det publiceras, skickas till kund eller används som beslutsunderlag.</p>

<h2>Framtiden: Organisationsintern AI</h2>
<p>Allt fler organisationer börjar använda egna AI-lösningar som körs på deras egna servrar eller i ett dedikerat molnutrymme. Det löser dataskyddsproblemen elegant – din data lämnar aldrig organisationen. Om du arbetar med känslig data i en stororganisation är det värt att fråga IT om detta är något som är på gång.</p>
    `,
    user_profiles: {
      name: 'Anders Bergström',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anders',
    },
  },

  // ─────────────────────────────────────────────
  // ARTIKEL 4
  // ─────────────────────────────────────────────
  {
    id: '4',
    slug: 'ai-for-egenforetagare-vaxa-utan-att-anstalla',
    title: 'AI för egenföretagare: 6 sätt att växa utan att anställa',
    subtitle: 'Hur soloföretagare använder AI som sin digitala assistent',
    excerpt:
      'Som soloföretagare är tid din knappaste resurs. AI kan fungera som din copywriter, analytiker, kundtjänst och projektledare – dygnet runt, utan lön. Så här ser det ut i praktiken.',
    header_image_url:
      'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800',
    published_at: '2026-02-19T09:00:00Z',
    type: 'article',
    category: 'Egenföretagare',
    status: 'published',
    content: `
<h2>Asymmetrin som förändrar spelplanen</h2>
<p>Stora företag har team av specialister: en marknadsavdelning, en ekonomiavdelning, en säljavdelning. Som egenföretagare är du allt detta på en gång. Det är en orimlig ekvation – och det är precis den ekvationen som AI börjar förändra på allvar. Det handlar inte om att AI ersätter din expertis eller din kundrelation. Det handlar om att AI kan ta hand om uppgifter som kräver tid och struktur men inte nödvändigtvis din unika kompetens.</p>

<h2>1. Offerter och kundkommunikation</h2>
<p>En välformulerad offert är skillnaden mellan att vinna och förlora ett uppdrag. Men att skriva en ny offert från grunden för varje kund tar tid – tid du inte har mitt i ett pågående projekt. Med AI: beskriv kunden, uppdraget, din lösning och ditt pris i punktform. Ge AI din befintliga offertmall som referens för ton och struktur. Få tillbaka en professionell offert på fem minuter. Du granskar, anpassar och skickar. Det som brukade ta 1–2 timmar tar nu 20 minuter. Samma princip gäller uppföljningsmejl, avtalsutkast och kundpresentationer.</p>

<h2>2. Marknadsföring och innehållsskapande</h2>
<p>Konsekvent närvaro på LinkedIn och i nyhetsbrev bygger varumärke och genererar leads. Det är också det som oftast faller bort när projekten staplas på varandra. Med AI kan du skapa en månads innehåll på ett par timmar. Ge verktyget din positionering, dina viktigaste ämnen, ton och målgrupp. Generera utkast, välj de bästa, redigera med din röst och schemalägg. Det viktiga: använd AI för att producera volym, men lägg din tid på att redigera med din unika röst och erfarenhet. Det är kombinationen av AI-hastighet och mänsklig autenticitet som fungerar.</p>

<h2>3. Research och omvärldsanalys</h2>
<p>Att hålla sig uppdaterad om sin bransch, analysera konkurrenter eller förstå ett nytt kundområde kräver tid. Nu kan du klistra in de viktigaste artiklarna och rapporterna i Claude och be om en sammanfattning med de insikter som är mest relevanta för just din fråga. Verktyget Perplexity AI är utmärkt för research med källhänvisningar – det söker, sammanfattar och citerar, allt i ett flöde.</p>

<h2>4. Administration och ekonomi</h2>
<p>Bokföring, fakturering, utgiftskategorisering – nödvändiga uppgifter som egenföretagare ofta skjuter upp. Verktyg som Fortnox och Visma har inbyggd AI som automatiserar kategorisering och skapar fakturaunderlag. Du kan dessutom använda ChatGPT eller Claude för att förstå momsregler och skatteavdrag utan att behöva ringa en revisor för varje enkel fråga. En viktig brasklapp: för komplexa skattefrågor ersätter AI inte en specialist.</p>

<h2>5. Kundservice och FAQ</h2>
<p>Om du har en hemsida och får återkommande frågor kan en AI-driven FAQ-bot svara dygnet runt utan att du behöver vara uppkopplad. Verktyg som Tidio och Intercom har gratisversioner med AI-chatbottar som du tränar med din specifika information. Du skapar innehållet, AI hanterar frågorna. Du svarar bara på de komplexa ärendena som kräver din personliga bedömning.</p>

<h2>6. Bollplank och problemlösning</h2>
<p>En av de mest underskattade användningarna: AI som mentor. Har du ett komplicerat kundproblem? Beskriv det för Claude och be om tre möjliga lösningsstrategier med för- och nackdelar. Funderar du på ett strategiskt beslut? Be AI utmana dina antaganden. Det är inte att AI har rätt svar – det är att processen att formulera problemet och diskutera det med ett verktyg som ställer följdfrågor ofta ger klarhet.</p>

<h2>Kom igång utan att göra det för stort</h2>
<p>Identifiera den uppgift du lägger mest tid på som inte kräver din unika expertis. Det är din startpunkt. Testa AI-hjälp på just den uppgiften i en vecka. Mät om det sparar tid. Bygg sedan gradvis vidare. Det vanligaste misstaget är att försöka implementera allt på en gång – det leder till överväldigande känsla och ingenting fastnar. En uppgift, en rutin, bygg gradvis.</p>
    `,
    user_profiles: {
      name: 'Lisa Johansson',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    },
  },

  // ─────────────────────────────────────────────
  // ARTIKEL 5
  // ─────────────────────────────────────────────
  {
    id: '5',
    slug: 'nar-ai-har-fel-hallucination-kallkritik',
    title: 'När AI ljuger med ett leende – så undviker du AI-hallucination',
    subtitle: 'Det viktigaste du behöver veta om AI:s begränsningar',
    excerpt:
      'AI-verktyg kan presentera felaktig information med total självförtroende. Det kallas hallucination – och det är det enskilt viktigaste du måste förstå för att använda AI ansvarsfullt.',
    header_image_url:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
    published_at: '2026-03-05T11:00:00Z',
    type: 'article',
    category: 'Källkritik',
    status: 'published',
    content: `
<h2>Problemet ingen vill prata om</h2>
<p>Det finns ett mönster i hur AI-entusiaster presenterar verktygen: imponerande demos, häpnadsväckande möjligheter, inspirerande framtidsscenarion. Det är sällan du hör: "Och ibland hittar det bara på saker och presenterar dem som fakta." Men det är precis vad som händer. Och det är det enskilt viktigaste du behöver förstå för att använda AI-verktyg ansvarsfullt och effektivt.</p>

<h2>Vad är hallucination – egentligen?</h2>
<p>AI-modeller fungerar inte som sökmotorer som hämtar information ur en databas. De genererar text baserat på statistiska mönster i träningsdata – de förutsäger vad nästa ord, mening och stycke rimligtvis borde vara utifrån kontexten. Det innebär att de inte "vet" om något är sant. De vet vad som är textuellt plausibelt. När de möter en fråga om något de inte har tillräcklig träningsdata om, fyller de luckor med information som låter rimlig. Det kan vara korrekt – eller komplett påhittad.</p>
<p>Det skrämmande är att du inte kan höra skillnaden på tonläget. AI är lika säker och flytande när det presenterar ett korrekt faktum som när det hittar på ett citat, en referens eller ett datum.</p>

<h2>Verkliga fall med konsekvenser</h2>
<p>I februari 2023 presenterade en advokat i New York AI-genererade rättsfall som stöd för sin argumentation i en federal domstol. Fallen existerade inte. Domstolen krävde förklaring, advokaten tvingades vittna om händelseförloppet och fick böter. OpenAI var inte ansvarigt – advokaten var det. En välkänd tidning publicerade samma år en artikel med ett citat från en offentlig person – ett citat som AI genererat och som aldrig sagts. Personen krävde rättelse och juridisk prövning följde.</p>
<p>Dessa är de spektakulära fallen. De vardagliga hallucinationerna är subtilare: fel statistik, en studie som inte riktigt sagt det AI påstår, ett datum som är felaktigt med ett år. Tillräckligt nära sanningen för att passera ouppmärksamt. Tillräckligt fel för att skapa problem.</p>

<h2>Var hallucinerar AI oftast?</h2>
<ul>
  <li><strong>Specifika fakta:</strong> Datum, siffror, statistik och procentsatser är riskzoner.</li>
  <li><strong>Källor och referenser:</strong> Be AI citera en källa och du kan få en referens som låter perfekt men inte existerar.</li>
  <li><strong>Nischad eller ny information:</strong> Ju mer specialiserat ämnet, desto större risk.</li>
  <li><strong>Aktuella händelser:</strong> AI-modeller har ett träningsdatum – saker efter det vet de inget om.</li>
  <li><strong>Juridik och medicin:</strong> Extra farliga områden eftersom konsekvenserna av fel kan vara allvarliga.</li>
</ul>

<h2>Fem regler för att arbeta säkert med AI</h2>
<p><strong>1. Verifiera alltid specifika fakta mot primärkällan.</strong> AI är fantastisk på sammanhang och struktur – inte på att vara ett faktaregister.</p>
<p><strong>2. Fråga efter källorna.</strong> Om AI inte kan ge en konkret källa är faktumet osäkert. Om det ger en källa – kontrollera att den finns.</p>
<p><strong>3. Var extra skeptisk mot siffror.</strong> Statistik, procentsatser och ekonomiska data är hallucinations-hotspots.</p>
<p><strong>4. Testa med frågor du vet svaret på.</strong> Innan du litar på AI för ett viktigt ämne, testa det med frågor du kan kontrollera.</p>
<p><strong>5. Behandla AI-svar som ett utkast.</strong> Allt AI producerar är ett startläge för din granskning och ditt omdöme, inte ett slutresultat.</p>

<h2>Rätt mental modell</h2>
<p>Tänk på AI som en extremt snabb, extremt välläst praktikant som ibland diktar upp detaljer när han eller hon är osäker men inte vill erkänna det. Du vill ha den praktikantens hjälp – den sparar massor av tid. Men du granskar deras arbete, du fakta-checkar deras påståenden, och du tar det slutliga ansvaret för vad som lämnar ditt skrivbord. Det är inte ett skäl att undvika AI. Det är ett skäl att använda det med rätt förväntningar och rätt rutiner.</p>
    `,
    user_profiles: {
      name: 'Thomas Lindgren',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas',
    },
  },

  // ─────────────────────────────────────────────
  // ARTIKEL 6
  // ─────────────────────────────────────────────
  {
    id: '6',
    slug: 'ai-och-jobben-vad-sager-forskningen',
    title: 'AI och jobben: Vad säger forskningen egentligen?',
    subtitle: 'Utan hysteri och utan naivitet – en nyanserad genomgång',
    excerpt:
      'Ska AI ta ditt jobb? Frågan ställs hela tiden men sällan med data. Vi går igenom vad forskningen faktiskt säger – och vad det betyder för dig som arbetar idag.',
    header_image_url:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    published_at: '2026-03-19T10:00:00Z',
    type: 'article',
    category: 'Trender',
    status: 'published',
    content: `
<h2>Den fråga alla ställer och ingen svarar ordentligt på</h2>
<p>Frågan dyker upp i varje konversation om AI: "Kommer det ta mitt jobb?" Svaret du ofta får är antingen naivt optimistiskt ("AI skapar fler jobb än det tar!") eller dramatiskt dystopiskt ("85% av alla jobb försvinner inom tio år!"). Båda saknar substans. Verkligheten är mer komplex, mer nyanserad och – om du förstår den – mer handlingsbar.</p>

<h2>Vad forskningen faktiskt säger</h2>
<p>McKinseys Global Institute visade i sin analys att upp till 30% av arbetsuppgifterna i de flesta jobb potentiellt kan automatiseras med nuvarande AI-teknik. Notera: uppgifter, inte jobb. Det är en viktig distinktion. Att 30% av en ekonoms uppgifter kan automatiseras innebär inte att 30% av alla ekonomer förlorar jobbet. Det innebär att de frigör 30% av sin tid för uppgifter som kräver mänskligt omdöme, kundrelation och strategisk analys. Det är en produktivitetsökning, inte en jobbförlust.</p>
<p>Goldman Sachs estimerade att generativ AI kan "exponera" 300 miljoner heltidsarbeten globalt för automatisering. Rubrikerna var apokalyptiska. Rapporten specificerade dock att "exponera" inte innebär "eliminera" – det innebär att delar av jobbet kan förändras och att produktiviteten ökar.</p>

<h2>Jobben som förändras mest – och varför</h2>
<p><strong>Administrativa roller:</strong> Datainmatning, schemaläggning, standardiserad rapportskrivning – uppgifter med tydliga regler och väldefinierade outputs är exakt vad AI gör bra.</p>
<p><strong>Kundservice:</strong> Chatbottar hanterar redan majoriteten av standardfrågor hos stora företag. Det som återstår för mänsklig kundtjänst är de komplexa, emotionellt laddade och unika ärendena.</p>
<p><strong>Grundläggande analys:</strong> AI kan bearbeta och sammanfatta data snabbare och billigare. Men att ställa rätt frågor till datan och kommunicera insikterna till beslutsfattare är fortfarande mänskliga styrkor.</p>
<p><strong>Rutinmässigt skrivande:</strong> Standardiserade pressreleaser och produktbeskrivningar görs redan till stor del av AI hos stora organisationer. Kreativt och analytiskt skrivande är fortfarande mänskligt.</p>

<h2>Jobben som är relativt skyddade – och varför</h2>
<p><strong>Social och emotionell intelligens:</strong> Terapi, vård, ledarskap, förhandling, mentorskap – allt som kräver genuin mänsklig förståelse och förtroende. AI kan simulera empati; det kan inte skapa den.</p>
<p><strong>Kreativitet i komplexa sammanhang:</strong> Att producera text är inte detsamma som att vara kreativ. Strategisk kreativitet – att identifiera vilken fråga man ska lösa, varför, för vem – är djupt mänsklig.</p>
<p><strong>Fysiska uppgifter i oförutsägbara miljöer:</strong> Rörmokare, elektriker, kirurger – yrken som kräver finmotorik och anpassning i verkliga, föränderliga miljöer.</p>
<p><strong>Komplex etisk bedömning:</strong> Domstolsbeslut, medicinsk diagnostik i edge cases, etiska avvägningar – situationer utan tydliga regler där omdöme och ansvar är oupplösligt sammankopplade.</p>

<h2>Vad historien lär oss – och var den lär oss ingenting</h2>
<p>Det vanligaste optimistiska argumentet är det historiska: ångmaskinen, elektriciteten, datorn, internet – alla förutspåddes leda till massarbetslöshet. Ingen av dem gjorde det. Det argumentet är delvis hållbart. Men det ignorerar en viktig skillnad: hastigheten. Industrialiseringen tog hundra år. Internet tog tjugo år. Nuvarande AI-utveckling rör sig på en tidsskala där anpassningsförmågan hos individer och utbildningssystem kan ha svårt att hålla jämna steg. Det är den legitima oro som finns under ytan.</p>

<h2>Den rätta frågan att ställa sig</h2>
<p>Istället för "Kommer AI ta mitt jobb?" – en fråga ingen kan svara på med säkerhet – är en mer handlingsbar fråga: "Vilka delar av mitt jobb kan AI göra – och vad innebär det för hur jag bör lägga min tid och bygga min kompetens?" Det är en fråga du kan svara på. Det är en fråga som leder till handling.</p>

<h2>Vad du konkret kan göra nu</h2>
<p>Investera i att lära dig använda AI. Inte för att rädda ditt jobb – utan för att bli mer värdefull på arbetsmarknaden. Den person som kan kombinera djup domänexpertis med förmåga att använda AI effektivt är mer produktiv, levererar mer och är svårare att ersätta – inte lättare. Det är precis vad AI-träningsprogram som Näringsklivets är byggt för: inte att göra dig till en AI-expert, utan att göra dig till en bättre yrkesperson med AI som ett av dina kraftfullaste verktyg.</p>
    `,
    user_profiles: {
      name: 'Anna Holm',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
    },
  },
];

// ─── Hjälpfunktioner ──────────────────────────────────────

export const getPublishedPosts = (): Post[] =>
  posts.filter(post => post.status === 'published');

export const getPostBySlug = (slug: string): Post | undefined =>
  posts.find(post => post.slug === slug && post.status === 'published');

export const getRelatedPosts = (currentPostId: string, limit = 3): Post[] =>
  posts
    .filter(p => p.id !== currentPostId && p.status === 'published')
    .slice(0, limit);

export const getPostsByCategory = (category: string): Post[] =>
  posts.filter(post => post.category === category && post.status === 'published');
// src/data/gdprFragorBlock2.ts
// Block 2: Praktiska situationer
// 12 scenarier om säkerhet, gallring, molntjänster, incidenter,
// integritetsavvägningar och komplexa BRF-situationer.

import type { SlideKFraga } from '../components/CourseElements/SlideTemplates';

export const gdprFragorBlock2: SlideKFraga[] = [

  // ── 1. Mobila enheter & kryptering ──────────────────
  {
    id: 1,
    persona: 'Erik',
    roll: 'Styrelseledamot, arbetar hemifrån',
    bild: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80',
    kategori: 'Säkerhet',
    rubrik: 'Dator hem',
    rubrikOrange: 'med medlemsregister',
    bubbla: '"Jag tar med jobbdatorn hem för att jobba ikväll. Den har lösenord — räcker det?"',
    fraga: 'Är detta säkert enligt GDPR?',
    typ: 'single',
    alternativ: [
      { text: 'Ja — lösenord räcker som skydd', korrekt: false },
      { text: 'Nej — personuppgifter får aldrig lämna föreningen', korrekt: false },
      { text: 'Det beror på om datorn också är krypterad', korrekt: true },
      { text: 'Ja — om Erik lovar att vara försiktig', korrekt: false },
    ],
    feedback: {
      rubrik: 'Kryptering är kravet för mobila enheter',
      sammanfattning: 'Lösenord är inte samma sak som kryptering. Om datorn stjäls kan en tekniskt kunnig person gå förbi inloggningen och komma åt hårddisken direkt. Endast heldiskkryptering skyddar data vid stöld.',
      sektioner: [
        {
          rubrik: 'Kryptering som standard',
          text: 'BitLocker (Windows) och FileVault (Mac) är gratis och bygger in skydd från start — Privacy by Design. Aktivera på alla enheter som hanterar personuppgifter.',
        },
        {
          rubrik: 'Policy för mobila enheter',
          text: 'Skriv riktlinjer: krav på kryptering, förbud mot öppna wifi utan VPN, rutiner vid förlust av enhet. Ha det dokumenterat innan något händer.',
        },
      ],
      exempel: 'Bättre: arbeta i molnlösningar (säkra sådana med PUB-avtal) istället för att ladda ner känslig data lokalt. Då försvinner risken med stulna enheter.',
    },
  },

  // ── 2. Gemensamt lösenord ────────────────────────────
  {
    id: 2,
    persona: 'Styrelsen',
    roll: 'Delar inloggning till ekonomisystemet',
    bild: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=400&q=80',
    kategori: 'Åtkomstkontroll',
    bubbla: '"Alla i styrelsen använder samma inloggning \\"BRF2024\\" till ekonomisystemet. Smidigt och enkelt!"',
    fraga: 'Vilka problem finns med detta?',
    typ: 'multiple',
    alternativ: [
      { text: 'Bryter mot principen om åtkomstbegränsning', korrekt: true },
      { text: 'Omöjligt att spåra vem som gjort vad', korrekt: true },
      { text: 'Svagt och gissningsbart lösenord', korrekt: true },
      { text: 'Ingen kan hållas ansvarig vid fel', korrekt: true },
    ],
    feedback: {
      rubrik: 'Fyra problem samtidigt',
      sammanfattning: 'Gemensamma lösenord är en av de vanligaste GDPR-bristerna i BRF:er. Det bryter mot flera grundprinciper samtidigt och gör det omöjligt att utreda incidenter.',
      sektioner: [
        {
          rubrik: 'Behovsanpassad åtkomst',
          text: 'GDPR kräver att endast de som behöver uppgifter för sitt arbete ska ha tillgång. Behöver verkligen alla ledamöter se alla ekonomiska uppgifter? Troligen inte.',
        },
        {
          rubrik: 'Spårbarhet',
          text: 'Om något går fel — vem gjorde det? Vid gemensamt lösenord kan ingen avgöra. Både för IMY och internt är det ett stort problem.',
        },
      ],
      exempel: 'Rätt: unika inloggningar per ledamot, rollbaserade behörigheter (kassör ser ekonomi, sekreterare ser protokoll), tvåfaktorsautentisering på känsliga system.',
    },
  },

  // ── 3. Gallringsperioder för kamera ─────────────────
  {
    id: 3,
    persona: 'Styrelsen',
    roll: 'Efter kamerainstallation',
    bild: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    kategori: 'Gallring',
    rubrik: 'Hur länge får',
    rubrikOrange: 'inspelningar sparas?',
    bubbla: '"Vår kamera börjar fungera nu. Hur länge får vi spara inspelningarna om inget händer?"',
    fraga: 'Vilken lagringstid gäller?',
    typ: 'single',
    alternativ: [
      { text: 'Så länge styrelsen vill', korrekt: false },
      { text: 'Högst 30 dagar — ofta rekommenderas 72 timmar', korrekt: true },
      { text: 'Minst 6 månader för att kunna utreda brott', korrekt: false },
      { text: 'Exakt 90 dagar enligt lag', korrekt: false },
    ],
    feedback: {
      rubrik: 'Kort lagring — kraftigt intrång kräver minimering',
      sammanfattning: 'Kameraövervakning är ett stort integritetsintrång. Ju längre ni sparar, desto större intrång. Praxis: max 30 dagar, ofta rekommenderas 72 timmar. Undantag vid incidenter.',
      sektioner: [
        {
          rubrik: 'Vid incident',
          text: 'Om en stöld eller skadegörelse inträffar får relevant material sparas längre för utredningsändamål. Men allt övrigt material från samma period ska ändå raderas efter normal gallringstid.',
        },
        {
          rubrik: 'Tekniskt genomförande',
          text: 'Modern kamerautrustning har automatisk överskrivning. Konfigurera tydligt och dokumentera inställningen. Då blir gallringen automatisk — ingen risk för att glömma.',
        },
      ],
      exempel: 'Rätt: 72-timmars rotation + polisanmäld händelse = sparat material skickas till polisen, inte kvar på er server.',
    },
  },

  // ── 4. Publicera protokoll på hemsidan ──────────────
  {
    id: 4,
    persona: 'Webbansvarig',
    roll: 'Uppdaterar föreningens hemsida',
    bild: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80',
    kategori: 'Transparens vs integritet',
    bubbla: '"Vi vill publicera styrelseprotokollet på hemsidan. Det innehåller beslut att neka lgh 305 tillstånd för balkongförlängning."',
    fraga: 'Hur bör protokollet hanteras vid publicering?',
    typ: 'single',
    alternativ: [
      { text: 'Publicera som det är — transparens är bra', korrekt: false },
      { text: 'Aldrig publicera personuppgifter offentligt', korrekt: false },
      { text: 'Publicera men anonymisera lägenhetsnummer', korrekt: true },
      { text: 'Publicera bara om medlemmen ger samtycke', korrekt: false },
    ],
    feedback: {
      rubrik: 'Anonymisera vid publicering',
      sammanfattning: 'Internt protokoll får ha full information. Offentligt publicerat protokoll ska anonymiseras där det är rimligt — medlemmarna behöver veta att beslut fattas, inte vem som drabbats.',
      sektioner: [
        {
          rubrik: 'Uppgiftsminimering gäller även här',
          text: 'Behöver alla medlemmar veta EXAKT vilken lägenhet som nekats? Nej. Behöver de veta att typ av beslut fattats? Ja. Anonymiseringen respekterar båda behoven.',
        },
        {
          rubrik: 'Intern vs offentlig version',
          text: 'Håll två versioner: fullständigt protokoll i föreningens interna arkiv (med tillgång för medlemmar vid behov) — anonymiserad version på hemsidan.',
        },
      ],
      exempel: 'Publicerad version: "Beslut: Tillståndsansökan för balkongförlängning nekad pga byggnadstekniska skäl. Sökande informerad separat." — full info stannar internt.',
    },
  },

  // ── 5. Google Docs med privata konton ───────────────
  {
    id: 5,
    persona: 'Styrelsen',
    roll: 'Vill börja samarbeta digitalt',
    bild: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80',
    kategori: 'Molntjänster',
    rubrik: 'Privata konton för',
    rubrikOrange: 'föreningsdata?',
    bubbla: '"Vi tänkte börja skriva protokoll i Google Docs. Alla använder sina privata Google-konton — smidigt, eller hur?"',
    fraga: 'Vilka risker finns med upplägget?',
    typ: 'multiple',
    alternativ: [
      { text: 'Åtkomst kvarstår när ledamöter slutar', korrekt: true },
      { text: 'Google kan ha servrar utanför EU — kräver extra skydd', korrekt: true },
      { text: 'Privata konton kan ha svaga lösenord eller vara hackade', korrekt: true },
      { text: 'Inget PUB-avtal finns med privata konton', korrekt: true },
      { text: 'Ingen risk — Google är en säker leverantör', korrekt: false },
    ],
    feedback: {
      rubrik: 'Privata konton för föreningsdata = hög risk',
      sammanfattning: 'Google Docs är inte problemet — privata Google-konton är det. Föreningen förlorar kontroll över både data, åtkomst och säkerhet när allt ligger på ledamöternas personliga konton.',
      sektioner: [
        {
          rubrik: 'Kontrollförlust',
          text: 'När Per slutar i styrelsen har han fortfarande åtkomst till alla protokoll i sin privata Drive. Föreningen kan inte återkalla åtkomsten — bara be snällt.',
        },
        {
          rubrik: 'Dataplacering',
          text: 'Google kan lagra data på servrar utanför EU. Överföring till tredje land kräver särskilda skyddsåtgärder (Standard Contractual Clauses). Har ni kontrollerat det?',
        },
      ],
      exempel: 'Rätt: Google Workspace för organisationer (med föreningsmejl och PUB-avtal) eller alternativ molnlösning där föreningen äger kontona och kan återkalla åtkomst.',
    },
  },

  // ── 6. Avliden medlem ──────────────────────────────
  {
    id: 6,
    persona: 'Styrelsen',
    roll: 'Medlem har avlidit',
    bild: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80',
    kategori: 'Gallring',
    bubbla: '"En av våra medlemmar har avlidit. Ska vi radera alla uppgifter direkt, eller vänta?"',
    fraga: 'Vad gäller juridiskt?',
    typ: 'single',
    alternativ: [
      { text: 'Radera omedelbart — GDPR kräver det', korrekt: false },
      { text: 'Spara tills bouppteckning klar, sedan gallra enligt plan', korrekt: true },
      { text: 'Gör ingenting — döda personer omfattas inte av GDPR', korrekt: false },
      { text: 'Be dödsboet om samtycke till fortsatt lagring', korrekt: false },
    ],
    feedback: {
      rubrik: 'Andra lagar gäller även när GDPR upphör',
      sammanfattning: 'GDPR gäller endast levande personer. När någon avlider upphör GDPR att gälla — men andra lagar (bokföringslagen) gäller fortfarande. Och praktiska behov kvarstår.',
      sektioner: [
        {
          rubrik: 'Under bouppteckningen',
          text: 'Dödsboet kan behöva uppgifter om avgifter, skulder, överlåtelser, pågående ärenden. Radera inte innan processen är klar — det kan försvåra för efterlevande.',
        },
        {
          rubrik: 'Efter avslut',
          text: 'Ekonomiska handlingar måste sparas 7 år enligt bokföringslagen (även för avlidna). Övrigt (kontaktuppgifter, fritextkommentarer) kan raderas enligt normal gallringsplan.',
        },
      ],
      exempel: 'Respektfull hantering även när lagen inte längre kräver det. Markera i systemet "avliden + datum" — behåll nödvändigt, radera övrigt varsamt.',
    },
  },

  // ── 7. Marknadsföring från tredje part ─────────────
  {
    id: 7,
    persona: 'Solpanelsbolaget AB',
    roll: 'Extern försäljare',
    bild: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&q=80',
    kategori: 'Utlämning',
    rubrik: 'Kan vi få era',
    rubrikOrange: 'medlemmars mejl?',
    bubbla: '"Vi vill skicka erbjudande om solceller till era medlemmar. Kan ni lämna ut mejladresserna? Erbjudandet är bra för dem!"',
    fraga: 'Vad ska styrelsen svara?',
    typ: 'single',
    alternativ: [
      { text: 'Ja — om företaget betalar en avgift', korrekt: false },
      { text: 'Ja — erbjudandet är ju bra för medlemmarna', korrekt: false },
      { text: 'Nej — personuppgifter lämnas inte ut för marknadsföring', korrekt: true },
      { text: 'Ja — om medlemmarna får chans att tacka nej först', korrekt: false },
    ],
    feedback: {
      rubrik: 'Medlemsuppgifter stannar inom föreningen',
      sammanfattning: 'Ändamålsbegränsning är en GDPR-kärnprincip. Ni fick uppgifterna för att administrera medlemskapet — inte för att lämna ut till tredje part för marknadsföring. Oavsett hur bra erbjudandet är.',
      sektioner: [
        {
          rubrik: 'Ingen laglig grund finns',
          text: 'Samtycke krävs för marknadsföring, och det måste vara aktivt och specifikt. "Om vi inte hör något antar vi att det är okej" räknas inte. Medlemmarna har inte gett det för detta syfte.',
        },
        {
          rubrik: 'Förtroendet',
          text: 'Om medlemmar börjar få extern marknadsföring som uppenbarligen kommer från att ni lämnat ut deras uppgifter tappar de förtroendet för hela GDPR-hanteringen.',
        },
      ],
      exempel: 'Föreslå alternativ till företaget: annonsera på er anslagstavla, skicka broschyr per post (ingen personuppgift behövs), eller låt intresserade medlemmar kontakta dem själva.',
    },
  },

  // ── 8. Anonymiserade enkäter ────────────────────────
  {
    id: 8,
    persona: 'Styrelsen',
    roll: 'Planerar medlemsenkät',
    bild: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80',
    kategori: 'Uppgiftsminimering',
    bubbla: '"Vi vill skicka en nöjdhetsenkät med frågor om ålder, kön och hur länge medlemmar bott. Behöver vi samtycke?"',
    fraga: 'Vad är den enklaste lagliga lösningen?',
    typ: 'single',
    alternativ: [
      { text: 'Samla alltid samtycke innan enkäter', korrekt: false },
      { text: 'Gör enkäten helt anonym — då gäller inte GDPR', korrekt: true },
      { text: 'Använd berättigat intresse som grund', korrekt: false },
      { text: 'Spara svaren max 30 dagar', korrekt: false },
    ],
    feedback: {
      rubrik: 'Anonymitet är bästa lösningen',
      sammanfattning: 'Om enkätsvaren inte kan kopplas till en specifik person är det inte personuppgifter — och GDPR gäller inte. Det är den enklaste vägen för de flesta undersökningar.',
      sektioner: [
        {
          rubrik: 'Så gör ni anonymt',
          text: 'Inget namn, inget lägenhetsnummer, inga kontaktuppgifter. Demografisk data i spann ("25-35 år" istället för exakt ålder). Använd ett enkätverktyg som inte loggar IP-adresser.',
        },
        {
          rubrik: 'Om inte anonymt',
          text: 'Då krävs laglig grund (troligen berättigat intresse för att förbättra föreningen), informationsplikt innan enkäten, och plan för gallring när analysen är klar.',
        },
      ],
      exempel: 'Rätt: Google Forms eller liknande utan inloggning, utan IP-loggning, demografiska spann. Resultatet: massor av data utan GDPR-problem.',
    },
  },

  // ── 9. Svart lista ─────────────────────────────────
  {
    id: 9,
    persona: 'En ledamot',
    roll: 'Föreslår "problem-register"',
    bild: 'https://images.unsplash.com/photo-1573164713619-24c711fe7878?w=400&q=80',
    kategori: 'Integritet',
    rubrik: 'Lista över',
    rubrikOrange: 'problemmedlemmar?',
    bubbla: '"Vi borde föra en lista över medlemmar som stört ofta eller varit jobbiga. Så vi vet vilka vi ska vara extra försiktiga med."',
    fraga: 'Är detta förenligt med GDPR?',
    typ: 'single',
    alternativ: [
      { text: 'Ja — om listan bara ses av styrelsen', korrekt: false },
      { text: 'Ja — om informationen stämmer', korrekt: false },
      { text: 'Nej — strider mot flera grundprinciper och kan vara diskriminerande', korrekt: true },
      { text: 'Ja — om medlemmarna informeras', korrekt: false },
    ],
    feedback: {
      rubrik: 'Kategorisering av personer = stora risker',
      sammanfattning: 'En "svart lista" strider mot flera GDPR-principer samtidigt: proportionalitet, uppgiftsminimering, korrekthet. Dessutom finns risk för diskriminering om vissa grupper systematiskt markeras negativt.',
      sektioner: [
        {
          rubrik: 'Subjektivitet i registret',
          text: '"Problemmedlem" är inte en objektiv kategori. Vem avgör? Utifrån vilka kriterier? Kan leda till att medlemmar som bara vågar klaga systematiskt stämplas som jobbiga.',
        },
        {
          rubrik: 'Rätt fokus: händelser',
          text: 'Dokumentera ärenden, inte personer. Varje händelse hanteras sakligt, dokumenteras med fakta, och gallras när ärendet är avslutat. Inte "person X är problem" — utan "ärende X har hanterats".',
        },
      ],
      exempel: 'Rätt: "Störningsärende lgh 204/306, 15/3 2024, åtgärd genomförd, ärende avslutat 28/3" — fakta om händelsen, inte en stämpel på personen.',
    },
  },

  // ── 10. Myndighetsbegäran ──────────────────────────
  {
    id: 10,
    persona: 'Kronofogden',
    roll: 'Begär uppgifter om medlem',
    bild: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    kategori: 'Myndigheter',
    bubbla: '"Vi begär uppgifter om era medlem [namn] med stöd i utsökningsbalken. Hur hanterar ni en sådan begäran?"',
    fraga: 'Vad gäller för myndighetsbegäran?',
    typ: 'single',
    alternativ: [
      { text: 'GDPR hindrar utlämning, även till myndigheter', korrekt: false },
      { text: 'GDPR hindrar inte utlämning när myndighet kräver med lagstöd', korrekt: true },
      { text: 'Ni måste be medlemmen om samtycke först', korrekt: false },
      { text: 'Ni måste anmäla till IMY innan ni lämnar ut', korrekt: false },
    ],
    feedback: {
      rubrik: 'Rättslig förpliktelse — ingen konflikt med GDPR',
      sammanfattning: 'När en myndighet med laglig rätt begär uppgifter är det en rättslig förpliktelse att lämna ut dem. GDPR hindrar inte — tvärtom ger GDPR:s artikel om rättslig förpliktelse grund för utlämningen.',
      sektioner: [
        {
          rubrik: 'Verifiera begäran',
          text: 'Kontrollera avsändaren (officiell adress, officiell myndighet?). Begäran ska ange lagstöd (t.ex. utsökningsbalken, offentlighets- och sekretesslagen). Lämna bara ut exakt vad som begärts — inte mer.',
        },
        {
          rubrik: 'Dokumentera',
          text: 'Spara begäran och ert svar. Det är er trygghet om medlemmen senare frågar varför ni lämnade ut uppgifter.',
        },
      ],
      exempel: 'Rätt rutin: ha en utpekad kontaktperson för myndighetsärenden, verifiera identiteten, lämna bara exakt begärt, dokumentera. Samtycke krävs inte.',
    },
  },

  // ── 11. Leverantörsbyte ────────────────────────────
  {
    id: 11,
    persona: 'Styrelsen',
    roll: 'Appen har sålts',
    bild: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    kategori: 'Biträden',
    rubrik: 'Vår app har',
    rubrikOrange: 'nya ägare',
    bubbla: '"Bokningsappen vi använder har sålts till ett företag i USA. Vad ska vi göra?"',
    fraga: 'Vilka åtgärder krävs?',
    typ: 'multiple',
    alternativ: [
      { text: 'Informera medlemmarna om förändringen', korrekt: true },
      { text: 'Se över personuppgiftsbiträdesavtalet', korrekt: true },
      { text: 'Bedöma om överföring till USA är laglig', korrekt: true },
      { text: 'Kontrollera att skyddet uppfyller GDPR', korrekt: true },
      { text: 'Ingenting — leverantörens ansvar', korrekt: false },
    ],
    feedback: {
      rubrik: 'Ni är fortfarande ansvariga',
      sammanfattning: 'Ni är personuppgiftsansvariga oavsett vilken leverantör som driver verktyget. När ert biträde byter ägare eller flyttar data måste ni agera — annars riskerar ni att stå utan laglig grund för behandlingen.',
      sektioner: [
        {
          rubrik: 'Tredjelandsöverföring',
          text: 'Överföring till USA kräver särskilda skyddsåtgärder. Standard Contractual Clauses (SCC) är den vanligaste. Be om dokumentation att det nya bolaget har det på plats.',
        },
        {
          rubrik: 'Informationsplikt',
          text: 'Medlemmar ska informeras när deras uppgifter hanteras på nytt sätt eller av ny aktör. En kort notis i medlemsbrev eller hemsida räcker — men den måste skickas.',
        },
      ],
      exempel: 'Ha alltid alternativ. Var inte beroende av en enda leverantör. Om den nya situationen inte är acceptabel: byt app. Det är värt att byta än att försätta medlemmarna i risk.',
    },
  },

  // ── 12. När felet redan skett ──────────────────────
  {
    id: 12,
    persona: 'Styrelsen',
    roll: 'Insett att ett beslut var fel',
    bild: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80',
    kategori: 'Efterhantering',
    bubbla: '"Vi har insett att vi inte hanterat en medlems uppgifter korrekt. Nu då?"',
    fraga: 'Vad är rätt vägen framåt?',
    typ: 'multiple',
    alternativ: [
      { text: 'Medge felet och ompröva beslutet', korrekt: true },
      { text: 'Kontakta den drabbade och be om ursäkt', korrekt: true },
      { text: 'Dokumentera både felet, insikten och åtgärderna', korrekt: true },
      { text: 'Granska rutinerna så samma fel inte upprepas', korrekt: true },
      { text: 'Förneka att felet skedde för att undvika IMY-granskning', korrekt: false },
    ],
    feedback: {
      rubrik: 'Ärlighet är både rätt och klokt',
      sammanfattning: 'Att medge fel, agera snabbt och åtgärda systemet är både det moraliskt rätta och det juridiskt smartaste. IMY och domstolar ser positivt på föreningar som själva identifierar brister och rättar till.',
      sektioner: [
        {
          rubrik: 'Juridisk fördel',
          text: 'En förening som själv upptäcker och åtgärdar fel står betydligt bättre vid eventuell tillsyn. Förnekande efter att felet är uppenbart är försvårande — medgivande och åtgärd är förmildrande.',
        },
        {
          rubrik: 'Förtroende',
          text: 'Föreningar lever på förtroende mellan grannar. En ärlig hantering av misstag bygger långsiktigt förtroende, även om det känns obekvämt i stunden.',
        },
      ],
      exempel: 'Rätt: brev till drabbad medlem med ursäkt, beslutet omprövas på nästa möte, ändring i rutinerna protokollförs, incident dokumenteras (även om inte anmälningspliktig).',
    },
  },

];
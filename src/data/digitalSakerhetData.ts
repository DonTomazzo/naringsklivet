// src/data/digitalSakerhetData.ts
// Kursdata för "Digital säkerhet för alla"
// Lägg till i naringsklivetData.ts eller importera separat

export const digitalSakerhetKurs = {
  id: 'digital-sakerhet-for-alla',
  slug: 'digital-sakerhet-for-alla',
  title: 'Digital säkerhet för alla',
  subtitle: 'Skydda dig, din data och din arbetsplats',
  description: 'En komplett kurs i digital säkerhet för medarbetare. Från lösenord och 2FA till identitetsskydd och vad du gör när något gått fel.',
  platform: ['styrelsekorkortet', 'naringsklivet'],
  price: 1490,
  duration: '~3 timmar',
  level: 'Nybörjare – Medel',
  certificate: true,
  instructor: 'Tomas Mauritzson',
  previewVideoUrl: '', // lägg till YouTube-ID
  coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
  faq: [
    { q: 'Behöver jag förkunskaper?', a: 'Nej — kursen är gjord för alla, oavsett teknisk bakgrund.' },
    { q: 'Hur lång tid tar kursen?', a: 'Ungefär 3 timmar totalt, men du tar det i din egen takt.' },
    { q: 'Får jag ett certifikat?', a: 'Ja, du får ett kursbevis när du genomfört alla moduler.' },
  ],

  // ── 14 moduler ─────────────────────────────────────────
  modules: [

    // ══ PRIVAT (Modul 1–7) ══════════════════════════════

    {
      id: 1, slug: 'digital-sakerhet-losenord',
      title: 'Lösenord & lösenordshanterare',
      description: 'Varför svaga lösenord är den vanligaste orsaken till intrång — och hur du enkelt skapar starka lösenord med hjälp av en lösenordshanterare.',
      icon: '🔐',
      duration: '15 min',
      slides: 6,
      skrackExempel: '3 434 arbetsplatser drabbades förra året av intrång via stulna lösenord',
      nulage: '65% av alla återanvänder samma lösenord på flera tjänster',
      losning: 'Lösenordshanterare + unika lösenord på 12+ tecken',
      femMinuter: 'Installera Bitwarden och byt lösenord på dina 3 viktigaste konton',
    },

    {
      id: 2, slug: 'digital-sakerhet-2fa',
      title: 'Tvåfaktorsautentisering (2FA)',
      description: 'Det enkla extra steget som blockerar 99% av automatiserade attacker — även om ditt lösenord är stulet.',
      icon: '📱',
      duration: '12 min',
      slides: 6,
      skrackExempel: '1,2 miljoner konton kapades i en dag — alla saknade 2FA',
      nulage: 'Endast 28% av svenska internetanvändare har aktiverat 2FA',
      losning: 'Aktivera 2FA med authenticator-app (ej SMS) på alla viktiga konton',
      femMinuter: 'Ladda ner Google Authenticator och aktivera 2FA på din e-post',
    },

    {
      id: 3, slug: 'digital-sakerhet-phishing',
      title: 'Bedrägerier & phishing',
      description: 'Lär dig känna igen falska mejl, SMS och samtal — och vad du gör om du råkat klicka.',
      icon: '🎣',
      duration: '18 min',
      slides: 7,
      skrackExempel: 'En enda phishing-attack kostade ett medelstort företag 4,2 miljoner kr',
      nulage: '91% av alla cyberattacker börjar med ett phishing-mejl',
      losning: 'Verifiera alltid avsändaren — klicka aldrig på okända länkar',
      femMinuter: 'Kolla 3 misstänkta mejl i din inkorg med checklistan',
    },

    {
      id: 4, slug: 'digital-sakerhet-identitet',
      title: 'Identitet & personuppgifter',
      description: 'Personnummer, kreditupplysningar och ID-kapning — vad som är en risk och exakt vad du gör om det händer.',
      icon: '🪪',
      duration: '20 min',
      slides: 7,
      skrackExempel: '87 000 anmälningar om ID-kapning gjordes i Sverige förra året',
      nulage: 'Ditt personnummer räcker för att ta lån i ditt namn',
      losning: 'Frys din kreditupplysning och övervaka ditt ID aktivt',
      femMinuter: 'Gå till UC.se och lägg en kreditspärr — tar 5 minuter',
    },

    {
      id: 5, slug: 'digital-sakerhet-enheter',
      title: 'Enheter & nätverk',
      description: 'Dator, mobil och hemnätverk — hur du skyddar dem alla med enkla åtgärder.',
      icon: '📶',
      duration: '16 min',
      slides: 6,
      skrackExempel: 'En osäkrad router gav angripare tillgång till ett helt kontorsnätverk',
      nulage: '70% av hemnätverk använder fortfarande tillverkarens standardlösenord',
      losning: 'Uppdatera router, aktivera WPA3 och separera gästnätverk',
      femMinuter: 'Byt routerlösenord och aktivera automatiska uppdateringar på datorn',
    },

    {
      id: 6, slug: 'digital-sakerhet-backup',
      title: 'Backup & återställning',
      description: 'Det som faktiskt räddar dig när något gått fel — och hur du sätter upp ett system som fungerar.',
      icon: '💾',
      duration: '14 min',
      slides: 6,
      skrackExempel: 'Ransomware låste 40 000 patientjournaler — sjukhuset hade ingen backup',
      nulage: 'Hälften av alla som förlorar data har aldrig haft en backup',
      losning: '3-2-1-regeln: 3 kopior, 2 medier, 1 offsite',
      femMinuter: 'Aktivera iCloud/OneDrive automatisk säkerhetskopiering nu',
    },

    {
      id: 7, slug: 'digital-sakerhet-nar-det-hander',
      title: 'När något har gått fel',
      description: 'Konto kapat? Bankbedrägeri? Steg för steg — vad du gör de första 30 minuterna.',
      icon: '🚨',
      duration: '15 min',
      slides: 6,
      skrackExempel: 'En medarbetare väntade 3 dagar med att rapportera — det kostade 800 000 kr extra',
      nulage: 'De flesta vet inte vart de ska vända sig eller vad de ska göra först',
      losning: 'Ha en plan klar i förväg — agera snabbt de första 30 minuterna',
      femMinuter: 'Spara nödnumren: bank, polisen och IT-support i kontakterna nu',
    },

    // ══ ARBETSPLATSEN (Modul 8–14) ══════════════════════

    {
      id: 8, slug: 'digital-sakerhet-phishing-jobb',
      title: 'Phishing på jobbet',
      description: 'VD-bedrägeri, falska fakturor och riktade attacker mot din organisation — hur de ser ut och hur du stoppar dem.',
      icon: '📧',
      duration: '18 min',
      slides: 7,
      skrackExempel: 'En bokförare betalade 2,3 miljoner till fel konto efter ett VD-mejl',
      nulage: 'Riktade phishing-attacker (spear phishing) ökar med 65% per år',
      losning: 'Ring alltid och bekräfta innan du genomför betalningar eller delar data',
      femMinuter: 'Gör ett test — skicka ett simulerat phishing-mejl till dig själv',
    },

    {
      id: 9, slug: 'digital-sakerhet-gdpr',
      title: 'GDPR & personuppgifter på jobbet',
      description: 'Vad du som medarbetare faktiskt måste veta om GDPR — och vad som händer om du gör fel.',
      icon: '📋',
      duration: '20 min',
      slides: 7,
      skrackExempel: 'Ett företag fick 4 miljoner i böter efter att en medarbetare skickat fel fil',
      nulage: '60% av GDPR-incidenter orsakas av mänskliga misstag, inte hackers',
      losning: 'Fråga alltid — behöver jag detta, och har jag rätt att hantera det?',
      femMinuter: 'Kolla din inkorg — finns det personuppgifter som inte borde vara där?',
    },

    {
      id: 10, slug: 'digital-sakerhet-kommunikation',
      title: 'Säker kommunikation',
      description: 'E-post, Teams, Slack och SMS — vad som är säkert att dela var och hur du krypterar känslig information.',
      icon: '💬',
      duration: '14 min',
      slides: 6,
      skrackExempel: 'Känsliga kunduppgifter skickades av misstag till en extern mejladress',
      nulage: 'Okrypterad e-post kan läsas av vem som helst längs vägen',
      losning: 'Använd rätt kanal för rätt information — aldrig personnummer i mejl',
      femMinuter: 'Aktivera kryptering i din e-postklient om det inte redan är på',
    },

    {
      id: 11, slug: 'digital-sakerhet-enheter-jobb',
      title: 'Enhetssäkerhet på jobbet',
      description: 'Jobbdatorn, mobilen och vad du gör när du arbetar hemifrån eller på resande fot.',
      icon: '💻',
      duration: '15 min',
      slides: 6,
      skrackExempel: 'En bärbar dator glömdes på tåget — innehöll 50 000 kunduppgifter',
      nulage: '1 av 5 bärbara datorer som försvinner saknar kryptering',
      losning: 'Helhetskryptering (BitLocker/FileVault) + lås skärmen alltid',
      femMinuter: 'Kontrollera att din jobbdator har BitLocker eller FileVault aktiverat',
    },

    {
      id: 12, slug: 'digital-sakerhet-incidenter',
      title: 'Incidenthantering på jobbet',
      description: 'Vad du gör de första minuterna — och hur du rapporterar rätt utan att förvärra situationen.',
      icon: '🆘',
      duration: '16 min',
      slides: 6,
      skrackExempel: 'Fördröjd rapportering förvandlade ett mindre intrång till ett katastrofalt dataintrång',
      nulage: 'Genomsnittlig tid att upptäcka ett intrång: 207 dagar',
      losning: 'Rapportera direkt — det finns inga dumma larm, bara sena',
      femMinuter: 'Ta reda på vem du ska kontakta på din arbetsplats om du misstänker ett intrång',
    },

    {
      id: 13, slug: 'digital-sakerhet-ai-hot',
      title: 'AI-verktyg & nya hot',
      description: 'Deepfakes, AI-genererad phishing och vad du faktiskt kan lägga in i ChatGPT — och vad du aldrig bör göra.',
      icon: '🤖',
      duration: '18 min',
      slides: 7,
      skrackExempel: 'En CFO överförde 200 miljoner HKD efter ett deepfake-videomöte',
      nulage: 'AI-genererade phishing-mejl är nu omöjliga att skilja från riktiga',
      losning: 'Verifiera alltid via andra kanaler — och lägg aldrig in kunddata i AI-verktyg',
      femMinuter: 'Kolla din organisations policy för AI-verktyg — finns det en?',
    },

    {
      id: 14, slug: 'digital-sakerhet-kultur',
      title: 'Säkerhetskultur — allas ansvar',
      description: 'Varför teknik ensam aldrig räcker — och hur du bidrar till en organisation där alla ser sig som en del av försvaret.',
      icon: '🤝',
      duration: '14 min',
      slides: 6,
      skrackExempel: 'Världens dyraste intrång började med att en anställd höll upp dörren för en "tekniker"',
      nulage: 'Mänskliga faktorn är inblandad i 95% av alla säkerhetsincidenter',
      losning: 'Säkerhet är en vana, inte en produkt — bygg rätt beteenden varje dag',
      femMinuter: 'Dela kursen med en kollega och diskutera en sak ni kan göra bättre',
    },
  ],
};

export default digitalSakerhetKurs;
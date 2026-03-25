import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  sv: {
    translation: {
      // Hero Section
      "hero_highlight": "Kvalitetssäkra",
      "hero_title": "er bostadsrättsförening idag och bli",
      "hero_highlight2": "tryggare i din styrelse",
      "hero_title_end": "roll",
      "hero_subtitle": "Om 8 veckor kommer du att vara den styrelseledamot som:",
      "hero_benefits": [
        "Förstår varenda post i årsredovisningen",
        "Leder komplicerade diskussioner med självförtroende",
        "Sparar föreningen tusentals kronor genom smart förhandling",
        "Hanterar konflikter innan de exploderar"
      ],
      "cta_expert": "JA, jag vill bli expert!",
      "cta_video": "Se transformation (2 min)",
      
      // Navigation
      "nav_content": "Kursens innehåll",
      "nav_reviews": "Omdömen",
      "nav_course": "Kursinnehåll",
      "nav_guarantee": "Garanti",
      "nav_faq": "Vanliga frågor",
      
      // Pricing
      "price_offer": "Erbjudande",
      "price_save": "Spara 2 000 kr - bara denna vecka",
      "secure_spot": "Säkra min plats nu",
      
      // Testimonials
      "testimonials_title": "Verkliga resultat från verkliga människor",
      "testimonials_subtitle": "Se exakt vad som händer när du går från osäker till expert"
    }
  },
  da: {
    translation: {
      // Hero Section
      "hero_highlight": "Kvalitetssikr",
      "hero_title": "jeres boligforening i dag og bliv",
      "hero_highlight2": "mere tryg i din bestyrelses",
      "hero_title_end": "rolle",
      "hero_subtitle": "Om 8 uger vil du være det bestyrelsesmedlem som:",
      "hero_benefits": [
        "Forstår hver post i årsregnskabet",
        "Leder komplicerede diskussioner med selvtillid",
        "Sparer foreningen tusindvis af kroner gennem smart forhandling",
        "Håndterer konflikter før de eksploderer"
      ],
      "cta_expert": "JA, jeg vil blive ekspert!",
      "cta_video": "Se transformation (2 min)",
      
      // Navigation
      "nav_content": "Kursusindhold",
      "nav_reviews": "Anmeldelser",
      "nav_course": "Kursusindhold",
      "nav_guarantee": "Garanti",
      "nav_faq": "Ofte stillede spørgsmål",
      
      // Pricing
      "price_offer": "Tilbud",
      "price_save": "Spar 2 000 kr - kun denne uge",
      "secure_spot": "Sikr min plads nu",
      
      // Testimonials
      "testimonials_title": "Virkelige resultater fra virkelige mennesker",
      "testimonials_subtitle": "Se præcis hvad der sker når du går fra usikker til ekspert"
    }
  },
  no: {
    translation: {
      // Hero Section
      "hero_highlight": "Kvalitetssikre",
      "hero_title": "deres borettslag i dag og bli",
      "hero_highlight2": "tryggere i din styre",
      "hero_title_end": "rolle",
      "hero_subtitle": "Om 8 uker vil du være det styremedlemmet som:",
      "hero_benefits": [
        "Forstår hver post i årsregnskapet",
        "Leder kompliserte diskusjoner med selvtillit",
        "Sparer foreningen tusenvis av kroner gjennom smart forhandling",
        "Håndterer konflikter før de eksploderer"
      ],
      "cta_expert": "JA, jeg vil bli ekspert!",
      "cta_video": "Se transformasjon (2 min)",
      
      // Navigation
      "nav_content": "Kursinnhold",
      "nav_reviews": "Anmeldelser",
      "nav_course": "Kursinnhold",
      "nav_guarantee": "Garanti",
      "nav_faq": "Vanlige spørsmål",
      
      // Pricing
      "price_offer": "Tilbud",
      "price_save": "Spar 2 000 kr - bare denne uken",
      "secure_spot": "Sikre min plass nå",
      
      // Testimonials
      "testimonials_title": "Virkelige resultater fra virkelige mennesker",
      "testimonials_subtitle": "Se nøyaktig hva som skjer når du går fra usikker til ekspert"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'sv',
    fallbackLng: 'sv',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
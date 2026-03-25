import AiDailyLifeSection from '../modules/InteractiveImage_AiDailyLife.jsx';
// Importa andra sektioner här...

export const APP_SECTIONS = [
    {
        id: 'ai-idag',              // Används för att matcha navigeringslänkar och URL (t.ex. /#ai-idag)
        title: 'AI i ditt vardagsliv', // Detta visas i sidomenyn/navigeringen
        points: 100,
        component: AiDailyLifeSection, // Detta är själva komponenten
    },
    {
        id: 'ai-framtid',
        title: 'AI och framtiden',
        points: 150,
        component: /* Annan komponent här */,
    },
    // Lägg till fler sektioner här...
];
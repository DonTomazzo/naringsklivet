// src/modules/Naringsklivet/slides/CoStarPraktikSlide.tsx
// CO-STAR i praktiken – svag vs stark prompt, identisk struktur som FAKTAPPraktikSlide

import React from 'react';
import SplitSlide, { StegLista, InfoRuta } from '../../../components/CourseElements/SplitSlide';

export const CoStarPraktikSlide: React.FC = () => (
  <SplitSlide
    badge="Fördjupning · CO-STAR i praktiken"
    title="CO-STAR i <span style='color:#FF5421'>praktiken</span>"
    ingress="Samma uppgift — helt olika resultat. Här ser du skillnaden mellan en svag och en stark CO-STAR-prompt."
    bild="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=80"
    bildPosition="right"
    badge2="Svag → Stark"
    badge2Sub="Audience gör hela skillnaden"
  >
    <StegLista
      steg={[
        {
          nr: '✗',
          titel: 'Svag prompt',
          desc: '"Skriv en sammanfattning av årsrapporten."',
        },
        {
          nr: '✓',
          titel: 'Stark prompt med CO-STAR',
          desc: '"Vi har precis avslutat räkenskapsåret med 12% tillväxt (Context). Målet är att styrelsen ska förstå de tre viktigaste drivkrafterna och godkänna nästa års budget (Objective). Skriv i en tydlig, strukturerad stil (Style). Tonen ska vara faktabaserad men optimistisk (Tone). Mottagaren är styrelseledamöter utan operativ inblick (Audience). Svara med tre stycken och en avslutande rekommendation (Response)."',
        },
        {
          nr: '→',
          titel: 'Resultatet',
          desc: 'Den starka prompten levererar en text anpassad för just den målgruppen, med rätt ton och rätt struktur. Den svaga ger en generisk sammanfattning du ändå måste skriva om.',
        },
      ]}
    />
    <InfoRuta>
      A:et – Audience – är CO-STAR:s starkaste kort. Samma fakta, helt olika text beroende på om mottagaren är en tekniker, en chef eller en kund. Börja med Context, Objective och Audience så kommer resten på plats.
    </InfoRuta>
  </SplitSlide>
);

export default CoStarPraktikSlide;

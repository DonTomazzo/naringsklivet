// src/components/CourseElements/KapitelDokumentation.tsx
// Kapitel 2: Dokumentation — 3 slides med audio per slide
// Intro-audio spelas när kapitlet öppnas första gången

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { playAudio, stopAudio } from '../../utils/audioManager';
import SplitSlide, { StegLista, InfoRuta } from './SplitSlide';

const O = '#FF5421';

// Bilder
const IMGS = {
  stadgar:  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80',
  dokument: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80',
  arkiv:    'https://images.unsplash.com/photo-1568667256549-094345857637?w=1920&q=80',
};

// ─── Hjälpkomponenter (kopierade från modulfilen) ─────────
const BgSlide = ({ bild, children, overlay = 'rgba(15,22,35,0.82)' }: {
  bild: string; children: React.ReactNode; overlay?: string;
}) => (
  <div className="h-full relative overflow-hidden">
    <img src={bild} alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0" style={{ background: overlay }} />
    <div className="relative z-10 h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 pb-28">{children}</div>
    </div>
  </div>
);

const Badge = ({ text }: { text: string }) => (
  <div className="inline-block px-3 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest"
    style={{ background: `${O}25`, color: O, border: `1px solid ${O}40` }}>
    {text}
  </div>
);

const H = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 flex items-center gap-3"
    style={{ fontFamily: "'Nunito', sans-serif" }}>
    <Icon className="w-9 h-9 flex-shrink-0" style={{ color: O }} />
    {title}
  </h2>
);

// ─── Audio-wrapper: spelar audio när slide blir aktiv ──
const SlideMedAudio = ({ audioSrc, children }: {
  audioSrc?: string;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    if (!audioSrc) return;
    playAudio(audioSrc);
    return () => stopAudio();
  }, [audioSrc]);

  return <>{children}</>;
};

// ─── Slide 1: Stadgarna ─────────────────────────────────
export const Dokumentation1 = () => (
  <SlideMedAudio audioSrc="/audio/dokumentation-1-stadgarna.mp3">
    <BgSlide bild={IMGS.stadgar}>
      <Badge text="Kapitel 2 · Dokumentation" />
      <H icon={FileText} title="Stadgarna — föreningens grundlag" />
      <p className="text-white/70 text-base leading-relaxed mb-6">
        Stadgarna är det viktigaste dokumentet i föreningen. De styr vad styrelsen får och måste göra — och vad som kräver stämmobeslut.
      </p>
      <div className="space-y-3 mb-6">
        {[
          { ikon: '📋', titel: 'Vad stadgarna innehåller', text: 'Föreningens namn och ändamål, hur stämman fungerar, hur styrelsen väljs, antal ledamöter, räkenskapsår, och regler för överlåtelse av bostadsrätt.' },
          { ikon: '⚖️', titel: 'Stadgarna är bindande', text: 'Alla beslut som strider mot stadgarna kan ogiltigförklaras. Styrelsen måste känna till och följa stadgarna — okunnighet är inget försvar.' },
          { ikon: '🔄', titel: 'Ändra stadgarna', text: 'Kräver normalt 2/3 majoritet på två på varandra följande stämmor. Det är avsiktligt svårt — stadgarna ska vara stabila.' },
          { ikon: '🏛️', titel: 'Boverkets normalstadgar', text: 'Många föreningar baserar sina stadgar på HSBs eller Riksbyggens mallar. Alltid kontrollera era egna — de kan avvika.' },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.07 }}
            className="flex items-start gap-4 p-4 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <span style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{item.ikon}</span>
            <div>
              <p className="text-white font-bold text-sm mb-1">{item.titel}</p>
              <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="rounded-xl p-4 border-l-4" style={{ borderColor: O, background: `${O}12` }}>
        <p className="text-white text-sm leading-relaxed">
          <span className="font-bold" style={{ color: O }}>Praktisk tips: </span>
          Läs igenom stadgarna vid varje nytt styrelseår. Skriv ut de viktigaste paragraferna och lägg dem som bilaga till protokollen.
        </p>
      </div>
    </BgSlide>
  </SlideMedAudio>
);

// ─── Slide 2: Föreningens dokument ──────────────────────
export const Dokumentation2 = () => (
  <SlideMedAudio audioSrc="/audio/dokumentation-2-dokument.mp3">
    <SplitSlide
      badge="Kapitel 2 · Dokumentation"
      title="Vilka <span style='color:#FF5421'>dokument</span> måste finnas?"
      ingress="En välskött BRF har ett komplett dokumentarkiv. Det skyddar föreningen vid tvister, revisioner och ägarbyten — och det är styrelsens ansvar att hålla det uppdaterat."
      bild={IMGS.dokument}
      bildPosition="left"
      badge2="Juridiskt skydd"
      badge2Sub="Dokumenterat = bevisat"
    >
      <StegLista steg={[
        { nr: '01', titel: 'Stadgar & föreningsregistrering', desc: 'Alltid tillgängliga. Bolagsverket har kopia. Ska finnas hos styrelsen och vara tillgängliga för medlemmar.' },
        { nr: '02', titel: 'Årsredovisning & revisionsberättelse', desc: 'Ska upprättas varje år och hållas tillgängliga minst en vecka före stämman. Ska sparas minst 10 år.' },
        { nr: '03', titel: 'Styrelseprotokoll', desc: 'Alla styrelsebeslut dokumenteras. Justeras av ordförande + en ledamot. Sparas permanent.' },
        { nr: '04', titel: 'Lägenhetsförteckning', desc: 'Förteckning över alla lägenheter, innehavare och insatser. Ska alltid vara aktuell.' },
        { nr: '05', titel: 'Underhållsplan', desc: 'Planerat underhåll med kostnadsuppskattningar. Grunden för rätt avgiftssättning.' },
      ]} />
      <InfoRuta>
        Tappa inte kontrollen över arkivet vid styrelsebyte. Överlämning ska ske skriftligt och kvitteras.
      </InfoRuta>
    </SplitSlide>
  </SlideMedAudio>
);

// ─── Slide 3: Årsredovisningen ──────────────────────────
export const Dokumentation3 = () => (
  <SlideMedAudio audioSrc="/audio/dokumentation-3-arsredovisning.mp3">
    <BgSlide bild={IMGS.arkiv}>
      <Badge text="Kapitel 2 · Dokumentation" />
      <H icon={FileText} title="Årsredovisningen — mer än siffror" />
      <p className="text-white/70 text-base leading-relaxed mb-6">
        Årsredovisningen är föreningens visitkort. Den läses av mäklare, banker och köpare inför varje försäljning. En välskriven årsredovisning höjer förtroendet — och värdet.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {[
          { titel: 'Förvaltningsberättelse', text: 'Styrelsens berättelse om verksamhetsåret. Vad som hänt, vad som planeras. Ska vara informativ — inte bara formell.' },
          { titel: 'Resultaträkning', text: 'Intäkter (avgifter, hyror) mot kostnader (drift, räntor, avskrivningar). Visar om föreningen går med vinst eller förlust.' },
          { titel: 'Balansräkning', text: 'Tillgångar (fastigheten) mot skulder (lån) och eget kapital. Visar föreningens ekonomiska ställning vid årets slut.' },
          { titel: 'Noter & nyckeltal', text: 'Fördjupad information om poster i räkenskaperna. Bankerna och mäklarna granskar skuldsättning per kvm.' },
        ].map((item, i) => (
          <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <p className="text-white font-bold text-sm mb-2" style={{ color: O }}>{item.titel}</p>
            <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl p-5" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-2 text-red-400">Vanliga misstag</p>
        <div className="space-y-2">
          {[
            'Förvaltningsberättelse som inte nämner planerade renoveringar',
            'Skuldsättning per kvm som inte förklaras — väcker oro hos banker',
            'Underhållsfond som inte avsatts korrekt — felaktig bild av ekonomin',
            'Årsredovisning lämnad in efter deadline (7 månader efter räkenskapsårets slut)',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 bg-red-400" />
              <p className="text-white/80 text-sm">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </BgSlide>
  </SlideMedAudio>
);
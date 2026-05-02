// src/components/ModuleRouter.tsx
//
// Renderar rätt modulkomponent baserat på :slug i URL:en.
// Route: /module/:slug
//
// Lägg till nya moduler i MODULE_MAP nedan – ingen annan fil behöver ändras.

import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

// ── Styrelsekörkortet ────────────────────────────────────────────────────────
import Bostadsrattsforeningen  from '../modules/Styrelsekorkortet/BRFModule';
import Module0Introduktion     from '../modules/Styrelsekorkortet/Module0Introduktion';
import ModuleCopilotWord from '../modules/Naringsklivet/ModuleCopilotWord';
import Module1Introduktion     from '../modules/Styrelsekorkortet/Module1Introduktion';
import Module2Arsredovisning   from '../modules/Styrelsekorkortet/Module2Arsredovisning';
import Module3Gdpr             from '../modules/Styrelsekorkortet/Module3Gdpr';
import Module4Diskriminering   from '../modules/Styrelsekorkortet/Module4Diskriminering';
import Module5AiBrf            from '../modules/Styrelsekorkortet/Module5AiBrf';
import ModuleDokumentation     from '../modules/Styrelsekorkortet/ModuleDokumentation';
import ModuleHallbarhet        from '../modules/Styrelsekorkortet/ModuleHallbarhet';
import ModuleIntressenter      from '../modules/Styrelsekorkortet/ModuleIntressenter';
import ModuleTedAI           from '../modules/Naringsklivet/ModuleTedAI';
import ModuleTedLedarskap     from '../modules/Naringsklivet/ModuleTedLedarskap';
import ModuleTedProduktivitet from '../modules/Naringsklivet/ModuleTedProduktivitet';
import ModuleFastigheten from '../modules/Styrelsekorkortet/ModuleFastigheten';
import FastighetenOversikt        from '../pages/FastighetenOversikt';
import ModuleFastighetenSakerhet  from '../modules/Styrelsekorkortet/ModuleFastighetenSakerhet';
import ModuleFastighetenUnderhall from '../modules/Styrelsekorkortet/ModuleFastighetenUnderhall';
import ModuleFastighetenEnergi    from '../modules/Styrelsekorkortet/ModuleFastighetenEnergi';
import ModuleFastighetenDrift     from '../modules/Styrelsekorkortet/ModuleFastighetenDrift';
import ModuleDigitalSakerhetLosenord from '../modules/Naringsklivet/ModuleDigitalSakerhet_Losenord';
import ModuleDigitalSakerhetAI from '../modules/Naringsklivet/ModuleDigitalSakerhet_AI';
import ModulePhishing from '../modules/Naringsklivet/ModulePhishing';




// ── Näringsklivet ────────────────────────────────────────────────────────────
import ModuleAIGrunderna       from '../modules/Naringsklivet/ModuleAIGrunderna';
import ExempelKurs from '../modules/Naringsklivet/ExempelKurs';
import ModuleDataskyddsombud from '../modules/Naringsklivet/ModuleDataskyddsombud';
import ModuleDatalackor from '../modules/Naringsklivet/ModuleDatalackor';
import ModuleJavaScript, { courseData as jsData } from '../modules/Naringsklivet/ModuleJavaScript';
import ModuleGDPR, { courseData as gdprData } from '../modules/Naringsklivet/ModuleGDPR';
import ModuleMejl, { courseData as mejlData } from '../modules/Naringsklivet/ModuleMejl';
import ModuleMotesledning, { courseData as motenData } from '../modules/Styrelsekorkortet/ModuleMotesledning';
import ModuleDigitalSakerhet from '../modules/Naringsklivet/ModuleDigitalSakerhet';
import ModuleNIS2 from '../modules/Naringsklivet/ModuleNIS2';


// ════════════════════════════════════════════════════════════════════════════
// MAP: slug → komponent
// Slug måste matcha exakt med course.slug i coursesData.ts
// ════════════════════════════════════════════════════════════════════════════
const MODULE_MAP: Record<string, React.ComponentType> = {
  // ── Styrelsekörkortet ────────────────────────────────────────────────────
  'introduktion':                  Module0Introduktion,

  'styrelseroller':                Module1Introduktion,
  'copilot-word':                  ModuleCopilotWord,
  'datalackor': ModuleDatalackor,
  'dataskyddsombud': ModuleDataskyddsombud,
  'exempelkurs':                   ExempelKurs,
  'arsredovisningen':              Module2Arsredovisning,
  'gdpr-personuppgifter':          Module3Gdpr,
  'diskrimineringslagen':          Module4Diskriminering,
  'ai-brf-styrelsen':              Module5AiBrf,
  'styrelsens-dokumentation':      ModuleDokumentation,
  'hallbarhet':                    ModuleHallbarhet,
  'foreningens-intressenter':      ModuleIntressenter,
  'bostadsrattsforeningen':        Bostadsrattsforeningen,
  'fastigheten': ModuleFastigheten,
  'ted-ai':           ModuleTedAI,
'ted-ledarskap':    ModuleTedLedarskap,
'ted-produktivitet': ModuleTedProduktivitet,
'javascript-nybörjare': ModuleJavaScript,
'gdpr-medarbetare': ModuleGDPR,
'professionellt-mejl': ModuleMejl,
'effektivare-moten': ModuleMotesledning,
'fastigheten':            FastighetenOversikt,
'fastigheten-sakerhet':   ModuleFastighetenSakerhet,
'fastigheten-underhall':  ModuleFastighetenUnderhall,
'fastigheten-energi':     ModuleFastighetenEnergi,
'fastigheten-drift':      ModuleFastighetenDrift,
'digital-sakerhet-losenord':  ModuleDigitalSakerhetLosenord,
'digital-sakerhet-ai':        ModuleDigitalSakerhetAI,
'digital-sakerhet': ModuleDigitalSakerhet,
'phishing-social-engineering': ModulePhishing,
'nis2-iso27001': ModuleNIS2,
  

  // Kurser utan komponent ännu – lägg till när de byggs:
  // 'foreningens-principer':      ModulePrinciper,
  // 'konflikthantering':          ModuleKonflikt,
  // 'fatta-ratt-beslut':          ModuleBeslut,
  // 'effektivt-styrelsearbete':   ModuleEffektivt,
  // 'fastigheten':                ModuleFastigheten,
  // 'forhandlingsteknik-upphandling': ModuleForhandling,

  // ── Näringsklivet ────────────────────────────────────────────────────────
  'ai-grunderna':                  ModuleAIGrunderna,

  // Lägg till fler Näringsklivet-kurser här:
  // 'prompt-engineering':         ModulePromptEngineering,
  // 'ai-for-chefer':              ModuleAIForChefer,
};

// ════════════════════════════════════════════════════════════════════════════
// KOMPONENT
// ════════════════════════════════════════════════════════════════════════════
const ModuleRouter: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/modules" replace />;
  }

  const Component = MODULE_MAP[slug];

  // Slug finns i datan men modulen är inte byggd än
  if (!Component) {
    return <ComingSoon slug={slug} />;
  }

  return <Component />;
};

// ── Platshållare för moduler under uppbyggnad ────────────────────────────────
const ComingSoon: React.FC<{ slug: string }> = ({ slug }) => (
  <div
    className="min-h-screen flex items-center justify-center"
    style={{ background: '#0f1623' }}
  >
    <div className="text-center px-6 max-w-md">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl"
        style={{ background: 'rgba(255,84,33,0.15)' }}
      >
        🚧
      </div>
      <h2
        className="text-2xl font-black text-white mb-3"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        Modulen är under uppbyggnad
      </h2>
      <p className="text-white/50 text-sm mb-2">
        <code
          className="px-2 py-0.5 rounded text-xs"
          style={{ background: 'rgba(255,255,255,0.08)', color: '#FF5421' }}
        >
          {slug}
        </code>
      </p>
      <p className="text-white/40 text-sm mb-8">
        Den interaktiva kursen lanseras snart. Du kan redan läsa om kursen på kurssidan.
      </p>
      <a
        href={`/kurs/${slug}`}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm"
        style={{ background: 'linear-gradient(135deg, #FF5421, #E04619)' }}
      >
        Gå till kurssidan
      </a>
    </div>
  </div>
);

export default ModuleRouter;
import { motion } from 'framer-motion';
import { Lock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SiteFooter = () => {
  const navigate = useNavigate();

  const footerLinks = [
    {
      title: 'Kurser',
      links: [
        { label: 'AI-träningsprogrammet',     path: '/purchase/naringsklivet-ai' },
        { label: 'AI för organisationen',      path: '#' },
        { label: 'Grupplicenser & företag',    path: '#' },
        { label: 'Skräddarsydd utbildning',    path: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Kontakt',           path: '#' },
        { label: 'FAQ',               path: '#faq' },
        { label: 'Tillgänglighet',    path: '#' },
        { label: 'Teknisk support',   path: '#' },
      ],
    },
    {
      title: 'Om oss',
      links: [
        { label: 'Om Näringsklivet',    path: '/om-oss' },
        { label: 'Integritetspolicy',   path: '/integritetspolicy' },
        { label: 'Allmänna villkor',    path: '/villkor' },
        { label: 'Press',              path: '#' },
      ],
    },
  ];

  const handleClick = (path) => {
    if (path.startsWith('#')) {
      document.getElementById(path.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Logotyp" width={32} height={32} className="object-contain" />
              <div className="text-xl font-bold text-white">
                <span style={{ color: '#FF5421' }}>Närings</span>klivet®
              </div>
            </div>
            <p className="text-slate-400 mb-4 text-sm leading-relaxed">
              Sveriges mest praktiska AI-utbildning för medarbetare,
              chefer och egenföretagare.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span>⭐⭐⭐⭐⭐</span>
              <span>Lanseras 2026</span>
            </div>
          </motion.div>

          {footerLinks.map((section, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            >
              <h4 className="font-bold text-white mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <button
                      onClick={() => handleClick(link.path)}
                      className="text-sm hover:text-orange-400 transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-slate-800 mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">© 2026 Näringsklivet. Alla rättigheter förbehållna.</p>
          <div className="flex items-center gap-6 text-sm">
            <span className="flex items-center gap-2"><Lock size={14} /> Säkra betalningar</span>
            <span className="flex items-center gap-2"><Shield size={14} /> 14 dagars garanti</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
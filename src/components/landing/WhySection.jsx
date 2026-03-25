import { motion } from 'framer-motion';

const features = [
  {
    title: "Praktiskt från dag ett",
    subtitle: "Övningar direkt kopplade till din arbetsdag",
    icon: "/icon1.png",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Frigör timmar varje vecka",
    subtitle: "Lär dig av AI-experter med verklig erfarenhet",
    icon: "/icon2.png",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "365 dagars åtkomst",
    subtitle: "Lär dig i din egen takt – när det passar dig",
    icon: "/icon3.png",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const WhySection = () => (
  <section className="py-16 sm:py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} className="text-center mb-12"
      >
        <div className="inline-block px-4 py-2 bg-slate-100 text-slate-800 rounded-full font-semibold mb-4 text-sm">
          VARFÖR NÄRINGSKLIVET AI?
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Komplett träningsprogram för medarbetare, chefer och egenföretagare
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.15 }}
            className="relative rounded-2xl overflow-hidden group cursor-pointer"
          >
            <div className="aspect-[4/3] relative">
              <img src={f.image} alt={f.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/70 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                <img src={f.icon} alt={f.title} className="w-12 h-12 object-contain mb-3" />
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-white/80 text-sm">{f.subtitle}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhySection;
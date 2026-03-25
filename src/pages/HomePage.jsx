import { useEffect, useState, useMemo } from "react";
import HeroSection from "./components/HeroSection";
import CategoryFilter from "./components/CategoryFilter";
import QuizCarousel from "./components/QuizCarousel";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import allQuizzes from "./data/quizzes";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("Alla");
  const [visibleSections, setVisibleSections] = useState(4);

  // Section titles for the Netflix-style rows
  const sectionTitles = useMemo(
    () => [
      "Rekommenderade för dig",
      "Populära just nu",
      "Nya quiz",
      "AI & framtid",
      "För HR",
      "För Sälj",
      "Marknad & Growth",
      "Teknik & Kod",
      "Design & Kreativitet",
      "Ekonomi & Företagande",
    ],
    []
  );

  // filtrera quiz baserat på sök och kategori
  const filteredQuizzes = useMemo(() => {
    return allQuizzes.filter((q) => {
      const matchSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = category === "Alla" || (q.category || "Alla") === category;
      return matchSearch && matchCategory;
    });
  }, [searchTerm, category]);

  // lazy load sektioner när man når botten
  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 600) {
        setVisibleSections((s) => Math.min(s + 2, sectionTitles.length));
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionTitles.length]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <HeroSection onSearch={setSearchTerm} />
      <CategoryFilter active={category} onSelect={setCategory} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {sectionTitles.slice(0, visibleSections).map((title, idx) => {
          const start = (idx * 12) % Math.max(12, filteredQuizzes.length || 12);
          const slice = filteredQuizzes.length
            ? filteredQuizzes.slice(start, start + 12)
            : allQuizzes.slice(idx * 12, idx * 12 + 12);
          return <QuizCarousel key={title} title={title} quizzes={slice} />;
        })}
      </main>

      <div className="bg-white border-t">
        <Footer />
      </div>
    </div>
  );
}
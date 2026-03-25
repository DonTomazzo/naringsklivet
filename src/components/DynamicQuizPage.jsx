import { useParams } from "react-router-dom";
import SoloQuizComponent from "./SoloQuizComponentVite";
import allQuizzes from "../data/quizzes/index";

const DynamicQuizPage = () => {
  const { slug } = useParams();
  const quiz = allQuizzes.find((q) => q.slug === slug);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <h2 className="text-2xl font-bold">Quiz hittades inte!</h2>
      </div>
    );
  }

  return <SoloQuizComponent quizData={quiz} />;
};

export default DynamicQuizPage;
import React, { useState, useEffect, useCallback } from 'react';
import { Linkedin, Github, Mail, Briefcase, Sparkles, CheckCircle } from 'lucide-react';

interface QuestionData {
  id: string;
  type: 'single-choice' | 'text-input' | 'contact-info';
  title: string;
  text: string;
  options?: string[];
  placeholder?: string;
  field?: string;
}

const questionsData: QuestionData[] = [
  {
    id: 'q1',
    type: 'single-choice',
    title: 'Fråga 1 av 5',
    text: 'Vad lockar dig mest med att arbeta med mig?',
    options: [
      'Min affärskompetens kombinerad med tech',
      'Min passion för att lösa riktiga problem',
      'Min erfarenhet från B2B och försäljning',
      'Min nyfikenhet och vilja att lära'
    ]
  },
  {
    id: 'q2',
    type: 'single-choice',
    title: 'Fråga 2 av 5',
    text: 'Vilket projekt av mina skulle du vilja höra mer om?',
    options: [
      'Mauritzons Mat - AI-receptsida',
      'Min quizplattform',
      'Tidigare säljprojekt inom tech',
      'Framtida projekt vi kan skapa tillsammans'
    ]
  },
  {
    id: 'q3',
    type: 'text-input',
    title: 'Fråga 3 av 5',
    text: 'Vad är den största utmaningen ert företag står inför just nu?',
    placeholder: 'Berätta gärna om era utmaningar...'
  },
  {
    id: 'q4',
    type: 'contact-info',
    title: 'Fråga 4 av 5',
    text: 'Vad heter du?',
    placeholder: 'Ditt namn',
    field: 'name'
  },
  {
    id: 'q5',
    type: 'contact-info',
    title: 'Fråga 5 av 5',
    text: 'Hur kan jag nå dig?',
    placeholder: 'Din e-postadress',
    field: 'email'
  }
];

export default function ContactQuiz({ navigateToPortfolio }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showCompletion, setShowCompletion] = useState(false);
  const [showAutoAdvance, setShowAutoAdvance] = useState(false);
  
  const totalQuestions = questionsData.length;
  const currentQuestionData = questionsData[currentQuestion];

  const nextQuestion = useCallback(() => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Skicka till backend här (om du vill)
      console.log('Formulär skickat:', answers);
      setShowCompletion(true);
    }
  }, [currentQuestion, totalQuestions, answers]);

  const prevQuestion = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }, [currentQuestion]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const answer = answers[currentQuestionData?.id];
      if (answer && answer.trim().length > 0) {
        nextQuestion();
      }
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      prevQuestion();
    }
  }, [nextQuestion, prevQuestion, currentQuestionData, answers]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleAnswerChange = (questionId: string, value: string, autoAdvance = false) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    
    if (autoAdvance) {
      setShowAutoAdvance(true);
      setTimeout(() => {
        setShowAutoAdvance(false);
        nextQuestion();
      }, 800);
    }
  };

  const goBack = () => {
    if (currentQuestion === 0) { 
      if (window.confirm('Vill du verkligen avbryta kontaktformuläret?')) {
        navigateToPortfolio(); 
      }
    } else {
      prevQuestion();
    }
  };

  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const getQuestionState = (index: number): string => {
    const relativePosition = index - currentQuestion;
    if (relativePosition === 0) return 'active';
    if (relativePosition === -1) return 'prev';
    if (relativePosition === 1) return 'next';
    return 'far';
  };

  const renderQuestionComponent = (questionData: QuestionData) => {
    const questionId = questionData.id;
    const currentAnswer = answers[questionId];

    switch (questionData.type) {
      case 'single-choice':
        return (
          <div className="options-container">
            {questionData.options?.map((option, i) => (
              <label key={i} htmlFor={`${questionId}-${i}`} className="option-label">
                <input 
                  type="radio" 
                  name={questionId} 
                  id={`${questionId}-${i}`}
                  value={option} 
                  onChange={() => handleAnswerChange(questionId, option, true)}
                  checked={currentAnswer === option}
                />
                <span className="option-text">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'text-input':
        return (
          <div className="input-container">
            <textarea
              className="text-input"
              value={currentAnswer || ''}
              onChange={(e) => handleAnswerChange(questionId, e.target.value)}
              placeholder={questionData.placeholder}
              rows={5}
            />
            <button 
              className="next-button" 
              onClick={nextQuestion} 
              disabled={!currentAnswer || currentAnswer.trim().length === 0}
            >
              Nästa
            </button>
          </div>
        );

      case 'contact-info':
        return (
          <div className="input-container">
            <input
              type={questionData.field === 'email' ? 'email' : 'text'}
              className="text-input single-line"
              value={currentAnswer || ''}
              onChange={(e) => handleAnswerChange(questionId, e.target.value)}
              placeholder={questionData.placeholder}
            />
            <button 
              className="next-button" 
              onClick={nextQuestion} 
              disabled={!currentAnswer || currentAnswer.trim().length === 0}
            >
              {currentQuestion === totalQuestions - 1 ? 'Skicka' : 'Nästa'}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="survey-container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          overflow: hidden;
        }
        
        .survey-container {
          width: 100%;
          height: 100vh;
          position: relative;
        }
        
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 20px;
          text-align: center;
          z-index: 100;
          border-bottom: 1px solid rgba(102, 126, 234, 0.2);
        }
        
        .header h1 {
          font-size: 1.8em;
          color: #667eea;
          margin-bottom: 8px;
          font-weight: 300;
        }
        
        .progress-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-top: 10px;
        }
        
        .progress-text {
          font-size: 0.9em;
          color: #667eea;
          font-weight: 500;
        }
        
        .progress-bar {
          width: 200px;
          height: 4px;
          background: rgba(102, 126, 234, 0.2);
          border-radius: 2px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #667eea, #764ba2);
          transition: width 0.5s ease;
          border-radius: 2px;
        }
        
        .survey-viewport {
          position: fixed;
          top: 120px;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        @media (max-width: 768px) {
          .header {
            display: none;
          }
          
          .survey-viewport {
            top: 0;
          }

          .question-card {
            padding: 30px 20px;
            width: 95%;
          }
          
          .question-text {
            font-size: 1.5em;
          }
        }
        
        .questions-container {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .question-card {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 90%;
          max-width: 700px;
          transform: translateX(-50%) translateY(-50%);
          padding: 40px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease;
        }

        .question-card.active {
          opacity: 1;
          pointer-events: auto;
          z-index: 10;
        }

        .question-card.prev {
          transform: translateX(-150%) translateY(-50%) scale(0.95);
          opacity: 0;
        }

        .question-card.next {
          transform: translateX(50%) translateY(-50%) scale(0.95);
          opacity: 0;
        }

        .question-card.far {
          display: none;
        }
        
        .question-content {
          text-align: center;
        }
        
        .question-title {
          font-size: 1.2em;
          color: #667eea;
          font-weight: 500;
        }
        
        .question-text {
          font-size: 2em;
          color: #2c3e50;
          margin: 20px 0 30px;
          line-height: 1.3;
          font-weight: 300;
        }

        .options-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
          align-items: center;
        }
        
        .option-label {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px 25px;
          background: #f7f9fc;
          border-radius: 10px;
          width: 100%;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 2px solid transparent;
          text-align: left;
        }
        
        .option-label:hover {
          background-color: #eef2f5;
          transform: translateX(5px);
        }

        .option-label input[type="radio"] {
          display: none;
        }

        .option-label input[type="radio"]:checked + .option-text {
          color: #667eea;
          font-weight: 600;
        }

        .option-label input[type="radio"]:checked + .option-text::before {
          content: '✓';
          position: absolute;
          left: -35px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.2em;
          color: #667eea;
        }

        .option-text {
          color: #333;
          font-size: 1.1em;
          position: relative;
        }

        .input-container {
          width: 100%;
        }

        .text-input {
          width: 100%;
          padding: 15px;
          border-radius: 10px;
          border: 2px solid #ddd;
          font-size: 1.1em;
          color: #333;
          transition: border-color 0.2s ease;
          resize: vertical;
          font-family: inherit;
        }

        .text-input.single-line {
          resize: none;
          height: auto;
        }

        .text-input:focus {
          outline: none;
          border-color: #667eea;
        }
        
        .next-button {
          margin-top: 30px;
          padding: 15px 40px;
          font-size: 1.1em;
          font-weight: 600;
          color: white;
          background: linear-gradient(to right, #667eea, #764ba2);
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        .next-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
        }
        
        .next-button:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .footer-buttons {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 15px;
          z-index: 100;
        }

        .nav-button {
          background: rgba(255, 255, 255, 0.15);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          font-size: 1em;
          font-weight: bold;
          padding: 12px 25px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(5px);
        }

        .nav-button:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }
        
        .nav-button:disabled {
          background: transparent;
          border-color: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.5);
          cursor: not-allowed;
        }

        .completion-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 40px;
          animation: fadeIn 0.8s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .completion-icon {
          width: 80px;
          height: 80px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 30px;
          animation: scaleIn 0.5s ease 0.3s backwards;
        }

        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        
        .completion-container h2 {
          font-size: 3em;
          margin-bottom: 15px;
          font-weight: 300;
        }

        .completion-container p {
          font-size: 1.3em;
          margin-bottom: 40px;
          opacity: 0.9;
          max-width: 600px;
        }

        .social-links {
          display: flex;
          gap: 20px;
          margin-bottom: 40px;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px 30px;
          background: rgba(255, 255, 255, 0.15);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50px;
          color: white;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .social-link:hover {
          background: white;
          color: #667eea;
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .back-button {
          padding: 15px 40px;
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid white;
          border-radius: 50px;
          color: white;
          font-size: 1.1em;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .back-button:hover {
          background: white;
          color: #667eea;
          transform: translateY(-2px);
        }

        .auto-advance-indicator {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(102, 126, 234, 0.9);
          color: white;
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 0.9em;
          animation: slideIn 0.3s ease-out forwards;
        }

        @keyframes slideIn {
          from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
      `}</style>

      {showCompletion ? (
        <div className="completion-container">
          <div className="completion-icon">
            <CheckCircle size={48} color="#667eea" strokeWidth={2} />
          </div>
          <h2>Tack för att du tog kontakt! 🎉</h2>
          <p>
            Jag uppskattar verkligen ditt intresse. Jag återkommer till dig så snart som möjligt.
            Under tiden, låt oss koppla ihop!
          </p>
          
          <div className="social-links">
            <a 
              href="https://www.linkedin.com/in/tomas-mauritzon/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <Linkedin size={24} />
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://github.com/DonTomazzo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <Github size={24} />
              <span>GitHub</span>
            </a>
            <a 
              href="mailto:tomas.mauritzon@gmail.com"
              className="social-link"
            >
              <Mail size={24} />
              <span>E-post</span>
            </a>
          </div>

          <button onClick={navigateToPortfolio} className="back-button">
            Tillbaka till portföljen
          </button>
        </div>
      ) : (
        <>
          <header className="header">
            <h1>Låt oss connecta! ✨</h1>
            <div className="progress-container">
              <span className="progress-text">{currentQuestion + 1} / {totalQuestions}</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </header>

          <div className="survey-viewport">
            <div className="questions-container">
              {questionsData.map((question, index) => (
                <div 
                  key={question.id}
                  className={`question-card ${getQuestionState(index)}`}
                >
                  <div className="question-content">
                    <h2 className="question-title">{question.title}</h2>
                    <p className="question-text">{question.text}</p>
                    {renderQuestionComponent(question)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="footer-buttons">
            <button onClick={goBack} className="nav-button" disabled={currentQuestion === 0}>
              ← Tillbaka
            </button>
            <button 
              onClick={nextQuestion} 
              className="nav-button" 
              disabled={!answers[currentQuestionData.id] || showAutoAdvance}
            >
              {currentQuestion === totalQuestions - 1 ? 'Skicka' : 'Nästa'} →
            </button>
          </div>
          
          {showAutoAdvance && (
            <div className="auto-advance-indicator">Går vidare automatiskt...</div>
          )}
        </>
      )}
    </div>
  );
}
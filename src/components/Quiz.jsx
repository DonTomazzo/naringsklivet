import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { ArrowLeft, HelpCircle } from 'lucide-react';

// --- Interface och Datastrukturer ---

interface SortingItem {
  id: string;
  name: string;
}

interface QuestionData {
  id: string;
  type: 'single-choice' | 'multiple-choice' | 'text-input' | 'likert' | 'sorting';
  title: string;
  text: string;
  options?: string[];
  placeholder?: string;
  items?: SortingItem[];
}

type AnswerValue = string | string[] | SortingItem[];

const reorder = (list: SortingItem[], startIndex: number, endIndex: number): SortingItem[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const questionsData: QuestionData[] = [
  {
    id: 'q1',
    type: 'single-choice',
    title: 'Fråga 1 av 5',
    text: 'Vilket är det bästa sättet att kommunicera med en kollega?',
    options: ['E-post', 'Chatt', 'Telefon', 'Personligt möte']
  },
  {
    id: 'q2',
    type: 'multiple-choice',
    title: 'Fråga 2 av 5',
    text: 'Vilka verktyg använder du för projektledning?',
    options: ['Trello', 'Jira', 'Asana', 'Basecamp']
  },
  {
    id: 'q3',
    type: 'text-input',
    title: 'Fråga 3 av 5',
    text: 'Beskriv din största utmaning på jobbet just nu:',
    placeholder: 'Skriv din utmaning här...'
  },
  {
    id: 'q4',
    type: 'likert',
    title: 'Fråga 4 av 5',
    text: 'Hur mycket håller du med om följande påstående: "Jag känner mig motiverad av mina arbetsuppgifter."',
  },
  {
    id: 'q5',
    type: 'sorting',
    title: 'Fråga 5 av 5',
    text: 'Sortera följande uppgifter från viktigast till minst viktigast:',
    items: [
      { id: 'task-a', name: 'Möte med kund' },
      { id: 'task-b', name: 'Svara på e-post' },
      { id: 'task-c', name: 'Planera nästa sprint' },
      { id: 'task-d', name: 'Skriva teknisk dokumentation' }
    ]
  }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [showCompletion, setShowCompletion] = useState(false);
  const [showAutoAdvance, setShowAutoAdvance] = useState(false);
    
  const sortingQ = questionsData.find(q => q.type === 'sorting');
  const [sortingItems, setSortingItems] = useState<SortingItem[]>(sortingQ?.items || []);

  const totalQuestions = questionsData.length;

  const nextQuestion = useCallback(() => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowCompletion(true);
    }
  }, [currentQuestion, totalQuestions]);

  const prevQuestion = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }, [currentQuestion]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      nextQuestion();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      prevQuestion();
    }
  }, [nextQuestion, prevQuestion]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleAnswerChange = (questionId: string, value: AnswerValue, autoAdvance = false) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    
    if (autoAdvance) {
      setShowAutoAdvance(true);
      setTimeout(() => {
        setShowAutoAdvance(false);
        nextQuestion();
      }, 1000);
    }
  };

  const handleSortingChange = (result: any) => {
    if (!result.destination) return;

    const reorderedItems = reorder(
      sortingItems,
      result.source.index,
      result.destination.index
    );

    setSortingItems(reorderedItems);
    const sortingQuestion = questionsData.find(q => q.type === 'sorting');
    if (sortingQuestion) {
      handleAnswerChange(sortingQuestion.id, reorderedItems.map(item => item.id));
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      prevQuestion();
    } else {
      if (window.confirm('Vill du verkligen lämna enkäten?')) {
        window.history.back();
      }
    }
  };

  const showHelp = () => {
    alert('💡 Tips:\n\n• Använd radioknappar, kryssrutor eller textfält för att svara\n• Vissa frågor går automatiskt vidare efter svar\n• Använd piltangenterna för manuell navigation\n• Klicka på tillbaka-knappen för att gå tillbaka');
  };

  const restartSurvey = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowCompletion(false);
    setSortingItems(sortingQ?.items || []);
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
      case 'likert':
        return (
          <div className="scale-container">
            <div className="scale-labels">
              <span className="scale-label">Håller helt med</span>
              <span className="scale-label">Håller inte alls med</span>
            </div>
            <div className="scale-options">
              {[7, 6, 5, 4, 3, 2, 1].map((value) => (
                <div key={value} className="radio-group">
                  <input
                    type="radio"
                    name={questionId}
                    id={`${questionId}-${value}`}
                    value={value.toString()}
                    onChange={() => handleAnswerChange(questionId, value.toString(), true)}
                    checked={currentAnswer === value.toString()}
                  />
                  <label htmlFor={`${questionId}-${value}`} className='radio-label'>{value}</label> 
                </div>
              ))}
            </div>
          </div>
        );
            
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
                  onChange={() => handleAnswerChange(questionId, option)}
                  checked={currentAnswer === option}
                />
                <span className="option-text">{option}</span>
              </label>
            ))}
            <button 
              className="next-button" 
              onClick={nextQuestion} 
              disabled={!currentAnswer}
            >
              Nästa
            </button>
          </div>
        );

      case 'multiple-choice':
        return (
          <div className="options-container multiple-choice">
            {questionData.options?.map((option, i) => (
              <label key={i} htmlFor={`${questionId}-${i}`} className="option-label checkbox-label">
                <input 
                  type="checkbox" 
                  name={questionId} 
                  id={`${questionId}-${i}`}
                  value={option}
                  onChange={(e) => {
                    const currentAnswerArray = Array.isArray(currentAnswer) ? currentAnswer : [];
                    const newAnswers = [...currentAnswerArray];
                    if (e.target.checked) {
                      newAnswers.push(option);
                    } else {
                      const index = newAnswers.indexOf(option);
                      if (index > -1) {
                        newAnswers.splice(index, 1);
                      }
                    }
                    handleAnswerChange(questionId, newAnswers);
                  }}
                  checked={Array.isArray(currentAnswer) && currentAnswer.includes(option)}
                />
                <span className="option-text">{option}</span>
              </label>
            ))}
            <button 
              className="next-button" 
              onClick={nextQuestion} 
              disabled={!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)}
            >
              Nästa
            </button>
          </div>
        );

      case 'text-input':
        return (
          <div className="input-container">
            <textarea
              className="text-input"
              value={typeof currentAnswer === 'string' ? currentAnswer : ''}
              onChange={(e) => handleAnswerChange(questionId, e.target.value)}
              placeholder={questionData.placeholder}
              rows={5}
            />
            <button 
              className="next-button" 
              onClick={nextQuestion} 
              disabled={!currentAnswer || (typeof currentAnswer === 'string' && currentAnswer.trim().length === 0)}
            >
              Nästa
            </button>
          </div>
        );
            
      case 'sorting':
        return (
          <>
            <DragDropContext onDragEnd={handleSortingChange}>
              <Droppable droppableId="sorting-list">
                {(provided) => (
                  <ul
                    className="sorting-list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {sortingItems.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`sorting-item ${snapshot.isDragging ? 'dragging' : ''}`}
                            style={{
                                ...provided.draggableProps.style,
                                backgroundColor: snapshot.isDragging ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                color: 'white',
                                padding: '15px',
                                marginBottom: '10px',
                                borderRadius: '12px',
                                boxShadow: snapshot.isDragging ? '0 8px 25px rgba(0,0,0,0.3)' : '0 4px 15px rgba(0,0,0,0.1)',
                                transition: 'all 0.3s ease',
                            }}
                          >
                            <span className="sort-rank">{index + 1}.</span> {item.name}
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
            <button 
              className="next-button" 
              onClick={nextQuestion} 
              disabled={!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)}
            >
              Nästa
            </button>
          </>
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
        
        /* Animerad bakgrund med bubblor */
        .survey-container::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
          animation: float 20s ease-in-out infinite;
          pointer-events: none;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .survey-container {
          width: 100%;
          height: 100vh;
          position: relative;
        }
        
        .header {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 20px 40px;
          text-align: center;
          z-index: 100;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          min-width: 300px;
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
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .progress-bar {
          width: 200px;
          height: 6px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #fff, rgba(255, 255, 255, 0.8));
          transition: width 0.5s ease;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
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
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
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
          z-index: 5;
        }

        .question-card.next {
          transform: translateX(50%) translateY(-50%) scale(0.95);
          opacity: 0;
          z-index: 5;
        }

        .question-card.far {
          display: none;
        }
        
        .question-content {
          text-align: center;
        }
        
        .question-title {
          font-size: 1.2em;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .question-text {
          font-size: 2em;
          color: white;
          margin: 20px 0 30px;
          line-height: 1.3;
          font-weight: 300;
          text-shadow: 0 2px 8px rgba(0,0,0,0.2);
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
          padding: 18px 25px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 15px;
          width: 100%;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
          text-align: left;
        }
        
        .option-label:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .option-label input[type="radio"],
        .option-label input[type="checkbox"] {
          display: none;
        }

        .option-label input[type="radio"]:checked + .option-text,
        .option-label input[type="checkbox"]:checked + .option-text {
          position: relative;
          color: white;
          font-weight: 600;
        }

        .option-label input[type="radio"]:checked + .option-text::before,
        .option-label input[type="checkbox"]:checked + .option-text::before {
          content: '✔';
          position: absolute;
          left: -35px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.2em;
          color: white;
        }

        .option-text {
          color: rgba(255, 255, 255, 0.95);
          font-size: 1.1em;
          position: relative;
          transition: color 0.2s ease;
        }

        .input-container, .scale-container {
          width: 100%;
        }

        .text-input {
          width: 100%;
          padding: 18px;
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          font-size: 1.1em;
          color: white;
          transition: all 0.3s ease;
          resize: vertical;
        }

        .text-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .text-input:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .scale-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .scale-labels {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 15px;
          font-size: 0.9em;
          color: rgba(255, 255, 255, 0.9);
          padding: 0 10px;
          font-weight: 500;
        }

        .scale-options {
          display: flex;
          gap: 12px;
          width: 100%;
          justify-content: space-between;
          padding: 0 10px;
        }

        .radio-group {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .radio-group input[type="radio"] {
          display: none;
        }

        .radio-group .radio-label {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 1.1em;
        }
        
        .radio-group .radio-label:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        
        .radio-group input[type="radio"]:checked + .radio-label {
          border-color: white;
          background: rgba(255, 255, 255, 0.3);
          color: white;
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
        }
        
        .next-button {
          margin-top: 30px;
          padding: 15px 40px;
          font-size: 1.1em;
          font-weight: 600;
          color: #667eea;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        
        .next-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
          background: white;
        }
        
        .next-button:disabled {
          background: rgba(255, 255, 255, 0.3);
          color: rgba(255, 255, 255, 0.6);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .footer-buttons {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 15px;
          z-index: 100;
        }

        .nav-button {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          font-size: 1em;
          font-weight: 600;
          padding: 12px 28px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .nav-button:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }
        
        .nav-button:disabled {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.3);
          cursor: not-allowed;
          transform: none;
        }
        
        .help-button {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          color: white;
          width: 48px;
          height: 48px;
          font-size: 1.5em;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .help-button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
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
          animation: fadeIn 0.8s ease forwards;
          z-index: 200;
          padding: 20px;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .completion-container h2 {
          font-size: 2.5em;
          margin-bottom: 20px;
          text-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .completion-container p {
          font-size: 1.2em;
          margin-bottom: 30px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .completion-buttons {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .completion-button {
          padding: 15px 30px;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          color: white;
          font-size: 1em;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .completion-button:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        .auto-advance-indicator {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 10px 20px;
          border-radius: 20px;
          font-size: 0.9em;
          font-weight: 600;
          animation: slideIn 0.3s ease-out forwards;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        @keyframes slideIn {
          from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }

        .sorting-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
          width: 100%;
        }

        .sorting-item {
          user-select: none;
          text-align: left;
          cursor: grab;
          display: flex;
          align-items: center;
        }
        
        .sorting-item.dragging {
          cursor: grabbing;
        }

        .sort-rank {
          font-size: 1.2em;
          font-weight: bold;
          margin-right: 15px;
          color: white;
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        @media (max-width: 768px) {
          .question-card {
            padding: 30px 20px;
          }
          
          .question-text {
            font-size: 1.5em;
          }
          
          .scale-options {
            gap: 8px;
          }
          
          .radio-group .radio-label {
            width: 40px;
            height: 40px;
            font-size: 1em;
          }
          
          .completion-container h2 {
            font-size: 2em;
          }
        }
      `}</style>

      {showCompletion ? (
        <div className="completion-container">
          <h2>Nu är vi Connectade och jag kommer höra av mig till er ASAP</h2>
          <p>Tack för att du tog dig tid att svara på frågorna!</p>
          
          <div className="completion-buttons">
            <button onClick={restartSurvey} className="completion-button">
              Gör om enkäten
            </button>
            <button onClick={() => window.history.back()} className="completion-button">
              ← Tillbaka till sidan
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="header">
            <div className="progress-container">
              <span className="progress-text">Fråga {currentQuestion + 1} av {totalQuestions}</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>
          
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
            <button onClick={showHelp} className="help-button">
              <HelpCircle size={20} />
            </button>
            <button 
              onClick={nextQuestion} 
              className="nav-button" 
              disabled={!answers[questionsData[currentQuestion]?.id] || showAutoAdvance}
            >
              Nästa →
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
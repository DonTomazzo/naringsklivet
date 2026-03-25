import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useSurvey } from '../../contexts/MockSurveyContext';
import { ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react';
import { getThemeStyles } from '../../styles/surveyThemes';

function PublicSurvey() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getSurveyBySlug, submitResponse } = useSurvey();

  const [survey, setSurvey] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showCompletion, setShowCompletion] = useState(false);
  const [showAutoAdvance, setShowAutoAdvance] = useState(false);
  const [sortingItems, setSortingItems] = useState([]);
  const [startTime] = useState(Date.now());
  
  const theme = survey?.settings?.theme || 'professional';

  // Load survey
  useEffect(() => {
    const foundSurvey = getSurveyBySlug(slug);
    if (!foundSurvey) {
      navigate('/404');
      return;
    }
    if (!foundSurvey.isActive) {
      alert('Denna enkät är inte längre aktiv');
      navigate('/');
      return;
    }
    setSurvey(foundSurvey);

    // Initialize sorting items for first sorting question
    const firstSortingQ = foundSurvey.questions.find(q => q.type === 'sorting');
    if (firstSortingQ) {
      setSortingItems(firstSortingQ.items || []);
    }
  }, [slug, getSurveyBySlug, navigate]);

  const totalQuestions = survey?.questions.length || 0;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const nextQuestion = useCallback(() => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      
      // Update sorting items for next question if it's a sorting type
      const nextQ = survey?.questions[currentQuestion + 1];
      if (nextQ?.type === 'sorting') {
        setSortingItems(nextQ.items || []);
      }
    } else {
      handleSubmit();
    }
  }, [currentQuestion, totalQuestions, survey]);

  const prevQuestion = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      
      // Update sorting items for previous question if it's a sorting type
      const prevQ = survey?.questions[currentQuestion - 1];
      if (prevQ?.type === 'sorting') {
        setSortingItems(prevQ.items || []);
      }
    }
  }, [currentQuestion, survey]);

  const handleKeyDown = useCallback((e) => {
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

  const handleAnswerChange = (questionId, value, autoAdvance = false) => {
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

  const handleSortingChange = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(sortingItems);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setSortingItems(reorderedItems);
    
    const currentQ = survey?.questions[currentQuestion];
    if (currentQ) {
      handleAnswerChange(currentQ.id, reorderedItems.map(item => item.id));
    }
  };

  const handleSubmit = () => {
    const timeTakenSeconds = Math.floor((Date.now() - startTime) / 1000);
    
    submitResponse(survey.id, {
      respondentEmail: answers.email || 'anonymous@survey.com',
      answers,
      timeTakenSeconds
    });

    setShowCompletion(true);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      prevQuestion();
    } else {
      if (confirm('Vill du verkligen lämna enkäten?')) {
        navigate('/');
      }
    }
  };

  const showHelp = () => {
    alert('💡 Tips:\n\n• Använd radioknappar, kryssrutor eller textfält för att svara\n• Vissa frågor går automatiskt vidare efter svar\n• Använd piltangenterna för manuell navigation\n• Klicka på tillbaka-knappen för att gå tillbaka');
  };

  const getQuestionState = (index) => {
    const relativePosition = index - currentQuestion;
    if (relativePosition === 0) return 'active';
    if (relativePosition === -1) return 'prev';
    if (relativePosition === 1) return 'next';
    return 'far';
  };

  const renderQuestionComponent = (questionData) => {
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
                    value={value.toString()}
                    onChange={() => handleAnswerChange(questionId, value.toString(), true)}
                    checked={currentAnswer === value.toString()}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'single-choice':
        return (
          <div className="options-container">
            {questionData.options?.map((option, i) => (
              <label key={i} className="option-label">
                <input 
                  type="radio" 
                  name={questionId} 
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
              <label key={i} className="option-label checkbox-label">
                <input 
                  type="checkbox" 
                  name={questionId} 
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
            <input 
              type="text" 
              className="text-input"
              value={typeof currentAnswer === 'string' ? currentAnswer : ''}
              onChange={(e) => handleAnswerChange(questionId, e.target.value)}
              placeholder={questionData.placeholder}
            />
            <button 
              className="next-button" 
              onClick={nextQuestion} 
              disabled={!currentAnswer || (typeof currentAnswer === 'string' && currentAnswer.length === 0)}
            >
              Nästa
            </button>
          </div>
        );
      
      case 'sorting':
        return (
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
                          className="sorting-item"
                          style={{
                            ...provided.draggableProps.style,
                            backgroundColor: snapshot.isDragging ? '#0c5370' : '#0c5370',
                            color: 'white',
                            padding: '15px',
                            marginBottom: '10px',
                            borderRadius: '10px',
                            boxShadow: snapshot.isDragging ? '0 5px 15px rgba(0,0,0,0.2)' : 'none',
                            transition: 'background-color 0.3s ease',
                          }}
                        >
                          {item.name}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
            <button 
              className="next-button" 
              onClick={nextQuestion} 
              disabled={!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)}
            >
              Nästa
            </button>
          </DragDropContext>
        );

      default:
        return null;
    }
  };

  if (!survey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
        <div className="text-white text-2xl">Laddar enkät...</div>
      </div>
    );
  }

  return (
    <div className="survey-container">
      <style dangerouslySetInnerHTML={{ __html: getThemeStyles(theme) }} />
              
      {showCompletion ? (
        <div className="completion-container">
          <h2>Tack för ditt svar!</h2>
          <p>Din enkät har skickats in.</p>
          <div className="completion-buttons">
            <button onClick={() => navigate('/')} className="completion-button">
              Tillbaka till startsidan
            </button>
          </div>
        </div>
      ) : (
        <>
          <header className="header">
            <h1>{survey.title}</h1>
            {survey.settings.showProgressBar && (
              <div className="progress-container">
                <span className="progress-text">{currentQuestion + 1} / {totalQuestions}</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            )}
          </header>

          <div className="survey-viewport">
            <div className="questions-container">
              {survey.questions.map((question, index) => (
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
            <button onClick={showHelp} className="help-button">?</button>
            <button 
              onClick={nextQuestion} 
              className="nav-button" 
              disabled={!answers[survey.questions[currentQuestion]?.id] || showAutoAdvance}
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

export default PublicSurvey;
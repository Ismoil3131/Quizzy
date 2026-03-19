import React, { useState, useEffect } from 'react';
import Question from './Question';
import Answers from './Answers';
import { QuestionData } from '../App';

// Импорт локальных иконок обратной связи (PNG)
import correctIcon from '../assets/icons/done_outline_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png';
import incorrectIcon from '../assets/icons/cancel_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png';

interface QuizProps {
  questions: QuestionData[];
  onFinish: (score: number, correctAnswers: number) => void;
  onExit: () => void;
}

export default function Quiz({ questions, onFinish, onExit }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (selectedAnswer || isTimeUp) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, selectedAnswer, isTimeUp]);

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion.answer) {
      const points = 10 * timeLeft;
      setScore(prev => prev + points);
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(10);
      setIsTimeUp(false);
    } else {
      onFinish(score, correctCount);
    }
  };

  const progressPercentage = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-card">
      <div className="quiz-header">
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
        
        <div className="stat-box">
          <span className="stat-label">Счет</span>
          <span className="stat-value" style={{ color: '#818cf8' }}>{score}</span>
        </div>
        
        <div className="stat-box" style={{ alignItems: 'flex-end' }}>
          <span className="stat-label">Время</span>
          <div className={`stat-value ${timeLeft <= 3 ? 'time-warning' : 'time-good'}`}>
            00:{timeLeft.toString().padStart(2, '0')}
          </div>
        </div>
      </div>        
      
      <div className="quiz-body">
        <Question 
          question={currentQuestion.question} 
          currentQuestionIndex={currentIndex} 
          totalQuestions={questions.length}
        />
        
        <Answers 
          options={currentQuestion.options}
          selectedAnswer={selectedAnswer}
          correctAnswer={currentQuestion.answer}
          onSelect={handleSelectAnswer}
          isTimeUp={isTimeUp}
        />

        <div className="quiz-footer">
          <div className="feedback-container">
            {(selectedAnswer || isTimeUp) && (
              selectedAnswer === currentQuestion.answer ? (
                <div className="feedback-msg correct">
                  <img src={correctIcon} alt="Правильно" className="feedback-icon" />
                  Правильно! +{10 * timeLeft} очков
                </div>
              ) : (
                <div className="feedback-msg incorrect">
                  <img src={incorrectIcon} alt="Неправильно" className="feedback-icon" />
                  Неправильно. Правильный ответ: <strong>{currentQuestion.answer}</strong>
                </div>
              )
            )}
          </div>
          
          {(selectedAnswer || isTimeUp) && (
            <button onClick={handleNextQuestion} className="next-btn">
              {currentIndex < questions.length - 1 ? 'Следующий вопрос' : 'Показать результаты'}
            </button>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={onExit} className="exit-btn">
            Выйти из игры
          </button>
        </div>
      </div>
    </div>
  );
}

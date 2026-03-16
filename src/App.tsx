import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { questions, Topic, QuestionData } from './data/questions';
import './index.css';

type GameState = 'start' | 'quiz' | 'result';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [selectedTopic, setSelectedTopic] = useState<Topic | 'mix'>('mix');
  const [finalScore, setFinalScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<QuestionData[]>(questions);

  const handleStart = (topic: Topic | 'mix') => {
    setSelectedTopic(topic);
    
    let filtered = questions;
    if (topic !== 'mix') {
      filtered = questions.filter(q => q.topic === topic);
    }
    
    // Перемешиваем и берем 10 вопросов
    const shuffled = [...filtered].sort(() => 0.5 - Math.random()).slice(0, 10);
    setQuizQuestions(shuffled);
    setGameState('quiz');
  };

  const handleFinish = (score: number, correct: number) => {
    setFinalScore(score);
    setCorrectAnswers(correct);
    setGameState('result');
  };

  const handleRestart = () => {
    setGameState('start');
    setFinalScore(0);
    setCorrectAnswers(0);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <div className="logo">Q</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Quizzy</h1>
        </div>
      </header>

      <main className="main-content">
        {gameState === 'start' && <StartScreen onStart={handleStart} />}
        {gameState === 'quiz' && (
          <Quiz 
            questions={quizQuestions} 
            onFinish={handleFinish} 
            onExit={handleRestart}
          />
        )}
        {gameState === 'result' && (
          <Result 
            score={finalScore} 
            correctAnswers={correctAnswers} 
            totalQuestions={quizQuestions.length}
            onRestart={handleRestart} 
          />
        )}
      </main>
    </div>
  );
}

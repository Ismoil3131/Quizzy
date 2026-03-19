import React, { useState } from 'react';
// Импортируем компоненты экранов
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import Result from './components/Result';
// Импортируем массив с вопросами из нашего файла данных
import { questions } from './data/questions';
// Подключаем стили
import './index.css';

/**
 * ГЛАВНЫЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ
 * Он управляет состоянием всей игры и переключает экраны.
 */
export default function App() {
  // СОСТОЯНИЯ ПРИЛОЖЕНИЯ (Hooks):
  const [gameState, setGameState] = useState('start');
  const [selectedTopic, setSelectedTopic] = useState('mix');
  const [finalScore, setFinalScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);

  /**
   * handleStart: Функция запуска игры. 
   */
  const handleStart = (topic) => {
    setSelectedTopic(topic);
    
    let filtered = questions;
    if (topic !== 'mix') {
      filtered = questions.filter(q => q.topic === topic);
    }
    
    // Перемешиваем и выбираем 10 вопросов
    const shuffled = [...filtered].sort(() => 0.5 - Math.random()).slice(0, 10);
    
    setQuizQuestions(shuffled);
    setGameState('quiz');
  };

  /**
   * handleFinish: Завершает игру и сохраняет результаты.
   */
  const handleFinish = (score, correct) => {
    setFinalScore(score);
    setCorrectAnswers(correct);
    setGameState('result');
  };

  /**
   * handleRestart: Сбрасывает игру в начальное состояние.
   */
  const handleRestart = () => {
    setGameState('start');
    setFinalScore(0);
    setCorrectAnswers(0);
    setQuizQuestions([]);
  };

  return (
    <div className="app-container">
      {/* Шапка приложения */}
      <header className="header">
        <div className="header-content">
          <div className="logo">Q</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Quizzy</h1>
        </div>
      </header>

      {/* Основная область контента */}
      <main className="main-content">
        {/* УСЛОВНЫЙ РЕНДЕРИНГ ЭКРАНОВ */}
        
        {gameState === 'start' && (
          <StartScreen onStart={handleStart} />
        )}
        
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
      </main> {/* Закрываем main */}
    </div> 
  ); // Закрываем return
} // Закрываем функцию App
import React from 'react';

interface ResultProps {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  onRestart: () => void;
}

export default function Result({ score, correctAnswers, totalQuestions, onRestart }: ResultProps) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  return (
    <div className="result-card">
      <h2 className="result-title">Викторина завершена!</h2>
      
      <div className="score-circle">
        {percentage}%
      </div>
      <p className="score-label">Точность ответов</p>

      <div className="stats-list">
        <div className="stat-item">
          <span className="stat-item-label">Итоговый счет</span>
          <span className="stat-item-value">{score}</span>
        </div>
        <div className="stat-item">
          <span className="stat-item-label">Правильных ответов</span>
          <span className="stat-item-value">{correctAnswers} из {totalQuestions}</span>
        </div>
      </div>

      <button onClick={onRestart} className="restart-btn">
        Выйти
      </button>
    </div>
  );
}

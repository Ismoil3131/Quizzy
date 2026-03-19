import React from 'react';

export default function Result({ score, correctAnswers, totalQuestions, onRestart }) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  return (
    <div className="result-card">
      <h2 className="result-title">Викторина завершена!</h2>
      <div className="score-circle">{percentage}%</div>
      <div className="stats-list">
        <div className="stat-item"><span>Счет:</span><span>{score}</span></div>
        <div className="stat-item"><span>Верно:</span><span>{correctAnswers} из {totalQuestions}</span></div>
      </div>
      <button onClick={onRestart} className="restart-btn">На главную</button>
    </div>
  );
}
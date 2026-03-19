import React from 'react';

export default function Question({ question, currentQuestionIndex, totalQuestions }) {
  return (
    <div>
      <div className="question-meta">
        <span className="question-number">{currentQuestionIndex + 1}</span>
        <span className="question-total"> из {totalQuestions} вопросов</span>
      </div>
      <h2 className="question-text">{question}</h2>
    </div>
  );
}
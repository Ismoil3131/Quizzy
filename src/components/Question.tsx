import React from 'react';

interface QuestionProps {
  question: string;
  currentQuestionIndex: number;
  totalQuestions: number;
}

export default function Question({ question, currentQuestionIndex, totalQuestions }: QuestionProps) {
  return (
    <div>
      <div className="question-meta">
        <span className="question-number">
          {currentQuestionIndex + 1}
        </span>
        <span className="question-total">
          из {totalQuestions} вопросов
        </span>
      </div>
      <h2 className="question-text">
        {question}
      </h2>
    </div>
  );
}

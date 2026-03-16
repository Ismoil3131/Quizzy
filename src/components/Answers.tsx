import React from 'react';

interface AnswersProps {
  options: string[];
  selectedAnswer: string | null;
  correctAnswer: string;
  onSelect: (answer: string) => void;
  isTimeUp: boolean;
}

export default function Answers({ options, selectedAnswer, correctAnswer, onSelect, isTimeUp }: AnswersProps) {
  return (
    <div className="answers-grid">
      {options.map((option, index) => {
        let btnClass = "answer-btn ";
        
        if (selectedAnswer || isTimeUp) {
          if (option === correctAnswer) {
            btnClass += "correct";
          } else if (option === selectedAnswer) {
            btnClass += "incorrect";
          } else {
            btnClass += "disabled-neutral";
          }
        }

        return (
          <button
            key={index}
            onClick={() => !selectedAnswer && !isTimeUp && onSelect(option)}
            disabled={!!selectedAnswer || isTimeUp}
            className={btnClass}
          >
            <span className="answer-letter">
              {String.fromCharCode(1040 + index)} {/* А, Б, В, Г */}
            </span>
            {option}
          </button>
        );
      })}
    </div>
  );
}

import React from 'react';

export default function Answers({ options, selectedAnswer, correctAnswer, onSelect, isTimeUp }) {
  return (
    <div className="answers-grid">
      {options.map((option, index) => {
        let btnClass = "answer-btn ";
        if (selectedAnswer || isTimeUp) {
          if (option === correctAnswer) btnClass += "correct";
          else if (option === selectedAnswer) btnClass += "incorrect";
          else btnClass += "disabled-neutral";
        }

        return (
          <button
            key={index}
            onClick={() => !selectedAnswer && !isTimeUp && onSelect(option)}
            disabled={!!selectedAnswer || isTimeUp}
            className={btnClass}
          >
            <span className="answer-letter">{String.fromCharCode(1040 + index)}</span>
            {option}
          </button>
        );
      })}
    </div>
  );
}
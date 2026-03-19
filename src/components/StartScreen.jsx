import React, { useState } from 'react';

// Импорт иконок
import mixIcon from '../assets/icons/mix_24db.png';
import scienceIcon from '../assets/icons/science_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png';
import footballIcon from '../assets/icons/sports_soccer_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png';
import countriesIcon from '../assets/icons/public_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png';
import spaceIcon from '../assets/icons/planet_24dp.png';
import animalsIcon from '../assets/icons/animal_24dp.png';
import historyIcon from '../assets/icons/history_24db.png';

export default function StartScreen({ onStart }) {
  const [selected, setSelected] = useState('mix');

  const topics = [
    { id: 'mix', name: 'Микс (Все темы)', icon: mixIcon },
    { id: 'space', name: 'Космос', icon: spaceIcon },
    { id: 'football', name: 'Футбол', icon: footballIcon },
    { id: 'countries', name: 'Страны мира', icon: countriesIcon },
    { id: 'animals', name: 'Животные', icon: animalsIcon },
    { id: 'history', name: 'История', icon: historyIcon },
    { id: 'science', name: 'Наука', icon: scienceIcon }
  ];

  return (
    <div className="start-screen">
      <h1 className="start-title">Добро пожаловать в Викторину!</h1>
      <p className="start-desc">Выберите тему. У вас будет 10 секунд на вопрос.</p>
      
      <div className="topics-grid">
        {topics.map(topic => (
          <button
            key={topic.id}
            className={`topic-btn ${selected === topic.id ? 'active' : ''}`}
            onClick={() => setSelected(topic.id)}
          >
            <img src={topic.icon} alt={topic.name} className="topic-icon" />
            <span>{topic.name}</span>
          </button>
        ))}
      </div>

      <button onClick={() => onStart(selected)} className="start-btn">
        Начать игру
      </button>
    </div>
  );
}
import React, { useState } from 'react';
import { Topic } from '../data/questions';
import { History as HistoryIcon } from 'lucide-react';

// Импорт локальных иконок (PNG)
import scienceIcon from '../assets/icons/science_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png';
import footballIcon from '../assets/icons/sports_soccer_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png';
import countriesIcon from '../assets/icons/public_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png';
import spaceIcon from '../assets/icons/planet-ringed.png';
import animalsIcon from '../assets/icons/cow-alt.png';

interface StartScreenProps {
  onStart: (topic: Topic | 'mix') => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const [selected, setSelected] = useState<Topic | 'mix'>('mix');

  const topics: { id: Topic | 'mix', name: string, icon: string | React.ReactNode }[] = [
    { id: 'mix', name: 'Микс (Все темы)', icon: '🔀' },
    { id: 'space', name: 'Космос', icon: spaceIcon },
    { id: 'football', name: 'Футбол', icon: footballIcon },
    { id: 'countries', name: 'Страны мира', icon: countriesIcon },
    { id: 'animals', name: 'Животные', icon: animalsIcon },
    { id: 'history', name: 'История', icon: <HistoryIcon size={24} /> },
    { id: 'science', name: 'Наука', icon: scienceIcon }
  ];

  return (
    <div className="start-screen">
      <h1 className="start-title">Добро пожаловать в Викторину!</h1>
      <p className="start-desc">
        Проверьте свои знания. Выберите тему, у вас будет 10 секунд на каждый вопрос. Удачи!
      </p>
      
      <div className="topics-container">
        <h2 className="topics-title">Выберите тему:</h2>
        <div className="topics-grid">
          {topics.map(topic => (
            <button
              key={topic.id}
              className={`topic-btn ${selected === topic.id ? 'active' : ''}`}
              onClick={() => setSelected(topic.id)}
            >
              <div className="topic-icon-wrapper">
                {typeof topic.icon === 'string' && topic.icon.length > 2 ? (
                  <img src={topic.icon} alt={topic.name} className="topic-icon" />
                ) : (
                  <div style={{ fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {topic.icon}
                  </div>
                )}
              </div>
              <span>{topic.name}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => onStart(selected)}
        className="start-btn"
      >
        Начать игру
      </button>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const sections = [
  {
    title: "🧭 Orientation Style",
    color: "#667eea",
    questions: [
      { id: 1, text: "When given a task, I prefer to plan everything before starting", category: "analytical" },
      { id: 2, text: "I get energized by meeting and interacting with new people", category: "social" },
      { id: 3, text: "I prefer to work in a structured and organized environment", category: "leadership" },
      { id: 4, text: "I enjoy taking risks and trying unconventional approaches", category: "independent" },
      { id: 5, text: "I like to deeply focus on one thing at a time", category: "academic" },
      { id: 6, text: "I naturally take charge when working in a group", category: "leadership" },
    ]
  },
  {
    title: "🌟 Personality",
    color: "#f093fb",
    questions: [
      { id: 7, text: "I am known for being empathetic and understanding others' feelings", category: "social" },
      { id: 8, text: "I enjoy coming up with new ideas and creative solutions", category: "creative" },
      { id: 9, text: "I prefer facts and data over intuition and feelings", category: "analytical" },
      { id: 10, text: "I stay calm and composed in stressful situations", category: "leadership" },
      { id: 11, text: "I love exploring new places, ideas and experiences", category: "independent" },
      { id: 12, text: "I am detail-oriented and notice things others miss", category: "analytical" },
    ]
  },
  {
    title: "💡 Interest",
    color: "#4facfe",
    questions: [
      { id: 13, text: "I enjoy reading about science, technology or how things work", category: "technical" },
      { id: 14, text: "I like drawing, painting, designing or making things look beautiful", category: "creative" },
      { id: 15, text: "I am interested in how the human body and mind works", category: "academic" },
      { id: 16, text: "I enjoy working with computers, coding or building digital things", category: "technical" },
      { id: 17, text: "I love helping others solve their personal problems", category: "social" },
      { id: 18, text: "I find business, finance and economics interesting", category: "leadership" },
    ]
  },
  {
    title: "🧠 Aptitude",
    color: "#43e97b",
    questions: [
      { id: 19, text: "I can easily solve mathematical or logical puzzles", category: "analytical" },
      { id: 20, text: "I can quickly understand and explain complex topics to others", category: "academic" },
      { id: 21, text: "I am good at building, fixing or working with my hands", category: "practical" },
      { id: 22, text: "I can visualize and think in 3D or spatial terms easily", category: "technical" },
      { id: 23, text: "I am good at writing, storytelling or expressing ideas in words", category: "creative" },
      { id: 24, text: "I can easily manage time, money and resources efficiently", category: "leadership" },
    ]
  },
  {
    title: "❤️ Emotional Quotient",
    color: "#fa709a",
    questions: [
      { id: 25, text: "I can easily sense when someone around me is upset", category: "social" },
      { id: 26, text: "I handle criticism positively and use it to improve myself", category: "independent" },
      { id: 27, text: "I stay motivated even when facing failures or setbacks", category: "leadership" },
      { id: 28, text: "I can work effectively with people who have different opinions", category: "social" },
      { id: 29, text: "I am aware of my own emotions and can manage them well", category: "independent" },
      { id: 30, text: "I find it easy to motivate and inspire people around me", category: "leadership" },
    ]
  }
];

const allQuestions = sections.flatMap(s => s.questions.map(q => ({ ...q, sectionTitle: s.title, sectionColor: s.color })));

function Assessment() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [allQuestions[current].id]: { value, category: allQuestions[current].category } };
    setAnswers(newAnswers);
    if (current < allQuestions.length - 1) {
      setTimeout(() => setCurrent(current + 1), 300);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/assessment/submit',
        { answers },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.setItem('results', JSON.stringify(res.data));
      navigate('/results');
    } catch (err) {
      alert('Please login first!');
      navigate('/login');
    }
  };

  const q = allQuestions[current];
  const progress = ((current) / allQuestions.length) * 100;
  const isLast = current === allQuestions.length - 1;
  const allAnswered = Object.keys(answers).length === allQuestions.length;

  // Find current section
  const currentSection = sections.find(s => s.questions.some(sq => sq.id === q.id));

  return (
    <div style={{ ...styles.container, background: `linear-gradient(135deg, ${currentSection.color}33 0%, #764ba233 100%)` }}>
      <div style={styles.card}>
        {/* Header */}
        <div style={{ ...styles.sectionBadge, background: currentSection.color }}>
          {currentSection.title}
        </div>

        {/* Progress */}
        <div style={styles.progressInfo}>
          <span style={styles.counter}>Question {current + 1} of {allQuestions.length}</span>
          <span style={styles.counter}>{Math.round(progress)}%</span>
        </div>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${progress}%`, background: currentSection.color }} />
        </div>

        {/* Question */}
        <p style={styles.question}>{q.text}</p>

        {/* Options */}
        <div style={styles.options}>
          {[
            { label: 'Strongly Agree', emoji: '😊', value: 5 },
            { label: 'Agree', emoji: '🙂', value: 4 },
            { label: 'Neutral', emoji: '😐', value: 3 },
            { label: 'Disagree', emoji: '🙁', value: 2 },
            { label: 'Strongly Disagree', emoji: '😞', value: 1 }
          ].map(opt => (
            <button
              key={opt.value}
              style={{
                ...styles.optionBtn,
                background: answers[q.id]?.value === opt.value ? currentSection.color : 'white',
                color: answers[q.id]?.value === opt.value ? 'white' : '#333',
                borderColor: currentSection.color,
                transform: answers[q.id]?.value === opt.value ? 'scale(1.02)' : 'scale(1)'
              }}
              onClick={() => handleAnswer(opt.value)}
            >
              <span style={styles.emoji}>{opt.emoji}</span>
              {opt.label}
            </button>
          ))}
        </div>

        {/* Nav */}
        <div style={styles.navButtons}>
          {current > 0 && (
            <button style={styles.navBtn} onClick={() => setCurrent(current - 1)}>← Back</button>
          )}
          {isLast && allAnswered && (
            <button style={{ ...styles.submitBtn, background: currentSection.color }} onClick={handleSubmit}>
              See My Results 🎯
            </button>
          )}
        </div>

        {/* Section dots */}
        <div style={styles.dots}>
          {sections.map((s, i) => (
            <div key={i} style={{ ...styles.dot, background: s.color, opacity: sections.indexOf(currentSection) >= i ? 1 : 0.3 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', transition: 'background 0.5s' },
  card: { background: 'white', padding: '40px', borderRadius: '24px', width: '620px', maxWidth: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' },
  sectionBadge: { display: 'inline-block', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '20px' },
  progressInfo: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' },
  counter: { color: '#888', fontSize: '0.9rem' },
  progressBar: { width: '100%', height: '6px', background: '#eee', borderRadius: '4px', marginBottom: '30px' },
  progressFill: { height: '100%', borderRadius: '4px', transition: 'width 0.4s ease' },
  question: { fontSize: '1.25rem', color: '#222', marginBottom: '25px', lineHeight: '1.7', fontWeight: '500' },
  options: { display: 'flex', flexDirection: 'column', gap: '10px' },
  optionBtn: { padding: '14px 20px', border: '2px solid', borderRadius: '12px', cursor: 'pointer', fontSize: '1rem', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '500' },
  emoji: { fontSize: '1.3rem' },
  navButtons: { display: 'flex', justifyContent: 'space-between', marginTop: '25px' },
  navBtn: { padding: '10px 20px', background: '#f0f0f0', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '0.95rem' },
  submitBtn: { padding: '14px 35px', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' },
  dots: { display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '25px' },
  dot: { width: '10px', height: '10px', borderRadius: '50%', transition: 'opacity 0.3s' }
};

export default Assessment;
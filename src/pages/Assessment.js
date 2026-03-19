import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const sections = [
  {
    title: "💡 Interest",
    color: "#667eea",
    questions: [
      { id: 1, text: "I enjoy working with computers, technology and digital tools", category: "technical" },
      { id: 2, text: "I like reading, writing and expressing ideas through words", category: "creative" },
      { id: 3, text: "I am passionate about helping and caring for people", category: "social" },
      { id: 4, text: "I enjoy doing business, trading and financial activities", category: "leadership" },
      { id: 5, text: "I love science experiments, research and discoveries", category: "academic" },
    ]
  },
  {
    title: "🧠 Aptitude",
    color: "#4facfe",
    questions: [
      { id: 6, text: "I can easily solve mathematical and logical problems", category: "analytical" },
      { id: 7, text: "I am good at explaining complex things in simple words", category: "academic" },
      { id: 8, text: "I can build, fix or work with physical things easily", category: "practical" },
      { id: 9, text: "I pick up new technical skills and tools very quickly", category: "technical" },
      { id: 10, text: "I am good at planning, organizing and managing tasks", category: "leadership" },
    ]
  },
  {
    title: "🌟 Personality",
    color: "#f093fb",
    questions: [
      { id: 11, text: "I naturally take charge and lead when working in a group", category: "leadership" },
      { id: 12, text: "I am creative and always thinking of new and unique ideas", category: "creative" },
      { id: 13, text: "I prefer working with data and facts over feelings", category: "analytical" },
      { id: 14, text: "I am empathetic and understand others' emotions easily", category: "social" },
      { id: 15, text: "I stay calm, focused and composed under pressure", category: "independent" },
    ]
  },
  {
    title: "💎 Values",
    color: "#43e97b",
    questions: [
      { id: 16, text: "Making a positive impact on society is very important to me", category: "social" },
      { id: 17, text: "I value financial success and career growth above all", category: "leadership" },
      { id: 18, text: "I believe creativity and self-expression are most important", category: "creative" },
      { id: 19, text: "I value knowledge, learning and intellectual growth", category: "academic" },
      { id: 20, text: "Independence and freedom in my work matters most to me", category: "independent" },
    ]
  },
  {
    title: "📚 Academic Strength",
    color: "#fa709a",
    questions: [
      { id: 21, text: "I perform best in Math and Science subjects", category: "analytical" },
      { id: 22, text: "I excel in Languages, Literature and Social Studies", category: "creative" },
      { id: 23, text: "I am strongest in Biology and Life Sciences", category: "academic" },
      { id: 24, text: "I enjoy and do well in Computer Science and IT", category: "technical" },
      { id: 25, text: "I perform well in Commerce, Accounts and Economics", category: "leadership" },
    ]
  },
  {
    title: "🔭 Future Scope",
    color: "#f7971e",
    questions: [
      { id: 26, text: "I see myself working in a global company or abroad", category: "independent" },
      { id: 27, text: "I want to start my own business or startup someday", category: "leadership" },
      { id: 28, text: "I want a stable government job with job security", category: "practical" },
      { id: 29, text: "I want to work in research, innovation or academics", category: "academic" },
      { id: 30, text: "I want to create something that changes the world", category: "creative" },
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
  const currentSection = sections.find(s => s.questions.some(sq => sq.id === q.id));

  return (
    <div style={{ ...styles.container, background: `linear-gradient(135deg, ${currentSection.color}22 0%, #ffffff 100%)` }}>
      <div style={styles.card}>
        <div style={{ ...styles.sectionBadge, background: currentSection.color }}>
          {currentSection.title}
        </div>
        <div style={styles.progressInfo}>
          <span style={styles.counter}>Question {current + 1} of {allQuestions.length}</span>
          <span style={styles.counter}>{Math.round(progress)}% Complete</span>
        </div>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${progress}%`, background: currentSection.color }} />
        </div>
        <p style={styles.question}>{q.text}</p>
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
        <div style={styles.dots}>
          {sections.map((s, i) => (
            <div key={i} style={{
              ...styles.dot,
              background: s.color,
              opacity: sections.indexOf(currentSection) >= i ? 1 : 0.25,
              width: sections.indexOf(currentSection) === i ? '20px' : '10px',
              borderRadius: '10px'
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', transition: 'background 0.5s' },
  card: { background: 'white', padding: '50px', borderRadius: '30px', width: '680px', maxWidth: '100%', boxShadow: '0 30px 80px rgba(0,0,0,0.12)' },
  sectionBadge: { display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'white', padding: '8px 20px', borderRadius: '25px', fontSize: '0.95rem', fontWeight: 'bold', marginBottom: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' },
  progressInfo: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' },
  counter: { color: '#999', fontSize: '0.9rem', fontWeight: '500' },
  progressBar: { width: '100%', height: '8px', background: '#f0f0f0', borderRadius: '10px', marginBottom: '35px' },
  progressFill: { height: '100%', borderRadius: '10px', transition: 'width 0.4s ease' },
  question: { fontSize: '1.35rem', color: '#1a1a2e', marginBottom: '30px', lineHeight: '1.7', fontWeight: '600' },
  options: { display: 'flex', flexDirection: 'column', gap: '12px' },
  optionBtn: { padding: '16px 22px', border: '2px solid', borderRadius: '14px', cursor: 'pointer', fontSize: '1rem', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '14px', fontWeight: '500', textAlign: 'left' },
  emoji: { fontSize: '1.5rem', minWidth: '30px' },
  navButtons: { display: 'flex', justifyContent: 'space-between', marginTop: '30px' },
  navBtn: { padding: '12px 25px', background: '#f5f5f5', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '500', color: '#666' },
  submitBtn: { padding: '15px 40px', color: 'white', border: 'none', borderRadius: '14px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 8px 25px rgba(0,0,0,0.2)' },
  dots: { display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '30px' },
  dot: { height: '10px', borderRadius: '50%', transition: 'all 0.3s' }
};

export default Assessment;
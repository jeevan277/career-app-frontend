import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <div style={styles.logo}>🎯 CareerPath</div>
        <div style={styles.navLinks}>
          <button style={styles.loginBtn} onClick={() => navigate('/login')}>Login</button>
          <button style={styles.startBtn} onClick={() => navigate('/register')}>Get Started</button>
        </div>
      </nav>

      <div style={styles.hero}>
        <div style={styles.heroLeft}>
          <div style={styles.badge}>🏆 Trusted Psychometric Assessment</div>
          <h1 style={styles.title}>Discover Your <span style={styles.highlight}>Perfect Career</span> Path</h1>
          <p style={styles.subtitle}>
            Our psychometric assessment evaluates your Interest, Aptitude, Personality, Values, Academic Strength, and Future Scope — to identify your strengths, personality traits, and the most suitable career paths for you.
          </p>
          <div style={styles.heroButtons}>
            <button style={styles.primaryBtn} onClick={() => navigate('/register')}>Take Free Assessment →</button>
            <button style={styles.secondaryBtn} onClick={() => navigate('/login')}>Already registered? Login</button>
          </div>
          <div style={styles.stats}>
            <div style={styles.stat}><strong>30</strong><span>Questions</span></div>
            <div style={styles.statDivider} />
            <div style={styles.stat}><strong>6</strong><span>Dimensions</span></div>
            <div style={styles.statDivider} />
            <div style={styles.stat}><strong>10+</strong><span>Career Matches</span></div>
            <div style={styles.statDivider} />
            <div style={styles.stat}><strong>Free</strong><span>Forever</span></div>
          </div>
        </div>
        <div style={styles.heroRight}>
          <div style={styles.card1}>🧠 Personality Analysis</div>
          <div style={styles.card2}>💡 Interest Mapping</div>
          <div style={styles.card3}>📊 Aptitude Testing</div>
          <div style={styles.card4}>❤️ Emotional Quotient</div>
          <div style={styles.card5}>🗺️ Career Roadmap</div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <div style={styles.steps}>
          {[
            { icon: '📝', step: '01', title: 'Register Free', desc: 'Create your account in 30 seconds' },
            { icon: '🧠', step: '02', title: 'Take Assessment', desc: 'Answer 30 carefully designed questions' },
            { icon: '🔬', step: '03', title: 'Get Analyzed', desc: 'Our algorithm matches your profile' },
            { icon: '🎯', step: '04', title: 'See Results', desc: 'Get your personalized career roadmap' }
          ].map((s, i) => (
            <div key={i} style={styles.step}>
              <div style={styles.stepIcon}>{s.icon}</div>
              <div style={styles.stepNum}>{s.step}</div>
              <h3 style={styles.stepTitle}>{s.title}</h3>
              <p style={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...styles.section, background: '#f8f0ff' }}>
        <h2 style={styles.sectionTitle}>6-Dimensional Assessment</h2>
        <div style={styles.dimensions}>
          {[
            { icon: '💡', title: 'Interest', desc: 'Work areas that excite you', color: '#667eea' },
            { icon: '🧠', title: 'Aptitude', desc: 'Your innate strengths & abilities', color: '#4facfe' },
            { icon: '🌟', title: 'Personality', desc: 'Your behavioral patterns & traits', color: '#f093fb' },
            { icon: '💎', title: 'Values', desc: 'What matters most to you', color: '#43e97b' },
            { icon: '📚', title: 'Academic Strength', desc: 'Your strongest subjects', color: '#fa709a' },
            { icon: '🔭', title: 'Future Scope', desc: 'Your vision for the future', color: '#f7971e' }
          ].map((d, i) => (
            <div key={i} style={{ ...styles.dimension, borderTop: `4px solid ${d.color}` }}>
              <div style={styles.dimIcon}>{d.icon}</div>
              <h3 style={styles.dimTitle}>{d.title}</h3>
              <p style={styles.dimDesc}>{d.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.cta}>
        <h2 style={styles.ctaTitle}>Ready to Find Your Dream Career?</h2>
        <p style={styles.ctaDesc}>Join thousands of students who discovered their path</p>
        <button style={styles.ctaBtn} onClick={() => navigate('/register')}>Start Your Free Assessment Now →</button>
      </div>

      <footer style={styles.footer}>
        <p>© 2026 CareerPath Assessment | Built for students</p>
      </footer>
    </div>
  );
}

const styles = {
  page: { fontFamily: "'Segoe UI', sans-serif", color: '#333', margin: 0, padding: 0 },
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 60px', background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 100 },
  logo: { fontSize: '1.5rem', fontWeight: 'bold', color: '#764ba2' },
  navLinks: { display: 'flex', gap: '15px' },
  loginBtn: { padding: '8px 22px', background: 'transparent', border: '2px solid #764ba2', color: '#764ba2', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' },
  startBtn: { padding: '8px 22px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' },
  hero: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '60px 60px', background: 'linear-gradient(135deg, #f8f0ff 0%, #e8f4ff 100%)', minHeight: 'calc(100vh - 57px)', boxSizing: 'border-box' },
  heroLeft: { maxWidth: '520px' },
  badge: { display: 'inline-block', background: '#f0e6ff', color: '#764ba2', padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '15px' },
  title: { fontSize: '2.8rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '15px', color: '#1a1a2e', marginTop: '0' },
  highlight: { background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  subtitle: { fontSize: '1rem', color: '#666', lineHeight: '1.7', marginBottom: '25px' },
  heroButtons: { display: 'flex', gap: '12px', marginBottom: '30px', flexWrap: 'wrap' },
  primaryBtn: { padding: '13px 28px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.95rem' },
  secondaryBtn: { padding: '13px 28px', background: 'white', color: '#764ba2', border: '2px solid #764ba2', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.95rem' },
  stats: { display: 'flex', gap: '20px', alignItems: 'center' },
  stat: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', fontSize: '0.9rem' },
  statDivider: { width: '1px', height: '30px', background: '#ddd' },
  heroRight: { display: 'flex', flexDirection: 'column', gap: '12px', width: '240px' },
  card1: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '16px 20px', borderRadius: '14px', fontWeight: 'bold', boxShadow: '0 8px 25px rgba(102,126,234,0.4)', fontSize: '0.95rem' },
  card2: { background: 'linear-gradient(135deg, #f093fb, #f5576c)', color: 'white', padding: '16px 20px', borderRadius: '14px', fontWeight: 'bold', boxShadow: '0 8px 25px rgba(240,147,251,0.4)', fontSize: '0.95rem' },
  card3: { background: 'linear-gradient(135deg, #4facfe, #00f2fe)', color: 'white', padding: '16px 20px', borderRadius: '14px', fontWeight: 'bold', boxShadow: '0 8px 25px rgba(79,172,254,0.4)', fontSize: '0.95rem' },
  card4: { background: 'linear-gradient(135deg, #43e97b, #38f9d7)', color: 'white', padding: '16px 20px', borderRadius: '14px', fontWeight: 'bold', boxShadow: '0 8px 25px rgba(67,233,123,0.4)', fontSize: '0.95rem' },
  card5: { background: 'linear-gradient(135deg, #fa709a, #fee140)', color: 'white', padding: '16px 20px', borderRadius: '14px', fontWeight: 'bold', boxShadow: '0 8px 25px rgba(250,112,154,0.4)', fontSize: '0.95rem' },
  section: { padding: '60px 60px', background: 'white' },
  sectionTitle: { textAlign: 'center', fontSize: '2rem', fontWeight: '700', marginBottom: '40px', color: '#1a1a2e' },
  steps: { display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' },
  step: { textAlign: 'center', maxWidth: '200px' },
  stepIcon: { fontSize: '2.5rem', marginBottom: '10px' },
  stepNum: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontWeight: 'bold', fontSize: '0.85rem' },
  stepTitle: { fontWeight: '700', marginBottom: '6px', color: '#1a1a2e' },
  stepDesc: { color: '#888', fontSize: '0.9rem' },
  dimensions: { display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' },
  dimension: { background: 'white', padding: '25px 20px', borderRadius: '14px', width: '160px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' },
  dimIcon: { fontSize: '2rem', marginBottom: '10px' },
  dimTitle: { fontWeight: '700', marginBottom: '6px', color: '#1a1a2e', fontSize: '0.9rem' },
  dimDesc: { color: '#888', fontSize: '0.8rem' },
  cta: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '70px 60px', textAlign: 'center', color: 'white' },
  ctaTitle: { fontSize: '2.2rem', fontWeight: '800', marginBottom: '12px' },
  ctaDesc: { fontSize: '1rem', marginBottom: '30px', opacity: 0.9 },
  ctaBtn: { padding: '16px 45px', background: 'white', color: '#764ba2', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.05rem' },
  footer: { background: '#1a1a2e', color: '#888', textAlign: 'center', padding: '20px' }
};

export default Home;
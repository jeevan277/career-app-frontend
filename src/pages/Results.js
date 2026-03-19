import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Results() {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('results');
    if (data) setResults(JSON.parse(data));
    else navigate('/assessment');
  }, [navigate]);

  if (!results) return <div style={styles.loading}>⏳ Analyzing your results...</div>;

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>🎯 Your Career Assessment Results</h1>
        <p style={styles.headerSub}>Interest + Aptitude + Personality + Values + Academic Strength + Future Scope</p>
      </div>

      <div style={styles.wrapper}>

        {/* 1. Career Clusters */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🏆 Career Clusters & Matches</h2>
          <div style={styles.careerGrid}>
            {results.careers?.map((career, i) => (
              <div key={i} style={{ ...styles.careerCard, borderLeft: `5px solid ${i === 0 ? '#764ba2' : i === 1 ? '#667eea' : '#4facfe'}` }}>
                <div style={styles.careerHeader}>
                  <h3 style={styles.careerTitle}>{i === 0 ? '⭐ ' : i === 1 ? '🥈 ' : i === 2 ? '🥉 ' : '🔹 '}{career.title}</h3>
                  <span style={{ ...styles.fitBadge, background: career.fit > 80 ? '#22c55e' : career.fit > 60 ? '#f59e0b' : '#64748b' }}>
                    {career.fit}% Match
                  </span>
                </div>
                <div style={styles.fitBar}>
                  <div style={{ ...styles.fitFill, width: `${career.fit}%`, background: i === 0 ? 'linear-gradient(90deg, #667eea, #764ba2)' : 'linear-gradient(90deg, #4facfe, #00f2fe)' }} />
                </div>
                <p style={styles.careerDesc}>{career.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Career Roles */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>💡 Why This Career Role Matches You</h2>
          <div style={styles.whyCard}>
            <div style={styles.whyGrid}>
              {[
                { icon: '🧠', title: 'Your Thinking Style', desc: `You scored high in analytical and problem-solving dimensions, making ${results.careers?.[0]?.title} a natural fit for your cognitive strengths.` },
                { icon: '❤️', title: 'Your Personality', desc: `Your personality traits align perfectly with the day-to-day work environment of a ${results.careers?.[0]?.title}.` },
                { icon: '🎯', title: 'Your Interests', desc: `The work areas that excite you most directly overlap with what ${results.careers?.[0]?.title}s do every day.` },
                { icon: '⚡', title: 'Your Strengths', desc: `Your natural aptitude gives you a head start in developing the skills needed for ${results.careers?.[0]?.title}.` }
              ].map((item, i) => (
                <div key={i} style={styles.whyItem}>
                  <span style={styles.whyIcon}>{item.icon}</span>
                  <div>
                    <h4 style={styles.whyTitle}>{item.title}</h4>
                    <p style={styles.whyDesc}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Personality Traits */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🧬 Your Personality Traits</h2>
          <div style={styles.traitsGrid}>
            {results.traits?.length > 0 ? results.traits.map((trait, i) => (
              <div key={i} style={styles.traitCard}>
                <span style={styles.traitEmoji}>{trait.emoji}</span>
                <p style={styles.traitName}>{trait.name}</p>
              </div>
            )) : (
              ['Balanced', 'Adaptable', 'Curious', 'Motivated'].map((t, i) => (
                <div key={i} style={styles.traitCard}>
                  <span style={styles.traitEmoji}>⭐</span>
                  <p style={styles.traitName}>{t}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 4. Required Subjects */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>📚 Required Subjects & Stream</h2>
          <div style={styles.streamCard}>
            <div style={styles.streamHeader}>
              <h3 style={styles.streamName}>{results.stream?.name}</h3>
              <span style={styles.streamBadge}>Recommended</span>
            </div>
            <p style={styles.streamDesc}>{results.stream?.description}</p>
            <h4 style={styles.subjectsTitle}>Core Subjects to Focus On:</h4>
            <div style={styles.subjects}>
              {results.stream?.subjects?.map((s, i) => (
                <span key={i} style={styles.subject}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Courses & Degree Path */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🎓 Courses & Degree Path</h2>
          <div style={styles.degreeGrid}>
            {[
              { level: '10th - 12th', icon: '🏫', title: 'School Level', desc: `Focus on ${results.stream?.subjects?.slice(0, 2).join(' & ')} as core subjects. Aim for 85%+ marks.` },
              { level: "Bachelor's", icon: '🎓', title: 'Undergraduate Degree', desc: `Pursue a degree related to ${results.careers?.[0]?.title}. Top colleges: IITs, NITs, DU, Christ University.` },
              { level: "Master's", icon: '📜', title: 'Postgraduate Degree', desc: `Specialize with an MBA, M.Tech, or Masters to fast-track your ${results.careers?.[0]?.title} career.` },
              { level: 'Certifications', icon: '🏆', title: 'Online Certifications', desc: 'Coursera, Udemy, LinkedIn Learning — build practical skills alongside your degree.' }
            ].map((d, i) => (
              <div key={i} style={styles.degreeCard}>
                <span style={styles.degreeIcon}>{d.icon}</span>
                <span style={styles.degreeLevel}>{d.level}</span>
                <h4 style={styles.degreeTitle}>{d.title}</h4>
                <p style={styles.degreeDesc}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Action Plan */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🗺️ Action Plan — Your Roadmap</h2>
          <div style={styles.timeline}>
            {results.actionPlan?.map((step, i) => (
              <div key={i} style={styles.timelineItem}>
                <div style={styles.timelineLeft}>
                  <div style={styles.timelineCircle}>{i + 1}</div>
                  {i < 4 && <div style={styles.timelineLine} />}
                </div>
                <div style={styles.timelineContent}>
                  <span style={styles.timelineYear}>Year {i + 1}</span>
                  <p style={styles.timelineText}>{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Skills to Develop */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>⚡ Skills to Develop</h2>
          <div style={styles.skillsGrid}>
            {[
              { category: '🧠 Technical Skills', skills: ['Problem Solving', 'Data Analysis', 'Digital Literacy', 'Research Methods'] },
              { category: '🗣️ Soft Skills', skills: ['Communication', 'Leadership', 'Time Management', 'Critical Thinking'] },
              { category: '💼 Career Skills', skills: ['Resume Building', 'Interview Prep', 'Networking', 'Personal Branding'] },
              { category: '📱 Digital Skills', skills: ['MS Office', 'Google Workspace', 'Social Media', 'Online Collaboration'] }
            ].map((cat, i) => (
              <div key={i} style={styles.skillCategory}>
                <h4 style={styles.skillCatTitle}>{cat.category}</h4>
                <div style={styles.skillTags}>
                  {cat.skills.map((skill, j) => (
                    <span key={j} style={styles.skillTag}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 8. Alternate Career Roles */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🔄 Alternate Career Roles</h2>
          <div style={styles.altGrid}>
            {results.careers?.slice(1).map((career, i) => (
              <div key={i} style={styles.altCard}>
                <h4 style={styles.altTitle}>{career.title}</h4>
                <div style={styles.altBar}>
                  <div style={{ ...styles.altFill, width: `${career.fit}%` }} />
                </div>
                <p style={styles.altFit}>{career.fit}% Match</p>
                <p style={styles.altDesc}>{career.description}</p>
              </div>
            ))}
          </div>
        </div>

        <button style={styles.retakeBtn} onClick={() => { localStorage.removeItem('results'); navigate('/assessment'); }}>
          🔄 Retake Assessment
        </button>

      </div>
    </div>
  );
}

const styles = {
  page: { fontFamily: "'Segoe UI', sans-serif", background: '#f5f7ff', minHeight: '100vh' },
  header: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '60px 40px', textAlign: 'center', color: 'white' },
  headerTitle: { fontSize: '2.5rem', fontWeight: '800', margin: 0, marginBottom: '12px' },
  headerSub: { fontSize: '1rem', opacity: 0.9, margin: 0 },
  wrapper: { maxWidth: '900px', margin: '0 auto', padding: '40px 20px' },
  section: { background: 'white', padding: '35px', borderRadius: '20px', marginBottom: '25px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' },
  sectionTitle: { color: '#1a1a2e', fontSize: '1.5rem', fontWeight: '700', marginBottom: '25px', paddingBottom: '12px', borderBottom: '2px solid #f0f0f0' },
  careerGrid: { display: 'flex', flexDirection: 'column', gap: '15px' },
  careerCard: { padding: '20px', border: '1px solid #eee', borderRadius: '12px', background: '#fafafa' },
  careerHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  careerTitle: { color: '#1a1a2e', margin: 0, fontSize: '1.1rem' },
  fitBadge: { color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' },
  fitBar: { width: '100%', height: '8px', background: '#eee', borderRadius: '4px', marginBottom: '10px' },
  fitFill: { height: '100%', borderRadius: '4px' },
  careerDesc: { color: '#666', margin: 0, fontSize: '0.95rem' },
  whyCard: { background: '#f8f0ff', padding: '25px', borderRadius: '15px' },
  whyGrid: { display: 'flex', flexDirection: 'column', gap: '20px' },
  whyItem: { display: 'flex', gap: '15px', alignItems: 'flex-start' },
  whyIcon: { fontSize: '2rem', minWidth: '40px' },
  whyTitle: { color: '#764ba2', fontWeight: '700', margin: '0 0 5px' },
  whyDesc: { color: '#555', margin: 0, lineHeight: '1.6' },
  traitsGrid: { display: 'flex', flexWrap: 'wrap', gap: '15px' },
  traitCard: { background: 'linear-gradient(135deg, #f8f0ff, #e8f4ff)', padding: '20px 25px', borderRadius: '15px', textAlign: 'center', minWidth: '120px' },
  traitEmoji: { fontSize: '2.5rem', display: 'block', marginBottom: '8px' },
  traitName: { color: '#764ba2', fontWeight: '700', margin: 0 },
  streamCard: { background: 'linear-gradient(135deg, #f8f0ff, #e8f4ff)', padding: '25px', borderRadius: '15px' },
  streamHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  streamName: { color: '#1a1a2e', margin: 0, fontSize: '1.3rem' },
  streamBadge: { background: '#764ba2', color: 'white', padding: '4px 14px', borderRadius: '20px', fontSize: '0.85rem' },
  streamDesc: { color: '#555', marginBottom: '15px' },
  subjectsTitle: { color: '#764ba2', marginBottom: '10px' },
  subjects: { display: 'flex', flexWrap: 'wrap', gap: '10px' },
  subject: { background: '#764ba2', color: 'white', padding: '6px 18px', borderRadius: '25px', fontSize: '0.9rem' },
  degreeGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' },
  degreeCard: { background: '#f8f9ff', padding: '20px', borderRadius: '12px', border: '1px solid #e8e8ff' },
  degreeIcon: { fontSize: '2rem', display: 'block', marginBottom: '8px' },
  degreeLevel: { background: '#667eea', color: 'white', padding: '3px 10px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 'bold' },
  degreeTitle: { color: '#1a1a2e', margin: '10px 0 5px' },
  degreeDesc: { color: '#666', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' },
  timeline: { display: 'flex', flexDirection: 'column' },
  timelineItem: { display: 'flex', gap: '20px' },
  timelineLeft: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  timelineCircle: { width: '40px', height: '40px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 },
  timelineLine: { width: '2px', height: '40px', background: '#e0e0ff', margin: '4px 0' },
  timelineContent: { paddingBottom: '20px', flex: 1 },
  timelineYear: { background: '#f0e6ff', color: '#764ba2', padding: '3px 12px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 'bold' },
  timelineText: { color: '#444', marginTop: '8px', lineHeight: '1.6' },
  skillsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' },
  skillCategory: { background: '#f8f9ff', padding: '20px', borderRadius: '12px' },
  skillCatTitle: { color: '#1a1a2e', fontWeight: '700', marginBottom: '12px', margin: '0 0 12px' },
  skillTags: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  skillTag: { background: 'white', border: '1px solid #667eea', color: '#667eea', padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem' },
  altGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' },
  altCard: { background: '#f8f9ff', padding: '20px', borderRadius: '12px', border: '1px solid #eee' },
  altTitle: { color: '#1a1a2e', margin: '0 0 10px', fontWeight: '700' },
  altBar: { width: '100%', height: '6px', background: '#eee', borderRadius: '4px', marginBottom: '8px' },
  altFill: { height: '100%', background: 'linear-gradient(90deg, #4facfe, #00f2fe)', borderRadius: '4px' },
  altFit: { color: '#4facfe', fontWeight: 'bold', margin: '0 0 8px', fontSize: '0.9rem' },
  altDesc: { color: '#666', margin: 0, fontSize: '0.9rem' },
  retakeBtn: { width: '100%', padding: '18px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '15px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' },
  loading: { textAlign: 'center', padding: '100px', fontSize: '1.5rem', color: '#764ba2' }
};

export default Results;
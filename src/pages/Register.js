import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await axios.post('https://career-app-ocuk.onrender.com/api/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📝 Create Account</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input style={styles.input} name="name" placeholder="Full Name" onChange={handleChange} />
        <input style={styles.input} name="email" placeholder="Email" type="email" onChange={handleChange} />
        <input style={styles.input} name="password" placeholder="Password" type="password" onChange={handleChange} />
        <button style={styles.btn} onClick={handleSubmit}>Register</button>
        <p style={styles.link} onClick={() => navigate('/login')}>Already have an account? Login</p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  card: { background: 'white', padding: '40px', borderRadius: '20px', width: '400px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' },
  title: { textAlign: 'center', color: '#764ba2', marginBottom: '30px' },
  input: { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', boxSizing: 'border-box' },
  btn: { width: '100%', padding: '12px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' },
  error: { color: 'red', textAlign: 'center', marginBottom: '10px' },
  link: { textAlign: 'center', marginTop: '15px', color: '#764ba2', cursor: 'pointer' }
};

export default Register;
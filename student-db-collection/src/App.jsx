import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const backendUrl = 'https://student-form-backend-ckad.onrender.com';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(formData.email)) {
      alert("⚠️ Enter a valid email address");
      return;
    }
    if (!phoneRegex.test(formData.phone)) {
      alert("⚠️ Enter a 10-digit valid phone number");
      return;
    }

    setIsSubmitting(true); // 🔄 Start button fade

    try {
      const response = await fetch(`${backendUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail);

      alert("✅ Registration successful!");
      setFormData({ name: '', email: '', phone: '', course: '' });
    } catch (err) {
      alert(`❌ Error: ${err.message}`);
    } finally {
      setIsSubmitting(false); // ✅ Enable button again
    }
  };

  const styles = {
    container: {
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '500px',
      margin: 'auto',
      background: 'linear-gradient(to bottom, #f5f7fa, #c3cfe2)',
      borderRadius: '10px',
      boxShadow: '0 0 20px rgba(0,0,0,0.1)',
      animation: 'fadeIn 0.6s ease-in-out'
    },
    input: {
      width: '100%',
      padding: '12px',
      margin: '8px 0',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '16px'
    },
    button: {
      width: '100%',
      padding: '12px',
      marginTop: '10px',
      backgroundColor: isSubmitting ? '#7baaf7' : '#007bff',
      color: 'white',
      fontSize: '16px',
      border: 'none',
      borderRadius: '6px',
      cursor: isSubmitting ? 'not-allowed' : 'pointer',
      opacity: isSubmitting ? 0.6 : 1,
      transition: 'all 0.3s ease'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>🎓 Student Registration</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="phone"
          placeholder="Phone (10 digits)"
          value={formData.phone}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={isSubmitting}>
          {isSubmitting ? '⏳ Submitting...' : '📤 Submit'}
        </button>
      </form>
    </div>
  );
}

export default App;

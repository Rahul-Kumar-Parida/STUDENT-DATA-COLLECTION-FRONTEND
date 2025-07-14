import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: ''
  });
  // https://v1.nocodeapi.com/real234/google_sheets/nJrgkqGDFEmXWByc
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(formData.email)) {
      alert("Enter a valid email address");
      return;
    }
    if (!phoneRegex.test(formData.phone)) {
      alert("Enter a 10-digit valid phone number");
      return;
    }

    try {
      const response = await fetch('https://v1.nocodeapi.com/real234/google_sheets/nJrgkqGDFEmXWByc?tabId=Sheet1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([
          [formData.name, formData.email, formData.phone, formData.course]
        ])
      });


      if (response.ok) {
        alert('✅ Registered successfully!');
        setFormData({ name: '', email: '', phone: '', course: '' });
      } else {
        const errText = await response.text();
        console.error('Error response:', errText);
        alert('❌ Submission failed. Make sure your sheet has proper headers.');
      }
    } catch (error) {
      alert(`❌ Network error: ${error.message}`);
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
      boxShadow: '0 0 20px rgba(0,0,0,0.1)'
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
      backgroundColor: '#007bff',
      color: 'white',
      fontSize: '16px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>🎓 Student Registration Form</h1>
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
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
}

export default App;

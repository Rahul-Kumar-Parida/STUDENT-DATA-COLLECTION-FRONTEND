import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: ''
  });

  const [studentData, setStudentData] = useState(null);
  const [emailToCheck, setEmailToCheck] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
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
      const response = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail);
      alert('Registered successfully');
      setFormData({ name: '', email: '', phone: '', course: '' }); // Clear form
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleView = async () => {
    const response = await fetch(`http://127.0.0.1:8000/student?email=${emailToCheck}`);
    if (response.ok) {
      const data = await response.json();
      setStudentData(data);
    } else {
      alert('Student not found');
      setStudentData(null);
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
      animation: 'fadeIn 1s ease-in-out'
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
      cursor: 'pointer',
      transition: '0.3s ease'
    },
    result: {
      marginTop: '1rem',
      backgroundColor: '#e9ffe9',
      padding: '1rem',
      borderRadius: '8px',
      border: '1px solid #b6ffb6'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>🎓 Student Data Collection</h1>

      <h2>📝 Register</h2>
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
          placeholder="Phone"
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

      <hr />

      <h2>🔍 View My Data</h2>
      <input
        placeholder="Enter your email"
        value={emailToCheck}
        onChange={(e) => setEmailToCheck(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleView} style={styles.button}>See Your Data</button>

      {studentData && (
        <div style={styles.result}>
          <h3>Your Details:</h3>
          <p><b>Name:</b> {studentData.name}</p>
          <p><b>Email:</b> {studentData.email}</p>
          <p><b>Phone:</b> {studentData.phone}</p>
          <p><b>Course:</b> {studentData.course}</p>
        </div>
      )}
    </div>
  );
}

export default App;

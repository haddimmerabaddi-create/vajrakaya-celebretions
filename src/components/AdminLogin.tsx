import React, { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { theme } from '@/lib/theme';

export default function AdminLogin({ onLoginSuccess }: { onLoginSuccess: (user: any) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess(userCredential.user);
    } catch (err: any) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: theme.colors.background,
      fontFamily: theme.fonts.body
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '3rem',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        border: `2px solid ${theme.colors.secondary}`
      }}>
        <h1 style={{
          color: theme.colors.primary,
          fontFamily: theme.fonts.heading,
          fontSize: '1.8rem',
          marginBottom: '2rem'
        }}>
          Admin Vault
        </h1>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <input
            type="email"
            placeholder="Email Address"
            required
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
          <button
            type="submit"
            style={{
              backgroundColor: theme.colors.primary,
              color: '#fff',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Enter Catalog Manager
          </button>
        </form>
      </div>
    </div>
  );
}

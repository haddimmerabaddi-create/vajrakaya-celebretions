import React, { useState } from 'react';
import AdminLogin from '@/components/AdminLogin';
import AdminAddProduct from '@/components/AdminAddProduct';
import ProductCatalog from '@/components/ProductCatalog';
import PDFGenerator from '@/components/PDFGenerator';
import { theme } from '@/lib/theme';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div style={{ backgroundColor: theme.colors.background, minHeight: '100vh' }}>
      {/* Simple Navigation for Demo Purposes */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        borderBottom: `3px solid ${theme.colors.secondary}`
      }}>
        <div style={{
          fontFamily: theme.fonts.heading,
          fontWeight: 'bold',
          color: theme.colors.primary,
          fontSize: '1.2rem'
        }}>
          Vajrakaya Celebration
        </div>
        <button
          onClick={() => setIsAdmin(!isAdmin)}
          style={{
            backgroundColor: 'transparent',
            border: `1px solid ${theme.colors.primary}`,
            color: theme.colors.primary,
            padding: '5px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.8rem'
          }}
        >
          {isAdmin ? 'View Catalog' : 'Admin Login'}
        </button>
      </nav>

      <main>
        {isAdmin ? (
          !user ? (
            <AdminLogin onLoginSuccess={(u) => setUser(u)} />
          ) : (
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h1 style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary }}>Admin Dashboard</h1>
                <button onClick={() => setUser(null)} style={{ cursor: 'pointer' }}>Logout</button>
              </div>
              <AdminAddProduct />
              <hr style={{ margin: '3rem 0', opacity: 0.2 }} />
              {/* Admin can also trigger PDF generation for the whole catalog */}
              <div id="pdf-content">
                 <ProductCatalog />
              </div>
              <PDFGenerator products={[]} />
            </div>
          )
        ) : (
          <ProductCatalog />
        )}
      </main>
    </div>
  );
}

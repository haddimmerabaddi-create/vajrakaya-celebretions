"use client";

import React, { useState } from 'react';
import AdminLogin from '@/components/AdminLogin';
import AdminAddProduct from '@/components/AdminAddProduct';
import ProductCatalog from '@/components/ProductCatalog';
import PDFGenerator from '@/components/PDFGenerator';
import { theme } from '@/lib/theme';

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div style={{ backgroundColor: theme.colors.background, minHeight: '100vh' }}>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        borderBottom: `3px solid ${theme.colors.secondary}`,
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{
          fontFamily: theme.fonts.heading,
          fontWeight: 'bold',
          color: theme.colors.primary,
          fontSize: '1.2rem',
          cursor: 'pointer'
        }} onClick={() => setIsAdmin(false)}>
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
            fontSize: '0.8rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.colors.primary;
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = theme.colors.primary;
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
            <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary, margin: 0 }}>Admin Dashboard</h1>
                <button
                  onClick={() => setUser(null)}
                  style={{
                    cursor: 'pointer',
                    padding: '8px 16px',
                    backgroundColor: '#ff4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    fontWeight: 'bold'
                  }}
                >
                  Logout
                </button>
              </div>
              <AdminAddProduct />
              <hr style={{ margin: '3rem 0', opacity: 0.2 }} />
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary }}>Preview Catalog for PDF</h2>
                <p style={{ color: '#666' }}>The section below will be captured in the downloadable PDF.</p>
              </div>
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

import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { theme } from '@/lib/theme';
import { Product } from '@/types/product';

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Applying the Web-Animations logic for smooth entry
  const animateEntry = (el: HTMLElement, index: number) => {
    if (el.dataset.animated === 'true') return; // Prevent re-animation flickering
    el.dataset.animated = 'true';

    el.animate([
      { opacity: 0, transform: 'translateY(30px) scale(0.9)' },
      { opacity: 1, transform: 'translateY(0) scale(1)' }
    ], {
      duration: 600,
      delay: index * 100,
      easing: 'ease-out',
      fill: 'forwards'
    });
  };

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        fontFamily: theme.fonts.heading,
        color: theme.colors.primary,
        fontSize: '1.5rem'
      }}>
        Loading Celebrations...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: theme.colors.background,
        fontFamily: theme.fonts.body,
        color: '#666'
      }}>
        <h2 style={{ color: theme.colors.primary, fontFamily: theme.fonts.heading, fontSize: '2rem' }}>Our Collection is Curating...</h2>
        <p>Something beautiful is being added to the Vajrakaya Celebration catalog. Please check back soon!</p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: theme.colors.background,
      minHeight: '100vh',
      padding: '2rem 1rem',
      fontFamily: theme.fonts.body
    }}>
      {/* Header Section */}
      <header style={{
        textAlign: 'center',
        marginBottom: '3rem',
        padding: '2rem 0'
      }}>
        <h1 style={{
          fontFamily: theme.fonts.heading,
          color: theme.colors.primary,
          fontSize: '3rem',
          margin: 0
        }}>
          Vajrakaya Celebration
        </h1>
        <div style={{
          width: '100px',
          height: '3px',
          backgroundColor: theme.colors.secondary,
          margin: '10px auto'
        }}></div>
        <p style={{
          fontStyle: 'italic',
          color: '#555',
          fontSize: '1.2rem'
        }}>
          Return Gifts for Every Occasion
        </p>
      </header>

      {/* Product Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2.5rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            ref={(el) => el && animateEntry(el, index)}
            style={{
              backgroundColor: '#fff',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
              border: `1px solid ${theme.colors.accent}`,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = `0 15px 30px rgba(128, 0, 0, 0.1)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)';
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                borderBottom: `4px solid ${theme.colors.secondary}`
              }}
            />
            <div style={{ padding: '1.5rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <span style={{
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  color: theme.colors.secondary,
                  fontWeight: 'bold'
                }}>
                  {product.occasion}
                </span>
                <span style={{
                  fontWeight: 'bold',
                  color: theme.colors.primary,
                  fontSize: '1.2rem'
                }}>
                  {product.price}
                </span>
              </div>
              <h3 style={{
                fontFamily: theme.fonts.heading,
                margin: '0 0 0.5rem 0',
                fontSize: '1.5rem',
                color: '#333'
              }}>
                {product.name}
              </h3>
              <p style={{
                color: '#666',
                fontSize: '0.95rem',
                lineHeight: '1.5',
                marginBottom: '1.5rem'
              }}>
                {product.description}
              </p>
              <a
                href={generateWhatsAppLink(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  backgroundColor: theme.colors.primary,
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '12px',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#600000'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.colors.primary}
              >
                Book Enquiry via WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

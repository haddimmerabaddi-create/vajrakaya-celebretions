import React, { useState } from 'react';
import { storage, db } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { theme } from '@/lib/theme';

export default function AddProductForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    occasion: '',
    image: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image) return alert('Please upload a photo');

    setLoading(true);
    try {
      // 1. Upload Image to Firebase Storage
      const storageRef = ref(storage, `products/${Date.now()}_${form.image.name}`);
      await uploadBytes(storageRef, form.image);
      const imageUrl = await getDownloadURL(storageRef);

      // 2. Add Product Details to Firestore
      await addDoc(collection(db, 'products'), {
        name: form.name,
        description: form.description,
        price: form.price,
        occasion: form.occasion,
        imageUrl: imageUrl,
        createdAt: serverTimestamp(),
      });

      alert('Product added successfully to your catalog!');
      setForm({ name: '', description: '', price: '', occasion: '', image: null });
    } catch (error) {
      console.error(error);
      alert('Error adding product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: theme.colors.background, minHeight: '100vh' }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        borderTop: `8px solid ${theme.colors.primary}`
      }}>
        <h2 style={{
          color: theme.colors.primary,
          textAlign: 'center',
          fontFamily: theme.fonts.heading,
          fontSize: '2rem',
          marginBottom: '1.5rem'
        }}>
          Add New Return Gift
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label>Product Name</label>
          <input
            type="text"
            required
            style={{ padding: '10px', borderRadius: '5px', border: `1px solid #ccc` }}
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
          />

          <label>Occasion (e.g. Wedding, Baby Shower)</label>
          <input
            type="text"
            required
            style={{ padding: '10px', borderRadius: '5px', border: `1px solid #ccc` }}
            value={form.occasion}
            onChange={e => setForm({...form, occasion: e.target.value})}
          />

          <label>Price</label>
          <input
            type="text"
            placeholder="₹ 0.00"
            required
            style={{ padding: '10px', borderRadius: '5px', border: `1px solid #ccc` }}
            value={form.price}
            onChange={e => setForm({...form, price: e.target.value})}
          />

          <label>Description</label>
          <textarea
            required
            style={{ padding: '10px', borderRadius: '5px', border: `1px solid #ccc`, height: '100px' }}
            value={form.description}
            onChange={e => setForm({...form, description: e.target.value})}
          />

          <label>Product Photo</label>
          <input
            type="file"
            accept="image/*"
            required
            onChange={e => setForm({...form, image: e.target.files ? e.target.files[0] : null})}
          />

          <button
            disabled={loading}
            type="submit"
            style={{
              backgroundColor: theme.colors.primary,
              color: '#fff',
              padding: '12px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              border: 'none',
              marginTop: '1rem'
            }}
          >
            {loading ? 'Uploading...' : 'Add to Catalog ✨'}
          </button>
        </form>
      </div>
    </div>
  );
}

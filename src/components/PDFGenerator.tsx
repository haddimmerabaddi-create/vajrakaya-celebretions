import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { theme } from '@/lib/theme';

interface PDFGeneratorProps {
  products: any[];
}

export default function PDFGenerator({ products }: PDFGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById('pdf-content');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        useCORS: true, // Allow images from Firebase Storage
        logging: false,
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Vajrakaya-Celebration-Catalog.pdf');
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '2rem 0' }}>
      <button
        onClick={generatePDF}
        disabled={isGenerating}
        style={{
          backgroundColor: theme.colors.secondary,
          color: '#fff',
          padding: '15px 30px',
          borderRadius: '50px',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          border: 'none',
          cursor: isGenerating ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
          transition: 'all 0.3s ease'
        }}
      >
        {isGenerating ? 'Generating PDF...' : '📩 Download Shareable PDF Catalog'}
      </button>
    </div>
  );
}

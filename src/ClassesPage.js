import React from 'react';

const classesData = [
  { id: 1, name: 'Acne', description: 'Common skin condition causing pimples and inflammation.' },
  { id: 2, name: 'Eczema', description: 'A condition causing red, itchy, and inflamed skin.' },
  { id: 3, name: 'Psoriasis', description: 'Chronic skin disease marked by red patches with silvery scales.' },
  { id: 4, name: 'Rosacea', description: 'Skin condition causing redness and visible blood vessels.' },
  { id: 5, name: 'Melanoma', description: 'Serious form of skin cancer originating in pigment-producing cells.' },
  { id: 6, name: 'Basal Cell Carcinoma', description: 'Common type of skin cancer from basal cells.' },
  { id: 7, name: 'Dermatitis', description: 'General term for inflammation of the skin.' },
  { id: 8, name: 'Warts', description: 'Small, rough growths caused by a virus.' },
  { id: 9, name: 'Vitiligo', description: 'Loss of skin color in patches due to pigment cell destruction.' },
  { id: 10, name: 'Seborrheic Dermatitis', description: 'Chronic inflammation causing flaky, scaly skin.' },
  { id: 11, name: 'Shingles', description: 'Painful rash caused by reactivation of chickenpox virus.' },
  { id: 12, name: 'Cellulitis', description: 'Bacterial skin infection causing redness and swelling.' },
  { id: 13, name: 'Impetigo', description: 'Contagious skin infection causing sores and blisters.' },
  { id: 14, name: 'Herpes Simplex', description: 'Viral infection causing cold sores or genital herpes.' },
  { id: 15, name: 'Lupus', description: 'Autoimmune disease affecting skin and other organs.' },
];

function ClassesPage() {
  return (
    <div style={pageStyle}>
      <h1 style={headerStyle}>Skin Condition Classes</h1>
      <div style={listStyle}>
        {classesData.map(({ id, name, description }) => (
          <div key={id} style={cardStyle}>
            <h2 style={{ marginBottom: '10px' }}>{name}</h2>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const pageStyle = {
  height: '100vh',
  backgroundColor: '#000',
  color: '#f0f0f0',
  padding: '40px',
  boxSizing: 'border-box',
  overflowY: 'auto',
};

const headerStyle = {
  fontSize: '3rem',
  marginBottom: '20px',
  borderBottom: '3px solid #555',
  paddingBottom: '10px',
  textAlign: 'center',
};

const listStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '20px',
};

const cardStyle = {
  backgroundColor: '#111',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 0 10px #222',
  textAlign: 'center',
};

export default ClassesPage;

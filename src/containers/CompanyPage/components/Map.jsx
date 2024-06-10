import React from 'react';

const Map = ({ companyName }) => {
  const googleMapsUrl = companyName ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyName)}` : '';

  const openGoogleMaps = () => {
    if (googleMapsUrl) {
      window.open(googleMapsUrl, '_blank');
    }
  };

  return (
    <div style={{ height: '350px', width: '100%', position: 'relative' }}>
      <iframe
        title="Google Maps"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0, borderRadius: '8px' }}
        src={`https://maps.google.com/maps?q=${companyName}&maptype=roadmap&ie=UTF8&iwloc=&output=embed`}
        allowFullScreen
      ></iframe>
      <div  onClick={openGoogleMaps} style={{ position: 'relative', bottom: '56px',top: '0px', backgroundColor: 'rgba(255, 255, 255, 0.8)',  borderRadius: '5px', cursor: 'pointer' }}>
        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Ouvrir sur Google Maps</span>
      </div>
    </div>
  );
};

export default Map;

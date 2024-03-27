import React from 'react';

const Map = ({ apiKey, latitude, longitude }) => {
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}`;

  return (
    <div style={{ height: '400px', width: '100%', position: 'relative' }}>
      <iframe
        title="Google Maps"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0, borderRadius: '8px' }}
        src={mapUrl}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Map;


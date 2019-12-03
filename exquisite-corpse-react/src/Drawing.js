import React from 'react';


function Drawing({ lines }) {
  return (
    <svg>
      {lines.map((line, index) => (
        <DrawingLine key={index} line={line} />
      ))}
    </svg>
  );
}

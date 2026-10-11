// src/components/Spinner.jsx
import React from 'react';

export default function Spinner() {
  return (
    <div className="flex justify-center items-center py-12 w-full">
      <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
    </div>
  );
}

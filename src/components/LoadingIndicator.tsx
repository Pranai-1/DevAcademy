import React from 'react';

export default function LoadingIndicator() {
  return (
    <div className="flex flex-col items-center">
      <p className="text-center">Loading</p>
      <div className="animate-spin w-8 h-8 border-t-4 border-b-4 border-blue-500 rounded-full"></div>
    </div>
  );
}

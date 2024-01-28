'use client';

import React from 'react';

export default function SpeechBubble({ children }) {
  const [isVisible, setIsVisible] = React.useState(false);
  React.useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <div
      className={`flex items-center justify-end opacity-${isVisible ? 100 : 0} transition-opacity duration-500 ease-in`}
    >
      <div
        className="my-6 flex-1 rounded-lg bg-pink-500 p-4"
        style={{ maxWidth: 500 }}
      >
        <p className="text-white-500 dark:text-white-400 text-lg leading-7">
          {children}
        </p>
      </div>
      <div className="w-3 overflow-hidden">
        <div className="h-4 origin-top-left rotate-45 transform rounded-sm bg-pink-500"></div>
      </div>
    </div>
  );
}

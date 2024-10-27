import React, { useEffect } from 'react';

const LoadExternalScript = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://example.com/some-external-script.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup
    };
  }, []);

  return <div>External script loaded!</div>;
};

export default LoadExternalScript;
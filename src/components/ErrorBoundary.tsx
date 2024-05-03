import React, { useState } from 'react';

function ErrorBoundary({ fallback, children }) {
  const [hasError, setHasError] = useState(false);

  const handleOnError = (error, info) => {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    console.log(error, info.componentStack);
    setHasError(true);
  };

  if (hasError) {
    // You can render any custom fallback UI
    return fallback;
  }

  return (
    <React.ErrorBoundary onError={handleOnError}>
      {children}
    </React.ErrorBoundary>
  );
}

export default ErrorBoundary;

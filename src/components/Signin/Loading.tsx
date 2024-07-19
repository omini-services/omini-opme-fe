import { Progress } from '@/components/shadcn/new-york/progress';
import { useEffect, useState } from 'react';

export const ProgressBar = () => {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Progress value={progress} />
      <h2 className="text-xl font-semibold">Loading...</h2>
    </>
  );
};

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <ProgressBar />
      </div>
    </div>
  );
};

export default Loading;

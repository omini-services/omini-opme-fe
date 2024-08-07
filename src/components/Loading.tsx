import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

interface LoadingProps {
  type: 'bar' | 'spin';
}

export const Spinner = () => {
  return <div className="spinner" />;
};

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

export const Loading = ({ type }: LoadingProps) => {
  const component = {
    bar: <ProgressBar />,
    spin: <Spinner />,
  }[type];
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">{component}</div>
    </div>
  );
};

export default Loading;

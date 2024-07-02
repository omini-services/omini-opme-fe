import { Progress } from '@/components/shadcn/new-york/progress';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <Progress value={33} className="mb-4" />
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    </div>
  );
};

export default Loading;

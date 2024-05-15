import React from 'react';
import {Spinner} from '@/components/ui/Spinner';

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-foreground">
      <div className="flex items-center gap-4">
        <Spinner size="large" />
      </div>
    </div>
  );
};

export default Loading;

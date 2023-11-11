'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import Heading from './Heading';
import Button from './Button';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  showReset,
  subtitle = 'Try changing or removing some of your filters.',
  title = 'No Exact Matches',
}) => {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex gap-2 justify-center items-center flex-col">
      <Heading title={title} subtitle={subtitle} center />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;

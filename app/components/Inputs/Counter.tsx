'use client';
import React, { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  onChange,
  subtitle,
  title,
  value,
}) => {
  const handleAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const handleReduce = useCallback(() => {
    if (value === 1) return;
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="text-gray-600">{subtitle}</div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={handleReduce}
          disabled={value === 1}
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer hover:opacity-80 transition">
          <AiOutlineMinus />
        </button>
        <div className="text-neutral-600">{value}</div>
        <button
          onClick={handleAdd}
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition">
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
};

export default Counter;

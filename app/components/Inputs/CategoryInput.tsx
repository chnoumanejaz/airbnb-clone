'use client';
import React from 'react';
import { IconType } from 'react-icons';

interface CategoryInputProps {
  label: string;
  selected?: boolean;
  icon: IconType;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  label,
  icon: Icon,
  onClick,
  selected,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 flex flex-col gap-3 p-4 hover:border-black transition cursor-pointer text-neutral-600 hover:text-neutral-800
     ${selected ? 'border-black' : 'border-neutral-200'}
      `}>
      <Icon size={30} className="" />
      <div className="font-semibold tracking-wide">{label}</div>
    </div>
  );
};

export default CategoryInput;

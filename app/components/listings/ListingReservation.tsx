'use client';

import React from 'react';
import { Range } from 'react-date-range';
import Button from '../Button';
import Calendar from '../Inputs/Calendar';

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  dateRange,
  disabledDates,
  onChangeDate,
  onSubmit,
  price,
  totalPrice,
  disabled,
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold ">${price}</div>
        <div className="font-light text-neutral-600 ">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={value => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4 ">
        <Button
          disabled={disabled}
          label={disabled ? 'Reserving the trip...' : 'Reserve'}
          onClick={onSubmit}
        />
      </div>
      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;

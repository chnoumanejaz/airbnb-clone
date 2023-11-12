'use client';
import useSearchModal from '@/app/hooks/useSearchModal';
import { formatISO } from 'date-fns';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { useCallback, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import Heading from '../Heading';
import Calendar from '../Inputs/Calendar';
import Counter from '../Inputs/Counter';
import CountrySelect, { CountrySelectValue } from '../Inputs/CountrySelect';
import Modal from './Modal';

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const Map = useMemo(
    () => dynamic(() => import('../Map'), { ssr: false }),
    // eslint-disable-next-line
    [location]
  );

  const handleBack = useCallback(() => {
    setStep(value => value - 1);
  }, []);

  const handleNext = useCallback(() => {
    setStep(value => value + 1);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return handleNext();
    }

    let currentQuery = {};
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    step,
    searchModal,
    location,
    router,
    guestCount,
    dateRange,
    handleNext,
    params,
    roomCount,
    bathroomCount,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) return 'Search';
    else return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) return undefined;
    else return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8 ">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />
      <CountrySelect
        value={location}
        onChange={value => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-2 ">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <Calendar
          value={dateRange}
          onChange={value => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="More information"
          subtitle="To find your perfect place"
        />
        <Counter
          title="Guests"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={value => setGuestCount(value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={value => setRoomCount(value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you want?"
          value={bathroomCount}
          onChange={value => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      title="Filters"
      body={bodyContent}
      onSubmit={handleSubmit}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : handleBack}
      secondaryActionLabel={secondaryActionLabel}
    />
  );
};

export default SearchModal;

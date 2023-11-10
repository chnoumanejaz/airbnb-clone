'use client';
import useRentModal from '@/app/hooks/useRentModal';
import Modal from './Modal';
import { useMemo, useState } from 'react';
import Heading from '../Heading';
import { categories } from '@/app/data/categoriesData';
import CategoryInput from '../Inputs/CategoryInput';
import { FieldValues, useForm } from 'react-hook-form';
import CountrySelect from '../Inputs/CountrySelect';
import Map from '../Map';
import dynamic from 'next/dynamic';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });

  const category = watch('category');
  const location = watch('location');

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleBack = () => {
    if (step === STEPS.CATEGORY) return undefined;
    setStep(value => value - 1);
  };

  const handleNext = () => {
    setStep(value => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return 'Select Location';
    }
    if (step === STEPS.LOCATION) {
      return 'Add Information';
    }
    if (step === STEPS.INFO) {
      return 'Add Images';
    }
    if (step === STEPS.IMAGES) {
      return 'Add Description';
    }
    if (step === STEPS.DESCRIPTION) {
      return 'Set the price';
    }
    if (step === STEPS.PRICE) {
      return 'Create Listing';
    }

    return 'Next Step';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;
    return 'Go Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map(item => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={category => setCustomValue('category', category)}
              selected={item.label === category}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="How guests find you?"
        />
        <CountrySelect
          onChange={value => setCustomValue('location', value)}
          value={location}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  return (
    <Modal
      title="Airbnb your Home"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      actionLabel={actionLabel}
      secondaryAction={handleBack}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
      onSubmit={handleNext}
    />
  );
};

export default RentModal;

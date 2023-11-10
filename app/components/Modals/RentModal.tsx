'use client';
import useRentModal from '@/app/hooks/useRentModal';
import Modal from './Modal';
import { useMemo, useState } from 'react';
import Heading from '../Heading';
import { categories } from '@/app/data/categoriesData';
import CategoryInput from '../Inputs/CategoryInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import CountrySelect from '../Inputs/CountrySelect';
import Map from '../Map';
import dynamic from 'next/dynamic';
import Counter from '../Inputs/Counter';
import ImageUpload from '../Inputs/ImageUpload';
import Input from '../Inputs/Input';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

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
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    // eslint-disable-next-line
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

  const onSubmit: SubmitHandler<FieldValues> = data => {
    if (step !== STEPS.PRICE) {
      return handleNext();
    }

    setIsLoading(true);
    axios
      .post('/api/listings', data)
      .then(() => {
        toast.success('Listing created Successfully!');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(err =>
        toast.error(
          'Something went wrong! Please make sure you fill all the fields.',
          {
            autoClose: 5000,
          }
        )
      )
      .finally(() => setIsLoading(false));
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
      if (isLoading) return 'Creating...';
      else return 'Create Listing';
    }

    return 'Next Step';
  }, [step, isLoading]);

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

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8 ">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={value => setCustomValue('guestCount', value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={value => setCustomValue('roomCount', value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={value => setCustomValue('bathroomCount', value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photos of your place"
          subtitle="Showcase what your place look like"
        />
        <ImageUpload
          value={imageSrc}
          onChange={value => setCustomValue('imageSrc', value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice={true}
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
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
      disabled={isLoading}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default RentModal;

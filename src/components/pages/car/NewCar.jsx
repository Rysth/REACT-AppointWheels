import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addCar } from '../../../redux/slices/carsSlice';

function NewCar() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const submitAddCar = (data) => {
    dispatch(addCar(data));
  };

  return (
    <section className="bg-[var(--green)] text-white w-full md:px-24 md:w-4/5 md:absolute md:right-0">
      <article className="px-10 pb-10 md:p-10">
        <header className="mt-2 text-center">
          <h2 className="text-2xl font-black tracking-wider text-center uppercase sm:text-3xl md:text-4xl">
            New Car
          </h2>
        </header>
        {/* eslint-disable */}
        <form className="flex flex-col items-center justify-center w-full" onSubmit={handleSubmit(submitAddCar)}>
          <fieldset className="w-full">
            <label
              htmlFor="model"
              className="relative grid gap-2 font-semibold"
            >
              Model Name:
              <input
                type="text"
                {...register('model')}
                className="flex-1 p-2 font-semibold border rounded-lg shadow-lg focus:outline-none focus:border-gray-500 text-[var(--green)]"
                required
              />
            </label>
          </fieldset>
          <fieldset className="w-full">
            <label
              htmlFor="seats"
              className="relative grid gap-2 font-semibold"
            >
              Number of Seats:
              <input
                type="number"
                {...register('seats')}
                className="flex-1 p-2 font-semibold border rounded-lg shadow-lg focus:outline-none focus:border-gray-500 text-[var(--green)]"
                required
              />
            </label>
          </fieldset>
          <fieldset className="w-full">
            <label
              htmlFor="description"
              className="relative grid gap-2 font-semibold"
            >
              Car Description:
              <input
                type="text"
                {...register('description')}
                className="flex-1 p-2 font-semibold border rounded-lg shadow-lg focus:outline-none focus:border-gray-500 text-[var(--green)]"
                required
              />
            </label>
          </fieldset>
          <fieldset className="w-full">
            <label
              htmlFor="price_per_day"
              className="relative grid gap-2 font-semibold"
            >
              Price per day:
              <input
                type="number"
                {...register('price_per_day')}
                className="flex-1 p-2 font-semibold border rounded-lg shadow-lg focus:outline-none focus:border-gray-500 text-[var(--green)]"
                required
              />
            </label>
          </fieldset>
          <fieldset className="w-full">
            <label
              htmlFor="vehicle_type"
              className="relative grid gap-2 font-semibold"
            >
              Vehicle Type:
              <input
                type="text"
                {...register('vehicle_type')}
                className="flex-1 p-2 font-semibold border rounded-lg shadow-lg focus:outline-none focus:border-gray-500 text-[var(--green)]"
                required
              />
            </label>
          </fieldset>
          <fieldset className="w-full">
            <label htmlFor="text" className="relative grid gap-2 font-semibold">
              Vehicle Image:
              <input
                type="text"
                {...register('image_url')}
                className="flex-1 p-2 font-semibold border rounded-lg shadow-lg focus:outline-none focus:border-gray-500 text-[var(--green)]"
                required
              />
            </label>
          </fieldset>
          <button type="submit" className="btn btn-secondary justify-self-center">
            Add New Car
          </button>
        </form>
      </article>
    </section>
  );
}

export default NewCar;

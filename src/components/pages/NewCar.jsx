import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addCar } from '../../redux/slices/carsSlice';

function NewCar() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { register, handleSubmit } = useForm();

  const submitAddCar = (data) => {
    dispatch(addCar(data)).then(() => navigator('/'));
  };

  return (
    <section className="bg-white">
      <article className="max-w-screen-xl mx-auto">
        <header className="mt-2 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            New Car
          </h2>
        </header>
        {/* eslint-disable */}
        <form onSubmit={handleSubmit(submitAddCar)}>
          <fieldset>
            <label
              htmlFor="model"
              className="relative grid gap-2 font-semibold"
            >
              Model Name:
              <input
                type="text"
                {...register('model')}
                className="flex-1 p-2 font-normal border rounded-lg shadow-lg focus:outline-none focus:border-gray-500"
                required
              />
            </label>
          </fieldset>
          <fieldset>
            <label
              htmlFor="seats"
              className="relative grid gap-2 font-semibold"
            >
              Number of Seats:
              <input
                type="number"
                {...register('seats')}
                className="flex-1 p-2 font-normal border rounded-lg shadow-lg focus:outline-none focus:border-gray-500"
                required
              />
            </label>
          </fieldset>
          <fieldset>
            <label
              htmlFor="description"
              className="relative grid gap-2 font-semibold"
            >
              Car Description:
              <input
                type="text"
                {...register('description')}
                className="flex-1 p-2 font-normal border rounded-lg shadow-lg focus:outline-none focus:border-gray-500"
                required
              />
            </label>
          </fieldset>
          <fieldset>
            <label
              htmlFor="price_per_day"
              className="relative grid gap-2 font-semibold"
            >
              Price per day:
              <input
                type="number"
                {...register('price_per_day')}
                className="flex-1 p-2 font-normal border rounded-lg shadow-lg focus:outline-none focus:border-gray-500"
                required
              />
            </label>
          </fieldset>
          <fieldset>
            <label
              htmlFor="vehicle_type"
              className="relative grid gap-2 font-semibold"
            >
              Vehicle Type:
              <input
                type="text"
                {...register('vehicle_type')}
                className="flex-1 p-2 font-normal border rounded-lg shadow-lg focus:outline-none focus:border-gray-500"
                required
              />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="text" className="relative grid gap-2 font-semibold">
              Vehicle Image:
              <input
                type="text"
                {...register('image_url')}
                className="flex-1 p-2 font-normal border rounded-lg shadow-lg focus:outline-none focus:border-gray-500"
                required
              />
            </label>
          </fieldset>
          <button type="submit" className="btn btn-primary">
            Add New Car
          </button>
        </form>
      </article>
    </section>
  );
}

export default NewCar;

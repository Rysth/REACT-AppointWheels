import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars, removeCar } from '../../../redux/slices/carsSlice';

function CarDelete() {
  const { carsArray, length, loading } = useSelector((store) => store.carsStore);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch, length]);

  if (loading || length === 0) {
    return (
      <div className="w-full mt-10 text-2xl font-black tracking-wider text-center uppercase sm:text-3xl md:text-4xl md:w-4/5 md:absolute md:right-0">
        Loading...
      </div>
    );
  }
  return (
    <section className="flex flex-col items-center justify-center px-4 py-12 md:w-4/5 md:absolute md:right-0">
      <h1 className="text-2xl font-black tracking-wider text-center uppercase sm:text-3xl md:text-5xl">{`Total Cars: ${length}`}</h1>
      <div className="grid gap-1 py-6">
        {carsArray.map((car) => (
          <div
            className="flex flex-col items-center justify-center max-w-5xl gap-5 mx-auto my-4 text-center md:flex-row"
            key={car.id}
          >
            <img src={car.image_url} alt={car.model} className="max-w-[12rem] w-[12rem]" />
            <div className="px-4">
              <h3 className="mb-2 font-bold uppercase sm:text-md">{car.model}</h3>
              <p className="text-xs text-gray-400 sm:text-sm">{car.description}</p>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => dispatch(removeCar(car.id))}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CarDelete;

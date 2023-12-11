import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars, removeCar } from '../../../redux/slices/carsSlice';

function CarDelete() {
  const { carsArray, length, loading } = useSelector((store) => store.carsStore);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch, length]);

  if (loading) {
    return (<div className="w-full mt-10 text-center text-2xl font-black tracking-wider text-center uppercase sm:text-3xl md:text-4xl md:w-4/5 md:absolute md:right-0">Loading...</div>);
  }

  if (length === 0) {
    return (<div className="w-full mt-10 text-center text-2xl font-black tracking-wider text-center uppercase sm:text-3xl md:text-4xl md:absolute md:right-0">No Car Available</div>);
  }

  return (
    <section className="px-8 pb-8 md:p-8 md:w-4/5 md:absolute md:right-0">
      <h1 className="text-center text-2xl font-black tracking-wider text-center uppercase sm:text-3xl md:text-4xl">{`Total Cars: ${length}`}</h1>
      <div className="py-6">
        {carsArray.map((car) => (
          <div className="my-4 text-center flex flex-col justify-center items-center md:flex-row" key={car.id}>
            <img src={car.image_url} alt={car.model} className="md:w-1/4" />
            <div className="px-4">
              <h3 className="mb-2 font-bold uppercase sm:text-md">{car.model}</h3>
              <p className="text-xs text-gray-400 sm:text-sm">{car.description}</p>
            </div>
            <button type="button" className="btn btn-primary" onClick={() => dispatch(removeCar(car.id))}>Delete</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CarDelete;

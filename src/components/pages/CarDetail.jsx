import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCars } from '../../redux/slices/carsSlice';

function CarDetail() {
  const { id } = useParams();
  const carId = parseInt(id, 10);
  const { carsArray, loading } = useSelector((store) => (store.carsStore));
  const car = carsArray.find((el) => el.id === carId);

  const dispatch = useDispatch();
  useEffect(() => {
    if (loading) {
      dispatch(fetchCars());
    }
  }, [dispatch, loading]);

  if (loading) { return (<div>loading</div>); }

  return (
    <section className="h-screen">
      <article className="flex flex-row items-center justify-center h-full gap-10 mx-auto sm:gap-16">
        <picture className="relative grid overflow-visible sm:mb-10 place-items-center sm:px-5">
          <span className="absolute z-20 w-32 h-32 rounded-full bg-slate-200 md:w-36 md:h-36 xl:w-60 xl:h-60" />
          <img
            src={car.image_url}
            alt=""
            className="z-50 object-contain w-full h-full rounded-full "
          />
        </picture>
        <div className="flex flex-col items-end justify-center w-full h-full mr-10 border">
          <h2 className="pb-8 text-xl font-bold uppercase sm:text-md">{car.model}</h2>
          <div className="flex flex-row justify-between w-full p-2 bg-slate-300">
            <p className="text-xs text-center sm:text-sm max-h-14 whitespace-nowrap">Price Per Day</p>
            <p className="text-xs text-center sm:text-sm max-h-14">
              $
              {car.price_per_day}
            </p>
          </div>
          <div className="flex flex-row justify-between w-full p-2">
            <p className="pr-6 text-xs text-center sm:text-sm max-h-14 whitespace-nowrap">Option To Purchase Fee</p>
            <p className="text-xs text-center sm:text-sm max-h-14">$200</p>
          </div>
          <div className="flex flex-row justify-between w-full p-2 bg-slate-300">
            <p className="pr-4 text-xs text-center sm:text-sm max-h-14 whitespace-nowrap">Total Amount Payable</p>
            <p className="text-xs text-center sm:text-sm max-h-14">$9000 </p>
          </div>
          <div className="flex flex-row justify-between w-full p-2">
            <p className="pr-4 text-xs text-center sm:text-sm max-h-14">Duration</p>
            <p className="text-xs text-center sm:text-sm max-h-14">48 Months</p>
          </div>
        </div>
      </article>
    </section>
  );
}

export default CarDetail;

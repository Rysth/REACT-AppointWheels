import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { LuArrowBigLeftDash } from 'react-icons/lu';
import { fetchCars } from '../../../redux/slices/carsSlice';
import CarDetailForm from './carDetailForm';

function CarDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const carId = parseInt(id, 10);
  const { carsArray, loading } = useSelector((store) => store.carsStore);
  const car = carsArray.find((el) => el.id === carId);
  useEffect(() => {
    if (loading) {
      dispatch(fetchCars());
    }
  }, [dispatch, loading]);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <section className="flex flex-col w-full h-screen pb-8 mt-10  sm:mt-0 md:pt-8 md:flex-row md:pl-[20%]">
      <article className="relative w-full h-full sm:gap-16">
        <div className="flex flex-col w-full h-full">
          <picture className="relative grid sm:mb-10 place-items-center sm:px-5 sm:h-3/5">
            <img
              src={car.image_url}
              alt=""
              className="object-contain w-full h-full max-w-[40rem]"
            />
          </picture>
          <div className="px-10 text-center">
            <h3 className="text-xl font-bold uppercase">{car.model}</h3>
            <p className="mb-3 text-xl tracking-wider text-gray-200 sm:text-xl">
              .........................
            </p>
            <div className="grid">
              <p className="overflow-hidden text-xs text-center text-gray-400 sm:text-lg max-h-14">
                Vehicle Type: &nbsp;
                {car.vehicle_type}
              </p>
              <p className="overflow-hidden text-xs text-center text-gray-400 sm:text-lg max-h-14">
                Seats: &nbsp;
                {car.seats}
              </p>
              <p className="overflow-hidden text-xs text-center text-gray-400 sm:text-lg max-h-14">
                Price Per Day: &nbsp;
                {car.price_per_day}
              </p>
            </div>
          </div>
          <Link to="/" key={car.id}>
            <button
              type="button"
              className="bg-[var(--green)] text-white p-5 rounded-r-full absolute bottom-0"
              aria-label="arrow left"
            >
              <LuArrowBigLeftDash className="text-xl sm:text-3xl" />
            </button>
          </Link>
        </div>
      </article>
      <CarDetailForm el={id} car={car} />
    </section>
  );
}

export default CarDetail;

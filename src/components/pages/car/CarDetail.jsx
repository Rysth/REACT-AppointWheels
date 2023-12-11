/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { LuArrowBigLeftDash } from 'react-icons/lu';
import { fetchCars } from '../../../redux/slices/carsSlice';
import CarDetailForm from './carDetailForm';

function CarDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const carId = parseInt(id, 10);
  const { carsArray, loading } = useSelector((store) => (store.carsStore));
  const car = carsArray.find((el) => el.id === carId);
  useEffect(() => {
    if (loading) {
      dispatch(fetchCars());
    }
  }, [dispatch, loading]);

  if (loading) { return (<div className="loader">loading</div>); }

  return (
    <section className="flex flex-col h-screen pb-8 md:pt-8 md:flex-row md:w-4/5 md:absolute md:right-0">
      <article className="flex flex-row items-center justify-center h-full gap-10 mx-auto sm:gap-16">
        <div className="flex flex-col">
          <picture className="relative grid sm:mb-10 place-items-center sm:px-5">
            <img
              src={car.image_url}
              alt=""
              className="object-contain w-full h-full rounded-full "
            />
          </picture>
          <div className="px-10 text-center">
            <h3 className="font-bold uppercase sm:text-3xl ">
              {car.model}
            </h3>
            <p className="mb-3 text-xl tracking-wider text-gray-200 sm:text-2xl ">
              .........................
            </p>
            <p className="overflow-hidden text-xs text-center text-gray-400 sm:text-xl max-h-14">
              Vehicle Type: &nbsp;
              {car.vehicle_type}
            </p>
            <p className="overflow-hidden text-xs text-center text-gray-400 sm:text-xl max-h-14">
              Seats: &nbsp;
              {car.seats}
            </p>
            <p className="overflow-hidden text-xs text-center text-gray-400 sm:text-xl max-h-14">
              Price Per Day: &nbsp;
              {car.price_per_day}
            </p>
          </div>
          <Link to="/" key={car.id}>
            <button
              type="button"
              className="bg-[var(--green)] text-white p-5 rounded-r-full"
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

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactDatePicker from 'react-datepicker';
import { IoKeyOutline } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { current } from '@reduxjs/toolkit';
import { fetchCars } from '../../redux/slices/carsSlice';
import { createRental } from '../../redux/slices/rentalsSlice';

function CarDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const carId = parseInt(id, 10);
  const { carsArray, loading } = useSelector((store) => (store.carsStore));
  const car = carsArray.find((el) => el.id === carId);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [totalDays, setTotalDays] = useState();
  const [amount, setAmount] = useState();
  const cities = [
    { name: 'Salta' },
    { name: 'Cordoba' },
    { name: 'Buenos Aires' },
  ];
  const user = JSON.parse(sessionStorage.getItem('userCredentials'));
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    if (loading) {
      dispatch(fetchCars());
    }
  }, [dispatch, loading]);

  const calculateTotalDays = () => {
    if (startDate && endDate) {
      const totalMilliseconds = endDate.getTime() - startDate.getTime();
      const days = (totalMilliseconds / (1000 * 60 * 60 * 24));
      setTotalDays(Math.round(days));
    }
  };

  const calculateTotalAmout = () => {
    if (car) {
      setAmount(totalDays * car.price_per_day + 200);
    }
  };

  const formatAsDDMMYYYY = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    calculateTotalDays();
  }, [startDate, endDate]);

  useEffect(() => {
    calculateTotalAmout();
  }, [calculateTotalDays]);

  const submitAddRent = (data) => {
    if (startDate && endDate) {
      const rentStart = formatAsDDMMYYYY(startDate);
      const rentEnd = formatAsDDMMYYYY(endDate);
      const formData = {
        ...data,
        start_date: rentStart,
        end_date: rentEnd,
        total_price: amount,
        car_id: id,
        user_id: user.id,
      };
      dispatch(createRental(formData));
    }
  };

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
        <div className="flex flex-col items-end justify-center w-full h-full mr-10">
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
            <p className="text-xs text-center sm:text-sm max-h-14">
              $
              {amount || 0}
            </p>
          </div>
          <div className="flex flex-row justify-between w-full p-2">
            <p className="pr-4 text-xs text-center sm:text-sm max-h-14">Duration</p>
            <p className="text-xs text-center sm:text-sm max-h-14">{totalDays}</p>
          </div>
          <div className="flex flex-row justify-between w-full p-2">
            <form onSubmit={handleSubmit(submitAddRent)}>
              <fieldset>
                <ReactDatePicker
                  selected={startDate}
                  onChange={onChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                  required
                />
              </fieldset>
              <fieldset>
                <select {...register('city')}>
                  <option value="salta" disabled selected>Select a city</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </fieldset>
              <fieldset className="flex items-center justify-end gap-1">
                <button
                  type="submit"
                  className="float-right w-full btn btn-primary"
                >
                  Rent
                  <IoKeyOutline className="text-xl" />
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </article>
    </section>
  );
}

export default CarDetail;

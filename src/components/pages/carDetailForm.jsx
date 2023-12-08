/* eslint-disable import/order */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoKeyOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { createRental } from '../../redux/slices/rentalsSlice';
import ReactDatePicker from 'react-datepicker';

function CarDetailForm({ id, car }) {
  const dispatch = useDispatch();
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

  const calculateTotalDays = () => {
    if (startDate && endDate) {
      const totalMilliseconds = endDate.getTime() - startDate.getTime();
      const days = (totalMilliseconds / (1000 * 60 * 60 * 24));
      setTotalDays(Math.round(days));
    }
  };

  const calculateTotalAmout = () => {
    if (car) {
      setAmount(totalDays * car.price_per_day);
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
  return (
    <div className="flex flex-col items-end justify-center w-full h-full max-w-sm mr-10">
      <h2 className="pb-8 text-xl font-bold uppercase sm:text-md">{car.model}</h2>
      <div className="flex flex-row justify-between w-full p-2 bg-slate-300">
        <p className="text-xs text-center sm:text-sm max-h-14 whitespace-nowrap">Price Per Day</p>
        <p className="text-xs text-center sm:text-sm max-h-14">
          $
          {car.price_per_day}
        </p>
      </div>
      <div className="flex flex-row justify-between w-full p-2">
        <p className="pr-4 text-xs text-center sm:text-sm max-h-14 whitespace-nowrap">Total Amount Payable</p>
        <p className="text-xs text-center sm:text-sm max-h-14">
          $
          {amount || 0}
        </p>
      </div>
      <div className="flex flex-row justify-between w-full p-2 bg-slate-300">
        <p className="pr-4 text-xs text-center sm:text-sm max-h-14">Duration</p>
        <p className="text-xs text-center sm:text-sm max-h-14">{totalDays}</p>
      </div>
      <div className="flex flex-row items-end justify-end w-full p-2">
        <form onSubmit={handleSubmit(submitAddRent)} className="">
          <fieldset>
            <ReactDatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
            />
          </fieldset>
          <fieldset>
            <select required {...register('city')}>
              <option value="" disabled selected>Select a city</option>
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
  );
}

CarDetailForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  id: PropTypes.number.isRequired,
  car: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CarDetailForm;

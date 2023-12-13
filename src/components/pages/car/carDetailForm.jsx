/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoKeyOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import ReactDatePicker from 'react-datepicker';
import { createRental } from '../../../redux/slices/rentalsSlice';
import cities from '../../cities/city';

const CarDetailForm = ({ car }) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [totalDays, setTotalDays] = useState();
  const [amount, setAmount] = useState();
  const user = JSON.parse(sessionStorage.getItem('userCredentials'));
  const { register, handleSubmit } = useForm();

  const calculateTotalDays = () => {
    if (startDate && endDate) {
      const totalMilliseconds = endDate.getTime() - startDate.getTime();
      const days = totalMilliseconds / (1000 * 60 * 60 * 24);
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
        car_id: car.id,
        user_id: user.id,
      };
      dispatch(createRental(formData));
    }
  };
  return (
    <div className="flex flex-col items-end justify-center w-full h-full px-4 mt-10 mr-10 md:max-w-sm sm:mt-0">
      <h2 className="text-xl font-bold text-center uppercase sm:text-2xl md:text-4xl ">
        {car.model}
      </h2>
      <div className="w-full mt-10 mb-5">
        <div className="flex justify-between w-full p-2 bg-slate-300">
          <p className="text-xs font-bold text-center sm:text-sm max-h-14 whitespace-nowrap">
            Price Per Day
          </p>
          <p className="text-xs text-center sm:text-sm max-h-14">{`$${car.price_per_day}`}</p>
        </div>
        <div className="flex justify-between w-full p-2">
          <p className="pr-4 text-xs font-bold text-center sm:text-sm max-h-14 whitespace-nowrap">
            Total Amount Payable
          </p>
          <p className="text-xs text-center sm:text-sm max-h-14">{`$${amount || 0}`}</p>
        </div>
        <div className="flex justify-between w-full p-2 bg-slate-300">
          <p className="pr-4 text-xs font-bold text-center sm:text-sm max-h-14">Duration</p>
          <p className="text-xs text-center sm:text-sm max-h-14">{totalDays}</p>
        </div>
      </div>
      <div className="flex items-end justify-end w-full p-2">
        <form onSubmit={handleSubmit(submitAddRent)} className="w-full">
          <fieldset className="flex justify-center w-full">
            <ReactDatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              selectsRange
              inline
              className="w-full h-full"
            />
          </fieldset>
          <fieldset className="flex justify-end w-full mt-5">
            <select required {...register('city')} className="w-full p-1 text-sm border">
              <option value="" disabled selected>
                Select a city
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset className="flex items-center justify-end gap-1">
            <button type="submit" className="float-right btn btn-primary">
              Rent
              <IoKeyOutline className="text-xl" />
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

CarDetailForm.propTypes = {
  id: PropTypes.number.isRequired,
  car: PropTypes.shape({
    id: PropTypes.number.isRequired,
    model: PropTypes.string.isRequired,
    seats: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    price_per_day: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    vehicle_type: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
  }).isRequired,
};

export default CarDetailForm;

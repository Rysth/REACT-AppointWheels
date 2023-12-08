import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRental } from '../../redux/slices/rentalsSlice';
import { fetchCars } from '../../redux/slices/carsSlice';

function RentalNew() {
  const dispatch = useDispatch();
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedCar, setSelectedCar] = useState('');
  const user = JSON.parse(sessionStorage.getItem('userCredentials'));
  const { carsArray, loading } = useSelector((state) => state.carsStore);
  const selectedCarObj = carsArray.find((car) => car.id === Number(selectedCar));
  const pricePerDay = selectedCarObj ? selectedCarObj.price_per_day : 0;
  const days = (new Date(endDate) - new Date(startDate)) / 86400000;
  const totalPriceCalc = selectedCar && startDate && endDate ? `Total price: $${(pricePerDay * days).toFixed(2)}` : 'Total Price: $0.00';

  const cities = ['Barcelona', 'Madrid', 'Sevilla', 'Valencia', 'Bilbao'];

  useEffect(() => {
    if (loading) {
      dispatch(fetchCars());
    }
  }, [dispatch, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const rental = {
      city,
      start_date: startDate,
      end_date: endDate,
      total_price: totalPrice,
      user_id: user.id,
      car_id: selectedCar,
    };
    dispatch(createRental(rental));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="car">
        Car:
        {loading ? (
          <p>Loading...</p>
        ) : (
          <select
            id="car"
            value={selectedCar}
            onChange={(e) => setSelectedCar(e.target.value)}
          >
            {carsArray.map((car) => (
              <option key={car.id} value={car.id}>
                {car.model}
              </option>
            ))}
          </select>
        )}
      </label>
      <label htmlFor="city">
        City:
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="startDate">
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </label>
      <label htmlFor="endDate">
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </label>
      <label htmlFor="totalPrice">
        {totalPriceCalc}
        <input
          type="number"
          value={totalPriceCalc}
          onChange={(e) => setTotalPrice(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default RentalNew;

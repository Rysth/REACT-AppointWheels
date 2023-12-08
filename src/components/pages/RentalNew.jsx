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
  const totalPriceCalc = selectedCar && startDate && endDate ? (pricePerDay * days).toFixed(2) : 0;

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
      car_id: parseInt(selectedCar, 10),
    };
    dispatch(createRental(rental));
  };

  return (
    <section className="flex items-center justify-center h-screen w-screen bg-[var(--green)]">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center mb-4 space-x-4">
          <label htmlFor="car" className="flex">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <select
                id="car"
                value={selectedCar}
                onChange={(e) => setSelectedCar(e.target.value)}
                required
                className="w-40 px-4 py-2 mt-2 border text-white border-white rounded-3xl appearance-none bg-[var(--green)] focus:outline-none focus:ring-2 focus:ring-white"
              >
                <option value="">Select a Car</option>
                {carsArray.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.model}
                  </option>
                ))}
              </select>
            )}
          </label>
          <label htmlFor="city" className="flex">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-40 px-4 py-2 mt-2 border text-white border-white rounded-3xl appearance-none bg-[var(--green)] focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="">Select a City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="space-x-4">
          <label htmlFor="startDate" className="text-white">
            Start Date: &nbsp;
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-40 px-4 py-2 mt-2 border text-white border-white rounded-3xl appearance-none bg-[var(--green)] focus:outline-none focus:ring-2 focus:ring-white"
            />
          </label>
          <label htmlFor="endDate" className="mr-2 text-white">
            End Date: &nbsp;
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="w-40 px-4 py-2 mt-2 border text-white border-white rounded-3xl appearance-none bg-[var(--green)] focus:outline-none focus:ring-2 focus:ring-white"
            />
          </label>
          <label htmlFor="totalPrice" className="text-white">
            Total Price: $ &nbsp;
            <input
              type="number"
              value={totalPriceCalc}
              onChange={(e) => setTotalPrice(e.target.value)}
              required
              readOnly
              className="w-28 px-4 py-2 mt-2 border text-white border-white rounded-3xl appearance-none bg-[var(--green)] focus:outline-none focus:ring-2 focus:ring-white"
            />
          </label>
        </div>
        <div className="flex items-center justify-center">
          <button type="submit" className="w-44 px-4 py-2 mt-8 font-bold bg-white rounded-3xl text-[var(--green)]">Submit</button>
        </div>
      </form>
    </section>
  );
}

export default RentalNew;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelRental, fetchRentals } from '../../../redux/slices/rentalsSlice';

function Rentals() {
  const { rentalArray, loading } = useSelector((store) => store.rentalsStore);
  const dispatch = useDispatch();
  useEffect(() => {
    if (loading) {
      dispatch(fetchRentals());
    }
  }, [dispatch, loading]);

  if (loading) {
    return <p className="loader">loading...</p>;
  }

  return (
    <section className="w-full h-screen md:w-4/5 md:absolute md:right-0">
      <div className="items-center mb-4">
        <h1 className="text-2xl font-black tracking-wider text-center uppercase sm:text-3xl md:text-4xl">All Your Rentals: </h1>
      </div>
      {rentalArray.map((rent) => (
        <div key={rent.id} className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center justify-center">
            <div className="pl-10 font-bold whitespace-nowrap">
              <p>
                Model Name: &nbsp;
                {rent.car.model}
              </p>
              <p>
                Start Date: &nbsp;
                {rent.start_date}
              </p>
              <p>
                End Date: &nbsp;
                {rent.end_date}
              </p>
              <p>
                Price: &nbsp;
                {rent.total_price}
              </p>
            </div>
            <picture className="relative hidden overflow-visible sm:mb-2 place-items-center sm:px-5 md:block">
              <img
                src={rent.car.image_url}
                alt=""
                className="z-50 object-contain w-full h-full rounded-full "
              />
            </picture>
          </div>
          <button type="button" className="btn btn-danger" onClick={() => dispatch(cancelRental(rent.id))}>Cancel</button>
          <p className="text-xl tracking-wider text-gray-400 sm:text-2xl">
            .......................................................
          </p>
        </div>
      ))}
    </section>
  );
}

export default Rentals;

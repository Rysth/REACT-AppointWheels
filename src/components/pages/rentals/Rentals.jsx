import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelRental, fetchRentals } from '../../../redux/slices/rentalsSlice';

function Rentals() {
  const { rentalArray, loading, length } = useSelector((store) => store.rentalsStore);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRentals());
  }, [dispatch, length]);

  if (loading) {
    return <p>loading...</p>;
  }

  if (length === 0) {
    return (
      <section className="h-screen ">
        <div className="flex flex-row">
          <h1 className="text-2xl font-black tracking-wider uppercase sm:text-3xl md:text-4xl">All Your Rentals: </h1>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full h-screen">
      <div className="items-center ">
        <h1 className="text-2xl font-black tracking-wider text-center uppercase sm:text-3xl md:text-4xl">All Your Rentals: </h1>
      </div>
      {rentalArray.map((rent) => (
        <div key={rent.id} className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center justify-center">
            <div className="pl-10 font-bold whitespace-nowrap">
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
            <picture className="relative grid overflow-visible sm:mb-2 place-items-center sm:px-5">
              <span className="absolute z-20 w-32 h-32 rounded-full bg-slate-200 md:w-36 md:h-36 xl:w-60 xl:h-60" />
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

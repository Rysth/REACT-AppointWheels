import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRentals } from '../../../redux/slices/rentalsSlice';

function Rentals() {
  const { rentalArray, loading } = useSelector((store) => store.rentalsStore);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) {
      dispatch(fetchRentals());
    }
  }, [dispatch, loading]);

  if (loading) {
    return <p>loading...</p>;
  }
  return (
    <section className="rentals">
      {rentalArray.map((rent) => (
        <p key={rent.id}>{rent.start_date}</p>
      ))}
    </section>
  );
}

export default Rentals;

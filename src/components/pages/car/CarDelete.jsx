import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars, removeCar } from '../../../redux/slices/carsSlice';

function CarDelete() {
  const { carsArray, length, loading } = useSelector((store) => store.carsStore);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch, length]);

  if (loading) {
    return (<div>Loading...</div>);
  }

  if (length === 0) {
    return (<div>No Car Available</div>);
  }

  return (
    <section className="carDelete">
      <h1>{`Total number of Cars: ${length}`}</h1>
      <div className="carDeleteList">
        {carsArray.map((car) => (
          <div className="car" key={car.id}>
            <img src={car.image_url} alt={car.model} className="carImage" />
            <div className="carDeleteInfo">
              <h3>{car.model}</h3>
              <p>{car.description}</p>
            </div>
            <button type="button" className="btn btn-primary" onClick={() => dispatch(removeCar(car.id))}>Delete</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CarDelete;

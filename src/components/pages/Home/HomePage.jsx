import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCars } from '../../../redux/slices/carsSlice';
import HomeList from './components/HomeList';

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <section className="w-full h-screen md:w-4/5 md:absolute md:right-0">
      <article className="flex flex-col items-center justify-center h-full gap-10 mx-auto">
        <header className="py-2 text-center">
          <h2 className="text-2xl font-black tracking-wider uppercase sm:text-3xl md:text-4xl">
            Lastest Models
          </h2>
          <h3 className="py-1 text-sm font-semibold text-gray-400 sm:text-base">
            Please select a Car Model
          </h3>
          <p className="text-xl tracking-wider text-gray-200 sm:text-2xl">
            .........................
          </p>
        </header>
        <div className="w-full gap-5">
          <HomeList />
        </div>
      </article>
    </section>
  );
}

export default HomePage;

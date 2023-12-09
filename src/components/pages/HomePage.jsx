import { useEffect, useState } from 'react';
import { LuArrowBigLeftDash, LuArrowBigRightDash } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCars } from '../../redux/slices/carsSlice';

function HomePage() {
  const { carsArray, loading } = useSelector((store) => store.carsStore);
  const [carsQuantity, setCarsQuantity] = useState(carsArray.length);
  const [index, setIndex] = useState(0);

  const increaseIndex = () => {
    if (index < carsQuantity - 1) setIndex(index + 1);
  };

  const decreaseIndex = () => {
    if (index > 0) setIndex(index - 1);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  useEffect(() => {
    setCarsQuantity(carsArray.length);
  }, []);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [carsShowed, setCarsShowed] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      if (window.innerWidth > 1024) {
        setCarsShowed(3);
      } else if (window.innerWidth > 640) {
        setCarsShowed(2);
      } else {
        setCarsShowed(1);
      }
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial setup
    handleResize();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth, carsShowed]);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <section className="h-screen ">
      <article className="flex flex-col items-center justify-center h-full gap-10 mx-auto sm:gap-16">
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
        <div className="flex items-center justify-between w-full gap-5">
          <button
            type="button"
            className={`bg-[var(--green)] text-white p-5 rounded-r-full ${
              index === 0 && 'pointer-events-none bg-gray-400'
            }`}
            aria-label="arrow left"
            onClick={decreaseIndex}
          >
            <LuArrowBigLeftDash className="text-xl sm:text-3xl" />
          </button>
          <ul className="grid flex-1 gap-2 sm:grid-cols-2 xl:grid-cols-3 sm:gap-10">
            {carsArray.slice(index, index + carsShowed).map((car) => (
              <Link to={`/car/${car.id}`} key={car.id}>
                <li key={car.id} className="h-full">
                  <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                    <picture className="relative grid sm:mb-10 place-items-center sm:px-5">
                      <span className="absolute z-20 w-32 h-32 rounded-full bg-slate-200 md:w-36 md:h-36 xl:w-60 xl:h-60" />
                      <img
                        src={car.image_url}
                        alt=""
                        className="z-20 object-contain h-[10rem] xl:h-[15rem] block"
                      />
                    </picture>
                    <div className="px-10 text-center">
                      <h3 className="font-bold uppercase sm:text-md ">{car.model}</h3>
                      <p className="mb-3 text-xl tracking-wider text-gray-200 sm:text-2xl ">
                        .........................
                      </p>
                      <p className="overflow-hidden text-xs text-center text-gray-400 sm:text-sm max-h-16">
                        {car.description}
                      </p>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
          <button
            type="button"
            className={`bg-[var(--green)] text-white p-5 rounded-l-full ${
              index === carsQuantity - 1 && 'pointer-events-none bg-gray-400'
            }`}
            aria-label="arrow right"
            onClick={increaseIndex}
          >
            <LuArrowBigRightDash className="text-xl sm:text-3xl" />
          </button>
        </div>
      </article>
    </section>
  );
}

export default HomePage;

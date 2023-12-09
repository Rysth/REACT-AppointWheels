import PropTypes from 'prop-types';
import Carousel from 'react-multi-carousel';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LuArrowBigLeftDash, LuArrowBigRightDash } from 'react-icons/lu';

const responsive = {
  desktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

function HomeList() {
  const { carsArray } = useSelector((store) => store.carsStore);

  return (
    <ul className="grid flex-1 gap-10">
      <Carousel
        responsive={responsive}
        customRightArrow={<CustomRightArrow />}
        customLeftArrow={<CustomLeftArrow />}
        infinite
      >
        {carsArray.map((car) => (
          <Link to={`/car/${car.id}`} key={car.id} className="block h-[30rem]">
            <li key={car.id} className="grid h-full gap-10">
              <div className="flex flex-col justify-center w-full gap-2">
                <picture className="relative grid sm:mb-10 place-items-center sm:px-5">
                  <span className="absolute z-20 w-48 h-48 rounded-full bg-slate-200 sm:w-52 sm:h-52 lg:w-60 lg:h-60" />
                  <img
                    src={car.image_url}
                    alt=""
                    className="z-20 object-contain w-[18rem] sm:w-[20rem] lg:max-w-[35rem] h-56 w- block"
                  />
                </picture>
                <div className="px-10 text-center">
                  <h3 className="font-bold uppercase sm:text-md">{car.model}</h3>
                  <p className="mb-3 text-xl tracking-wider text-gray-200 sm:text-2xl">
                    .........................
                  </p>
                  <p className="overflow-hidden text-xs text-center text-gray-400 sm:text-sm max-h-16 ">
                    {car.description}
                  </p>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </Carousel>
    </ul>
  );
}

const CustomLeftArrow = ({ onClick }) => (
  <button
    type="button"
    className="bg-[var(--green)] text-white p-5 rounded-r-full absolute left-0"
    aria-label="arrow right"
    onClick={() => onClick()}
  >
    <LuArrowBigLeftDash className="text-xl sm:text-3xl" />
  </button>
);

const CustomRightArrow = ({ onClick }) => (
  <button
    type="button"
    className="bg-[var(--green)] text-white p-5 rounded-l-full fixed right-0"
    aria-label="arrow right"
    onClick={() => onClick()}
  >
    <LuArrowBigRightDash className="text-xl sm:text-3xl" />
  </button>
);

CustomRightArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

CustomLeftArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default HomeList;

import { useEffect, useState } from 'react';
import { LuArrowBigLeftDash, LuArrowBigRightDash } from 'react-icons/lu';

const carArrays = [
  {
    id: 1,
    model: 'Corolla',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla delectus et perspiciatis pariatur dolore, expedita eaque omnis maxime. Tempore repellendus error, assumenda laboriosam accusantium fugiat exercitationem quasi itaque fugit modi!',
    image_url:
      'https://www.motortrend.com/uploads/sites/10/2019/03/2020-toyota-corolla-le-sedan-angular-front.png',
  },
  {
    id: 2,
    model: 'Camry',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla delectus et perspiciatis pariatur dolore, expedita eaque omnis maxime. Tempore repellendus error, assumenda laboriosam accusantium fugiat exercitationem quasi itaque fugit modi!',
    image_url: 'https://jzheng100823.github.io/hicproj/images/ToyotaCamry.png ',
  },
  {
    id: 3,
    model: 'Land Cruiser',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla delectus et perspiciatis pariatur dolore, expedita eaque omnis maxime. Tempore repellendus error, assumenda laboriosam accusantium fugiat exercitationem quasi itaque fugit modi!',
    image_url:
      'https://www.motortrend.com/uploads/sites/10/2016/05/2016-toyota-landcruiser-4wd-suv-angular-front.png',
  },
];

function HomePage() {
  const [index, setIndex] = useState(0);
  const [carsQuantity, setCarsQuantity] = useState(carArrays.length);

  const increaseIndex = () => {
    if (index < carsQuantity - 1) setIndex(index + 1);
  };

  const decreaseIndex = () => {
    if (index > 0) setIndex(index - 1);
  };

  useEffect(() => {
    setCarsQuantity(carArrays.length);
  }, []);

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
          <ul className="grid flex-1 gap-2 md:grid-cols-3 sm:gap-10">
            {carArrays.slice(index, 3 + index).map((car) => (
              <li key={car.id}>
                <div className="flex flex-col items-center justify-center w-full h-full gap-5">
                  <picture className="relative grid overflow-visible sm:mb-10 place-items-center sm:px-5">
                    <span className="absolute z-20 w-32 h-32 rounded-full bg-slate-200 md:w-36 md:h-36 xl:w-60 xl:h-60" />
                    <img
                      src={car.image_url}
                      alt=""
                      className="z-50 object-contain w-full h-full rounded-full "
                    />
                  </picture>
                  <div className="px-10 text-center">
                    <h3 className="font-bold uppercase sm:text-md ">
                      {car.model}
                    </h3>
                    <p className="mb-3 text-xl tracking-wider text-gray-200 sm:text-2xl ">
                      .........................
                    </p>
                    <p className="overflow-hidden text-xs text-center text-gray-400 sm:text-sm max-h-14">
                      {car.description}
                    </p>
                  </div>
                </div>
              </li>
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

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
  return (
    <section className="h-screen ">
      <article className="flex flex-col items-center justify-center h-full max-w-screen-xl gap-10 mx-auto">
        <header className="py-2 text-center">
          <h2 className="text-2xl font-black tracking-wider uppercase sm:text-3xl md:text-4xl">
            Lastest Models
          </h2>
          <h3 className="py-1 text-sm font-semibold text-gray-400 sm:text-base">
            Please select a Car Model
          </h3>
        </header>
        <div className="flex items-center justify-between w-full gap-5">
          <button
            type="button"
            className="bg-[var(--green)] text-white p-5 rounded-r-full"
            aria-label="arrow left"
          >
            <LuArrowBigLeftDash className="text-xl sm:text-3xl" />
          </button>
          <ul className="grid flex-1 sm:grid-cols-3">
            <li>
              <div className="flex flex-col items-center justify-center w-full h-full gap-5 bg-cyan-200">
                <picture className="relative h-44 w-44">
                  <img
                    src={carArrays[0].image_url}
                    alt=""
                    className="relative z-50 object-contain w-full h-full bg-black rounded-full"
                  />
                </picture>
                <div className="grid gap-2 text-center">
                  <h3 className="font-bold uppercase">{carArrays[0].model}</h3>
                  <p className="overflow-hidden text-xs text-justify sm:text-sm max-h-12">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab
                    impedit omnis natus voluptatem voluptas eos! Id facere
                    delectus assumenda magnam quam. Est tempora quaerat
                    repudiandae quas provident vitae doloremque asperiores!
                  </p>
                </div>
              </div>
            </li>
          </ul>
          <button
            type="button"
            className="bg-[var(--green)] text-white p-5 rounded-l-full"
            aria-label="arrow right"
          >
            <LuArrowBigRightDash className="text-xl sm:text-3xl" />
          </button>
        </div>
      </article>
    </section>
  );
}

export default HomePage;

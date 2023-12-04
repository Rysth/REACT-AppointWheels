import { PiGear } from 'react-icons/pi';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';

function HomePage() {
  return (
    <section className="hompage">
      <button type="button" className="btn btn-primary">
        <PiGear className="text-xl" />
        Hello World
        <FaRegArrowAltCircleRight className="text-base" />
      </button>
    </section>
  );
}

export default HomePage;

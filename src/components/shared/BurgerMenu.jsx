import PropTypes from 'prop-types';

function BurgerMenu({ isOpen, toggle }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Toggle menu"
      className={`burger-menu h-6 w-6 absolute cursor-pointer z-50 m-1.5 top-2 right-5 ${
        isOpen ? 'open' : ''
      }`}
      onClick={toggle}
      onKeyDown={handleKeyDown}
    >
      <span
        className="block w-full h-0.5 bg-current absolute transition-transform duration-300 ease-in-out transform origin-center mx-2"
        style={{ top: '0%', marginTop: '0.25rem' }}
      />
      <span
        className="block w-full h-0.5 bg-current absolute transition-all duration-300 ease-in-out mx-2"
        style={{ top: '50%', marginTop: '0.25rem' }}
      />
      <span
        className="block w-full h-0.5 bg-current absolute transition-transform duration-300 ease-in-out transform origin-center mx-2"
        style={{ top: '100%', marginTop: '0.25rem' }}
      />
    </div>
  );
}

BurgerMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default BurgerMenu;

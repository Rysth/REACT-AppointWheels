import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { IoKeyOutline } from 'react-icons/io5';
import LoginBackground from '../../../assets/images/login_background.jpg';
import { createSession } from '../../../redux/slices/loginSlice';

function Login() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const userData = {
      user: {
        ...data,
      },
    };
    dispatch(createSession(userData));
  };

  /* eslint-disable */
  return (
    <section className="w-full h-screen bg-white">
      <div className="relative grid items-center justify-center h-full sm:grid-cols-2">
        <picture className="absolute top-0 bottom-0 left-0 right-0 h-full sm:relative">
          <img
            src={LoginBackground}
            alt="Portrait vehicle"
            className="object-cover w-full h-full max-h-screen brightness-50 sm:brightness-100"
          />
        </picture>
        <article className="relative z-20 flex flex-col items-center justify-center p-6 bg-white sm:bg-none rounded-xl ">
          <header className="mt-2 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Welcome
            </h2>
            <p className="text-base sm:text-2xl">Login</p>
          </header>
          <form
            className="grid gap-5 mt-5 text-xs sm:text-sm sm:mt-10 w-72"
            onSubmit={handleSubmit(onSubmit)}
          >
            <fieldset>
              <label
                htmlFor="email"
                className="relative grid gap-2 font-semibold"
              >
                Email:
                <input
                  type="email"
                  {...register('email')}
                  className="flex-1 p-2 font-normal border rounded-lg shadow-lg focus:outline-none focus:border-gray-500"
                  autoComplete=""
                  required
                />
              </label>
            </fieldset>
            <fieldset>
              <label
                htmlFor="password"
                className="relative grid gap-2 font-semibold"
              >
                Password:
                <input
                  type="password"
                  {...register('password')}
                  className="flex-1 p-2 font-normal border rounded-lg shadow-lg focus:outline-none focus:border-gray-500"
                  autoComplete=""
                  required
                />
              </label>
            </fieldset>
            <fieldset className="flex items-center justify-end gap-1">
              <button
                type="submit"
                className="float-right w-full btn btn-primary"
              >
                Login
                <IoKeyOutline className="text-xl" />
              </button>
            </fieldset>
          </form>
        </article>
      </div>
    </section>
  );
}

export default Login;

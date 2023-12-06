import { useDispatch } from "react-redux";
import { addCar } from "../../redux/slices/carsSlice";
import { useForm } from "react-hook-form";

function NewCar() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const submitAddCar = (data) => {
    dispatch(addCar(data));
  }
  
  return (
    <section className="newCar">
      <h2>New Car</h2>

      <form onSubmit={handleSubmit(submitAddCar)}>
        <fieldset>
          <label htmlFor="text">Model Name:</label>
          <input
            type="text"
            {...register('model')}
            className="textFields"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="text">Number of Seats:</label>
          <input
            type="text"
            {...register('seats')}
            className="textFields"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="text">Car Description:</label>
          <input
            type="text"
            {...register('description')}
            className="textFields"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="text">Price per day:</label>
          <input
            type="text"
            {...register('price_per_day')}
            className="textFields"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="text">Vehicle Type:</label>
          <input
            type="text"
            {...register('vehicle_type')}
            className="textFields"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="text">Vehicle Image:</label>
          <input
            type="text"
            {...register('image_url')}
            className="textFields"
            required
          />
        </fieldset>
        <button type="submit">Add New Car</button>
      </form>
    </section>
  );
}

export default NewCar;

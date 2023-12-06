function NewCar() {
  return (
    <section className="newCar">
      <h2>New Car</h2>

      <form onSubmit={}>
        <fieldset>
          <label htmlFor="text">Model Name:</label>
          <input
            type="text"
            name="model"
            className="textFields"
            value={}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="text">Number of Seats:</label>
          <input
            type="text"
            name="seats"
            className="textFields"
            value={}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="text">Car Description:</label>
          <input
            type="text"
            name="description"
            className="textFields"
            value={}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="text">Price per day:</label>
          <input
            type="text"
            name="price_per_day"
            className="textFields"
            value={}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="text">Vehicle Type:</label>
          <input
            type="text"
            name="vehicle_type"
            className="textFields"
            value={}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="text">Vehicle Image:</label>
          <input
            type="text"
            name="image_url"
            className="textFields"
            value={}
          />
        </fieldset>
        <button type="submit">Add New Car</button>
      </form>
    </section>
  );
}

export default NewCar;

const About = () => {
  return (
    <div className="container my-5">
      <section className="mb-5 p-4 bg-light rounded shadow-sm">
        <h2 className="mb-4 text-primary">About WeatherNow</h2>
        <p className="lead">
          WeatherNow is a simple and intuitive weather app that allows you to
          quickly search for current weather information in any city worldwide.
          It fetches real-time data from the OpenWeatherMap API to keep you
          updated with accurate weather forecasts.
        </p>
      </section>

      <section className="mb-5 p-4 bg-white rounded shadow-sm d-flex align-items-center flex-wrap">
        <img
          src="/weather/creator.jpg"
          alt="Creator"
          className="rounded-circle me-4"
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            border: "4px solid #0d6efd",
          }}
        />
        <div>
          <h3 className="mb-2">Created By</h3>
          <h5 className="text-primary mb-1">Sudip Kandel</h5>
          <p className="text-muted">
            A BCA student learning web development. This weather app is a
            learning experiment built using React, based on knowledge gained
            from a workshop conducted by Birendra IT Club. The project was
            guided by Azure Dev Pvt. Ltd. under the mentorship of Mr. Niraj
            Bhandari.
          </p>
          <a
            href="https://github.com/sudip-kandel7"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary btn-sm"
          >
            GitHub Profile
          </a>
        </div>
      </section>

      <section className="p-4 bg-light rounded shadow-sm">
        <h2 className="mb-4 text-primary">How It Works</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Search a City:</strong> Enter the name of a city in the
            search bar.
          </li>
          <li className="list-group-item">
            <strong>Fetch Weather Data:</strong> The app uses OpenWeatherMap API
            to get current weather information.
          </li>
          <li className="list-group-item">
            <strong>Display Results:</strong> Shows temperature, weather
            conditions, humidity, and more.
          </li>
          <li className="list-group-item">
            <strong>Responsive UI:</strong> Works smoothly on all devices.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default About;

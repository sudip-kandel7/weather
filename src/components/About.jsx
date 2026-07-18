const About = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <section className="mb-8 rounded-[30px] bg-slate-100 p-8 shadow-sm ring-1 ring-slate-200">
        <h2 className="mb-4 text-3xl font-semibold text-sky-700">
          About WeatherNow
        </h2>
        <p className="max-w-3xl text-slate-700 leading-8">
          WeatherNow is a simple and intuitive weather app that allows you to
          quickly search for current weather information in any city worldwide.
          It fetches real-time data from the OpenWeatherMap API to keep you
          updated with accurate weather forecasts.
        </p>
      </section>

      <section className="mb-8 rounded-[30px] bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-8 md:flex-row md:items-center">
          <img
            src="/weather/creator.jpg"
            alt="Creator"
            className="h-36 w-36 rounded-full border-4 border-sky-600 object-cover"
          />
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-slate-900">
              Created By
            </h3>
            <h5 className="text-sky-700">Sudip Kandel</h5>
            <p className="text-slate-600 leading-7">
              A BCA student learning web development. This weather app is a
              learning experiment built using React, based on knowledge gained
              from a workshop conducted by BOSC.
            </p>
            <a
              href="https://github.com/sudip-kandel7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-sky-600 bg-white px-5 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-50"
            >
              GitHub Profile
            </a>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border text-center border-slate-200 bg-white p-4 text-xl font-bold shadow-sm">
       This is made by using 30 - 40% AI ( Github Copilot )
      </section>
    </div>
  );
};

export default About;

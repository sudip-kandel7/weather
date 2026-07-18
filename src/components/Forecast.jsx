export default function Forecast({ entries }) {
  const d = new Date(entries[0].dt_txt);

  const day = d.toLocaleDateString("en-US", {
    weekday: "short",
  });

  const displayDate = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const formatTime = (dateString) => {
    const time = new Date(dateString);

    return time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="mt-8 w-full rounded-3xl bg-linear-to-br from-blue-50 to-white p-6 shadow-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-blue-500">
            {day}
          </p>

          <p className="text-2xl font-bold text-slate-800">{displayDate}</p>
        </div>

        <img
          className="h-16 w-16"
          src={`https://openweathermap.org/img/wn/${entries[0].weather[0].icon}@2x.png`}
          alt="weather icon"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {entries.map((entry) => (
          <div
            key={entry.dt}
            className="
              rounded-2xl
              bg-white
              p-4
              text-center
              shadow-md
              transition
              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            <p className="text-sm font-medium text-slate-500">
              {formatTime(entry.dt_txt)}
            </p>

            <img
              className="mx-auto my-2 h-14 w-14"
              src={`https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`}
              alt="weather"
            />

            <p className="text-2xl font-bold text-slate-800">
              {Math.round(entry.main.temp)}°C
            </p>

            <p className="mt-1 text-sm capitalize text-slate-500">
              {entry.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

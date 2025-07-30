export default function WeatherIcon({ data }) {
    if (!data || !data.weather) return null;

    const iconCode = data.weather[0].icon; // e.g. "10d"
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    return (
        <div className="mt-6">
            <img src={iconUrl} alt="Weather Icon" className="w-28 h-28 mx-auto" />
        </div>
    );
}

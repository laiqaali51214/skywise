import { WiHumidity, WiStrongWind, WiBarometer, WiSunrise, WiSunset } from "react-icons/wi";

export default function DisplayData({ data }) {
    if (!data || !data.main) {
        return (
            <p className="text-white mt-4">Search for a city to see the weather.</p>
        );
    }

    const {
        name,
        sys,
        main,
        weather,
        wind
    } = data;

    const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="text-white mt-6 w-full">
            <h2 className="text-2xl font-bold mb-2 text-center">{name}, {sys.country}</h2>
            <p className="text-lg capitalize text-center">{weather[0].description}</p>
            <p className="text-4xl font-semibold mt-2 text-center">{Math.round(main.temp)}°C</p>
            <p className="text-sm text-gray-200 text-center">Feels like {Math.round(main.feels_like)}°C</p>

            <div className="grid grid-cols-2 gap-4 mt-6 text-gray-100">
                <div className="flex items-center gap-2">
                    <WiHumidity size={28} /> <span>Humidity: {main.humidity}%</span>
                </div>
                <div className="flex items-center gap-2">
                    <WiStrongWind size={28} /> <span>Wind: {wind.speed} m/s</span>
                </div>
                <div className="flex items-center gap-2">
                    <WiBarometer size={28} /> <span>Pressure: {main.pressure} hPa</span>
                </div>
                <div className="flex items-center gap-2">
                    <WiSunrise size={28} /> <span>Sunrise: {sunrise}</span>
                </div>
                <div className="flex items-center gap-2">
                    <WiSunset size={28} /> <span>Sunset: {sunset}</span>
                </div>
            </div>
        </div>
    );
}

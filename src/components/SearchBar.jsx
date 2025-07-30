import { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

export default function SearchBar({ setData }) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [hasSelectedCity, setHasSelectedCity] = useState(false);
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    // Fetch city suggestions
    useEffect(() => {
        if (query.length < 3 || hasSelectedCity) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            try {
                const res = await axios.get(
                    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
                );
                setSuggestions(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        const delay = setTimeout(fetchSuggestions, 400); // debounce API calls
        return () => clearTimeout(delay);
    }, [query, hasSelectedCity]);

    // Fetch weather by city name
    const fetchWeather = async (cityName) => {
        try {
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
            );
            setData(res.data);
            setSuggestions([]);
        } catch (error) {
            alert("City not found");
        }
    };

    // Fetch weather by geolocation
    const fetchWeatherByCoords = async (lat, lon) => {
        try {
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
            );
            setData(res.data);
            setSuggestions([]);
        } catch (error) {
            alert("Location not found");
        }
    };

    const handleSelect = (city) => {
        setQuery(`${city.name}, ${city.country}`);
        setHasSelectedCity(true);
        setSuggestions([]);
        fetchWeather(city.name);
    };

    const handleGeoLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            () => alert("Geolocation not allowed")
        );
    };

    return (
        <div className="relative w-full">
            {/* Search Bar */}
            <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden">
                <FaSearch className="h-5 w-5 ml-3 text-gray-500" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setHasSelectedCity(false); // reset city selection on typing
                    }}
                    placeholder="Search for a city"
                    className="flex-1 px-3 py-2 outline-none bg-transparent text-gray-700 placeholder-gray-400"
                />
                <button
                    type="button"
                    onClick={handleGeoLocation}
                    className="flex items-center justify-center h-10 w-10 bg-gray-500 hover:bg-gray-600 text-white transition-colors"
                >
                    <FaMapMarkerAlt className="h-5 w-5" />
                </button>
            </div>

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg z-50 text-gray-800">
                    {suggestions.map((city, idx) => (
                        <li
                            key={idx}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelect(city)}
                        >
                            {city.name}, {city.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

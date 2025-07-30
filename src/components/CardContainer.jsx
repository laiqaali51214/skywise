import SearchBar from "./SearchBar";
import WeatherIcon from "./WeatherIcon";
import DisplayData from "./DisplayData";

export default function CardContainer({ data, setData }) {
    return (
        <div
            className="
        flex flex-col items-center 
        text-amber-50
       bg-black/40 backdrop-blur-md
        border border-white/30
        rounded-2xl
        shadow-lg
        w-[90%] max-w-xl
        p-6 mt-10
      "
        >
            <SearchBar setData={setData} />

            {/* Weather Info Section */}
            <div className="mt-6 flex flex-col items-center w-full">
                <WeatherIcon data={data} />
                <DisplayData data={data} />
            </div>
        </div>
    );
}

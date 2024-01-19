'use client'
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState({});
  const [country, setCountry] = useState("");
  const [error, setError] = useState(null);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=0fc509f9968fd60b4469846dcfdd628d`;

  const search = async (e) => {
    if (e.key === "Enter") {
      try {
        const { data: responseData } = await axios.get(url);
        setData(responseData);
        setError(null); // Clear any previous errors
      } catch (error) {
        setError("Wrong input. Please enter a valid location.");
        console.error(error);
      } finally {
        setCountry("");
      }
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center border-2 px-3 py-8 rounded-xl">
        <h1 className="text-lg mb-4 font-bold">Weather APP</h1>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          onKeyPress={search}
          placeholder="Enter location"
          className="text-black outline-none p-3 rounded-lg bg-gray-300 mb-4"
        />
        {error && <p className="text-red-500">{error}</p>}
        {data.name && (
          <>
            <p className="text-xl font-bold">{data.main?.temp} C</p>
            <div className="flex space-x-3 border-2 p-2 rounded-xl mt-3">
              <h1>Weather:<br/>{data.weather?.[0]?.main}</h1>
              <h1>Humidity: <br/>{data.main?.humidity} </h1>
              <h1>Wind:<br/>{data.wind?.speed} MPH</h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

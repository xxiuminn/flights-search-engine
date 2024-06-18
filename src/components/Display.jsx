import React, { useEffect, useState } from "react";
import CheapestFlights from "./CheapestFlights";
import OtherFlights from "./OtherFlights";
import FilterBar from "./FilterBar";
import { useQuery } from "@tanstack/react-query";
import SearchBarResult from "./SearchBarResult";

const Display = () => {
  const date = new Date();
  //set default departure date as today.
  let defDepDate = date.toISOString().split("T")[0];
  let defRetDate = date.toISOString().split("T")[0];
  const [token, setToken] = useState("");
  const [oLocation, setOLocation] = useState("SIN");
  const [dLocation, setDLocation] = useState("BKK");
  const [oCity, setOCity] = useState("Singapore");
  const [dCity, setDCity] = useState("Bangkok");
  const [depDate, setDepDate] = useState(defDepDate);
  const [retDate, setRetDate] = useState(defRetDate);
  const [adults, setAdults] = useState("1");
  const [travelClass, setTravelClass] = useState("ECONOMY");
  const [stops, setStops] = useState("false");
  const [currency, setCurrency] = useState("SGD");
  const [findingFlights, setFindingFlights] = useState(false);

  //fetch token
  const fetchToken = async () => {
    const clientId = import.meta.env.VITE_ID;
    const clientSecret = import.meta.env.VITE_SECRET;
    const url = "https://test.api.amadeus.com/v1/security/oauth2/token";
    const body = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
      });

      if (!res.ok) {
        throw new Error("failed to fetch token");
      }
      const tokenData = await res.json();
      setToken(tokenData.access_token);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  //fetch departing airport by city search

  const fetchOCity = async () => {
    console.log(oCity);
    let tempURL = `keyword=${oCity}&max=5&include=AIRPORTS`;
    const res = await fetch(import.meta.env.VITE_CITIES + tempURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("fetch o city error");
    }
    console.log(oCity);
    const data = await res.json();
    return data.included.airports;
  };

  const oCityQuery = useQuery({
    queryKey: ["ocity", oCity],
    queryFn: fetchOCity,
  });

  //fetch arrival airport by city search

  const fetchDCity = async () => {
    let tempURL = `keyword=${dCity}&max=5&include=AIRPORTS`;
    const res = await fetch(import.meta.env.VITE_CITIES + tempURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("fetch d city error");
    }
    const data = await res.json();
    return data.included.airports;
  };

  const dCityQuery = useQuery({
    queryKey: ["dcity", dCity],
    queryFn: fetchDCity,
  });

  return (
    <div>
      {/* <p>{token}</p>
      <p>{JSON.stringify(oCityQuery.data)}</p>
      <p>{JSON.stringify(dCityQuery.data)}</p> */}
      <div>
        <input
          type="text"
          placeholder="Where from?"
          onChange={(e) => setOCity(e.target.value)}
          value={oCity}
        ></input>

        {/* progress: managed to extract out the different airport names based on city search */}
        {oCityQuery.isFetching && <p>loading...</p>}
        {oCityQuery.isSuccess &&
          Object.values(oCityQuery.data).map((item) => {
            return (
              <div onClick={() => console.log(item.iataCode)}>
                {item.name} {item.subType} {item.iataCode}
              </div>
            );
          })}

        <input
          type="text"
          placeholder="Where to?"
          onChange={(e) => setDCity(e.target.value)}
          value={dCity}
        ></input>

        {dCityQuery.isFetching && <p>loading...</p>}
        {dCityQuery.isSuccess &&
          Object.values(dCityQuery.data).map((item) => {
            return (
              <div onClick={() => console.log(item.iataCode)}>
                {item.name} {item.subType} {item.iataCode}
              </div>
            );
          })}
      </div>

      <CheapestFlights
        token={token}
        oLocation={oLocation}
        dLocation={dLocation}
        depDate={depDate}
        retDate={retDate}
        adults={adults}
        travelClass={travelClass}
        stops={stops}
        currency={currency}
      />
      <OtherFlights />
    </div>
  );
};

export default Display;

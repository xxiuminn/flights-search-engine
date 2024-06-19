import React, { useEffect, useState } from "react";
import CheapestFlights from "./CheapestFlights";
import { useQuery } from "@tanstack/react-query";
import styles from "./Display.module.css";
import Favourites from "./Favourites";

const Display = () => {
  const date = new Date();
  //set default departure date as today.
  let defDepDate = date.toISOString().split("T")[0];
  let defRetDate = date.toISOString().split("T")[0];
  const [token, setToken] = useState("");
  const [oLocation, setOLocation] = useState("");
  const [dLocation, setDLocation] = useState("");
  const [oCity, setOCity] = useState("");
  const [dCity, setDCity] = useState("");
  const [depDate, setDepDate] = useState(defDepDate);
  const [retDate, setRetDate] = useState(defRetDate);
  const [adults, setAdults] = useState("1");
  const [travelClass, setTravelClass] = useState("ECONOMY");
  const [stops, setStops] = useState("false");
  const [currency, setCurrency] = useState("SGD");
  const [findingFlights, setFindingFlights] = useState(false);
  const [enableClick, setEnableClick] = useState(false);
  const [oDropdown, setODropdown] = useState(false);
  const [dDropdown, setDDropdown] = useState(false);
  // const [savedFlights, setSavedFlights] = useState([
  //   { carrier: "", dep: "", arr: "", duration: "" },
  // ]);

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
    enabled: false,
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
    enabled: false,
  });

  // fetch cities for autofill

  const oautofill = async () => {
    let tempURL = `keyword=${oCity}&max=1&include=AIRPORTS`;
    const res = await fetch(import.meta.env.VITE_CITIES + tempURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("fetch oautofill error");
    }
    console.log(oCity);
    const data = await res.json();
    return data.data[0];
  };

  const oautofillQuery = useQuery({
    queryKey: ["oautofill", oCity],
    queryFn: oautofill,
    enabled: false,
  });

  const dautofill = async () => {
    let tempURL = `keyword=${dCity}&max=1&include=AIRPORTS`;
    const res = await fetch(import.meta.env.VITE_CITIES + tempURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("fetch dautofill error");
    }
    console.log(oCity);
    const data = await res.json();
    return data.data[0];
  };

  const dautofillQuery = useQuery({
    queryKey: ["dautofill", oCity],
    queryFn: dautofill,
    enabled: false,
  });

  //search click which will fetch results
  const handleSearch = () => {
    setEnableClick(!enableClick);
  };

  //click on drop down option (iataCode) => returns city name.
  const selectOLocation = (code) => {
    setOLocation(code);
    setODropdown(false);
    // need to autofill input to country
    if (code === oautofillQuery.data.iataCode) {
      console.log(oautofillQuery.data.name);
      return setOCity(oautofillQuery.data.name);
    }
  };

  const selectDLocation = (code) => {
    setDLocation(code);
    setDDropdown(false);
    // need to autofill input to country
    if (code === dautofillQuery.data.iataCode) {
      console.log(dautofillQuery.data.name);
      return setDCity(dautofillQuery.data.name);
    }
  };

  return (
    <>
      <div className={styles.banner}></div>
      <div className={styles.searchcontainer}>
        <div className={styles.searchbar}>
          <div>
            <div>
              <label>From</label>

              <input
                type="text"
                placeholder="Where from?"
                onChange={(e) => setOCity(e.target.value)}
                value={oCity}
                onClick={() => setODropdown(true)}
              ></input>
            </div>
            {oDropdown && (
              <div className={styles.dropdown}>
                {oCityQuery.isFetching && <p>loading...</p>}
                {oCityQuery.isSuccess &&
                  Object.values(oCityQuery.data).map((item) => {
                    return (
                      <div onClick={() => selectOLocation(item.iataCode)}>
                        {item.name} {item.subType} {item.iataCode}
                      </div>
                    );
                  })}
              </div>
            )}
            <div>{oLocation}</div>
          </div>

          <div>
            <div>
              <label>To</label>
              <input
                type="text"
                placeholder="Where to?"
                onChange={(e) => setDCity(e.target.value)}
                value={dCity}
                onClick={() => setDDropdown(true)}
              ></input>
            </div>
            {dDropdown && (
              <div className={styles.dropdown}>
                {dCityQuery.isFetching && <p>loading...</p>}
                {dCityQuery.isSuccess &&
                  Object.values(dCityQuery.data).map((item) => {
                    return (
                      <div onClick={() => selectDLocation(item.iataCode)}>
                        {item.name} {item.subType} {item.iataCode}
                      </div>
                    );
                  })}
              </div>
            )}
            <div>{dLocation}</div>
          </div>

          <div>
            <label>Depart</label>
            <input
              type="date"
              placeholder="YYYY-MM-DD"
              onChange={(e) => {
                setDepDate(e.target.value);
              }}
              value={depDate}
            ></input>
          </div>

          <div>
            <label> Return</label>
            <input
              className={styles.datePicker}
              type="date"
              placeholder="YYYY-MM-DD"
              onChange={(e) => {
                setRetDate(e.target.value);
              }}
              value={retDate}
            ></input>
          </div>
        </div>

        <button onClick={handleSearch}>Search flights</button>
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
        enableClick={enableClick}
        handleSearch={handleSearch}
        // saved={saved}
        // savedFlights={savedFlights}
      />
      {/* 
      <Favourites savedFlights={savedFlights} /> */}
    </>
  );
};

export default Display;

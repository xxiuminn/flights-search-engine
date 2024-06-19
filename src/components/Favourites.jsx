import React, { useState } from "react";
import styles from "./CheapestFlights.module.css";
import { useMutation } from "@tanstack/react-query";

const Favourites = (props) => {
  console.log(props.savedFlights);

  const [carrier, setCarrier] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [duration, setDuration] = useState("");
  const [stops, setStops] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [oneWay, setOneWay] = useState("");

  const addSave = async () => {
    const res = await fetch(import.meta.env.VITE_AIRTABLE, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_ATTOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              duration: duration,
              departure: departure,
              carrier: carrier,
              stops: stops,
              price: price,
              arrival: arrival,
              oneway: oneWay,
              currency: currency,
            },
          },
        ],
      }),
    });
    if (!res.ok) {
      throw new Error("add new users error");
    }
  };

  const mutation = useMutation({
    mutationFn: addSave,
    onSuccess: () => {
      queryClient.invalidateQueries(["saveflight"]);
    },
  });

  return (
    <>
      {/* <div className={styles.carrier}>
        {props.savedFlights[0].itineraries[0].segments[0].carrierCode}
      </div>
      <div className={styles.tofro}>
        {props.savedFlights[0].itineraries[0].segments[0].departure.at
          .split("T")[1]
          .slice(0, 5)}{" "}
        -{" "}
        {props.savedFlights[0].itineraries[0].segments[0].arrival.at
          .split("T")[1]
          .slice(0, 5)}
      </div>
      <div className={styles.duration}>
        {props.savedFlights[0].itineraries[0].duration.slice(2)}
      </div>
      <div className={styles.stops}>
        {props.savedFlights[0].itineraries[0].segments[0].numberOfStops}
      </div> */}
      <p>{JSON.stringify(props.savedFlights)}</p>
    </>
  );
};

export default Favourites;

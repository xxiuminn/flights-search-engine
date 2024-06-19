import { useMutation } from "@tanstack/react-query";
import styles from "./CheapestFlights.module.css";
import React, { useState } from "react";

const CheapestFlightsCard = (props) => {
  const { item, handleSave } = props;
  const [isSaved, setIsSaved] = useState(false);
  // const [carrier, setCarrier] = useState(props.savedFlights);
  const [carrier, setCarrier] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [duration, setDuration] = useState("");
  const [stops, setStops] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [oneWay, setOneWay] = useState("");

  console.log(props.savedFlights);

  const addSave = async () => {
    console.log("posting");
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
              //carrier is now an empty array. please fix.
              carrier: carrier,
              stops: stops,
              price: price,
              arrival: arrival,
              oneWay: oneWay,
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
      setIsSaved(!isSaved);
      // setCarrier(props.savedFlights);
      queryClient.invalidateQueries(["saveflight"]);
    },
  });

  // const clickSave = (item) => {
  //   // handleSave(item);
  //   setIsSaved(!isSaved);
  //   setCarrier(props.savedFlights);
  //   mutation.mutate;
  // };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.flightdetails}>
          <div className={styles.flight}>
            <div className={styles.carrier}>
              {item.itineraries[0].segments[0].carrierCode}
            </div>
            <div className={styles.tofro}>
              {item.itineraries[0].segments[0].departure.at
                .split("T")[1]
                .slice(0, 5)}{" "}
              -{" "}
              {item.itineraries[0].segments[0].arrival.at
                .split("T")[1]
                .slice(0, 5)}
            </div>
            <div className={styles.duration}>
              {item.itineraries[0].duration.slice(2)}
            </div>
            <div className={styles.stops}>
              {item.itineraries[0].segments[0].numberOfStops}
            </div>
          </div>
          <div className={styles.flight}>
            <div className={styles.carrier}>Airline</div>
            <div className={styles.from}>
              {props.oLocation} - {props.dLocation}
            </div>
            <div className={styles.duration}>Duration</div>
            <div className={styles.to}>Stops</div>
          </div>
        </div>
        <div className={styles.pricedetails}>
          <div>
            {item.price.currency} ${item.price.base}
          </div>
          <div>{item.price.oneWay ? "One Way" : "Round Trip"}</div>

          {!isSaved ? (
            <button
              className={styles.buttonSave}
              // onClick={() => clickSave(item)}
              onClick={mutation.mutate}
            >
              Save
            </button>
          ) : (
            <button
              className={styles.buttonSaved}
              // onClick={() => clickSave(item)}
              onClick={mutation.mutate}
            >
              Saved
            </button>
          )}
        </div>
      </div>
      <p>{JSON.stringify(props.savedFlights)}</p>
    </>
  );
};

export default CheapestFlightsCard;

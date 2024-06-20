import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./CheapestFlights.module.css";
import React, { useState } from "react";

const CheapestFlightsCard = (props) => {
  const queryClient = useQueryClient();
  const { item, oLocation, dLocation } = props;
  const [isSaved, setIsSaved] = useState(false);

  //add saved flights
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
              duration: item.itineraries[0].duration.slice(2),
              departure: item.itineraries[0].segments[0].departure.at
                .split("T")[1]
                .slice(0, 5),
              carrier: item.itineraries[0].segments[0].carrierCode,
              stops: `${item.itineraries[0].segments[0].numberOfStops}`,
              price: item.price.base,
              arrival: item.itineraries[0].segments[0].arrival.at
                .split("T")[1]
                .slice(0, 5),
              oneWay: `${item.oneWay}`,
              currency: item.price.currency,
              origin: item.itineraries[0].segments[0].departure.iataCode,
              destination: item.itineraries[0].segments[0].arrival.iataCode,
            },
          },
        ],
      }),
    });
    if (!res.ok) {
      throw new Error("error saving flights");
    }
  };

  const mutation = useMutation({
    mutationFn: addSave,
    onSuccess: () => {
      setIsSaved(!isSaved);
      queryClient.invalidateQueries(["saveflight"]);
    },
  });

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
              {item.itineraries[0].segments[0].departure.iataCode} -{" "}
              {item.itineraries[0].segments[0].arrival.iataCode}
            </div>
            <div className={styles.duration}>Duration</div>
            <div className={styles.to}>Stops</div>
          </div>
        </div>
        <div className={styles.pricedetails}>
          <div>
            {item.price.currency} ${item.price.base}
          </div>
          <div>{item.oneWay ? "One Way" : "Round Trip"}</div>

          {!isSaved ? (
            <button className={styles.buttonSave} onClick={mutation.mutate}>
              Save
            </button>
          ) : (
            <button
              className={styles.buttonSaved}
              // onClick={() => clickSave(item)}
              // onClick={mutation.mutate}
            >
              Saved
            </button>
          )}
          <p>{JSON.stringify(isSaved)}</p>
        </div>
      </div>
    </>
  );
};

export default CheapestFlightsCard;

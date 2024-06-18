import React, { useEffect, useState } from "react";
import Flight from "./Flight";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./CheapestFlights.module.css";

const CheapestFlights = (props) => {
  const queryClient = useQueryClient();
  const [data, setData] = useState([]);

  // let tempURL = `originLocationCode=${props.oLocation}&destinationLocationCode=${props.dLocation}&departureDate=${props.depDate}&returnDate=${props.retDate}&adults=${props.adults}&travelClass=${props.travelClass}&nonStop=${props.stops}&currencyCode=${props.currency}&max=5`;

  //fetch flight results
  let tempURL = `originLocationCode=${props.oLocation}&destinationLocationCode=${props.dLocation}&departureDate=${props.depDate}&returnDate=${props.retDate}&adults=${props.adults}&travelClass=${props.travelClass}&nonStop=${props.stops}&currencyCode=${props.currency}&max=10`;

  const fetchData = async () => {
    const res = await fetch(import.meta.env.VITE_BASEURL + tempURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
    });
    if (!res.ok) {
      throw new Error("fetch cheapest flights error");
    }
    const data = await res.json();
    setData(data.data);
    console.log(data.data);
    console.log(data);
    props.handleSearch();
    return data.data;
  };

  const query = useQuery({
    queryKey: ["cheapflights"],
    queryFn: fetchData,
    enabled: props.enableClick,
  });

  return (
    <div className={styles.searchResult}>
      {/* <h2>
        Cheapest Flights for {props.depDate} from {props.oLocation} to{" "}
        {props.dLocation}
      </h2> */}
      {query.isFetching && <p>loading...</p>}
      {query.isSuccess &&
        query.data.map((item) => {
          return (
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
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CheapestFlights;

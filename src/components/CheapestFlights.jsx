import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./CheapestFlights.module.css";
import CheapestFlightsCard from "./CheapestFlightsCard";

const CheapestFlights = (props) => {
  const queryClient = useQueryClient();
  const [data, setData] = useState([]);

  //fetch flight results
  const tempURL = `originLocationCode=${props.oLocation}&destinationLocationCode=${props.dLocation}&departureDate=${props.depDate}&returnDate=${props.retDate}&adults=${props.adults}&travelClass=${props.travelClass}&nonStop=${props.stops}&currencyCode=${props.currency}&max=10`;

  const fetchData = async () => {
    setData([]);
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
      {query.isFetching && <p>loading...</p>}
      {query.isSuccess &&
        data.map((item) => {
          return (
            <>
              <CheapestFlightsCard
                item={item}
                oLocation={props.oLocation}
                dLocation={props.dLocation}
              ></CheapestFlightsCard>
            </>
          );
        })}
    </div>
  );
};

export default CheapestFlights;

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import SavedCard from "./SavedCard";
import styles from "./CheapestFlights.module.css";

const Favourites = () => {
  // fetch saved flights
  const getSavedFlights = async () => {
    const res = await fetch(
      import.meta.env.VITE_AIRTABLE + "?maxRecords=100&view=Grid%20view",
      {
        headers: {
          Authorization: "Bearer " + import.meta.env.VITE_ATTOKEN,
        },
      }
    );
    if (!res.ok) {
      throw new Error("error fetching saved flights");
    }
    const data = await res.json();
    console.log(data.records);
    return data.records;
  };

  const savedFlightsQuery = useQuery({
    queryKey: ["savedflights"],
    queryFn: getSavedFlights,
  });

  return (
    savedFlightsQuery.isSuccess &&
    savedFlightsQuery.data.map((item) => {
      return (
        <SavedCard
          className={styles.container}
          item={item.fields}
          id={item.id}
        ></SavedCard>
      );
    })
  );
};

export default Favourites;

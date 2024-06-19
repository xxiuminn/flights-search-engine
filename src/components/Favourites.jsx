import { useQuery } from "@tanstack/react-query";
import React from "react";

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
    console.log(data);
    return data;
  };

  const savedFlightsQuery = useQuery({
    queryKey: ["savedflights"],
    queryFn: getSavedFlights,
  });

  return <div></div>;
};

export default Favourites;

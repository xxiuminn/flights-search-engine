import React, { useEffect, useState } from "react";
import Flight from "./Flight";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const CheapestFlights = (props) => {
  const queryClient = useQueryClient();
  const [data, setData] = useState([]);
  const [carriers, setCarriers] = useState([]);

  const [oLocation, setOLocation] = useState(props.oLocation);
  const [dLocation, setDLocation] = useState(props.dLocation);
  const [depDate, setDepDate] = useState(props.depDate);
  const [retDate, setRetDate] = useState(props.retDate);
  const [adults, setAdults] = useState(props.adults);
  const [travelClass, setTravelClass] = useState(props.travelClass);
  const [stops, setStops] = useState(props.stops);
  const [currency, setCurrency] = useState(props.currency);

  // let tempURL = `originLocationCode=${props.oLocation}&destinationLocationCode=${props.dLocation}&departureDate=${props.depDate}&returnDate=${props.retDate}&adults=${props.adults}&travelClass=${props.travelClass}&nonStop=${props.stops}&currencyCode=${props.currency}&max=5`;

  let tempURL = `originLocationCode=${oLocation}&destinationLocationCode=${dLocation}&departureDate=${depDate}&returnDate=${retDate}&adults=${adults}&travelClass=${travelClass}&nonStop=${stops}&currencyCode=${currency}&max=5`;

  const fetchData = async () => {
    // const res = await fetch(import.meta.env.VITE_BASEURL + tempURL, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${props.token}`,
    //   },
    // });
    // if (!res.ok) {
    //   throw new Error("fetch cheapest flights error");
    // }
    // const data = await res.json();
    // setData(data.data);
    // console.log(data.data);
    // console.log(data);
    // return data.data;
  };

  const query = useQuery({
    queryKey: ["cheapflights"],
    queryFn: fetchData,
  });

  // const fetchCarriers = async () => {
  //   const res = await fetch(import.meta.env.VITE_BASEURL + tempURL, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${props.token}`,
  //     },
  //   });
  //   if (!res.ok) {
  //     throw new Error("fetch error");
  //   }
  //   const data = await res.json();
  //   setCarriers(data.dictionaries.carriers);
  //   console.log(data.dictionaries.carriers);
  //   return data.dictionaries.carriers;
  // };

  // const dictionaries = useQuery({
  //   queryKey: ["carriers"],
  //   queryFn: fetchCarriers,
  // });

  return (
    <>
      <h2>
        Cheapest Flights for {depDate} from {oLocation} to {dLocation}
      </h2>
      {query.isFetching && <p>loading...</p>}
      {query.isSuccess &&
        query.data.map((item) => {
          return (
            <div>
              <br />
              <div>
                Carriers:
                {item.itineraries[0].segments[0].carrierCode}
              </div>
              <div>
                departure flight time:
                {item.itineraries[0].segments[0].departure.at.split("T")[1]}
              </div>
              <div>
                arrival flight time:
                {item.itineraries[0].segments[0].arrival.at.split("T")[1]}
              </div>
              <div>Duration:{item.itineraries[0].duration}</div>
              <div>
                Stops:
                {item.itineraries[0].segments[0].numberOfStops}
              </div>
              <div>
                Price: {item.price.currency}
                {item.price.base}
                {item.price.oneWay ? "One Way" : "Round Trip"}
              </div>
            </div>
          );
        })}
    </>
  );

  // return (
  //   <div className="container">
  //     <h2>Cheapest departing flights</h2>
  //     <Flight />
  //     <Flight />
  //     <Flight />
  //     <Flight />
  //     <Flight />
  //   </div>
  // );
};

export default CheapestFlights;

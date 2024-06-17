import React, { useState, useEffect } from "react";
// import CheapestFlights from "./CheapestFlights";

const FetchToken = () => {
  // let token;
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);

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
      let tokenData = await res.json();
      console.log(tokenData);
      setToken(tokenData.access_token);
      // token = tokenData.access_token;
      // fetchData(token);
    } catch (err) {
      console.log(err.message);
    }
  };

  // const fetchData = async () => {
  //   console.log(token);
  //   try {
  //     const response = await fetch(import.meta.env.VITE_SERVER, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error("fetch error");
  //     }

  //     console.log(response);
  //     const data = await response.json();
  //     console.log(data);
  //     setData(data.data);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  useEffect(() => {
    fetchToken();
    // if (token) {
    //   fetchData(token);
    // }
  }, []);

  return (
    <>
      {/* {data.map((item) => (
        <div>{JSON.stringify(item)}</div>
      ))} */}
    </>
  );
};

export default FetchToken;

// const Display = () => {
//   const [token, setToken] = useState(null);

//   const fetchToken = async () => {
//     const clientId = import.meta.env.VITE_ID;
//     const clientSecret = import.meta.env.VITE_SECRET;
//     const url = "https://test.api.amadeus.com/v1/security/oauth2/token";
//     const body = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;

//     try {
//       const res = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: body,
//       });

//       if (!res.ok) {
//         throw new Error("failed to fetch token");
//       }
//       const tokenData = await res.json();
//       // setToken(tokenData.access_token);
//       return tokenData.access_token;
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   const fetchData = async (token) => {
//     console.log(token);
//     try {
//       const response = await fetch(import.meta.env.VITE_SERVER, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) {
//         throw new Error("fetch error");
//       }
//       const data = await response.json();
//       console.log(data);
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   useEffect(() => {
//     const waitToken = async () => {
//       const token = await fetchToken();
//       if (token) {
//         setToken(token);
//         fetchData(token);
//       }
//     };
//     waitToken();
//   }, []);

//   return <></>;
// };

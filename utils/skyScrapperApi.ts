import axios from "axios";
import dayjs from "dayjs";


const API_HOST = "sky-scrapper.p.rapidapi.com";
const API_KEY = "21d2b62c88msh9ac863fe56f86f8p14aea5jsn16a7d6a0b73a";
const apiurl = 'https://sky-scrapper.p.rapidapi.com/api/v1/flights'
const apiurl2 = 'https://sky-scrapper.p.rapidapi.com/api/v2/flights'

const api = axios.create({
  baseURL: `https://${API_HOST}/api/v2/flights`,
  headers: {
      "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      "x-rapidapi-key": API_KEY
  },
});

export async function searchAirports(query: string) {

  const res = await fetch(`${apiurl}/searchAirport?query=${query}&locale=en-US`,{
    method: 'GET',
    headers: {
       "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      "x-rapidapi-key": API_KEY
    }
  })

  const data = await res.json();

  return data;
}

export async function searchFlights(origin: string, destination: string, departureDate: Date,people: any,cabin: string,returndate: Date,originEntityId: string,destinationEntityid: string) {

  try {
    const travelers = people.toString();
    const formatted = dayjs(departureDate).format("YYYY-MM-DD");
    const formattedReturndate = dayjs(returndate).format("YYYY-MM-DD")
    let cabinClass = '';

    if(cabin == 'Economy'){
        cabinClass = 'economy'
    }else if(cabin == 'Premium'){
        cabinClass = 'premium_economy'
    }else if(cabin == 'Business'){
        cabinClass = 'business'
    }else {
        cabinClass = 'first'
    }

    const res = await fetch(`${apiurl}/searchFlights?originSkyId=${origin}&destinationSkyId=${destination}&originEntityId=${originEntityId}&destinationEntityId=${destinationEntityid}&date=${formatted}&returnDate=${formattedReturndate}&cabinClass=${cabinClass}&adults=${travelers}&sortBy=best&currency=USD&market=en-US&countryCode=US`,{
        method: 'GET',
        headers: {
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
        "x-rapidapi-key": API_KEY
        }
    })

    const data = await res.json();
    return data;

  } catch (error: any) {
    console.error("SkyScrapper API error:", error.response?.data || error.message);
    throw error;
  }
}


export async function searchFlightEveryWhere (originEntityId: string){

    try {

    const res = await fetch(`${apiurl2}/searchFlightEverywhere?originEntityId=${originEntityId}&cabinClass=economy&journeyType=one_way&currency=USD`,{
        method: 'GET',
        headers: {
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
        "x-rapidapi-key": API_KEY
        }
    })

    const data = await res.json();
    return data;

  } catch (error: any) {
    console.error("SkyScrapper API error:", error.response?.data || error.message);
    throw error;
  }
}

export async function getFlightDetails(
  origin: string,
  destination: string,
  departureDate: Date,
  people: number,
  cabin: string
) {
  try {
    // Format date to YYYY-MM-DD
    const formattedDate = dayjs(departureDate).format("YYYY-MM-DD");

    // Map cabin names to API values
    let cabinClass = "economy";
    if (cabin === "Premium") cabinClass = "premium_economy";
    else if (cabin === "Business") cabinClass = "business";
    else if (cabin === "First") cabinClass = "first";

    // Build legs array and encode it for the query string
    const legs = encodeURIComponent(
      JSON.stringify([
        {
          origin: origin,          // e.g. "LAXA"
          destination: destination, // e.g. "LOND"
          date: formattedDate      // e.g. "2024-04-11"
        }
      ])
    );

    const url = `${apiurl}/getFlightDetails?legs=${legs}&adults=${people}&currency=USD&locale=en-US&market=en-US&cabinClass=${cabinClass}&countryCode=US`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
        "x-rapidapi-key": API_KEY,
      },
    });

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const data = await res.json();
    return data; // contains context, itineraries, carriers, etc.
  } catch (error: any) {
    console.error(
      "SkyScrapper getFlightDetails error:",
      error.response?.data || error.message
    );
    throw error;
  }
}

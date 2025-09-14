import axios from "axios";
import dayjs from "dayjs";


const API_HOST = "sky-scrapper.p.rapidapi.com";
const API_KEY = "7270243537msh0a1f21a8c1f9e1bp121397jsn58972ac544cd";
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

    

    const res = await fetch(`${apiurl2}/searchFlights?originSkyId=${origin}&destinationSkyId=${destination}&originEntityId=${originEntityId}&destinationEntityId=${destinationEntityid}&date=${formatted}&returnDate=${formattedReturndate}&cabinClass=${cabin}&adults=${travelers}&sortBy=best&currency=USD&market=en-US&countryCode=US`,{
         method: 'GET',
        headers: {
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
        "x-rapidapi-key": API_KEY
        }
    })

    const data = await res.json();
    console.log(data);

  } catch (error: any) {
    console.error("SkyScrapper API error:", error.response?.data || error.message);
    throw error;
  }
}


export default api;

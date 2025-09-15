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

    // console.log(origin)
    // console.log(destination)
    // console.log(formatted)
    // console.log(formattedReturndate)
    // console.log(originEntityId)
    // console.log(destinationEntityid)

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

import React, { useState, useEffect } from "react";
import ServiceDetailCard from "../card-details/ServiceDetailCard";
import { useLocation } from "react-router-dom";
import hotel from "../assets/hotel.png";
import Header from "../common-components/Header";
import axios from "axios";
import { toast } from "react-toastify";

function HotelPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userLocation = params.get("location") || "Haridwar";
  const userBudget = params.get("budget") || "5000";

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [hotelNames, setHotelNames] = useState([]);
  const [hotesDesc, setHotelDesc] = useState([]);
  const [hotelPriceRange , setHotelPriceRange] = useState([]);
  const [hotelRating , setHotelRating] = useState([]);
  const [hotelImages, setHotelImages] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.post(
          `${baseUrl}/hotel/name`,
          { city: userLocation, budget: userBudget },
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.status === 200) {
          const data = JSON.parse(response.data.body);
          if (data.hotels && Array.isArray(data.hotels)) {
            setHotelNames(data.hotels);
          } else {
            console.error("Invalid hotel data format:", data);
          }
        } else {
          toast.error("Hotels not found");
        }
      } catch (error) {
        console.error("Error fetching hotels:", error);
        toast.error("Error. Please try again");
      }
    };

    fetchHotels();
  }, [userLocation, userBudget]);

  useEffect(() => {
    const fetch = async () =>{
      if (hotelNames.length === 0) return;
      try {
        for(let i = 0 ; i < hotelNames.length ; i++){
          const responseDesc = await axios.get(`${baseUrl}/hotel/description/${hotelNames[i]} ${userLocation}`);
          const responsePriceRange = await axios.get(`${baseUrl}/hotel/price/${hotelNames[i]} ${userLocation} under ${userBudget}`);
          const responseRating = await axios.get(`${baseUrl}/hotel/rating/${hotelNames[i]} ${userLocation}`);
          if (responseDesc.status === 200 ){
            setHotelDesc((prev) => [...prev, responseDesc.data.body.body]);
          }
          if (responsePriceRange.status === 200 ){
            setHotelPriceRange((prev) => [...prev, responsePriceRange.data.body]);
          }
          if (responseRating.status === 200 ){
            setHotelRating((prev) => [...prev, responseRating.data.body]);
          }
        }  
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  },[hotelNames])

  /*** Fetch Hotel Descriptions ***/
  /*
  useEffect(() => {
    if (hotelNames.length === 0) return;

    const fetchDescriptions = async () => {
      try {
        const descriptions = await Promise.all(
          hotelNames.map(async (hotel) => {
            try {
              const response = await axios.get(
                `http://tomcat.localhost:8080/hotel/description/${hotel} ${userLocation}`
              );
              return response.status === 200 ? response.data.body.body : "No description available";
            } catch {
              return "No description available";
            }
          })
        );
        setHotelDesc(descriptions);
      } catch (error) {
        console.error("Error fetching hotel descriptions:", error);
        toast.error("Error fetching descriptions.");
      }
    };

    fetchDescriptions();
  }, [hotelNames]);

  /*** Fetch Hotel Prices ***/
  /*
  useEffect(() => {
    if (hotelDesc.length === 0) return;

    const fetchPrices = async () => {
      try {
        const prices = await Promise.all(
          hotelNames.map(async (hotel) => {
            try {
              const response = await axios.get(
                `http://tomcat.localhost:8080/hotel/price/${hotel} ${userLocation} under ${userBudget}`
              );
              console.log(response.data.body)
              return response.status === 200 ? response.data.body : "No price available";
            } catch {
              return "No price available";
            }
          })
        );
        setHotelPriceRange(prices);
      } catch (error) {
        console.error("Error fetching hotel prices:", error);
        toast.error("Error fetching prices.");
      }
    };

    fetchPrices();
  }, [hotelDesc]);

  /*** Fetch Hotel Ratings ***/
  /*
  useEffect(() => {
    if (hotelPriceRange.length === 0) return;

    const fetchRatings = async () => {
      try {
        const ratings = await Promise.all(
          hotelNames.map(async (hotel) => {
            try {
              const response = await axios.get(
                `http://tomcat.localhost:8080/hotel/rating/${hotel} ${userLocation}`
              );
              console.log(response.data.body)
              return response.status === 200 ? response.data.body : "No rating available";
            } catch {
              return "No rating available";
            }
          })
        );
        setHotelRating(ratings);
      } catch (error) {
        console.error("Error fetching hotel ratings:", error);
        toast.error("Error fetching ratings.");
      }
    };

    fetchRatings();
  }, [hotelPriceRange]);

  /*** Fetch Hotel Images ***/
  useEffect(() => {
    if (hotelNames.length === 0) return;

    const fetchImages = async () => {
      try {
        const imagesArray = await Promise.all(
          hotelNames.map(async (hotel) => {
            try {
              const response = await axios.get(
                `${baseUrl}/ai/image-search?query=${hotel} ${userLocation}`
              );
              return response.status === 200 && response.data.length
                ? response.data
                : [logo2, logo2, logo2];
            } catch {
              return [logo2, logo2, logo2];
            }
          })
        );
        setHotelImages(imagesArray);
      } catch (error) {
        console.error("Error fetching images:", error);
        toast.error("Error fetching images.");
      }
    };

    fetchImages();
  }, [hotelNames]);

  return (
    <div>
        <Header/>
        <div className="px-6">
        <h1 className="text-center text-3xl font-bold my-6 text-blue-500">HOTEL SERVICE</h1>
        <ServiceDetailCard title={hotelNames[0] || "Hotel 1"}
        images={hotelImages[0] || [hotel, hotel, hotel]} 
        description={hotesDesc[0] || "No description available"}
        location={userLocation}
        mapLocation={hotelNames[0]+" "+userLocation}
        price={hotelPriceRange[0] || "No price range available"}
        rating={hotelRating[0] || "No Rating available."}/>

        <ServiceDetailCard title={hotelNames[1] || "Hotel 2"}
        images={hotelImages[1] || [hotel, hotel, hotel]}
        description={hotesDesc[1] || "No description available"}
        location={userLocation}
        mapLocation={hotelNames[1]+" "+userLocation}
        price={hotelPriceRange[1] || "No price range available"}
        rating={hotelRating[1] || "No Rating available."}/>

        <ServiceDetailCard title={hotelNames[2] || "Hotel 3"}
        images={hotelImages[2] || [hotel, hotel, hotel]}
        description={hotesDesc[2] || "No description available"}
        location={userLocation}
        mapLocation={hotelNames[2]+" "+userLocation}
        price={hotelPriceRange[2] || "No price range available"}
        rating={hotelRating[2] || "No Rating available."}/>

        <ServiceDetailCard title={hotelNames[3] || "Hotel 4"}
        images={hotelImages[3] || [hotel, hotel, hotel]}
        description={hotesDesc[3] || "No description available"}
        location={userLocation}
        mapLocation={hotelNames[3]+" "+userLocation}
        price={hotelPriceRange[3] || "No price range available"}
        rating={hotelRating[3] || "No Rating available."}/>

        <ServiceDetailCard title={hotelNames[4] || "Hotel 5"}
        images={hotelImages[4] || [hotel, hotel, hotel]}
        description={hotesDesc[4] || "No description available"}
        location={userLocation}
        mapLocation={hotelNames[4]+" "+userLocation}
        price={hotelPriceRange[4] || "No price range available"}
        rating={hotelRating[4] || "No Rating available."}/>

        <ServiceDetailCard title={hotelNames[5] || "Hotel 6"}
        images={hotelImages[5] || [hotel, hotel, hotel]}
        description={hotesDesc[5] || "No description available"}
        location={userLocation}
        mapLocation={hotelNames[5]+" "+userLocation}
        price={hotelPriceRange[5] || "No price range available"}
        rating={hotelRating[5] || "No Rating available."}/>

        <ServiceDetailCard title={hotelNames[6] || "Hotel 7"}
        images={hotelImages[6] || [hotel, hotel, hotel]}
        description={hotesDesc[6] || "No description available"}
        location={userLocation}
        mapLocation={hotelNames[6]+" "+userLocation}
        price={hotelPriceRange[6] || "No price range available"}
        rating={hotelRating[6] || "No Rating available."}/>

        <ServiceDetailCard title={hotelNames[7] || "Hotel 8"}
        images={hotelImages[7] || [hotel, hotel, hotel]}
        description={hotesDesc[7] || "No description available"}
        location={userLocation}
        mapLocation={hotelNames[7]+" "+userLocation}
        price={hotelPriceRange[7] || "No price range available"}
        rating={hotelRating[7] || "No Rating available."}/>

        <ServiceDetailCard title={hotelNames[8] || "Hotel 9"}
        images={hotelImages[8] || [hotel, hotel, hotel]}
        description={hotesDesc[8] || "No description available"}
        location={userLocation}
        mapLocation={hotelNames[8]+" "+userLocation}
        price={hotelPriceRange[8] || "No price range available"}
        rating={hotelRating[8] || "No Rating available."}/>

        <ServiceDetailCard title={hotelNames[9] || "Hotel 10"}
        images={hotelImages[9] || [hotel, hotel, hotel]}
        description={hotesDesc[9] || "No description available"}
        location={userLocation}
        mapLocation={hotelNames[9]+" "+userLocation}
        price={hotelPriceRange[9] || "No price range available"}
        rating={hotelRating[9] || "No Rating available."}/>
        {/* <Footer/> */}
        </div>
    </div>
)
}

export default HotelPage
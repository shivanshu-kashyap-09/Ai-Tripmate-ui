import React, { useState, useEffect } from "react";
import ServiceDetailCard from "../card-details/ServiceDetailCard";
import { useLocation } from "react-router-dom";
import hotel from "../assets/hotel.png";
import axios from "axios";
import { toast } from "react-toastify";

function HotelPage() {

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const userLocation = params.get("location") || "Haridwar";
  const userBudget = params.get("budget") || "5000";

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [hotelDetails, setHotelDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.post(`${baseUrl}/hotel/details`, {
          city: useLocation, budget: userBudget
        }, { headers: { "Content-Type": "application/json" } }
        );
        if (response.status === 200)
          setHotelDetails(response.data);
      } catch (error) {
        toast.error("Error occured in fetch details : ", e);
      }
    }
    fetchDetails();
  }, [userLocation, userBudget]);

  // useEffect(() => {
  //   if (hotelNames.length === 0) return;

  //   const fetchImages = async () => {
  //     try {
  //       const imagesArray = await Promise.all(
  //         hotelNames.map(async (hotel) => {
  //           try {
  //             const response = await axios.get(
  //               `${baseUrl}/ai/image-search?query=${hotel} ${userLocation}`
  //             );
  //             return response.status === 200 && response.data.length
  //               ? response.data
  //               : [logo2, logo2, logo2];
  //           } catch {
  //             return [logo2, logo2, logo2];
  //           }
  //         })
  //       );
  //       setHotelImages(imagesArray);
  //     } catch (error) {
  //       console.error("Error fetching images:", error);
  //       toast.error("Error fetching images.");
  //     }
  //   };

  //   fetchImages();
  // }, [hotelNames]);

  return (
    <div>
      <div className="px-6">
        <h1 className="text-center text-3xl font-bold my-6 text-blue-500">HOTEL SERVICE</h1>

        {hotelDetails.length > 0 ? (

          hotelDetails.map((hotelDetail, index) => (
            <div key={index}>
              <ServiceDetailCard
                title={hotelDetail.exploreName || "Hotel"}
                images={hotelDetail.image}
                description={hotelDetail.description || "No description available"}
                location={userLocation}
                mapLocation={`${hotelDetail.exploreName} ${userLocation}`}
                price={hotelDetail.priceRange || "No price range available"}
                rating={hotelDetail.rating || "No Rating available."}
              />
            </div>
          ))
        ) : (
          <ServiceDetailCard title={"Hotel"}
            images={hotel}
            description={"No description available"}
            location={userLocation}
            mapLocation={userLocation}
            price={"No price range available"}
            rating={"No Rating available."} />

        )}
      </div>
    </div>
  )
}

export default HotelPage
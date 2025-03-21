import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ServiceDetailCard from '../card-details/ServiceDetailCard'
import restaurant from '../assets/restaurant.jpg'
import axios from "axios"
import { toast } from 'react-toastify'


function RestaurantService() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userLocation = params.get("location") || "Haridwar";
  const userBudget = params.get("budget") || "2000";

  const [restaurantDetails, setRestaurantDetails] = useState([]);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.post(`${baseUrl}/resturent/details`, {
          city: userLocation, budget: userBudget
        }, {
          headers: { "Content-Type": "application/json" }
        });
        if (response.status === 200)
          setRestaurantDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, [userLocation, userBudget]);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const imagesArray = [];
  //       for (let i = 0; i < restaurantName.length; i++) {
  //         const response = await axios.get(`${baseUrl}/ai/image-search?query=${restaurantName[i]}" "${userLocation}`);
  //         if (response.status === 200 && response.data.length) {
  //           imagesArray.push(response.data);
  //         } else {
  //           imagesArray.push([logo2, logo2, logo2]);
  //         }
  //       }
  //       setRestaurantImage(imagesArray);
  //     } catch (error) {
  //       console.log(error);
  //       toast.error("Error!!");
  //     }
  //   }
  //   fetchImages();
  // }, [restaurantName]);

  return (
    <div>
      <div className="px-6">
        <h1 className="text-center text-3xl font-bold my-6 text-blue-500">RESTAURANT SERVICE</h1>

        {restaurantDetails.length > 0 ? (
          restaurantDetails.map((restaurnatDetail, index) => (
            <div key={index}>
              <ServiceDetailCard
                title={restaurnatDetail.exploreName || "restaurant"}
                images={restaurant}
                description={restaurnatDetail.description || "No description available"}
                location={userLocation}
                mapLocation={`${restaurnatDetail.exploreName} ${userLocation}`}
                price={restaurnatDetail.priceRange || "No price range available"}
                rating={restaurnatDetail.rating || "No Rating available."}
              />
            </div>
          ))
        ) : (
          <ServiceDetailCard title={"restaurant"}
          images={restaurant}
          description={"No description available"}
          location={userLocation}
          mapLocation={userLocation}
          price={"No price range available"}
          rating={"No Rating available."} />
        )};
      </div>
    </div>
  )
}

export default RestaurantService
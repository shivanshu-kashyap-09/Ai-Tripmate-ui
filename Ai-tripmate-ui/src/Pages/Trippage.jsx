import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ServiceDetailCard from "../card-details/ServiceDetailCard";
import { useLocation } from "react-router-dom";
import trip from "../assets/trip.png";

function TripPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userLocation = params.get("location") || "Haridwar";
  const userBudget = params.get("budget") || "5000";
  const userPeople = params.get("people") || "5";
  const userDays = params.get("days") || "5";

  const [tripDetails, setTripDetails] = useState([]);

  const [locationName, setLocationName] = useState([]);
  const [locationDesc, setLocationDesc] = useState([]);
  const [visitPrice, setVisitPrice] = useState([]);
  const [locationRating, setLocationRating] = useState([]);
  const [locationImage, setLocationImage] = useState([]);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.post(`${baseUrl}/trip/details`, {
          city: userLocation, budget: userBudget, days: userDays, person: userPeople
        }, { headers: { "Content-Type": "application/json" } }
        );
        if (response.status === 200)
          setTripDetails(response.data);
      } catch (error) {
        toast.error("Error occured in fetch details : ", e);
      }
    }
    fetchDetails();
  }, []);

  /*** Fetch places Names ***/
  // useEffect(() => {
  //   const fetchPlaces = async () => {
  //     try {
  //       const response = await axios.post(
  //         `${baseUrl}/trip/location`,
  //         { city: userLocation, budget: userBudget, days: userDays, person: userPeople },
  //         { headers: { "Content-Type": "application/json" } }
  //       );

  //       if (response.status === 200) {
  //         const data = JSON.parse(response.data.body);
  //         if (data.placesNames && Array.isArray(data.placesNames)) {
  //           setLocationName(data.placesNames);
  //         } else {
  //           console.error("Invalid places data format:", data);
  //         }
  //       } else {
  //         toast.error("Places not found");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching places:", error);
  //       toast.error("Error. Please try again");
  //     }
  //   };

  //   fetchPlaces();
  // }, []);

  // /*** Fetch additional place details ***/
  // useEffect(() => {
  //   if (locationName.length === 0) return;

  //   const fetchDetails = async () => {
  //     try {
  //       const descArray = [];
  //       const priceArray = [];
  //       const ratingArray = [];

  //       for (let i = 0; i < locationName.length; i++) {
  //         const loc = locationName[i]; // Fix the undefined variable issue

  //         const responseDesc = await axios.get(`${baseUrl}/trip/description/${loc} ${userLocation}`);
  //         const responsePrice = await axios.get(`${baseUrl}/trip/explore/budget/${loc} ${userLocation} under ${userBudget}`);
  //         const responseRating = await axios.get(`${baseUrl}/trip/rating/${loc} ${userLocation}`);

  //         descArray.push(responseDesc.status === 200 ? responseDesc.data.body.body : "No description available");
  //         priceArray.push(responsePrice.status === 200 ? responsePrice.data.body.body : "No price available");
  //         ratingArray.push(responseRating.status === 200 ? responseRating.data.body.body : "No rating available");
  //       }

  //       setLocationDesc(descArray);
  //       setVisitPrice(priceArray);
  //       setLocationRating(ratingArray);
  //     } catch (error) {
  //       console.error("Error fetching details:", error);
  //     }
  //   };

  //   fetchDetails();
  // }, [locationName]);

  // /*** Fetch places Images ***/
  // useEffect(() => {
  //   if (locationName.length === 0) return;

  //   const fetchImages = async () => {
  //     try {
  //       const imagesArray = await Promise.all(
  //         locationName.map(async (loc) => {
  //           try {
  //             const response = await axios.get(`${baseUrl}/ai/image-search?query=${loc} ${userLocation}`);
  //             return response.status === 200 && response.data.length ? response.data : [logo2];
  //           } catch {
  //             return [logo2];
  //           }
  //         })
  //       );
  //       setLocationImage(imagesArray);
  //     } catch (error) {
  //       console.error("Error fetching images:", error);
  //       toast.error("Error fetching images.");
  //     }
  //   };

  //   fetchImages();
  // }, [locationName]);

  return (
    <div>
      <div className="px-6">
        <h1 className="text-center text-3xl font-bold my-6 text-blue-500">
          TRIP SERVICE</h1>
        {tripDetails.length > 0 ? (

          tripDetails.map((tripDetail, index) => (
            <div key={index}>
              <ServiceDetailCard
                title={tripDetail.exploreName || "Hotel"}
                images={tripDetail.image}
                description={tripDetail.description || "No description available"}
                location={userLocation}
                mapLocation={`${tripDetail.exploreName} ${userLocation}`}
                price={tripDetail.priceRange || "No price range available"}
                rating={tripDetail.rating || "No Rating available."}
              />
            </div>
          ))
        ) : (
          <ServiceDetailCard title={"Location"}
            images={trip}
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


export default TripPage
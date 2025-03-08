import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ServiceDetailCard from "../card-details/ServiceDetailCard";
import { useLocation } from "react-router-dom";
import trip from "../assets/trip.png";

function TripPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userLocation = params.get("location") || "Unknown Location";
  const userBudget = params.get("budget") && params.get("budget") !== "N/A"
    ? params.get("budget")
    : "1000"; // Default budget to prevent errors
  const userPeople = params.get("people") || "N/A";
  const userDays = params.get("days") || "N/A";

  const [locationName, setLocationName] = useState([]);
  const [locationDesc, setLocationDesc] = useState([]);
  const [visitPrice, setVisitPrice] = useState([]);
  const [locationRating, setLocationRating] = useState([]);
  const [locationImage, setLocationImage] = useState([]);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  /*** Fetch places Names ***/
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.post(
          `${baseUrl}/trip/location`,
          { city: userLocation, budget: userBudget, days: userDays, person: userPeople },
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.status === 200) {
          const data = JSON.parse(response.data.body);
          if (data.places && Array.isArray(data.places)) {
            setLocationName(data.places);
          } else {
            console.error("Invalid places data format:", data);
          }
        } else {
          toast.error("Places not found");
        }
      } catch (error) {
        console.error("Error fetching places:", error);
        toast.error("Error. Please try again");
      }
    };

    fetchPlaces();
  }, []);

  /*** Fetch additional place details ***/
  useEffect(() => {
    if (locationName.length === 0) return;

    const fetchDetails = async () => {
      try {
        const descArray = [];
        const priceArray = [];
        const ratingArray = [];

        for (let i = 0; i < locationName.length; i++) {
          const loc = locationName[i]; // Fix the undefined variable issue

          const responseDesc = await axios.get(`${baseUrl}/trip/description/${loc} ${userLocation}`);
          const responsePrice = await axios.get(`${baseUrl}/trip/explore/budget/${loc} ${userLocation} under ${userBudget}`);
          const responseRating = await axios.get(`${baseUrl}/trip/rating/${loc} ${userLocation}`);

          descArray.push(responseDesc.status === 200 ? responseDesc.data.body.body : "No description available");
          priceArray.push(responsePrice.status === 200 ? responsePrice.data.body.body : "No price available");
          ratingArray.push(responseRating.status === 200 ? responseRating.data.body.body : "No rating available");
        }

        setLocationDesc(descArray);
        setVisitPrice(priceArray);
        setLocationRating(ratingArray);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchDetails();
  }, [locationName]);

  /*** Fetch places Images ***/
  useEffect(() => {
    if (locationName.length === 0) return;

    const fetchImages = async () => {
      try {
        const imagesArray = await Promise.all(
          locationName.map(async (loc) => {
            try {
              const response = await axios.get(`${baseUrl}/ai/image-search?query=${loc} ${userLocation}`);
              return response.status === 200 && response.data.length ? response.data : [logo2];
            } catch {
              return [logo2];
            }
          })
        );
        setLocationImage(imagesArray);
      } catch (error) {
        console.error("Error fetching images:", error);
        toast.error("Error fetching images.");
      }
    };

    fetchImages();
  }, [locationName]);

  return (
    <div>
      <div className="px-6">
        <h1 className="text-center text-3xl font-bold my-6 text-blue-500">
                  TRIP SERVICE</h1>
        <ServiceDetailCard title={locationName[0] || "place 1"}
          images={locationImage[0] || [trip, trip, trip]}
          description={locationDesc[0] || "No description available"}
          location={userLocation}
          mapLocation={locationName[0] + " " + userLocation}
          price={visitPrice[0] || "No price range available"}
          rating={locationRating[0] || "No Rating available."} />

        <ServiceDetailCard title={locationName[1] || "place 2"}
          images={locationImage[1] || [trip, trip, trip]}
          description={locationDesc[1] || "No description available"}
          location={userLocation}
          mapLocation={locationName[1] + " " + userLocation}
          price={visitPrice[1] || "No price range available"}
          rating={locationRating[1] || "No Rating available."} />

        <ServiceDetailCard title={locationName[2] || "place 3"}
          images={locationImage[2] || [trip, trip, trip]}
          description={locationDesc[2] || "No description available"}
          location={userLocation}
          mapLocation={locationName[2] + " " + userLocation}
          price={visitPrice[2] || "No price range available"}
          rating={locationRating[2] || "No Rating available."} />

        <ServiceDetailCard title={locationName[3] || "place 4"}
          images={locationImage[3] || [trip, trip, trip]}
          description={locationDesc[3] || "No description available"}
          location={userLocation}
          mapLocation={locationName[3] + " " + userLocation}
          price={visitPrice[3] || "No price range available"}
          rating={locationRating[3] || "No Rating available."} />

        <ServiceDetailCard title={locationName[4] || "place 5"}
          images={locationImage[4] || [trip, trip, trip]}
          description={locationDesc[4] || "No description available"}
          location={userLocation}
          mapLocation={locationName[4] + " " + userLocation}
          price={visitPrice[4] || "No price range available"}
          rating={locationRating[4] || "No Rating available."} />

        <ServiceDetailCard title={locationName[5] || "place 6"}
          images={locationImage[5] || [trip, trip, trip]}
          description={locationDesc[5] || "No description available"}
          location={userLocation}
          mapLocation={locationName[5] + " " + userLocation}
          price={visitPrice[5] || "No price range available"}
          rating={locationRating[5] || "No Rating available."} />

        <ServiceDetailCard title={locationName[6] || "place 7"}
          images={locationImage[6] || [trip, trip, trip]}
          description={locationDesc[6] || "No description available"}
          location={userLocation}
          mapLocation={locationName[6] + " " + userLocation}
          price={visitPrice[6] || "No price range available"}
          rating={locationRating[6] || "No Rating available."} />

        <ServiceDetailCard title={locationName[7] || "place 8"}
          images={locationImage[7] || [trip, trip, trip]}
          description={locationDesc[7] || "No description available"}
          location={userLocation}
          mapLocation={locationName[7] + " " + userLocation}
          price={visitPrice[7] || "No price range available"}
          rating={locationRating[7] || "No Rating available."} />

        <ServiceDetailCard title={locationName[8] || "place 9"}
          images={locationImage[8] || [trip, trip, trip]}
          description={locationDesc[8] || "No description available"}
          location={userLocation}
          mapLocation={locationName[8] + " " + userLocation}
          price={visitPrice[8] || "No price range available"}
          rating={locationRating[8] || "No Rating available."} />

        <ServiceDetailCard title={locationName[9] || "place 10"}
          images={locationImage[9] || [trip, trip, trip]}
          description={locationDesc[9] || "No description available"}
          location={userLocation}
          mapLocation={locationName[9] + " " + userLocation}
          price={visitPrice[9] || "No price range available"}
          rating={locationRating[9] || "No Rating available."} />
      </div>
    </div>
  );
}


export default TripPage
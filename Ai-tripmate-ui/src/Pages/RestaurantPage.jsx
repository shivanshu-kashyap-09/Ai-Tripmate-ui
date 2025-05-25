import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ServiceDetailCard from '../card-details/ServiceDetailCard';
import restaurant from '../assets/Restaurant.jpg';
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

function RestaurantService() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userLocation = params.get("destination") || params.get("to") || "Haridwar";
  const userBudget = params.get("budget") || params.get("budget") || "2000";

  const [restaurantDetails, setRestaurantDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${baseUrl}/resturent/details`, {
          city: userLocation,
          budget: userBudget,
        }, {
          headers: { "Content-Type": "application/json" }
        });

        if (response.status === 200 && Array.isArray(response.data)) {
          setRestaurantDetails(response.data);
        } else {
          setRestaurantDetails([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [userLocation, userBudget]);

  return (
    <div className="px-6">
      <h1 className="text-center text-3xl font-bold my-6 text-blue-500">
        RESTAURANT SERVICE
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <FaSpinner className="animate-spin text-3xl text-blue-600" />
          <p className="ml-2 text-lg">Fetching restaurant details...</p>
        </div>
      ) : restaurantDetails.length > 0 ? (
        restaurantDetails.map((restaurnatDetail, index) => (
          <div key={index} className="mb-4">
            <ServiceDetailCard
              title={restaurnatDetail.restaurantName || "restaurant"}
              images={restaurnatDetail.restaurantImage || restaurant}
              description={restaurnatDetail.restaurantDescription || "No description available"}
              location={userLocation}
              mapLocation={`${restaurnatDetail.restaurantName} ${userLocation}`}
              price={restaurnatDetail.restaurantPrice || "No price range available"}
              rating={restaurnatDetail.restaurantRating || "No Rating available."}
            />
          </div>
        ))
      ) : (
        <ServiceDetailCard
          title={"restaurant"}
          images={restaurant}
          description={"No description available"}
          location={userLocation}
          mapLocation={userLocation}
          price={"No price range available"}
          rating={"No Rating available."}
        />
      )}
    </div>
  );
}

export default RestaurantService;

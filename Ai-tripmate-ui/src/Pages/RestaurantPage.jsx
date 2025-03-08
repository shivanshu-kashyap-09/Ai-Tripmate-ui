import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ServiceDetailCard from '../card-details/ServiceDetailCard'
import restaurant from '../assets/restaurant.jpg'
import Header from '../common-components/Header'
import Footer from '../common-components/Footer'
import axios from "axios"
import { toast } from 'react-toastify'


function RestaurantService() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userLocation = params.get("location") || "Unknown Location";
  const userBudget = params.get("budget") || "N/A";
  const [restaurantName , setRestaurantName] = useState([]);
  const [restaurantPriceRange , setRestaurantPriceRange] = useState([]);
  const [restaurantDesc , setRestaurantDesc] = useState([]);
  const [restaurantImage , setRestaurantImage] = useState([]);
  const [restaurantRating , setRestaurantRating] = useState([]);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await axios.post(`${baseUrl}/resturent/name`,
          { city: userLocation, budget: userBudget },
          {
            headers: { "Content-Type": "application/json" },
          });
          if (response.status === 200) {
            const data = JSON.parse(response.data.body);
            if (data.restaurant && Array.isArray(data.restaurant)) {
              setRestaurantName(data.restaurant);
            } else {
              console.error("Invalid hotel data format:", data);
            }
            } else {
             toast.error("Hotels not found");
            }
      } catch (error) {
        consoole.log(error);
        toast.error("Error!!");
      }
    }
    fetchName();
  }, [userLocation , userBudget]);

  useEffect(() => {
    if(restaurantName.length == 0) return;
    const fetch = async () => {
      try {
        for(let i = 0 ; i < restaurantName.length ; i++){
          const responseDesc = await axios.get(`${baseUrl}/resturent/description/${restaurantName[i]}" "${userLocation}`);
        const responsePriceRange = await axios.get(`${baseUrl}/resturent/price/${restaurantName[i]}" "${userLocation} under ${userBudget}`);
        const responseRating = await axios.get(`${baseUrl}/resturent/rating/${restaurantName[i]}" "${userLocation}`);
        if(responseDesc.status == 200){
          setRestaurantDesc((prev) => [...prev , responseDesc.data.body.body])
        }
        if(responsePriceRange.status == 200){
          setRestaurantPriceRange((prev) => [...prev , responsePriceRange.data.body.body])
        }
        if(responseRating.status == 200){
          setRestaurantRating((prev) => [...prev , responseRating.data.body.body])
          }
        }
        
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  } , [restaurantName])
/*
  useEffect(() => {
    if(restaurantName.length == 0) return;
    const fetchDesc = async () => {
      try {
        for(let i = 0 ; i < restaurantName.length; i++) {
          const response = await axios.get(`http://tomcat.localhost:8080/resturent/description/${restaurantName[i]}" "${userLocation}`)

          if (response.status === 200) {
            setRestaurantDesc((prev) => [...prev, response.data.body.body]);
          }else{
            setRestaurantDesc((prev) => [...prev, "No description available."]);;
          }
        }
      } catch (error) {
        
      }
    }
    fetchDesc();
  },[restaurantName]);

  useEffect(() => {
    if(restaurantDesc.length == 0) return;
    const fetchPrice = async () => {
      try {
        for(let i = 0 ; i < restaurantName.length; i++) {
          const response = await axios.get(`http://tomcat.localhost:8080/resturent/price/${restaurantName[i]}" "${userLocation}`)
          if(response.status === 200){
            setRestaurantPriceRange((prev) => [...prev, response.data.body.body]);
          }else{
            setRestaurantPriceRange((prev) => [...prev, "No price available."]);
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Error!!");
      }
    }
    fetchPrice();
  },[restaurantDesc]);

  useEffect(() => {
    if(restaurantPriceRange.length == 0) return;
    const fetchRating = async () => {
      try {
        for(let i = 0 ; i < restaurantName.length; i++) {
          const response = await axios.get(`http://tomcat.localhost:8080/resturent/rating/${restaurantName[i]}" "${userLocation}`);
          if(response.status === 200){
            setRestaurantRating((prev) => [...prev, response.data.body.body]);
          }else{
            setRestaurantRating((prev) => [...prev, "No rating available."]);
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Error!!");
      }
    }
    fetchRating();
  }, [restaurantPriceRange]);
  */

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesArray = [];
        for(let i = 0 ; i < restaurantName.length; i++) {
          const response = await axios.get(`${baseUrl}/ai/image-search?query=${restaurantName[i]}" "${userLocation}`);
          if (response.status === 200 && response.data.length) {
            imagesArray.push(response.data); 
          } else {
            imagesArray.push([logo2, logo2, logo2]); 
          }
        }
        setRestaurantImage(imagesArray);
      } catch (error) {
        console.log(error);
        toast.error("Error!!");
      }
    }
    fetchImages();
  } , [restaurantName]);

  return (
        <div>
          <Header />
          <div className="mt-20 px-6">
          <h1 className="text-center text-3xl font-bold my-6">restaurant on {userLocation}</h1>
          <ServiceDetailCard title={restaurantName[0] || "Restaurant is not available"}
          images={restaurantImage[0] || [restaurant, restaurant, restaurant]} 
          description={restaurantDesc[0] || "description is not available"}
          location={userLocation}
          mapLocation={restaurantName[0]+" "+userLocation}
          price={restaurantPriceRange[0] || "price is not available"}
          rating={restaurantRating[0] || "Rating is not available"}/>

          <ServiceDetailCard title={restaurantName[1] || "Restaurant is not available"}
          images={restaurantImage[1] || [restaurant, restaurant, restaurant]} 
          description={restaurantDesc[1] || "description is not available"}
          location={userLocation}
          mapLocation={restaurantName[1]+" "+userLocation}
          price={restaurantPriceRange[1] || "price is not available"}
          rating={restaurantRating[1] || "Rating is not available"}/>

          <ServiceDetailCard title={restaurantName[2] || "Restaurant is not available"}
          images={restaurantImage[2] || [restaurant, restaurant, restaurant]} 
          description={restaurantDesc[2] || "description is not available"}
          location={userLocation}
          mapLocation={restaurantName[2]+" "+userLocation}
          price={restaurantPriceRange[2] || "price is not available"}
          rating={restaurantRating[2] || "Rating is not available"}/>
        
        <ServiceDetailCard title={restaurantName[3] || "Restaurant is not available"}
          images={restaurantImage[3] || [restaurant, restaurant, restaurant]} 
          description={restaurantDesc[3] || "description is not available"}
          location={userLocation}
          mapLocation={restaurantName[3]+" "+userLocation}
          price={restaurantPriceRange[3] || "price is not available"}
          rating={restaurantRating[3] || "Rating is not available"}/>
        
        <ServiceDetailCard title={restaurantName[4] || "Restaurant is not available"}
          images={restaurantImage[4] || [restaurant, restaurant, restaurant]} 
          description={restaurantDesc[4] || "description is not available"}
          location={userLocation}
          mapLocation={restaurantName[4]+" "+userLocation}
          price={restaurantPriceRange[4] || "price is not available"}
          rating={restaurantRating[4] || "Rating is not available"}/>

          <ServiceDetailCard title={restaurantName[5] || "Restaurant is not available"}
          images={restaurantImage[5] || [restaurant, restaurant, restaurant]} 
          description={restaurantDesc[5] || "description is not available"}
          location={userLocation}
          mapLocation={restaurantName[5]+" "+userLocation}
          price={restaurantPriceRange[5] || "price is not available"}
          rating={restaurantRating[5] || "Rating is not available"}/>

          <ServiceDetailCard title={restaurantName[6] || "Restaurant is not available"}
          images={restaurantImage[6] || [restaurant, restaurant, restaurant]} 
          description={restaurantDesc[6] || "description is not available"}
          location={userLocation}
          mapLocation={restaurantName[6]+" "+userLocation}
          price={restaurantPriceRange[6] || "price is not available"}
          rating={restaurantRating[6] || "Rating is not available"}/>

<ServiceDetailCard title={restaurantName[7] || "Restaurant is not available"}
          images={restaurantImage[7] || [restaurant, restaurant, restaurant]} 
          description={restaurantDesc[7] || "description is not available"}
          location={userLocation}
          mapLocation={restaurantName[7]+" "+userLocation}
          price={restaurantPriceRange[7] || "price is not available"}
          rating={restaurantRating[7] || "Rating is not available"}/>

          <ServiceDetailCard title={restaurantName[8] || "Restaurant is not available"}
          images={restaurantImage[8] || [restaurant, restaurant, restaurant]} 
          description={restaurantDesc[8] || "description is not available"}
          location={userLocation}
          mapLocation={restaurantName[8]+" "+userLocation}
          price={restaurantPriceRange[8] || "price is not available"}
          rating={restaurantRating[8] || "Rating is not available"}/>

          <ServiceDetailCard title={restaurantName[9] || "Restaurant is not available"}
          images={restaurantImage[9] || [restaurant, restaurant, restaurant]} 
          description={restaurantDesc[9] || "description is not available"}
          location={userLocation}
          mapLocation={restaurantName[9]+" "+userLocation}
          price={restaurantPriceRange[9] || "price is not available"}
          rating={restaurantRating[9] || "Rating is not available"}/>
          <Footer/>
          </div>
        </div>
  )
}

export default RestaurantService
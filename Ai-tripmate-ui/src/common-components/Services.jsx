import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import hellojava from "../assets/hellojava.png"; // Import your images
// import travel from  "../assets/hellojava.png"; // Add additional images
// import adventure from  "../assets/hellojava.png"; // Add additional images

const services = [
  { title: "Hotel Service", images: [hellojava, hellojava, hellojava] },
  { title: "Restaurant Service", images: [hellojava, hellojava, hellojava] },
  { title: "Trip Planning", images: [hellojava, hellojava, hellojava] },
  { title: "Travel Services", images: [hellojava, hellojava, hellojava] },
  { title: "Full Trip Packages", images: [hellojava, hellojava, hellojava] }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };

  return (
    <section id="services" className="py-12 bg-gray-100 ">
      <h2 className="text-6xl text-center font-bold mb-10  ">Our Services</h2>
      <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-md p-4 rounded-lg cursor-pointer"
            onClick={() => setSelectedService(service.title !== "Full Trip Packages" ? service.title : null)}
          >
            <Slider {...sliderSettings}>
              {service.images.map((img, i) => (
                <div key={i}>
                  <img src={img} alt={service.title} className="w-full h-40 object-cover rounded-lg" />
                </div>
              ))}
            </Slider>
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-gray-600">Experience the best {service.title.toLowerCase()}.</p>
            </div>

            {selectedService === service.title && (
              <div className="mt-4 p-4 bg-gray-200 rounded-lg">
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Budget"
                  className="w-full p-2 mb-2 border rounded"
                />
                <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
                  Submit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;

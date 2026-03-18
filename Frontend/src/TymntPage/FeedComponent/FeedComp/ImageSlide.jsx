import React, { useEffect, useState } from 'react'

const ImageSlide = () => {
    const images = [
    "HouseHoldBuddy.png",
    "FoodBuddy.png",
    "ClothsBuddy.png",
    "SkilledBuddy.png",
    "DeliveryBuddy2.png",
    "QueueBuddy.png",
    "EmotionalBuddy.png",
    "AssignmentBuddy.png",
  ];

  const [index, setIndex] = useState(0);

  useEffect(()=>{
    const Interval = setInterval(()=>{
        setIndex((prev)=>(prev+1)%images.length)
     }, 4000)
    return ()=>clearInterval(Interval);  
  },[])

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          transform: `translateX(-${index * 100}%)`,
          transition: "transform 0.8s ease-in-out"
        }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Tymnt"
            style={{
              width: "100%",
              height: "320px",
              objectFit: "cover"
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageSlide

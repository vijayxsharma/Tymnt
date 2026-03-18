import React from 'react'

const HomeVideo = () => {
  return (
    <div style={{position:"relative", opacity:"80%"}}>
      <video src='TymntHome.mp4' autoPlay loop muted playsInline style={{width:"100%"}}/>
      <div style={{
          width:"300px",
          position: "absolute",
          top: "53%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          textAlign: "center",
          zIndex: 2,
        }}>
        <h1 style={{fontSize:"20px", fontFamily:"serif",fontWeight:"900px",textShadow:"2px 2px 2px red",margin:"-1px", font:"bold"}}>Turn Time into Opportunity</h1>
        <p style={{fontSize:"15px",fontWeight:"900px",textShadow:"2px 1px 2px red",fontFamily:"serif"}}>Human-powered marketplace for time-based services</p>
      </div>
    </div>
  )
}

export default HomeVideo

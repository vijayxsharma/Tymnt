import React from "react";
import {
  FaClipboardList,
  FaHandsHelping,
  FaHeart,
  FaHome,
  FaLightbulb,
  FaTruck,
  FaTshirt,
  FaUtensils,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HomeCategories = () => {
  const navigate = useNavigate();
  const categories = [
    { title: "Explore\nSupport", icon: <FaHandsHelping />, category: "All" },
    { title: "Household\nBuddy", icon: <FaHome />, category:"Household" },
    { title: "Assignment\nBuddy", icon: <FaClipboardList />, category:"Assignment" },
    { title: "Food\nBuddy", icon: <FaUtensils />, category:"Food" },
    { title: "Skilled\nBuddy", icon: <FaLightbulb />, category:"Skilled" },
    { title: "Cloths\nBuddy", icon: <FaTshirt />, category:"Cloths" },
    // { title: "Queueing\nBuddy", icon: <FaStopwatch />, category:"Queueing" },
    { title: "Delivery\nBuddy", icon: <FaTruck />, category:"Delivery" },
    { title: "Emotional\nSupport", icon: <FaHeart />, category:"Emotional" },
  ];
  return (
    <>
      <div className="container text-center">
        <p style={{ fontFamily: "serif",fontSize:"18px" }}>
          <b>Top Categories</b>
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "5px 6px",
            margin: "-8px -6px",
          }}
        >
          {categories.map((item, index) => (
            <div
              key={index}
              onClick={()=>navigate("/feed",{state:{category:item.category}})}
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                // border: "1px solid red",
              }}
            >
              <div
                style={{
                  fontSize: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#1e6df1",
                  borderRadius: "8px",
                  width: "54px",
                  height: "54px",
                  color: "white",
                }}
              >
                {item.icon}
              </div>
              <div
                style={{
                  padding:"1px",
                  fontSize: "16px",
                  fontWeight: "480",
                  fontFamily: "inherit",
                }}
              >
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center" style={{ margin: "25px" }}>
        <h4>How it Works ?</h4>
        <p>
          This section hightlights how people can either hire or offer their
          time on Tymnt. Whether you need a hand or want to help, Tymnt has a
          Buddy role for you.
        </p>
      </div>
      <div className="text-center my-2">
        {/* BUTTONS */}
        <p className="d-inline-flex gap-3">
          <a
            className="btn btn-primary"
            data-bs-toggle="collapse"
            href="#collapseExample1"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample1"
            style={{ width: "120px" }}
          >
            Hire <br /> Buddy
          </a>

          <a
            className="btn btn-primary"
            data-bs-toggle="collapse"
            href="#collapseExample2"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample2"
            style={{ width: "120px" }}
          >
            Offer Your <br /> Time
          </a>
        </p>

        {/* COLLAPSE 1 */}
        <div
          className="collapse mx-auto"
          id="collapseExample1"
          style={{ maxWidth: "300px" }}
        >
          <div
            className="card card-body text-start"
            style={{
              boxShadow: "5px 5px 5px rgb(146, 206, 252)",
              borderRadius: "10px",
            }}
          >
            <strong>Step 1</strong>
            <p className="mb-0">
              Hire a Buddy to get help, support, or company anytime, anywhere.
            </p>
            <strong>Step 2</strong>
            <p className="mb-0">
              Select a category and post a request according to your needs.
            </p>
            <strong>Step 3</strong>
            <p className="mb-0">
              Connection is established once your request is accepted.
            </p>
            <strong>Step 4</strong>
            <p className="mb-0">
              Appreciate your Tymnt buddy by rewarding their time and effort.
            </p>
          </div>
        </div>

        {/* COLLAPSE 2 */}
        <div
          className="collapse mx-auto"
          id="collapseExample2"
          style={{ maxWidth: "300px" }}
        >
          <div
            className="card card-body text-start"
            style={{
              boxShadow: "5px 5px 5px rgb(146, 206, 252)",
              borderRadius: "10px",
            }}
          >
            <strong>Step 1</strong>
            <p className="mb-0">
              Offer your time and turn it into a valuable asset.
            </p>
            <strong>Step 2</strong>
            <p className="mb-0">
              Accept posted request according to your category.
            </p>
            <strong>Step 3</strong>
            <p className="mb-0">
              Connect with the hiring Tymnt Buddy to deliver your service.
            </p>
            <strong>Step 4</strong>
            <p className="mb-0">
              Complete the request and transfer your time into worth.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <h5 className="text-center" style={{ margin: "0px 0px 10px 0px" }}>
        Frequently Asked Questions <strong style={{ color: "red" }}>?</strong>
      </h5>
      <div className="accordion" id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
            >
              1. What is Tymnt?
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseOne"
            className="accordion-collapse collapse show"
          >
            <div className="accordion-body">
              Tymnt is a human-powered marketplace where people can buy, sell,
              or trade time-based services such as emotional support,
              accountability, small tasks, motivation, and physical presence. It
              helps anyone monetize their time and skills.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseTwo"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseTwo"
            >
              2. What can I use Tymnt for?
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseTwo"
            className="accordion-collapse collapse"
          >
            <div className="accordion-body">
              You can use Tymnt to hire people for emotional support,
              accountability, motivation, simple tasks, or even physical
              presence.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseThree"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseThree"
            >
              3. How do I find the right person?
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseThree"
            className="accordion-collapse collapse"
          >
            <div className="accordion-body">
              You can browse profiles, check ratings/reviews, and filter by
              availability, service type, or price.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapsefour"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapsefour"
            >
              4. How do I pay?
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapsefour"
            className="accordion-collapse collapse"
          >
            <div className="accordion-body">
              Payments are made securely through Tymnt. Funds are only released
              to the time seller once the session or service is completed.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapsefive"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapsefive"
            >
              5. What if I'm not satisfied with the service?
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapsefive"
            className="accordion-collapse collapse"
          >
            <div className="accordion-body">
              You can raise a dispute. Tymnt provides a fair resolution process,
              including refunds when applicable.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapsesix"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapsesix"
            >
              6. Can I book someone instantly?
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapsesix"
            className="accordion-collapse collapse"
          >
            <div className="accordion-body">
              Yes, if a seller has marked themselves as “available now,” you can
              book them instantly. Otherwise, you can schedule for later.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseseven"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseseven"
            >
              7. Who can offer services on Tymnt?
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseseven"
            className="accordion-collapse collapse"
          >
            <div className="accordion-body">
              Anyone! Whether you're a student , freelancer, or homemaker-if you
              have time, you can monetize it.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseeight"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseeight"
            >
              8. What kind of service can i offer?
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseeight"
            className="accordion-collapse collapse"
          >
            <div className="accordion-body">
              <ul>
                <li>Listening & emotional support</li>
                <li>Study or accountability partner</li>
                <li>Motivation & encouragement</li>
                <li>Helping with simple online/offline tasks</li>
                <li>Physical presence for specific needs</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapsenine"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapsenine"
            >
              9. How do I get paid?
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapsenine"
            className="accordion-collapse collapse"
          >
            <div className="accordion-body">
              You set your rates, and Tymnt pays you after the buyer confirms
              the session/service is completed.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseten"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseten"
            >
              10. Do i need professional skills?
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseten"
            className="accordion-collapse collapse"
          >
            <div className="accordion-body">
              Not necessarily. Tymnt is about time and presence, so anyone can
              participate. However, unique skills can help you attract more
              buyers.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseeleven"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseeleven"
            >
              11. Is there any fee for sellers?
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseeleven"
            className="accordion-collapse collapse"
          >
            <div className="accordion-body">
              Creating an account is free. Tymnt charges a small commission on
              completed bookings to keep the platform running.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCategories;

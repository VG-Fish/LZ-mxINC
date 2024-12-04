import React, { useState } from "react";
import products from "../../../../products_info.json";
import logo0 from "../assets/company_logos/Airelle Logo.png";
import logo1 from "../assets/company_logos/Fidget Fusion Logo.png";
import logo2 from "../assets/company_logos/Hold20 Logo.png";
import logo3 from "../assets/company_logos/Lanyard Link Logo.png";
import logo4 from "../assets/company_logos/The Bye-Bye Bait Logo.png";
import logo5 from "../assets/company_logos/The Homework Pin Logo.png";
import logo6 from "../assets/company_logos/Sport Stuff Storage Logo.png";
import logo7 from "../assets/company_logos/The Calming Cube Logo.png";
import logo8 from "../assets/company_logos/Fidget Frank Logo.png";
import logo9 from "../assets/company_logos/The Unsnagger Logo.png";
import logo10 from "../assets/company_logos/The Easy Attach Logo.png";
import logo11 from "../assets/company_logos/The Senko Saver Logo.png";
const logos = [
  logo0,
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
  logo10,
  logo11,
];

const CardsDemo = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleCardClick = (index: any) => {
    // Toggle the card expansion on click
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      {products.products.map((product, index) => (
        <div
          key={index}
          className={`card d-inline-block container ${
            expandedIndex === index ? "expanded" : ""
          }`}
          style={{
            width: expandedIndex === index ? "500px" : "300px", // Expanded width
            height: expandedIndex === index ? "600px" : "500px",
            margin: "8px",
            transition: "width 0.3s ease, height 0.3s ease", // Smooth transition
            cursor: "pointer", // Indicate that the card is clickable
          }}
          onClick={() => handleCardClick(index)}
        >
          <img
            src={logos[index]}
            className="card-img-top"
            alt="..."
            style={{
              width: "100%",
              height: "50%",
              objectFit: "contain",
              transition: "height 0.3s ease", // Smooth image resize
            }}
          ></img>
          <div
            className="card-body d-flex flex-column"
            style={{
              width: "100%",
              height: "50%",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h5 className="card-title text-center" style={{ flexShrink: 0 }}>
              {product.name}
            </h5>
            <p
              className="card-text text-center"
              style={{
                flex: "1",
                overflow: "auto",
                margin: "0",
              }}
            >
              {product.description}
            </p>
            <div className="text-center" style={{ flexShrink: 0 }}>
              <button className="btn btn-primary">Buy</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsDemo;

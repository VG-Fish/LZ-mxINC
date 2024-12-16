import { useState } from "react";
import axios, { AxiosResponse } from "axios";

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

import img01 from "../assets/company_pictures/Airelle 1.png";
import img11 from "../assets/company_pictures/Fidget Fusion 1.png";
import img21 from "../assets/company_pictures/Hold20 1.png";
import img31 from "../assets/company_pictures/Lanyard Link 1.png";
import img41 from "../assets/company_pictures/The Bye-Bye Bait 1.png";
import img51 from "../assets/company_pictures/The Homework Pin 1.png";
import img61 from "../assets/company_pictures/Sport Stuff Storage 1.png";
import img71 from "../assets/company_pictures/The Calming Cube 1.png";
import img81 from "../assets/company_pictures/Fidget Frank 1.png";
import img91 from "../assets/company_pictures/The Unsnagger 1.png";
import img101 from "../assets/company_pictures/The Easy Attach 1.png";
import img111 from "../assets/company_pictures/The Senko Saver 1.png";

const practice_pictures = [
  img01,
  img11,
  img21,
  img31,
  img41,
  img51,
  img61,
  img71,
  img81,
  img91,
  img101,
  img111,
];

interface UpdateUserApiResponse {
  success: boolean;
  message: string;
  balance: {
    $numberDecimal: number;
  };
}

interface CardsProps {
  updateBalance: () => void;
}

const CardsDemo = ({ updateBalance }: CardsProps) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleCardClick = (index: any) => {
    // Toggle the card expansion on click
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const buyItem = (index: number) => {
    const product = products.products[index].name;
    const amount = 1;
    const id = localStorage.getItem("loginId");

    const jsonData = JSON.stringify({
      id: id,
      product: product,
      amount: amount,
    });
    axios
      .put("https://lz-mxinc.onrender.com/updateUser", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((_: AxiosResponse<UpdateUserApiResponse>) => {
        updateBalance();
      })
      .catch((_) => {
        alert("Can't buy this product, try another one.");
      });
  };

  return (
    <div>
      {/* Overlay when a card is expanded */}
      {expandedIndex !== null && (
        <div
          className="overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
            zIndex: 999, // Ensures overlay is on top
          }}
          onClick={() => setExpandedIndex(null)} // Close the card when clicking outside
        ></div>
      )}

      {products.products.map((product, index) => (
        <div
          key={index}
          className={`card d-inline-block container ${
            expandedIndex === index ? "expanded" : ""
          }`}
          style={{
            width: expandedIndex === index ? "500px" : "300px", // Expanded width
            height: expandedIndex === index ? "600px" : "500px", // Expanded height
            margin: "8px",
            transition: "width 0.3s ease, height 0.3s ease", // Smooth transition
            cursor: "pointer", // Indicate that the card is clickable
            position: expandedIndex === index ? "fixed" : "relative", // Fix card in place when expanded
            top: expandedIndex === index ? "50%" : "auto", // Vertically center the card
            left: expandedIndex === index ? "50%" : "auto", // Horizontally center the card
            transform:
              expandedIndex === index ? "translate(-50%, -50%)" : "none", // Centering transform
            zIndex: expandedIndex === index ? 1000 : "auto", // Ensure the expanded card is above other elements
          }}
          onClick={() => handleCardClick(index)}
        >
          <img
            src={logos[index]}
            className="card-img-top"
            alt="..."
            style={{
              width: expandedIndex === index ? "50%" : "100%",
              height: "50%",
              objectFit: "contain",
              transition: "height 0.3s ease", // Smooth image resize
            }}
          ></img>
          {expandedIndex !== null && (
            <img
              src={practice_pictures[index]}
              className="card-img-top"
              alt="..."
              style={{
                width: "50%",
                height: "50%",
                objectFit: "contain",
                transition: "height 0.3s ease", // Smooth image resize
              }}
            ></img>
          )}
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
              <button
                className="btn btn-primary"
                onClick={() => buyItem(index)}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsDemo;

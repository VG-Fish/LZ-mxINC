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
import logo12 from "../assets/company_logos/The Senko Saver Logo.png";

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
  logo12,
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
import img121 from "../assets/company_pictures/The Senko Saver 1.png";

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
  img121,
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

import vid_fidget from "../assets/company_videos/AFidget Frank.webm";
import vid_air from "../assets/company_videos/AirElle.webm";
import vid_bye from "../assets/company_videos/ByeByeBait.webm";
import vid_snag from "../assets/company_videos/desnagger.webm";
import vid_attach from "../assets/company_videos/Easy attach advertisement.webm";
import vid_fusion from "../assets/company_videos/Fidget fusion is designed to help you focus in class.webm";
import vid_hol from "../assets/company_videos/Hol20.webm";
import vid_lanyard from "../assets/company_videos/Lanyard Link Comercial.webm";
import vid_sports from "../assets/company_videos/SportsStuffStorage.webm";
import vid_supply from "../assets/company_videos/Supply Saver… Save your locker!.webm";
import vid_cube from "../assets/company_videos/The Calming Cube.webm";
import vid_pin from "../assets/company_videos/THE HOMEWORK PIN.webm";
const videos = [
  vid_air,
  vid_fusion,
  vid_hol,
  vid_lanyard,
  vid_bye,
  vid_pin,
  vid_sports,
  vid_cube,
  vid_fidget,
  vid_snag,
  vid_attach,
  vid_supply,
];

const CardsDemo2 = ({ updateBalance }: CardsProps) => {
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

  const getAmountAvailable = () => {
    return 0;
  };

  return (
    <div style={{}}>
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
            backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent overlay
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
            flexWrap: "wrap",
          }}
          onClick={() => handleCardClick(index)}
        >
          <img
            src={logos[index]}
            className="card-img-top"
            alt="..."
            style={{
              width: expandedIndex === index ? "50%" : "100%",
              height: expandedIndex === index ? "25%" : "50%",
              objectFit: "contain",
              transition: "height 0.3s ease", // Smooth image resize
            }}
            loading="lazy"
          ></img>
          {expandedIndex === index && (
            <img
              src={practice_pictures[index]}
              className="card-img-top"
              alt="..."
              style={{
                width: "50%",
                height: "25%",
                objectFit: "contain",
                transition: "height 0.3s ease", // Smooth image resize
              }}
              loading="lazy"
            ></img>
          )}
          {expandedIndex === index && (
            <video
              width="100%"
              height="25%"
              controls
              style={{ marginTop: "10px" }}
            >
              <source src={videos[index]} type="video/mp4"></source>
            </video>
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
                height: "150px",
                overflow: "auto",
                margin: "0",
              }}
            >
              {product.description}
            </p>
            <div className="text-center" style={{ flexShrink: 0 }}>
              <p>
                Price: {product.price}
                <br />
                Amount Available: {getAmountAvailable()}
              </p>
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

export default CardsDemo2;

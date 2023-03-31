import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from 'axios'
import { Container, Radio, Rating } from "./RatingStyles";
const StarRating = () => {
  const [StarRating, setStarRating] = useState(0);
  return (
    <Container>
      {[...Array(5)].map((item, index) => {
        const givenRating = index + 1;
        return (
          <label>
            <Radio
              type="radio"
              value={givenRating}
              onClick={async() => {
                setStarRating(givenRating);
                alert(`Are you sure you want to give ${givenRating} stars ?`);
                const res = await axios.post("http://localhost:4000/api/rate");
                console.log(res);

              }}
            />
            <Rating>
              <FaStar
                color={
                  givenRating < StarRating || givenRating === StarRating
                    ? "rgb(245,56,93)"
                    : "rgb(192,192,192)"
                }
              />
            </Rating>
          </label>
        );
      })}
    </Container>
  );
};
  
export default StarRating;
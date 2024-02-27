import { FaStarHalfAlt, FaStar, FaRegStar } from "react-icons/fa";
import { ImStarHalf } from "react-icons/im";
import { ImStarFull } from "react-icons/im";
import { ImStarEmpty } from "react-icons/im";
const Rating = ({ value, text }) => {
  return (
    <section className="rating">
      <div className="flex flex-row gap-2">
        <span>
          {value >= 1 ? (
            <ImStarFull />
          ) : value >= 0.5 ? (
            <ImStarHalf />
          ) : (
            <ImStarEmpty />
          )}
        </span>
        <span>
          {value >= 2 ? (
            <ImStarFull />
          ) : value >= 1.5 ? (
            <ImStarHalf />
          ) : (
            <ImStarEmpty />
          )}
        </span>
        <span>
          {value >= 3 ? (
            <ImStarFull />
          ) : value >= 2.5 ? (
            <ImStarHalf />
          ) : (
            <ImStarEmpty />
          )}
        </span>
        <span>
          {value >= 4 ? (
            <ImStarFull />
          ) : value >= 3.5 ? (
            <ImStarHalf />
          ) : (
            <ImStarEmpty />
          )}
        </span>
        <span>
          {value >= 5 ? (
            <ImStarFull />
          ) : value >= 4.5 ? (
            <ImStarHalf />
          ) : (
            <ImStarEmpty />
          )}
        </span>
      </div>

      <span className="rating-cls">{text && text}</span>
    </section>
  );
};

export default Rating;

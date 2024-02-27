import { useUser } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoryBackgrounds, setCategoryBackgrounds] = useState({});
  const { cards } = useUser();

  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(cards.map((card) => card.category))
    );

    //dynamic image gen
    const backgrounds = {};
    uniqueCategories.forEach((category) => {
      backgrounds[
        category
      ] = `url('/assets/images/${category.toLowerCase()}.jpg')`;
    });

    setCategories(uniqueCategories);
    setCategoryBackgrounds(backgrounds);
  }, [cards]);
  const navigate = useNavigate();
  const handleCategoryClick = (category) => {
    console.log("Selected Category:", category);
    // setSelectedCategory(category);
    navigate(`/category/${category}`);
  };

  return (
    <section className="category-section">
      <h1 className="text-4xl font-bold">Categories</h1>
      <div className="parent-box">
        {categories.map((category) => {
          const shouldDisplayCategory = cards.some(
            (card) => card.category === category && card.itemId
          );

          return shouldDisplayCategory ? (
            <div
              key={category}
              className="category-box-div"
              style={{ backgroundImage: categoryBackgrounds[category] }}
            >
              <div className="overlay">
                <Link
                  to={`/category/${category}`}
                  className="overlay-link"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Link>
              </div>
            </div>
          ) : null;
        })}
      </div>
      <Link to="/" className="btn-add-cart home-navigate-btn">
        Home
      </Link>
    </section>
  );
};

export default Category;

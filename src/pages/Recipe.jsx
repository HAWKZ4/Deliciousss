import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Recipe = () => {
  let params = useParams();

  const [details, setDetails] = useState({});

  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const detailData = await data.json();
    console.log(detailData.extendedIngredients);
    setDetails(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper>
      <div className="fDiv">
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <div className="buttons">
          <Button
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </Button>
          <Button
            className={activeTab === "ingredients" ? "active" : ""}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </Button>
        </div>
        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}

        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients?.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
};

export default Recipe;

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: #fff;
  }

  .fDiv {
    margin-bottom: 2rem;
    text-align: center;
  }

  @media (max-width: 1750px) {
    flex-direction: column;
    img {
      width: 100%;
    }
  }

  h2 {
    margin-bottom: 2rem;
  }

  li {
    font-size: 1.6rem;
    line-height: 3.5rem;
  }
  ul {
    margin-top: 2rem;
  }
  @media (max-width: 605px) {
    margin-top: 5rem;
    margin-bottom: 5rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: #fff;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;

  @media (max-width: 550px) {
    padding: 0.5rem 1rem;
    margin-right: 1rem;
  }
  @media (max-width: 450px) {
    padding: 0.2rem 0.4rem;
    margin-right: 0.4rem;
  }
  @media (max-width: 320px) {
    padding: 0.2rem 0.11rem;
    margin-right: 0.2rem;
  }
`;
const Info = styled.div`
  margin-left: 10rem;
  @media (max-width: 1750px) {
    margin: 0;
  }

  .buttons {
    text-align: center;
  }
  .buttons button:nth-child(2) {
    margin: 0;
  }

  @media (max-width: 550px) {
    h3 {
      font-size: 1rem;
      line-height: 2rem;
    }
    li {
      font-size: 1.4rem;
    }
  }

  @media (max-width: 450px) {
    padding: 0.25rem 0.5rem;
  }
  @media (max-width: 400px) {
    li {
      font-size: 1.2rem;
      line-height: 2.5rem;
    }
  }
`;

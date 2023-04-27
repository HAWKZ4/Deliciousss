import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [input, setInput] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
  };

  return (
    <FormStyle onSubmit={handleSubmit}>
      <div>
        <FaSearch />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </FormStyle>
  );
};

const FormStyle = styled.form`
  margin: 2rem auto;

  text-align: center;
  div {
    position: relative;
    transform: translateX(50%);
    left: -50%;
  }

  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: #fff;
    padding: 1rem 3rem;
    border: none;
    border-radius: 1rem;
    outline: none;
    width: 60%;
  }
  @media (max-width: 330px) {
    input {
      width: 55%;
    }
  }

  svg {
    position: absolute;
    top: 50%;
    transform: translate(100%, -50%);
    color: rgb(255, 255, 255);
  }
`;

export default Search;

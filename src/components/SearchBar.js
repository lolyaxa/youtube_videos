import React from "react";
import styled from "styled-components";

const SearchButton = styled.button`
  color: palevioletred;
  font-size: 20px;
  margin: 10px;
  padding: 5px 20px;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const Bar = styled.div`
  position: relative;
  height: 70px;
  width: 90%;
  left: 2%;
  top: 25px;
`;

const Input = styled.input`
  height: 30px;
  font-size: 16px;
  width: 50%;
`;

function SearchBar(props) {
  return (
    <Bar>
      <Input value={props.value} onChange={props.searchFilterOnChange}></Input>
      <SearchButton onClick={props.onSearchClick}>Search!</SearchButton>
    </Bar>
  );
}

export { SearchBar };

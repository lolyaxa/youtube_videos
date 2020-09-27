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
  width: 800px;
  height: 70px;
  left: 25px;
  top: 25px;
`;

const Input = styled.input`
  width: 500px;
  height: 30px;
  font-size: 16px;
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

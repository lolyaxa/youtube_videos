import React from 'react';
import './SearchBar.css';

function SearchBar(props) {
    return <div className='Bar'>
        <input className='Input' type='text'
        value={props.value}
        onChange={props.searchFilterOnChange}></input>
        <button className='SearchButton' 
            onClick={props.onSearchClick}>
            Search!
        </button>
    </div>
}

export { SearchBar };
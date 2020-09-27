import React from 'react';
import './Paginator.css';

function PageButton(props) {
    const { pageNumber, onClick, active } = props;
    let classNames;
    if (active) {
        classNames = 'Page Active'
    } else {
        classNames = 'Page'
    }
    return <div className={classNames}
        onClick={() => {
            onClick(pageNumber);

        }}
    >{pageNumber}</div>;
};

function Paginator(props) {
    const { total, perPage, onSelect, activePage } = props;
    const pagesOfRepos = [];
    let i = 1;
    while ((i * perPage) <= total) {
      pagesOfRepos.push(<PageButton
        onClick={(pageNumber) => {
            onSelect(pageNumber);
        }}
        pageNumber={i}
        active={ i === activePage }
        />);
      i += 1;
    }
    return <div>
        <div className='Pages'>{pagesOfRepos}</div>
    </div>;
}

export { Paginator };
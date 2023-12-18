import React from 'react';
import '.././css/Card.css';

const CustomCard = (props: any) => {
    const { name, occupation, githubUser, githubURL, img} = props

    return (
      <div className='card'>
        <img src={img} alt="" />
        <div className='container'>
            <h2>{name}</h2>
            <p className='title'>{occupation}</p>
            <a href={githubURL}><p>{githubUser}</p></a>
        </div>
      </div>
    );
  };

export default CustomCard;
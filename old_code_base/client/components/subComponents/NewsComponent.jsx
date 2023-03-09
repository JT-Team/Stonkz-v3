import React, { Component, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

//component for the news
//search for your own news API because this license will expire in 5 days
const NewsComponent = (props) => {

  return (
    props.news.map(object => {
      return(
        <div className='newsContainer'>
          <img className="news-img" src={object.image_url}></img>
          <div className="news-text-container">
            <a className="news-link" target="_blank" href={object.news_url}>{object.title}</a>
            <div>{object.text}</div>
          </div>
        </div>
      )
    })
  )
}


export default NewsComponent;
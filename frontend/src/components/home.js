import React from 'react'
import Navbar from './navbar'
import Banner from './banner'
import Carousel from './carousel';
import BrandList from './brandlist';

function Home() {
  return (
    <div>
           <div  style={{ backgroundColor: "rgba(223, 223, 228, 0.411)" }}>
       <Banner></Banner>
      <Carousel></Carousel>
      <BrandList></BrandList>
      </div>
    </div>
  )
}

export default Home;

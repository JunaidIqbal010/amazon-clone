import React from 'react'
import Product from './Product'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img className="home__image" src="https://m.media-amazon.com/images/I/61jovjd+f9L._SX3000_.jpg" alt="" />
        <div className="home__row">
          <Product description="Headphones are a pair of small speakers used for listening to sound from a computer, music player or other such electronic device. Headphones originally consisted of one speaker for each ear, connected by a band over the head" price={200} image_url="/assets/headphones.jpeg" id={1}/>
          <Product description="A smartwatch is a wearable computing device that closely resembles a wristwatch or other time-keeping device. In addition to telling time, many smartwatches are Bluetooth-capable. The watch becomes a wireless Bluetooth adaptor capable of extending the capabilities of the wearer's smartphone to the watch." price={4999} image_url="/assets/smartwatch.jpeg" id={2}/>
        </div>
        <div className="home__row">
          <Product description="A shirt is a cloth garment for the upper body (from the neck to the waist). Originally an undergarment worn exclusively by men, it has become, in American English, a catch-all term for a broad variety of upper-body garments and undergarments." price={900} image_url="/assets/shirt.jpeg" id={3}/>
          <Product description="A cricket bat is a specialized piece of equipment used by batters in the sport of cricket to hit the ball, typically consisting of a cane handle attached to a flat-fronted willow-wood blade" price={1500} image_url="/assets/bat.jpg" id={4}/>
          <Product description="A laptop computer, sometimes called a notebook computer by manufacturers, is a battery- or AC-powered personal computer generally smaller than a briefcase that can easily be transported and conveniently used in temporary spaces such as on airplanes, in libraries, temporary offices, and at meetings." price={28900} image_url="/assets/laptop.jpeg" id={5}/>
        </div>
        <div className="home__row">
          <Product description="Samsung Galaxy is Samsung Electronics' flagship line of Android smartphones and tablets. The original Samsung Galaxy smartphone debuted in 2009, and the line's first tablet, the Samsung Galaxy Tab, came out the following year." price={145000} image_url="/assets/mobile.jpeg" id={6}/>
        </div>
      </div>
    </div>
  )
}

export default Home
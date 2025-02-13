import AboutSection from '@/components/about-section'
import Hero from '@/components/hero'
import Navbar from '@/components/navbar'
import PartnersBanner from '@/components/PartnersBanner'
import ServicesCarousel from '@/components/service-carousel'
import React from 'react'

const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <ServicesCarousel/>
      <AboutSection/>
      <PartnersBanner/>
    </div>
  )
}

export default HomePage
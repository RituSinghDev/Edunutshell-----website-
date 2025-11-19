'use client'

import { ReactNode, memo } from 'react'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import LenisScroll from "@/components/LenisScroll"
import ScrollEnquiryPopup from "@/components/ScrollEnquiryPopup"

function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <LenisScroll />
      <Navbar />
      {children}
      <Footer />
      <ScrollEnquiryPopup />
    </>
  )
}

export default memo(ClientLayout)

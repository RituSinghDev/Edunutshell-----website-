'use client'

import { ReactNode } from 'react'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import LenisScroll from "@/components/LenisScroll"
import ScrollEnquiryPopup from "@/components/ScrollEnquiryPopup"

export default function ClientLayout({ children }: { children: ReactNode }) {
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

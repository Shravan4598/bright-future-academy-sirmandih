"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Campus from "@/components/Campus";
import About from "@/components/About";
import ManagementFaculty from "@/components/ManagementFaculty";
import Achievements from "@/components/Achievements";
import WhyChoose from "@/components/WhyChoose";
import Location from "@/components/Location";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Credits from "@/components/Credits";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Campus />
        <About />
        <ManagementFaculty />
        <Achievements />
        <WhyChoose />
        <Location />
        <Contact />
      </main>
      <Footer />
      <Credits />
    </>
  );
}

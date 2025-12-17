

"use client"
import { memo } from 'react';
import Navbar from '../components/navbar';
import Footer from '../Home/footer/page';

import AboutPage from './hero/page';
import { GoalsSection } from './goals/page';
import { ValueSection } from './values/page';

const Page = () => {
  return (
    <div className="overflow-x-hidden">
      <style jsx global>{`
        html,
        body {
          overflow-x: hidden;
          max-width: 100vw;
        }
        
        * {
          box-sizing: border-box;
        }
      `}</style>
      
      <Navbar/>
      <div  style={{marginBottom: "200px"}}>
         <AboutPage/>
      </div>
     
      <div style={{marginBottom: "200px",marginTop: "200px"}}>
        <GoalsSection/>
      </div>
       <div style={{marginBottom: "200px",marginTop: "200px"}}>
        <ValueSection/>
        </div>
      
      {/* <ReadyToCapture/> */}
      <Footer/>
    </div>
  );
};

export default memo(Page);
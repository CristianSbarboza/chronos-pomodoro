import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { Home } from "../../pages/Home";
import { History } from "../../pages/History";
import { NotFound } from "../../pages/NotFound";
import { AboutPomodoro } from "../../pages/AboutPomodoro";
import { useEffect } from "react";
import { Settings } from "../../pages/Settings";

function ScrollToTop(){
  const {pathname} = useLocation()

  useEffect(()=>{
    window.scrollTo({top: 0, behavior: 'smooth'})
  }, [pathname])

  return(null)
}

export function MainRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/about-pomodoro" element={<AboutPomodoro/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

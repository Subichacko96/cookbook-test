import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './style.css';
import Recipe from './components/Recipe';
import RecipeDetail from './components/RecipeDetail';
import Navbar from './components/Navbar';



function App() {
  return (
    <div className="App">
    
     {/* <Recipe/> */}
     <BrowserRouter>
     <Navbar/>
          <Routes>
            <Route exact path="/" element={<Recipe />} />
            <Route path="/singleRecipe/detail" element={<RecipeDetail />} />
          </Routes>
        
        </BrowserRouter>
     
    </div>
  );
}

export default App;

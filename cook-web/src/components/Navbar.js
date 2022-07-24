import React, { Component } from 'react'

export class Navbar extends Component {
  render() {
    return (
     <>
     <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark">
  <a class="navbar-brand font-weight-bold" id="navbarText" href="#" style={{fontSize:"30px"}}>COOK BOOK</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse ml-5" id="navbarText">
    <ul class="navbar-nav ml-5 space-x-5">
      {/* <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only"></span></a>
      </li> */}
      
    </ul>
   
  </div>
</nav>

     </>
      
    )
  }
}

export default Navbar
import React, { Component } from "react";
// import Cookie from "js-cookie";
import { Link } from "react-router-dom";
import {

  Spinner,
} from "reactstrap";


const axios = require("axios").default;
const ConfigFile = require("../config");

export default class Recipe extends Component {
  state = {
    success: false,
    error: false,
    // isRedirect:false,
    isLoaded: false,
    loading: false,
    recipe: {},
   
    categoryName:[],
   
    
  };

  handleClick = async (data) => {
    let response = await axios
      .get(
        `${ConfigFile.BASE_URL}/web/list/recicategory?category=${data}`
      )
      .catch(function (error) {
        console.log(error);
      });
    if (
      response === null ||
      response.data === null ||response.data.data === null 
    ) {

      this.setState({
        status: false,
      });
      console.log(response.data.data.allReci,"err log")
    } 
    else {
      this.setState({
        recipe: response.data.data.allReci,      
      });
      console.log(this.state.recipe,"my recepie response")
    }
    
  };

  GetRecipeList = async () => {
  

    const response= await axios.get(
        `${ConfigFile.BASE_URL}/web/list/all`,
        
      ).catch(function (error) {
      console.log(error);
    });
    // console.log("👇👇👇👇👇👇👇👇👇👇");
    // console.log(response);
    if (
      response &&
      response.data !== null 
     
    ) {
      this.setState({
        recipe: response.data.data.allRecipe,
        
        isLoaded: true,
      });
    } else if (
      (response && response.data.statusCode !== 200) 
      
    ) {
      this.setState({
        error: true,
        errorCode: response.data.msg 
      });
    } else {
      this.setState({
        status: false,
      });
    }
    console.log(response, "web resp");
  };
  getListCategory = async () => {
  

    const response= await axios.get(
        `${ConfigFile.BASE_URL}/web/list/allcategory`,
        
      ).catch(function (error) {
      console.log(error);
    });
    console.log("👇👇👇👇👇👇👇👇👇👇");
    console.log(response);
    if (
      response &&
      response.data !== null 
     
    ) {
      this.setState({
        categoryName: response.data.data,
       
      });
      console.log(this.state.categoryName,"new string")
    } else if (
      (response && response.data.statusCode !== 200) 
      
    ) {
      this.setState({
        error: true,
        errorCode: response.data.msg 
      });
    } else {
      this.setState({
        status: false,
      });
    }
    console.log(response, "cat resp");
  };
 
 
  componentDidMount() {
    this.GetRecipeList();
    this.getListCategory();
  }

  allRecipelist = () => {
    return (
      <>
        {this.state.recipe &&
          this.state.recipe.map((data, key) => {
            return (
              //  <Link to={`/singleRecipe?id=${data._id}`}>
                <div className="content-block post-list-view mt--30">
                  <div className="post-thumbnail">
                    <a href="">
                      <img
                        src={`${ConfigFile.BASE_URL}/uploads/${data.image[0]}`} 
                        alt="Post Images"
                      />
                    </a>
                  </div>
                  <div className="post-content">
                    <div className="post-cat">
                      <div className="post-cat-list">
                        <a className="hover-flip-item-wrapper" href="#">
                          <span className="hover-flip-item text-uppercase fw-bold">
                            <span data-text={data.category}>
                              {data.category}
                            </span>
                          </span>
                        </a>
                      </div>
                    </div>

                    <h6 className="list-title">
                      <a href="#">{data.title}</a>
                    </h6>

                    <h6 className="title mt-3 pt-3">
                      <span style={{fontWeight:"bold"}}>Ingredients :&nbsp;</span>
                      <a href="#">{data.ingredients}...</a>
                    </h6>
                    <h6 className="title mt-3 pt-3">
                    <span style={{fontWeight:"bold"}}>Description :&nbsp;</span>
                      <a href="#">{data.description}...</a>
                    </h6>
                    <div className="post-meta-wrapper">
                      <div className="post-meta">
                        <div className="content">
                       
                          <h6 className="post-author-name">
                            <a className="hover-flip-item-wrapper" href="#">
                              <span className="hover-flip-item">Published By : 
                                                        <span data-text= {data.author}> {data.author}</span>
                                                    </span>
                            </a>
                          </h6>
                         
                        </div>
                      </div>
                     
                    </div>
                  </div>
                </div>
              // </Link>
            );
          })}
      </>
    );
  };

  allCategoryItem = () => {
    return (
      <>
        {this.state.categoryName&&
          this.state.categoryName &&
          this.state.categoryName.map((data, key) => {
            return (
              // <Link to={`/blog/detail?id=${data._id}`}>
              <p onClick={() => this.handleClick(data)}>{data}</p>
                          
            );
          })}
      </>
    );
  };

  render() {
    if (this.state.isLoaded) {
      return (
        <>
          <div className="main-wrapper">
           
            {/* add sectn */}
            <div class="axil-post-list-area post-listview-visible-color axil-section-gap bg-color-white">
            <div class="container">
                <div class="row">
                <div class="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
                       
                       <div class="sidebar-inner">

                          
                           <div class="axil-single-widget widget widget_categories mb--30">
                         <this.allCategoryItem/>
                        
                           </div>
                     
                          
                       </div>

                   </div>
                    <div class="col-lg-8 col-xl-8">
                      <this.allRecipelist/>
                    </div>
                
                </div>
            </div>
        </div>
  
      
          </div>
          
        </>
      );
    } else{
      return null;
    }
  }
}

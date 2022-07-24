import React, { Component } from "react";

import { Spinner } from "reactstrap";



const axios = require("axios").default;
const ConfigFile = require("../config");


export default class RecipeDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      error: false,
      isLoaded: false,
      loading: false,
      singlerecipe: {},
      recipId: "",
    };
  }

  GetRecipeDetails = async () => {
    const url = new URL(window.location.href);
    const Id = url.searchParams.get("id");
    console.log(Id, "🍔🍔");

    await this.setState({ recipId: Id });
    console.log(this.state.recipId, "🎂");


    let response = await axios
      .get(`${ConfigFile.BASE_URL}/web/${this.state.recipId}/singleRecipe`)
      .catch(function (error) {
        console.log(error);
      });

    // console.log();
    console.log(response, "👇👇👇👇👇👇👇👇👇👇");
    if (response && response.data !== null) {
      this.setState({
        singlerecipe: response.data.data,
        isLoaded: true,
      });
     
    } else if (response && response.data.statusCode !== 200) {
      this.setState({
        error: true,
        errorCode: response.data.msg,
      });
    } else {
      this.setState({
        status: false,
      });
    }
    // console.log(this.state.singlenews, "hai");
  };
  

  componentDidMount() {
    this.GetRecipeDetails();
    
  }

 
  

  getSingleRecipe = () => {
    if (
      this.state.singlerecipe &&
      this.state.singlerecipe.image &&
      this.state.singlerecipe.image.length > 0
    ) {
      let details = this.state.singlerecipe;
      
      return (
        <>
          <div className="banner banner-single-post post-formate post-layout ">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  {/* <!-- Start Single Slide  --> */}
                  <div className="content-block">
                    {/* <!-- Start Post Content  --> */}
                    <div className="post-content">
                      <div className="post-cat">
                        <div className="post-cat-list">
                          <a className="hover-flip-item-wrapper">
                            <span className="hover-flip-item text-uppercase fw-bold">
                              <span data-text={details.category}>
                                {details.category}
                              </span>
                            </span>
                          </a>
                        </div>
                      </div>
                      <figure className="wp-block-image pb-2">
                      <img
                        className=""
                        src={`${ConfigFile.BASE_URL}/uploads/${details.image[0]}`}
                        alt="Post Images"
                      />
                    </figure>
                      <h1 className="title-details text-uppercase">
                        {details.title}
                      </h1>
                      {/* <!-- Post Meta  --> */}
                      <div className="post-meta-wrapper">
                        <div className="post-meta">
                          <div className="content">
                            <h6 className="post-author-name">
                              <a className="hover-flip-item-wrapper">
                                <span className="hover-flip-item fw-bold">
                                  <span
                                    className="fs-4"
                                    data-text={details.author}
                                  >
                                    {details.author}
                                  </span>
                                </span>
                              </a>
                            </h6>
                          </div>
                        </div>

                       
                      </div>
                    </div>
                    {/* <!-- End Post Content  --> */}
                  </div>
                  {/* <!-- End Single Slide  --> */}
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End Banner Area --> */}

        
         
        </>
      );
    }
  };


  render() {
    //let details = this.state.singlenews;
    if (this.state.isLoaded) {
      return (
        <>
          <div className="main-wrapper">
            <div className="mouse-cursor cursor-outer"></div>
            <div className="mouse-cursor cursor-inner"></div>
            {/* start section */}
            <div className="post-single-wrapper axil-section-gap bg-color-white">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8">
                    {/* <!-- Start Banner Area --> */}
                    <div className="post-content">
                      {/* post here */}
                      <this.getSingleRecipe />
                    </div>

                  
                  </div>
                  <div className="col-lg-4">
                   
                  </div>
                </div>
             
              </div>
            </div>
            {/* End section */}

            <a id="backto-top"></a>
            {/* <!-- End Back To Top  --> */}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className=" d-flex justify-content-center mr-mt-md-4">
            <Spinner
              style={{ width: "3rem", height: "3rem" }}
              type="grow"
              color="warning"
            />
          </div>
        </>
      );
    }
  }
}

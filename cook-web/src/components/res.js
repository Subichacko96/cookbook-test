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
    originalData: [],
    catgname: "",
  };

  handleClick = async (data, p) => {
    let page = p ? p : 1;
    let limit = this.state.limit;
    this.setState({ catgname: data, page: page });
    // console.log(`/web/list/newscategory?category=${data}&page=${page}&limit=${limit}`, "🥩🍗");
    let response = await axios
      .get(
        `${ConfigFile.BASE_URL}/web/list/newscategory?category=${data}&page=${page}&limit=${limit}`
      )
      .catch(function (error) {
        console.log(error);
      });
    if (
      response === null ||
      response.data === null ||
      response.data.statusCode !== 200
    ) {
      this.setState({
        status: false,
      });
    } else {
      this.setState({
        news: response.data.data,
        isLoaded: true,
      });
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
        recipe: response.data.data,
        orginalData: response.data.data,
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
  CategoryList = async () => {


    let response = await axios
      .get(`${ConfigFile.BASE_URL}/web/list/allcategory`)
      .then((response) => {
        if (
          !response ||
          response.data === null ||
          response.data.data.length === 0
        ) {
          return null;
        }
        this.setState({
          categoryName: response.data.data,
          isLoaded: true,
        });
        return axios.get(
          `${ConfigFile.BASE_URL}/web/list/newscategory?category=${response.data.data[0]}`,
        
        );
      })
      .catch(function (error) {
        console.log(error);
      });

    if (
      response === null ||
      response.data === null ||
      response.data.statusCode !== 200
    ) {
      this.setState({
        status: false,
      });
    } else {
      console.log(response.data.data, "🌵🌵");
      this.setState({
        categorynews: response.data.data,
        isLoaded: true,
      });
    }
  };
  componentDidMount() {
    this.GetRecipeList();
   // this.CategoryList();
  }


  allRecipelist = () => {
    return (
      <>
        {this.state.recipe &&
          this.state.recipe.allRecipe &&
          this.state.recipe.allRecipe.map((data, key) => {
            return (
              // <Link to={`/blog/detail?id=${data._id}`}>
                <div className="content-block post-list-view mt--30">
                  <div className="post-thumbnail">
                    <a href="">
                      <img
                        src={`${ConfigFile.BASE_URL}/uploads/${data.image[0]}`} style={{width:"100%"}}
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
                      <a href="#">{data.description.substring(0, 200)}...</a>
                    </h6>
                    <div className="post-meta-wrapper">
                      <div className="post-meta">
                        <div className="content">
                          <h6 className="post-author-name">
                            <a className="hover-flip-item-wrapper" href="#">
                              {/* <span className="hover-flip-item">
                                                        <span data-text="Rahabi Khan">Rahabi Khan</span>
                                                    </span> */}
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

  // categoryTitle = () => {
  //   return (
  //     <>
  //       <ul
  //         class="axil-tab-button nav nav-tabs mt--30 w-100 m-2 p-2"
  //         role="tablist"
  //       >
  //         {this.state.categoryName &&
  //           this.state.categoryName.map((data, key) => {
  //             return (
  //               <li className="cat-item" onClick={() => this.handleClick(data)}>
  //                 <a className="inner">
  //                   <div className="thumbnail ml-2">
  //                     <img
  //                       className=""
  //                       src="assets/images/category.png"
  //                       alt=""
  //                     />
  //                   </div>
  //                   <div className="content">
  //                     <h6 className="category-title text-uppercase">
  //                       {data.substring(0, 12)}
  //                     </h6>
  //                   </div>
  //                 </a>
  //               </li>
  //             );
  //           })}
  //       </ul>
  //     </>
  //   );
  // };



  categoryTitle = () => {
    return (
      <>
        {/* <ul
          class="axil-tab-button nav nav-tabs mt--30 w-100 m-2 p-2"
          role="tablist"
        >
          {this.state.categoryName &&
            this.state.categoryName.map((data, key) => {
              return (
                <li className="cat-item" onClick={() => this.handleClick(data)}>
                  <a className="inner">
                    <div className="thumbnail ml-2">
                      <img
                        className=""
                        src="assets/images/category.png"
                        alt=""
                      />
                    </div>
                    <div className="content">
                      <h6 className="category-title text-uppercase">
                        {data.substring(0, 12)}
                      </h6>
                    </div>
                  </a>
                </li>
              );
            })}
        </ul> */}

        {/* ul */}
        <ul class="axil-tab-button nav nav-tabs mt--30" role="tablist">
        {this.state.categoryName &&
            this.state.categoryName.map((data, key) => {
              return (
                <li class="nav-item p-2" role="presentation">
                  <a
                    class="nav-link active text-center text-uppercase"
                    //style={{ width: "160px" }}
                    //id="tab-two"
                    data-bs-toggle="tab"
                    // href={data}
                    // role="tab"
                    // aria-controls={key}
                    // aria-selected="true"

                    onClick={() => this.handleClick(data)}
                  >
                    {data.substring(0,12)}
                  </a>
                </li>
              );
            })}
        </ul>
      </>
    );
  };
 

  render() {
    if (this.state.isLoaded) {
      return (
        <>
          <div className="main-wrapper">
            <div className="mouse-cursor cursor-outer"></div>
            <div className="mouse-cursor cursor-inner"></div>

            {/* <!-- Start Breadcrumb Area  --> */}
            <div className="axil-breadcrumb-area  bg-color-grey">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="inner mb-5 justify-content-between">
                      <span className="recent-title w-100">
                        
                        {/* <this.categoryTitle/> */}
                        </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Breadcrumb Area  --> */}
            {/* <!-- Start Post List Wrapper  --> */}
            <div className="axil-post-list-area axil-section-gap bg-color-white">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 col-xl-8">
                    <this.allRecipelist />

                    {/*  */}
                  </div>

                  <div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
                    {/* <!-- Start Sidebar Area  --> */}
                    <div className="sidebar-inner">
                      {/* <!-- Start Single Widget  --> */}
                      {/* <div className="axil-single-widget widget widget_categories mb--30">
                        <ul>
                          <this.categoryTitle />
                        </ul>
                      </div> */}
                      {/* <!-- End Single Widget  --> */}

                  
                      {/* <!-- End Single Widget  --> */}

                    
                    
                    
                     
                    </div>
                    {/* <!-- End Sidebar Area  --> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-xl-12 d-flex justify-content-center">
                
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- End Post List Wrapper  --> */}

            {/* <!-- Start Back To Top  --> */}
            <a id="backto-top"></a>
            {/* <!-- End Back To Top  --> */}
          </div>
          <hr/>

          
        </>
      );
    } else {
      return (
        <div className=" d-flex justify-content-center mr-mt-md-4">
          <Spinner
            style={{ width: "3rem", height: "3rem" }}
            type="grow"
            color="warning"
          />
        </div>
      );
    }
  }
}

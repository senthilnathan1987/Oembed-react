/**
 * Author:Senthilnathan
 * smani@sapient.com
 * Oembed with reactJs
 * version:1.0
 *
 */
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import VideoSearchHeader from "./VideoSearchHeader";
import VideoList from "./VideoList";

export default class Layout extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div class="container">
      <Header/>
          <VideoSearchHeader/>
          <VideoList/>
       <Footer/>
      </div>
    );
  }
}
/**
 * Author:Senthilnathan
 * smani@sapient.com
 * Oembed with reactJs
 * version:1.0
 *
 */
import React from "react";
import $ from 'jquery';
import VideoResultStore from "./store/VideoResultStore";



export default class VideoSearchHeader extends React.Component {

constructor(){
    super();
    
    this.state={
        showPreview:false,
        previewResult:[{
            "title":"test title",
            "thumbnail_url":"thumbnail_url",
            "provider_name":"provider_name",
            "author_name":"author_name",
            "author_url":"author_name",
            "html":"html"
        }],
        providers:VideoResultStore.getProviderList()
    }
}

submitVideo(e){
    e.preventDefault();
   if(!this.refs.videoUrl.value==""){
       VideoResultStore.addVideo(this.state.previewResult);
        this.setState({
                    showPreview:false
                });
        this.refs.videoUrl.value = ""; 
   }else{
     this.setState({
                    showPreview:false
                });
   }
    
}
handleChange(e){
    var that=this;
    if(e.target.value !==""){
    var getProvider=this.getEmbedProvider(e.target.value);
    var providerUrl=getProvider.endpoints[0].url+'?url='+e.target.value+'&format=json';
    $.ajax({
		      url: providerUrl,
		      dataType: 'json',
		      cache: false,
		      success: function(data) {
                 
                this.setState({
                    showPreview:true,
                    previewResult:data
                });
		        

		      }.bind(this),
		      error: function(xhr, status, err) {
		      
                this.setState({
                    previewResult:[]
                });
		       
		      }.bind(this)
		    });

    }


}
getEmbedProvider(url){
        for (var i = 0; i < this.state.providers.length; i++) {
            for (var j = 0, l =this.state.providers[i].endpoints[0].schemes.length; j < l; j++) {
                var regExp = new RegExp(this.state.providers[i].endpoints[0].schemes[j], "i");
                if (url.match(regExp) !== null) return this.state.providers[i];
            }
        }
        return null;
}
 iframe() {
        return {
            __html: this.state.html
        }
    }


  render() {

    return (
      <div>
       <div class="jumbotron">
        <h1>Video Post</h1>
        <div class="row">
          <div class="col-lg-12">
           <p class="sub-txt">Example: https://www.youtube.com/watch?v=c5X4-pCDy94</p>
             <p class="sub-txt">Example: https://vimeo.com/194076406</p>
              <p class="sub-txt">Example: http://www.dailymotion.com/video/x56hhv4_alien-covenant-trailer-1-hd_shortfilms</p>
            <div class="input-group">
              <input type="text" ref="videoUrl" class="form-control" placeholder="Enter url here" onChange={this.handleChange.bind(this)} />
              <span class="input-group-btn">
                <button class="btn btn-default" type="button" onClick={this.submitVideo.bind(this)}>Submit Video!</button>
              </span>

            </div>
            
          </div>
        </div>
    
        { !this.state.previewResult.title=="" && this.state.showPreview &&
            <div class="row">
                <div class="col-lg-12">
                <div class="panel panel-default preview-panel">
                      <div class="panel-body">
                        <img src={this.state.previewResult.thumbnail_url} title={this.state.previewResult.title} />
                        <div class="preview-desc">
                        <p>{this.state.previewResult.provider_name}</p>
                        <p><b>{this.state.previewResult.title}</b></p>
                         <p>{this.state.previewResult.author_name}</p>
                          <p>{this.state.previewResult.author_url}</p>
                          </div>
                      </div>
                </div>
                </div>
            </div>
        }
       
      </div>


      </div>
    );
  }
};


/**
 * Author:Senthilnathan
 * smani@sapient.com
 * Oembed with reactJs
 * version:1.0
 *
 */
import React from "react";
import VideoResultStore from "./store/VideoResultStore";
import { Button,Modal } from 'react-bootstrap';
import {Equalizer} from'react-equalizer';

export default class VideoList extends React.Component {
  constructor(){
    super();
    this.state={
      show:false,
      modelIframe:"",
      modelIframeTitle:"",
      VideoList:VideoResultStore.fetchVideoList()
    }
  }


componentWillMount(){
  VideoResultStore.on('change',() =>{
      this.setState({
         VideoList:VideoResultStore.fetchVideoList()
      })
  })
}

openVideoModal(e){
  this.setState({ show: true});
  console.log(e.target.getAttribute('data-iframe'));
  this.setState({ modelIframe: e.target.getAttribute('data-iframe'),
    modelIframeTitle: e.target.getAttribute('data-title')
  });
  
}
 iframe() {
        return {
            __html: this.state.modelIframe
        }
    }

  render() {
     let close = () => this.setState({ show: false});
     const { VideoList } = this.state;
    return (
      <div class="row marketing">

      { VideoList.map((VideoLt) => 
        <div class="col-lg-4">
        <div class="image-avatar">
        <div id="overlay" data-iframe={VideoLt.html} data-title={VideoLt.title}  onClick={this.openVideoModal.bind(this)}>
        <span class="plus glyphicon glyphicon-play" data-iframe={VideoLt.html} data-title={VideoLt.title}  onClick={this.openVideoModal.bind(this)}></span>
      </div>
        <img src={VideoLt.thumbnail_url} data-iframe={VideoLt.html} title={VideoLt.title}/>
         </div> 
          <h4>{VideoLt.title}</h4>
        </div>
      )}

      <Modal
          show={this.state.show}
          onHide={close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">{this.state.modelIframeTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <div dangerouslySetInnerHTML={this.iframe()} ></div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}  


     
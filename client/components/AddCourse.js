import PropTypes from 'prop-types'
import React, { Component } from 'react'
import uniqueId from 'lodash'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Form,
  Select,
  Card
} from 'semantic-ui-react'
import Sortable from 'react-sortablejs'
import axios from 'axios'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';


let productOptions = [{key: 1, value: 'video', text:'Video'}, {key: 2, value: 'ebook', text:'E-Book'}]

const SortableItem = SortableElement(({testVal, index}) =>
    <Card>
      <Card.Content>
      <Card.Header>
      {testVal.title}
      </Card.Header>
      Title: {testVal.title}
      <br/>
      File: {testVal.fileName}
      <br/>
      Duration: {testVal.duration}
      </Card.Content>
    </Card> 
);

const SortableList = SortableContainer(({items}) => {
  return (
    <div>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} testVal={value} number={index} />
      ))}
    </div>
  );
});


export class AddCourse extends Component {
    state = {
        // items: [{title: 1, fileName: ""}, {title: 2, fileName: ""}, {title: 3, fileName: ""}, {title: 4, fileName: ""}, {title: 5, fileName: ""}],
        items: [],
        linkedVideos:[],
        lastFileName: "",
        thumbnailURL: "https://react.semantic-ui.com/assets/images/wireframe/image.png",
    }
    constructor() {
      super()
      this.handleSubmit = this.handleSubmit.bind(this);
      this.thumbnailChange = this.thumbnailChange.bind(this);
    }
    handleSubmit (event) {
        event.preventDefault();
        console.log("submitted form test!!");        
        console.log("event: ", event);
        console.log("event.target: ", event.target);
        console.log("event.target.files: ", event.target.files);
        // console.log("tags value: ", event.target.tags.value);
        // console.log("uploaded file: ", event.target.videoFile.value);
        const data = new FormData();
        let videoFile = this.uploadInput.files[0];
        console.log("got file: ", videoFile);
        data.append('videoFile', this.uploadInput.files[0]);
        data.append('test', "test");
        data.append('tags', "test");
        console.log("data (formData): ", data);
        console.log("data.entries(): ");
        for (var [key, value] of data.entries()) { 
          console.log("data entry: ", key, value);
        }        
        let videoDescriber = {
            title: event.target.videoTitle.value,
            fileName: videoFile.name,
            duration: 0,
        };
        // var reader = new FileReader();
        // reader.onload = function() {
        //     var media = new Audio(reader.result);
        //     media.onloadedmetadata = function(){
        //         console.log("The duration is: ", media.duration)
        //         videoDescriber.duration = media.duration;
        //         // this would give duration of the video/audio file
        //     };    
        // };
        // reader.readAsDataURL(videoFile);         

        this.setState({
          items:this.state.items.concat([videoDescriber])
        })
        axios.post('api/courses', data, { 'Content-Type': 'multipart/form-data' })
        .then(response => {
          console.log("post response: ", response.data);
        })

      // var videoElement = document.createElement('video');
      // videoElement.src = `/files/${videoElement.name}`;
      // if (videoElement.readyState === 4){
      //   console.log("The duration is: " + videoElement.duration.toFixed(2) + " seconds");
      // }
        
        document.getElementById("add-video-form").reset();        


        //   axios.post('api/courses', {
        //     "test": "test", 
        //   "FormData": data,
        //   videoFile,
        //   uploadedFile: this.uploadInput.files[0]
        //   // , "File": event.target.videoFile.value
        // }).then(response => {
        //   console.log("post response: ", response.data);
        // })
    }

    onSortEnd = ({oldIndex, newIndex}) => {
      this.setState({
        items: arrayMove(this.state.items, oldIndex, newIndex),
      });
    };
    thumbnailChange() {
      console.log("vidthumbnail: ", this.vidThumbnail.files[0]);
      console.log("thumbnail name: ", this.vidThumbnail.files[0].name);
      const fileUpload = new FormData();
      let thumbnailFile = this.vidThumbnail.files[0];
      // thumbnailFile.name = "tempFile";      
      fileUpload.append('file', thumbnailFile);
      // let videoDescriber = {
      //     title: event.target.videoTitle.value,
      //     fileName: videoFile.name,
      // };
      this.setState({
        lastFileName: thumbnailFile.name,
        thumbnailURL: `/files/${thumbnailFile.name}`,
      })
      axios.post('api/uploads', fileUpload, { 'Content-Type': 'multipart/form-data' })
      .then(response => {
        console.log("post response: ", response.data);
      })
  }
    // render() {
    //   return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
    // }

    render() {
        const simpleList = this.state.items.map((val, key) => (
            <li key={val} data-id={val}>List Item {val}</li>
        ));
        const videoList = this.state.items.map((val, key) => (
            <Card className="singleCard" key={val} onClick={ () => {}}>
            <Image src={this.state.thumbnailURL} floated="left" size="small"/>
            <Card.Header>
              <b>{val}</b>
            </Card.Header>
            <Card.Meta>
              <span className='date'>
                {`Date Published ${val}`}
              </span>
            </Card.Meta>
            <Card.Description className="cardDescription">
              <p><b>Description: </b>{val}</p>
            </Card.Description>
          </Card>            
        ))
        return (
            <div>    
            <Segment style={{ padding: '0em', paddingTop:'5em' }} vertical>
            <Container text style={{marginBottom:'2em'}}>
                <Header as='h3' style={{ fontSize: '3em' }} textAlign='center'>Add Course</Header>
            </Container>
 
            <Grid celled='internally' columns='equal' stackable>
            <Grid.Row>
            <Grid.Column width={8} style={{ paddingBottom: '5em'}}>
                      <Header as='h3' style={{ fontSize: '2em' }} textAlign='center'>Course Information</Header>
                      <p style={{ fontSize: '1.33em' }}>Enter basic product information and upload file</p>
                      <Form textAlign='left'>
                      <Form.Group>
                          <Form.Field>
                            <label>Course Type</label>                      
                            <Form.Select options={productOptions} placeholder='Product Type' style={{"margin": "0em"}}/>
                            </Form.Field>                      
                      </Form.Group>
                      <Form.Group>
                        <Form.Field>
                            <label>Course Title</label>
                            <input name="courseTitle" placeholder='Course Title' />
                            </Form.Field>                      
                        </Form.Group>
                        <Form.Group>
                            <Form.Field>
                                <label>Course Thumbnail</label>
                                <input multiple placeholder='Upload Thumbnail' name="courseThumbnail" type="file"/>
                            </Form.Field>                                              
                          </Form.Group>
                          <Form.Group>
                            <Form.Field>
                            <label>Description</label>
                            <textarea name="videoDescription" cols="120"></textarea>
                          </Form.Field>                      
                      </Form.Group>
                    </Form>       
            </Grid.Column>
            <Grid.Column width={3} style={{ paddingBottom: '5em'}}>
                      <Header as='h3' style={{ fontSize: '2em' }} textAlign='center'>Order Videos</Header>
                      {"react-sortable-hoc:"}
                      <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />                                            
            </Grid.Column>
              <Grid.Column style={{ paddingBottom: '5em'}}>
              <Header as='h3' style={{ fontSize: '2em' }} textAlign='center'>Add Videos</Header>
                <Form textAlign='left' onSubmit={this.handleSubmit} encType="multipart/form-data" style={{marginTop:"10px"}} id="add-video-form">
                <Card fluid={true}>
                      <Card.Content>                      
                        <Image floated='right' size='small' src={this.state.thumbnailURL}/>
                        <Card.Header style={{marginLeft:"0px"}}>
                          Video Information
                        </Card.Header>
                        <Form.Group>
                          <Form.Field>
                            <label>Video Title</label>
                            <input name="videoTitle" placeholder='Enter Title' type="text"/>
                          </Form.Field>                                              
                        </Form.Group>
                        <Form.Group>
                          <Form.Field>
                            <label>Upload File</label>
                            <input name="videoFile" placeholder='Product File' ref={(ref) => { this.uploadInput = ref; }} type="file" multiple/>
                          </Form.Field>                                              
                        </Form.Group>
                        <Form.Group>
                          <Form.Field>
                            <label>Upload Thumbnail</label>
                            <input name="videothumbnailFile" placeholder='Product File' onChange={this.thumbnailChange} ref={(ref) => { this.vidThumbnail = ref; }} type="file" multiple/>
                          </Form.Field>                                              
                        </Form.Group>

                      </Card.Content>
                      <Card.Content extra>
                      <Button type="submit" primary>+ Add Video</Button>
                      </Card.Content>
                      </Card>
                </Form>                       
                <Button type="submit" primary attached='bottom' positive color='green'
                style={{position: "absolute", "bottom": "0", "right": "0", "marginRight":"10px", "marginBottom":"10px"}}>
                Save & Preview
                </Button>
                </Grid.Column>
            </Grid.Row>
            </Grid>
            </Segment>
                      
              <Segment inverted vertical style={{ padding: '5em 0em' }}>
                <Container>
                  <Grid divided inverted stackable>
                    <Grid.Row>
                      <Grid.Column width={3}>
                        <Header inverted as='h4' content='About' />
                        <List link inverted>
                          <List.Item as='a'>Sitemap</List.Item>
                          <List.Item as='a'>Contact Us</List.Item>
                          <List.Item as='a'>Religious Ceremonies</List.Item>
                          <List.Item as='a'>Gazebo Plans</List.Item>
                        </List>
                      </Grid.Column>
                      <Grid.Column width={3}>
                        <Header inverted as='h4' content='Services' />
                        <List link inverted>
                          <List.Item as='a'>Banana Pre-Order</List.Item>
                          <List.Item as='a'>DNA FAQ</List.Item>
                          <List.Item as='a'>How To Access</List.Item>
                          <List.Item as='a'>Favorite X-Men</List.Item>
                        </List>
                      </Grid.Column>
                      <Grid.Column width={7}>
                        <Header as='h4' inverted>Footer Header</Header>
                        <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Container>
              </Segment>
              </div>
              )
    }
}
  
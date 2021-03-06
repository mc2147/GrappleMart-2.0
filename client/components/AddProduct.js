import PropTypes from 'prop-types'
import React, { Component } from 'react'
import $ from 'jquery'
import TagsInput from 'react-tagsinput'
// import '../../public/react-tagsinput.css' // If using WebPack and style-loader.
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
  Visibility,
  Form,
  Select
} from 'semantic-ui-react'
import axios from 'axios'

let productOptions = [{key: 1, value: 'video', text:'Video'}, {key: 2, value: 'ebook', text:'E-Book'}]

export class AddProduct extends Component {
  constructor() {
    super() 
    this.state = {
      tags: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    componentDidMount() {
      // var tagInput = document.getElementById("tags");
      // tagInput.tagInput();

    }
    handleChange(tags) {
      console.log("onChange tags: ", tags);
      this.setState({tags})
    }

    handleSubmit(event) {
        let output = {
          title: event.target.productTitle.value,
          // file: 
        }
        const formData = new FormData();
        let productFile = this.uploadInput.files[0];
        formData.append('productFile', productFile);
        formData.append('title', event.target.productTitle.value);
        formData.append('description', event.target.productDescription.value);
        console.log("formData: ", formData);

        axios.post('api/products', formData, { 'Content-Type': 'multipart/form-data' })
        .then(response => {
          console.log("post response: ", response.data);
        })
          
    }

    render() {
      // $('#tags').tagsInput();
      
        return (
            <div>    
            
            <Segment style={{ padding: '0em', paddingTop:'5em' }} vertical>
            <Container text style={{marginBottom:'2em'}}>
                <Header as='h3' style={{ fontSize: '3em' }} textAlign='center'>Add Product</Header>
            </Container>
             
            <Form style={{width:"100%"}} onSubmit={this.handleSubmit} action="api/products/test-download" method="GET">
            <Grid celled='internally' columns='equal' stackable>
            <Grid.Row>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                      <Header as='h3' style={{ fontSize: '2em' }} textAlign='center'>Upload Product</Header>
                      <p style={{ fontSize: '1.33em' }}>Enter basic product information and upload file</p>
                      <Form.Group>
                          <Form.Field>
                            <label>Product Type</label>                      
                            <Form.Select name="productType" options={productOptions} placeholder='Product Type' style={{"margin": "0em"}}/>
                            <br/>
                            </Form.Field>                      
                      </Form.Group>
                      <Form.Group>
                        <Form.Field>
                            <label>Product Title</label>
                            <input name="productTitle" placeholder='Product Title' />
                            </Form.Field>                      
                        </Form.Group>
                        <Form.Group>
                            <Form.Field>
                                <label>Product File</label>
                                <input name="productFile" placeholder='Product File' ref={(ref) => { this.uploadInput = ref; }} type="file"/>
                            </Form.Field>                                              
                          </Form.Group>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                      <Header as='h3' style={{ fontSize: '2em' }} textAlign='center'>Product Details</Header>
                      <p style={{ fontSize: '1.33em' }}>
                      Enter product description and related tags
                      </p>
                      <Form.Group>
                          <Form.Field>
                          <label>Description</label>
                          <textarea name="productDescription" cols="120"></textarea>
                        </Form.Field>                      
                      </Form.Group>
                      <Form.Group>
                        <Form.Field>
                            <br/>
                            <b>Product Tags</b> (Enter to create new tag):
                            <TagInput />
                        </Form.Field>                      
                        </Form.Group>
                        <Button type="submit" floated="right" primary>+ Add Product</Button>                        
              </Grid.Column>
              </Grid.Row>
              </Grid>
            </Form>       
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
  

class TagInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      focused: false,
      input: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  render() {
    const styles = {
      container: {
        border: '1px solid #ddd',
        padding: '5px',
        borderRadius: '5px',
      },

      items: {
        display: 'inline-block',
        padding: '2px',
        border: '1px solid blue',
        fontFamily: 'Helvetica, sans-serif',
        borderRadius: '5px',
        marginRight: '5px',
        cursor: 'pointer'
      },

      input: {
        outline: 'none',
        border: 'none',
        fontSize: '14px',
        fontFamily: 'Helvetica, sans-serif'
      }
    };
    return (
      <label>
        <ul style={styles.container}>
          {this.state.items.map((item, i) => 
            <li key={i} style={styles.items} onClick={this.handleRemoveItem(i)}>
              {item}
              <span> [x]</span>
            </li>
          )}
          <input
            style={styles.input}
            value={this.state.input}
            onChange={this.handleInputChange}
            onKeyDown={this.handleInputKeyDown} />
        </ul>
      </label>
    );
  }

  handleInputChange(evt) {
    this.setState({ input: evt.target.value });
  }

  handleInputKeyDown(evt) {
    if ( evt.keyCode === 13 ) {
      const {value} = evt.target;
      
      this.setState(state => ({
        items: [...state.items, value],
        input: ''
      }));
    }

    if ( this.state.items.length && evt.keyCode === 8 && !this.state.input.length ) {
      evt.preventDefault();
      this.setState(state => ({
        items: state.items.slice(0, state.items.length - 1)
      }));
    }
  }

  handleRemoveItem(index) {
    return () => {
      this.setState(state => ({
        items: state.items.filter((item, i) => i !== index)
      }));
    }
  }
}

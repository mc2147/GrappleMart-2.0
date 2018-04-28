import PropTypes from 'prop-types'
import React, { Component } from 'react'
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

let productOptions = [{key: 1, value: 'video', text:'Video'}, {key: 2, value: 'ebook', text:'E-Book'}]

export class AddProduct extends Component {
    state = {}
    constructor() {
      super()
    }
    render() {
        return (
            <div>    
            
            <Segment style={{ padding: '0em', paddingTop:'5em' }} vertical>
            <Container text style={{marginBottom:'2em'}}>
                <Header as='h3' style={{ fontSize: '3em' }} textAlign='center'>Add Product</Header>
            </Container>
             
            <Grid celled='internally' columns='equal' stackable>
            <Grid.Row>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                      <Header as='h3' style={{ fontSize: '2em' }} textAlign='center'>Upload Product</Header>
                      <p style={{ fontSize: '1.33em' }}>Enter basic product information and upload file</p>
                      <Form textAlign='left'>
                      <Form.Group>
                          <Form.Field>
                            <label>Product Title</label>                      
                            <Form.Select options={productOptions} placeholder='Product Type' style={{"margin": "0em"}}/>
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
                                <input placeholder='Product File' name="productFile" type="file"/>
                            </Form.Field>                                              
                          </Form.Group>
                    </Form>       
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                      <Header as='h3' style={{ fontSize: '2em' }} textAlign='center'>Product Details</Header>
                      <p style={{ fontSize: '1.33em' }}>
                      Enter product description and related tags
                      </p>
                      <Form textAlign='left'>
                      <Form.Group>
                          <Form.Field>
                          <label>Description</label>
                          <textarea cols="120"></textarea>
                        </Form.Field>                      
                      </Form.Group>
                      <Form.Group>
                        <Form.Field>
                            <label>Tags</label>
                            <input name="productTitle" placeholder='Enter Tags (separated by comma)' style={{width:"400px"}}/>
                            </Form.Field>                      
                        </Form.Group>
                    </Form>       
    
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
  
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
  Card,
  Item,
  Label
} from 'semantic-ui-react'
import axios from 'axios'

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
export class Marketplace extends Component {
  state = {
      products: []
  }
  constructor() {
    super()
  }
  componentDidMount() {
      axios.get('api/products').then(response => {
          this.setState({
              products: response.data,
          })
      })
  }
  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  render() {
      const { children } = this.props
      const { fixed } = this.state
      const courses = [1, 2, 3, 4, 5, 6, 7, 8]; 
      const items = [
        {
          childKey: 0,
          image: 'https://react.semantic-ui.com/assets/images/wireframe/image.png',
          header: 'Header',
          description: 'Description',
          meta: 'Metadata',
          extra: 'Extra',
        },
        {
          childKey: 1,
          image: 'https://react.semantic-ui.com/assets/images/wireframe/image.png',
          header: 'Header',
          description: 'Description',
          meta: 'Metadata',
          extra: 'Extra',
        },
      ]
      
      const ItemExampleProps = () => (
        <Item.Group items={items}/>
      )
      let products = this.state.products;
      console.log("products: ", products);
    return (
      <div>    
          <Segment style={{ padding: '2em', paddingTop: '5em' }} vertical>
          <Container text style={{marginBottom:'2em'}}>
          <Header as='h3' style={{ fontSize: '3em' }} textAlign='center'>Marketplace</Header>
          </Container>
          <Item.Group divided>
                {products.map(product => {
                    return(
                        <Item>
                        <Item.Image src='https://react.semantic-ui.com/assets/images/wireframe/image.png' />
                    
                        <Item.Content>
                            <Item.Header>{product.title}</Item.Header>
                            <Item.Meta>
                            <span className='cinema'>Video/E-book</span>
                            </Item.Meta>
                            <Item.Description>{product.description}</Item.Description>
                            <Item.Extra>
                            <Label>Preview Available</Label>
                            <Label icon='dollar sign' content='9.99' />
                            <Button primary floated='right' href={`/product/${product.id}`}>
                                Purchase
                                <Icon name='right chevron' />
                            </Button>
                            </Item.Extra>
                        </Item.Content>
                        </Item>
                    )
                    })
                }        
              {courses.map(elem => {
                return(
                    <Item>
                      <Item.Image src='https://react.semantic-ui.com/assets/images/wireframe/image.png' />
                
                      <Item.Content>
                        <Item.Header as='a'>12 Years a Slave</Item.Header>
                        <Item.Meta>
                          <span className='cinema'>Union Square 14</span>
                        </Item.Meta>
                        <Item.Description>{"test text here"}</Item.Description>
                        <Item.Extra>
                          <Label>IMAX</Label>
                          <Label icon='globe' content='Additional Languages' />
                          <Button primary floated='right'>
                            Purchase
                            <Icon name='right chevron' />
                          </Button>
                        </Item.Extra>
                      </Item.Content>
                    </Item>
                )
                })
            }
        </Item.Group>
          <br/> <br/> <br/>
        <Card.Group itemsPerRow={6}>
        <Card>
        <Image src='https://react.semantic-ui.com/assets/images/wireframe/image.png' floated="left"/>
        <Card.Content>
          <Card.Header>
            Matthew
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              Joined in 2015
            </span>
          </Card.Meta>
          <Card.Description>
            Matthew is a musician living in Nashville.
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            22 Friends
          </a>
        </Card.Content>
      </Card>


      <Card style = {{maxWidth: "100%", "minWidth": "100%"}}>
      <Card.Content style={{"padding": "0"}}>
          <div className="ui items">
              <div className="item">
                  <div className="ui medium image">
                      <img src="https://semantic-ui.com/images/wireframe/image.png"/>
                  </div>
                    <Card.Content style={{"padding": "1rem"}}>
                          <Card.Header>
                        Matthew
                        </Card.Header>
                        <div className="meta">
                          <span className="cinema">Union Square 14</span>
                      </div>
                      <Card.Description>
                      Matthew is a musician living in Nashville.
                    </Card.Description>
                    <Card.Content extra>
                            <div className="ui label">IMAX</div>
                          <div className="ui label"><i className="globe icon"></i> Additional Languages</div>
                      </Card.Content>
                  </Card.Content>
              </div>
          </div>
      </Card.Content>
    </Card>      

        </Card.Group>          
        <Grid celled='internally' columns='equal' stackable>
            <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>Featured Products</Header>
            <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>Following</Header>
                <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>Friends</Header>
                <p style={{ fontSize: '1.33em' }}>
                  <Image avatar src='/assets/images/avatar/large/nan.jpg' />
                  <b>Nan</b> Chief Fun Officer Acme Toys
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
    <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as='h3' style={{ fontSize: '2em' }}>We Help Companies and Companions</Header>
                <p style={{ fontSize: '1.33em' }}>
                  We can give your company superpowers to do things that they never thought possible. Let us delight
                  your customers and empower your needs... through pure data analytics.
                </p>
                <Header as='h3' style={{ fontSize: '2em' }}>We Make Bananas That Can Dance</Header>
                <p style={{ fontSize: '1.33em' }}>
                  Yes that's right, you thought it was the stuff of dreams, but even bananas can be bioengineered.
                </p>
              </Grid.Column>
              <Grid.Column floated='right' width={6}>
                <Image
                  bordered
                  rounded
                  size='large'
                  src='/assets/images/wireframe/white-image.png'
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Button size='huge'>Check Them Out</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
    
        <Segment style={{ padding: '0em' }} vertical>
          <Grid celled='internally' columns='equal' stackable>
            <Grid.Row textAlign='center'>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>"What a Company"</Header>
                <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>"I shouldn't have gone with their competitor."</Header>
                <p style={{ fontSize: '1.33em' }}>
                  <Image avatar src='/assets/images/avatar/large/nan.jpg' />
                  <b>Nan</b> Chief Fun Officer Acme Toys
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
    
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container text>
            <Header as='h3' style={{ fontSize: '2em' }}>Breaking The Grid, Grabs Your Attention</Header>
            <p style={{ fontSize: '1.33em' }}>
              Instead of focusing on content creation and hard work, we have learned how to master the art of doing
              nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic
              and worth your attention.
            </p>
            <Button as='a' size='large'>Read More</Button>
    
            <Divider
              as='h4'
              className='header'
              horizontal
              style={{ margin: '3em 0em', textTransform: 'uppercase' }}
            >
              <a href='#'>Case Studies</a>
            </Divider>
    
            <Header as='h3' style={{ fontSize: '2em' }}>Did We Tell You About Our Bananas?</Header>
            <p style={{ fontSize: '1.33em' }}>
              Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but it's really
              true.
              It took years of gene splicing and combinatory DNA research, but our bananas can really dance.
            </p>
            <Button as='a' size='large'>I'm Still Quite Interested</Button>
          </Container>
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

const HomepageHeading = ({ mobile }) => (
  <Container text>
  <Header
  as='h1'
  content='Dashboards'
  inverted
  style={{
    fontSize: mobile ? '2em' : '4em',
    fontWeight: 'normal',
    marginBottom: 0,
    marginTop: mobile ? '1.5em' : '3em',
  }}
  />
  <Header
  as='h2'
  content='Do whatever you want when you want to.'
  inverted
  style={{
    fontSize: mobile ? '1.5em' : '1.7em',
    fontWeight: 'normal',
    marginTop: mobile ? '0.5em' : '1.5em',
  }}
  />
  <Button primary size='huge'>
  Get Started
  <Icon name='right arrow' />
  </Button>
  </Container>
)

Marketplace.propTypes = {
  mobile: PropTypes.bool,
}

export default Marketplace
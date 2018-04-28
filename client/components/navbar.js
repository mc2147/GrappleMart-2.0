import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { Search, Header, Button, Popup, Grid, Label, Menu, Visibility, Segment, Container, Icon } from 'semantic-ui-react'

const Navbar = ({ handleClick, isLoggedIn, isCoach=false, showFixedMenu=true, hideFixedMenu=false, fixed=true}) => (
    <Visibility once={false} onBottomPassed={showFixedMenu} onBottomPassedReverse={hideFixedMenu}>
        <Menu
        fixed={fixed ? 'top' : null}
        inverted={!fixed}
        pointing={!fixed}
        secondary={!fixed}
        size='large'
      >
      {isLoggedIn ? (
        isCoach ? 
      (
        <Container>
          <Menu.Item as='a' active href="/add-product">Add Product</Menu.Item>
          <Menu.Item as='a' href="/products">Your Product</Menu.Item>
          <Menu.Item as='a' href="/followers">Your Followers</Menu.Item>
          <Menu.Item position='right'>
            <Button as='a' inverted={!fixed}>Log in</Button>
            <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>Sign Up</Button>
          </Menu.Item>
        </Container>    
      ) : 
      (
        <Container>
          <Menu.Item as='a' active href="/home">Home</Menu.Item>
          <Menu.Item as='a' href="/marketplace">Marketplace</Menu.Item>
          <Menu.Item as='a' href="/profile">Profile</Menu.Item>
          <Menu.Item position='right'>
            <Button as='a' inverted={!fixed}>Log in</Button>
            <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>Sign Up</Button>
          </Menu.Item>
        </Container>        
      )) : (
        <Container>
          <Menu.Item as='a' href="/login" active>Log In</Menu.Item>
          <Menu.Item as='a' href="/signup">Sign Up</Menu.Item>
        </Container>                
      )}
      </Menu>
    </Visibility>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

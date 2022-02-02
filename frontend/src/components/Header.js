import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import {Navbar , Nav , Container,NavDropdown, Image} from 'react-bootstrap';
import { logout } from '../actions/userAction'
import SearchBox from './SearchBox'
import {Route} from 'react-router-dom'


const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

    return (
        <header >
            <Navbar bg="dark" variant='dark' expand="md" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand style={{color: 'orange'}}>
                          <Image alt="" src="/logo.png" width="50" height="50" roundedCircle />
                          <br></br>
                          Guitar shop
                        </Navbar.Brand>
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                      
                      < Route render={ ({ history }) => <SearchBox history={history} /> } />
                        <Nav className="ms-auto">
                        <LinkContainer to='/about'>
                                <Nav.Link ><i className='fas fa-hotel'> about</i></Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/cart'>
                                <Nav.Link ><i className='fas fa-shopping-cart'> Cart</i></Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                              
                <NavDropdown title={userInfo.name} id='username'>
                <i className="fas fa-user-cog" style={{backgroundColor:'orange'}}> {userInfo.name}</i>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item><i className="far fa-user"> Profile</i></NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <i className="fas fa-sign-out-alt"> logout</i>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className="fas fa-sign-in-alt"> Sign In</i>
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                <i className="fas fa-tools" style={{backgroundColor:'orange'}}> Admin tools</i>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item><i className="fas fa-users"> Users</i></NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item><i className="fas fa-guitar"> Products</i></NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item><i className="fab fa-shopify "> Orders</i></NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>  )}
            </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
        </header>
    )
}

export default Header

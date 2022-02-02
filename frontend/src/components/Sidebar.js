import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { Col,Row , Nav ,Image, } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
// import Filter from "./Filter"

const Sidebar = () => {
  return (
    <div
      style={{ display: 'flex', height: '39vh', overflowX: 'auto',overflowY:'hidden',backgroundColor:"rgb(51,51,51)" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: 'inherit' }}
          >
            GuitarShop
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/cart" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fas fa-shopping-cart">cart</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/about" activeClassName="activeClicked">
              
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
      <Image alt="" src="/store2.jpg"  />
       
      <Nav variant="tabs" defaultActiveKey="/" style={{background: "linear-gradient(pink, #9198e5)"}}>
              <Row>
                <Col>
              <Nav.Item>
                <Nav.Link href="/products/category/accessoir">Accessoir</Nav.Link>
              </Nav.Item>
              
              <Nav.Item>
                <Nav.Link href="/products/category/acoustic">Acoustic</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/products/category/basses">Basses</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/products/category/classical">Classical</Nav.Link>
                </Nav.Item>
                <Nav.Item style={{borderRadius:'20px',color:'yellow'}}>
                <Nav.Link href="/products/category/electric">Electric</Nav.Link>
              </Nav.Item>
                </Col>
                
              </Row>
              </Nav>
              
                
              
              
      
      <Image alt="" src="/store1.jpg"   />
      <Nav variant="tabs" defaultActiveKey="/" style={{background: "linear-gradient(pink, #aeaefc)"}}>

              <Row><Col>
              
              <Nav.Item>
                <Nav.Link href="/products/category/forbiginner">For Biginner</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/products/category/lefthanded">Left handed</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/products/category/others">Others</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/products/category/pack">Pack</Nav.Link>
              </Nav.Item>
              </Col></Row>
              </Nav>
              <Image alt="" src="/store.jpg"   />
              
      
      
    </div>
  );
};

export default Sidebar;
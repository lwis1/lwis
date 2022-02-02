import React from 'react'
import { Col , Row, Image} from "react-bootstrap"
// import {LinkContainer} from 'react-router-bootstrap';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { MDBAnimation } from "mdbreact";


const Footer = () => {
    return (
        <footer >
            <br />
            <br />
            <Row>
            <Col md={4}>
                
                <MDBAnimation type="bounce" infinite>
                
                <Image alt="" src="/logo.png" width="100" height="75" roundedCircle fluid/>
                <h4>guitar shop</h4>
                </MDBAnimation>
                
            </Col>
                <Col md={4}>
                <Image alt="" src="/paypallogo.png" width="250" height="100"  style={{ boxShadow: "12px 12px 2px 1px black" }}/>
                </Col>
                
                <Col md={4} style={{padding:"25px"}}>
                <MDBBtn tag='a' color='none' size='lg' className='m-1' style={{ color: '#3b5998' }}>
                <MDBIcon fab icon='facebook-f' size='lg' />
            </MDBBtn>

            <MDBBtn tag='a' color='none' size='lg' className='m-1' style={{ color: '#55acee' }}>
                <MDBIcon fab icon='twitter' size='lg' />
            </MDBBtn>

            <MDBBtn tag='a' color='none' size='lg' className='m-1' style={{ color: '#dd4b39' }}>
                <MDBIcon fab icon='google' size='lg' />
            </MDBBtn>

            <MDBBtn tag='a' color='none' size='lg' className='m-1' style={{ color: '#ac2bac' }}>
                <MDBIcon fab icon='instagram' size='lg' />
            </MDBBtn>

            
            
        
            <hr style={{color:'black'}}></hr>
                </Col>
            </Row>
           
            <br/>
            
            <div >Copyright &copy; Guitar shop</div>
        </footer>
    )
}

export default Footer

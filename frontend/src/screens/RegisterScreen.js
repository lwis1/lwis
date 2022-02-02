import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userAction'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    
    <FormContainer>
      <br />  
      <div style={{backgroundColor:"white",boxShadow: "12px 12px 2px 1px rgba(0, 0, 255, .2)",borderRadius: "30px",width:"120%", padding:"10px"}}>
      <h2 style={{borderRadius: "30px"}}>Sign Up</h2>
      <br /> 
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label style={{ color:"rgb(48, 2, 21)", fontSize:"1.2rem"}}>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label style={{ color:"rgb(48, 2, 21)", fontSize:"1.2rem"}}>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label style={{ color:"rgb(48, 2, 21)", fontSize:"1.2rem"}}>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label style={{ color:"rgb(48, 2, 21)", fontSize:"1.2rem"}}>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <br></br>
                    <div className="d-grid gap-2" >
                    <Button type='submit' className='btn-sm' variant='light'>
                        <i class="fas fa-arrow-alt-circle-right"> Register your new Account</i>
                    </Button>
                    </div>
                    <br />
      </Form>

      <Row className='py-3'>
        <Col style={{ display: "flex", justifyContent: "center", fontSize:"1.2rem",color:"rgb(48, 2, 21)",textDecoration: "underline"}}>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} >
            Login
          </Link>
        </Col>
      </Row>
      </div>
      <br />
    </FormContainer>
  )
}

export default RegisterScreen
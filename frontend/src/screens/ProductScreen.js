import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch,useSelector } from 'react-redux';
import { listProductDetails, createProductReview, } from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta'

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const {loading, error, product} = productDetails

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const {success:successProductReview, error: errorProductReview} = productReviewCreate

    useEffect( () => {
        if(successProductReview){
            alert('Review Submitted')
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match, successProductReview])
    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating,
            comment,
        }))
    }
    return( 
        <>
            <Link  to='/'>
                <Button variant="link" > go back</Button>
            </Link>
            
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                <div style={{backgroundColor:"white",borderRadius:"60px",overflow:'hidden'}}>
                <Meta title={product.name}/>
                <Row style={{backgroundColor:"white",borderRadius:"50px",}}>
                <Col style={{backgroundColor:"rgb(77, 8, 48)",borderRadius:"40px",background: "linear-gradient(pink, rgb(77, 8, 48))"}}md={6}>
                    <Image src={product.image} style={{backgroundColor:"white",borderRadius:"50px",width:"100%",height:'100%'}} alt={product.name} fluid/>
                </Col>
                <Col style={{borderRadius:"40px",}} md={6}>
                    <ListGroup variant='flush' style={{backgroundColor:"white",borderRadius:"50px",width:"100%",height:'100%'}}>
                        <ListGroup.Item style={{backgroundColor:"white",borderRadius:"50px",width:"100%",height:'100%'}}>
                            <h3 style={{color:"rgb(77, 8, 48)",textDecorationLine:'underline'}}>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroupItem>Price: ${product.price}</ListGroupItem>
                        <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        price:
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                                
                                
                            </ListGroup.Item>
                            <ListGroup.Item><Row>
                                    <Col>
                                        Category:
                                    </Col>
                                    <Col>
                                        <strong>{product.category}</strong>
                                    </Col>
                                </Row></ListGroup.Item>
                            <ListGroup.Item><Row>
                                    <Col>
                                        Brand:
                                    </Col>
                                    <Col>
                                        <strong>{product.brand}</strong>
                                    </Col>
                                </Row></ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        status
                                    </Col>
                                    <Col>
                                        <strong>{product.countInStock >0 ? 'In Stock' : 'Out Of Stock'}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col md={3}>Quantity   :</Col>
                        <Col md={1}>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                            
                          </Form.Control>
                          
                        </Col>
                        <Col md={5}></Col>
                        <Col md={3} style={{justifyItems:'end',justifyContent:'end'}}>
                             <Button type='submit' variant="success" size="bg"  disabled={product.countInStock === 0} onClick={addToCartHandler} >
                                    Add To Cart
                                </Button></Col>

                      </Row>
                    </ListGroup.Item>
                  )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <br></br>
            </div>
            <br></br>
            <br></br>
            <div style={{borderRadius:"60px",overflow:'hidden'}}>
            <Row>
            <Col >
                <h1>All Reviews of "{product.name}"</h1>
                {product.reviews.length === 0 && <Message>No reviews</Message>}
                <ListGroup>
                    {product.reviews.map(review => (
                        
                        <ListGroup.Item key={review._id} style={{borderRadius:"60px",overflow:'hidden',alignItems:'center',justifyContent:'center',padding:"10px",marginBottom:"10px"}}>
                            <hr style={{color:'rgb(77, 8, 48)',padding:"2px"}}></hr>
                            <strong style={{alignItems:'center',display:"flex",justifyContent:'center'}}>{review.name}</strong>
                            <p style={{alignItems:'center',display:"flex",justifyContent:'center'}}>{review.createdAt.substring(0,10)}</p>
                            <span style={{alignItems:'center',display:"flex",justifyContent:'center'}} >
                            <Rating value={review.rating} />
                            </span>
                            
                            <p style={{alignItems:'center',display:"flex",justifyContent:'center'}}>{review.comment}</p>
                            <hr style={{color:'rgb(77, 8, 48)', padding:"2px"}}></hr>
                        </ListGroup.Item>
                        
                    ))}
                    <br></br>
                    <div style={{backgroundColor:"white",borderRadius:"60px",overflow:'hidden'}}>
                    <h1>Write up your commentary</h1>
                    <ListGroup.Item>
                    {errorProductReview && (<Message variant='danger'>{errorProductReview}</Message>)}
                    {userInfo ? (<Form onSubmit={submitHandler}>
                                <Form.Group controlId='rating'>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                        <option value=''>Select...</option>
                                        <option value='1'>1 - Poor</option>
                                        <option value='2'>2 - Fair</option>
                                        <option value='3'>3 - Good</option>
                                        <option value='4'>4 - Very Good</option>
                                        <option value='5'>5 - Excellent</option>
                                        
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='comment'>
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control as='textarea' row='30' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                                </Form.Group>
                                <div style={{alignItems:'center',display:"flex",justifyContent:'center'}}>
                                <Button type='submit' variant='primary'>
                                    Submit
                                </Button>
                                </div>
                            </Form>) : <Message>Please <Link to='/login'>Sign in</Link>to write a comment {' '}</Message>}
                        </ListGroup.Item>
                        </div>
                </ListGroup>
            </Col>
        </Row>
        
        </div>
        
        </>
            )}
            
        </>
        )
    }


export default ProductScreen;

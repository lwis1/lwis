import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, FormFile , Row} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
    } = productUpdate

    useEffect(() => {
    if (successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET })
        history.push('/admin/productlist')
    } else {
        if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
        } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
        }
    }
    }, [dispatch, history, productId, product,successUpdate])

    const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
        const config = {headers: {'Content-Type': 'multipart/form-data',},}

        const { data } = await axios.post('/api/upload', formData, config)

        setImage(data)
        setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
    e.preventDefault()
        dispatch(
            updateProduct({
                _id: productId,
                name,
                price,
                image,
                brand,
                category,
                description,
                countInStock,
            })
        )
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-link my-3'>
                Go Back
            </Link>
            <FormContainer style={{backgroundColor:"white"}}>
            <div style={{backgroundColor:"white",boxShadow: "12px 12px 2px 1px rgba(0, 0, 255, .2)",borderRadius: "30px"}}>
            <h2 style={{borderRadius: "30px"}}>Edit Product</h2>
            <Row>
            
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label style={{ color:"rgb(48, 2, 21)", fontSize:"1.2rem",padding:"5px"}}>Name :</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId='price'>
                        <Form.Label style={{ color:"rgb(48, 2, 21)", fontSize:"1.2rem",padding:"5px"}}>Price :</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId='image'>
                        <Form.Label style={{ color:"rgb(48, 2, 21)", fontSize:"1.2rem",padding:"5px"}}>Image :</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter image url'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                        <FormFile id='image-file' label='Choose File' custom onChange={uploadFileHandler}></FormFile>
                    {uploading && <Loader />}
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId='brand'>
                        <Form.Label style={{ color:"rgb(48, 2, 21)", fontSize:"1.2rem",padding:"5px"}}>Brand :</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter brand'
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId='countInStock'>
                        <Form.Label style={{ color:"rgb(48, 2, 21)", fontSize:"1.2rem",padding:"5px"}}>Count In Stock :</Form.Label>
                        <Form.Control
                            type='number'
                            size={"sm"}
                            placeholder='Enter countInStock'
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        ></Form.Control>
                        
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId='category'>
                        <Form.Label style={{ color:"rgb(48, 2, 21)", fontSize:"1.2rem",padding:"5px"}}>Category :</Form.Label>
                        <Form.Control
                            as='select'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        ><option value=''>Select...</option>
                        <option value='accessoir'>Accessoir</option>
                        <option value='acoustic'>Acoustic</option>
                        <option value='basses'>Basses</option>
                        <option value='classic'>Classic</option>
                        <option value='forbiginner'>For succesful Learning</option>
                        <option value='electric'>Electric</option>
                        <option value='lefthanded'>Left Handed</option>
                        <option value='pack'>Pack</option>
                        <option value='others'>Others</option>
                        </Form.Control>
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId='description'>
                        <Form.Label style={{ color:"rgb(48, 2, 21)",padding:"5px", fontSize:"1.2rem"}}>Description :</Form.Label>
                        <Form.Control
                            type='text'
                            as='textarea' row='12'
                            placeholder='Enter description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br></br>
                    <div className="d-grid gap-2" >
                    <Button type='submit' variant='outline-success'>
                        <i class="fas fa-pencil-alt"> u p d a t e </i>
                    </Button>
                    </div>
                    <br />
                </Form>
                )   
            }
            </Row>
            </div>
            </FormContainer>
        </>
    )
}

export default ProductEditScreen

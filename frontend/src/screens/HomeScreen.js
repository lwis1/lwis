import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import  { useDispatch, useSelector} from 'react-redux'
import { Row,Col } from 'react-bootstrap'
import Product from '../components/Product'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import AboutCarousel from '../components/AboutCarousel'



const HomeScreen = ({match}) => {
    const keyword = match.params.keyword

    const pageNumber= match.params.pageNumber || 1

    const dispatch = useDispatch()
    const productList = useSelector (state => state.productList)
    const { loading, error, products, pages, page } = productList
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch,keyword, pageNumber])

    return (
        <>
        <Meta />
        {!keyword ? <> <br/><br/><br/> <ProductCarousel /> <br/> <hr style={{color:'rgb(77, 8, 48)', padding:"3px"}}></hr>
            <br/>
            <Row><Col md={2}></Col ><Col md={8}>
                    <h2 style={{borderRadius:"30px",boxShadow: "12px 12px 2px 1px rgba(0, 0, 255, .2)",padding:"10px"}}>Welcome to Guitar Shop</h2>
                    </Col><Col md={2}></Col></Row>
            
                
            <br/><br/>
            <hr style={{color:'white'}}></hr>
            <h6 >More than a million musicians worldwide are already trusting us. What about you? We have more than 400 000 items in stock at the best and the cheapest price! </h6><hr style={{color:'white'}}></hr>
            <br/><br/>
            <AboutCarousel />
            <br/>
            <br/><hr style={{color:'white'}}></hr>
            <h6 >we are already testing the Quality for you just order the item you want and you will got it for less then 72 hours</h6><hr style={{color:'white'}}></hr>
            <br/>
            <br/>
            <hr style={{color:'rgb(77, 8, 48)', padding:"3px"}} />
            <br/>
            <br/> </> : <Link to='/' className='btn btn-link'>Go Back</Link>}
        {
        loading ? 
        (<Loader></Loader>) 
        : error ? 
        (<Message variant='danger'>{error}</Message>) :( 
            <>
            <Row><Col md={2}></Col ><Col md={8}>
                    <h2 style={{borderRadius:"30px",boxShadow: "12px 12px 2px 1px rgba(0, 0, 255, .2)",padding:"10px"}}>guitars products : {keyword}</h2>
                    </Col><Col md={2}></Col></Row><br></br><br></br><hr style={{color:'white'}}></hr>
                    
                <Row>
                    
                    
                    {products.map( (product) => (
                        
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                        <Product product={product} />
                        </Col>
                       
                    ))}
                </Row>
                <hr style={{color:'white'}}></hr>
                <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                <hr style={{color:'rgb(77, 8, 48)', padding:"3px"}}/>
                
            </>
        )
        }
        </>
    )
}
export default HomeScreen
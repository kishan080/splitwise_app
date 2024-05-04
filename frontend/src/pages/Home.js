import React, {Component} from 'react'
import { Navbar, Jumbotron, Button, Row, Col } from 'react-bootstrap';
import { faApple, faAndroid } from '@fortawesome/free-brands-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import img from '../images/home.png'
import Footer from '../components/Footer'
class Home extends Component {

    render(){
        return (
        <>
        <Jumbotron style={{minHeight: "450px"}}>
            <Row>
                <Col sm={4}>
                    <h1>Less stress when sharing expenses</h1>
                    <p style={{paddingTop: "4rem", paddingBottom: "4rem"}}>
                        Keep track of your shared expenses and balances with housemates, trips, groups, friends, and family.
                    </p>
                    <Button variant="primary"><a href="/signup" style={{textDecoration: "none", color: "white"}}>Sign Up</a></Button>
                    <p></p>
                    <h6>Free for iPhone <FontAwesomeIcon icon={faApple} />,Android <FontAwesomeIcon icon={faAndroid} />, and web.</h6>
                </Col>
                <Col sm={8}><img src={img} style={{width: "100%"}}></img></Col>
            </Row>
        </Jumbotron>
        <Footer />
        </>
    )
    }
}

export default Home
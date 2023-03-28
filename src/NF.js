import { Container, Row, Col } from 'react-bootstrap'
import React from 'react'
import { Link } from 'react-router-dom'
import routes from './helpers/routes'

export default function NF() {
  return (
    <Container className='text-center mt-4'>
      <Row>
        <Col md={{span:10, offset:1}}>
          <img
            style={{width:'60%'}}
            src="https://i.gifer.com/7iJU.gif" 
            alt='error-404'
          />
          <h2>Parece que te perdiste, pero NTP</h2>
          <p>Vuelve con nosotros <Link to={routes.home}>Aqui</Link> </p>
        </Col>
      </Row>
    </Container>
  )
}

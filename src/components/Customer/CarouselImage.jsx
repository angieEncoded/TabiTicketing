import { Row, Container, Col, Image } from 'react-bootstrap';



const CarouselImage = ({url}) => {
  return (

    <Container style={{ width: '640px', height: '480px', backgroundColor: 'var(--tabi-logo)' }}
      className="border rounded d-flex align-items-center justify-content-center">


    <Image  src={url} fluid thumbnail/>

    </Container>





  )
}

export default CarouselImage
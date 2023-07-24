import Container from "react-bootstrap/esm/Container";
import SlideShow from "./SlideShow";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const App = () => {
  return (
    <Container>
      <Row>
        <Col>
          <SlideShow />
        </Col>
      </Row>
    </Container>
  );
};

export default App;

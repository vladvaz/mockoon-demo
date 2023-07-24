import Container from "react-bootstrap/esm/Container";
import MdTest from "./MdTest";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const App = () => {
  return (
    <Container>
      <Row>
        <Col>
          <MdTest />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
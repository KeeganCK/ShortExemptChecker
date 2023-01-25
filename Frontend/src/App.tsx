import Container from "./Components/Container";
import Data from "./Components/Data";
import { Typography } from 'antd';
const { Title } = Typography;

function App() {
  return (
    <div>
      <Container>
        <Title >Short Exempt Interest</Title>
        <Data />
      </Container>
    </div>
  );
}

export default App;

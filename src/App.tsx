import { BrowserRouter } from 'react-router-dom';
import { RenderRouter } from 'routes';

function App() {
  return (
    <BrowserRouter>
      <RenderRouter />
    </BrowserRouter>
  );
}

export default App;

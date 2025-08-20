import {Route, Routes} from "react-router-dom";
import NewConversion from "./pages/new-conversion.jsx";

function App() {

  return (
      <>
          <Routes>
              <Route path="/" element={<NewConversion />} />
          </Routes>
      </>
  )
}
export default App

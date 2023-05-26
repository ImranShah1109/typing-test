import TypingBox from "./Components/TypingBox";
import { GlobalStyles } from "./Styles/global";


function App() {
  return (
    <div className="canvas">
      <GlobalStyles/>
      <div>Header</div>
      <TypingBox/>
      <div>Footer</div>
    </div>
  );
}

export default App;
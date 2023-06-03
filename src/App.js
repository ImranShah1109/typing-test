import { ThemeProvider } from "styled-components";
import Footer from "./Components/Footer";
import TypingBox from "./Components/TypingBox";
import { GlobalStyles } from "./Styles/global";
import { useTheme } from "./Context/ThemeContext";


function App() {
  const {theme} = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <div className="canvas">
        <GlobalStyles/>
        <div>Header</div>
        <TypingBox/>
        <Footer/>
      </div>
    </ThemeProvider>
    
  );
}

export default App;
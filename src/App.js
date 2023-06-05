import { ThemeProvider } from "styled-components";
import Footer from "./Components/Footer";
import TypingBox from "./Components/TypingBox";
import { GlobalStyles } from "./Styles/global";
import { useTheme } from "./Context/ThemeContext";
import Header from "./Components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const {theme} = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer/>
      <div className="canvas">
        <GlobalStyles/>
        <Header/>
        <TypingBox/>
        <Footer/>
      </div>
    </ThemeProvider>
    
  );
}

export default App;
import { createContext,useState,useContext } from 'react';
import { themeOptions } from '../Utils/themeOptions';

const ThemeContext = createContext();

export const ThemeContextProvider = ({children}) => {

    const [theme, setTheme] = useState(themeOptions[0].value);

    const values = {
        theme,
        setTheme
    }


    return (<ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>)
}

export const useTheme = () => useContext(ThemeContext);
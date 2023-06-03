import React, { useState } from 'react';
import Select from 'react-select';
import { themeOptions } from '../Utils/themeOptions';
import { useTheme } from '../Context/ThemeContext';


const Footer = () => {
    const [value, setValue] = useState({});
    const {setTheme} = useTheme();
    const handleChange = (e) =>{

        setValue(e.value);
        setTheme(e.value);
    }
  return (
    <div className="footer">
        <div className="links">
            Link
        </div>
        <div className="themeButton">
            <Select
                value = {value}
                onChange ={handleChange}
                options ={themeOptions}
                menuPlacement = 'top'
            />
        </div>
    </div>
  )
}

export default Footer;

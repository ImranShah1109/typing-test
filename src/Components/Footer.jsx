import React, { useState } from 'react';
import Select from 'react-select';
import { themeOptions } from '../Utils/themeOptions';
import { useTheme } from '../Context/ThemeContext';


const Footer = () => {

    const {setTheme, theme} = useTheme();
    const handleChange = (e) =>{

        setTheme(e.value);
        localStorage.setItem("theme",JSON.stringify(e.value))
    }
  return (
    <div className="footer">
        <div className="links">
            Link
        </div>
        <div className="themeButton">
            <Select
                onChange ={handleChange}
                options ={themeOptions}
                menuPlacement = 'top'
                defaultValue = {{label: theme.label, value : theme}}
                styles = {{
                    control : styles => ({...styles,backgroundColor : theme.background}),
                    menu : styles => ({...styles,backgroundColor : theme.background}),
                    options : (styles, {isFocused}) => {
                        return {
                            ...styles,
                            backgroundColor : (!isFocused) ? theme.background : theme.textColor,
                            color : (!isFocused) ? theme.textColor : theme.background,
                            cursor : 'pointer'
                        }
                    },
                    singleValue : styles =>({...styles,color : theme.textColor})
                }}
            />
        </div>
    </div>
  )
}

export default Footer;

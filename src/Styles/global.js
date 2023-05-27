import { createGlobalStyle } from "styled-components";


export const GlobalStyles = createGlobalStyle`

    *{
        box-sizing : border-box;
    }

    body{
        background : black;
        color : white;
        margin : 0;
        padding : 0;
        transition : all 0.25s linear;
    }

    .canvas{
        display: grid;
        min-height: 100vh;
        grid-auto-flow: row;
        grid-template-rows: auto 1fr auto;
        gap: 0.5rem;
        padding: 2rem;
        width: 100vw;
        align-items: center;
        text-align: center;
    }

    .type-box{
        display : block;
        max-width : 1000px;
        height : 140px;
        margin-left : auto;
        margin-right : auto;
        overflow : hidden;
    }

    .words{
        font-size : 32px;
        display : flex;
        flex-wrap : wrap;
    }

    .word{
        margin : 5px;
        padding-right : 2px;
    }

    .hidden-input{
        opacity : 0;
    }

    .current{
        border-left : 1px solid;
        animation : blinking 2s infinite;
        animation-timing-function : ease;

        @keyframes blinking{
            0%{border-left-color : white;}
            25%{border-left-color : black;}
            50%{border-left-color : white;}
            75%{border-left-color : black;}
            100%{border-left-color : white;}
        }
    }

    .correct{
        color : green;
    }

    .incorrect{
        color : red;
    }

`
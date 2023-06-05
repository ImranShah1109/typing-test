import { createGlobalStyle } from "styled-components";


export const GlobalStyles = createGlobalStyle`

    *{
        box-sizing : border-box;
    }

    body{
        background : ${({ theme }) => theme.background};
        color : ${({ theme }) => theme.textColor};
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
        color : ${({ theme }) => theme.typeBoxText};
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
            0%{border-left-color : ${({ theme }) => theme.textColor};}
            25%{border-left-color : ${({ theme }) => theme.background};}
            50%{border-left-color : ${({ theme }) => theme.textColor};}
            75%{border-left-color : ${({ theme }) => theme.background};}
            100%{border-left-color : ${({ theme }) => theme.textColor};}
        }
    }

    .current-right{
        border-right : 1px solid;
        animation : blinkingRight 2s infinite;
        animation-timing-function : ease;

        @keyframes blinkingRight{
            0%{border-right-color : ${({ theme }) => theme.textColor};}
            25%{border-right-color : ${({ theme }) => theme.background};}
            50%{border-right-color : ${({ theme }) => theme.textColor};}
            75%{border-right-color : ${({ theme }) => theme.background};}
            100%{border-right-color : ${({ theme }) => theme.textColor};}
        }
    }

    .correct{
        color : ${({ theme }) => theme.textColor};
    }

    .incorrect{
        color : red;
    }

    .upper-menu{
        display : flex;
        width : 1000px;
        margin-left : auto;
        margin-right : auto;
        font-size : 1.35rem;
        justify-content : space-between;
        padding : 0.5rem;
    }

    .modes{
        display : flex;
        gap : 0.4rem;
    }

    .time-mode:hover{
        color : green;
        cursor : pointer;
    }

    .footer{
        width: 1000px;
        display : flex;
        justify-content : space-between;
        margin-left : auto;
        margin-right : auto;
    }

    .stats-box{
        display : flex;
        width : 1000px;
        height : auto;
        margin-left : auto;
        margin-right : auto;
    }

    .left-stats{
        width : 30%;
        padding : 30px;
    }

    .right-stats{
        width : 70%
    }

    .title{
        font-size : 20px;
        color : ${({ theme }) => theme.typeBoxText};
    }

    .subtitle{
        font-size : 30px;
    }

    .header{
        width: 1000px;
        display: flex;
        justify-content : space-between;
        margin-left : auto;
        margin-right : auto;
    }

    .user-profile{
        width : 1000px;
        margin : auto;
        display : flex; 
        height : 15rem;
        background : ${({ theme }) => theme.typeBoxText};
        border-radius : 20px;
        padding : 1rem;
        justify-content : center;
        align-text : center;
    }

    .user{
        width:50%;
        display:flex;
        margin-top:30px;
        margin-bottom:30px;
        font-size:1.5rem;
        padding:1rem;
        border-right : 2px solid;
    }

    .picture{
        width : 40%;
    }

    .info{
        width : 50%;
        padding : 1rem;
        margin-top : 1rem;
    }

    .total-tests{
        width : 50%;
        font-size : 3rem;
        display : flex;
        align-items : center;
        justify-content : center;
    }

    .graph-user-page, .table{
        margin : auto;
        width : 1000px; 
    }

    .center-of-screen{
        display : flex;
        min-height : 100vh;
        justify-content : center;
        align-items : center;
    }

`
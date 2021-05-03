import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
* {
    padding:0;
    margin:0;
   box-sizing:border-box;
   text-decoration: none !important;
   -webkit-font-smoothing: antialiased !important;
   list-style: none !important;
   outline:none;
   font-family: Helvetica;
}
body {
    font-size: 16px;
}

`
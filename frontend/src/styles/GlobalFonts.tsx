import { createGlobalStyle } from 'styled-components'

import GiantsBold from './fonts/Giants-Bold.otf'
import GiantsInline from './fonts/Giants-Inline.otf'
import PretendardVariable from './fonts/PretendardVariable.ttf'

export default createGlobalStyle`
    @font-face {
        font-family: 'GiantsBold';
        src: local('GiantsBold'), url(${GiantsBold}) format('opentype');
    }

    @font-face {
        font-family: 'GiantsInline';
        src: local('GiantsInline'), url(${GiantsInline}) format('opentype');
    }
    
    @font-face {
        font-family: 'PretendardVariable';
        src: local('PretendardVariable'), url(${PretendardVariable}) format('truetype');
    }


`

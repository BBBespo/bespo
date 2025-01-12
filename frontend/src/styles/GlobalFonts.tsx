import { createGlobalStyle } from 'styled-components';

import GiantsBold from './fonts/Giants-Bold.otf';
import GiantsInline from './fonts/Giants-Inline.otf';
import PretendardVariable from './fonts/PretendardVariable.ttf';
import PretendardSemiBold from './fonts/Pretendard-SemiBold.otf';
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

    @font-face {
        font-family : "PretendardSemiBold";
        src: local('Pretenard-SemiBold'), url(${PretendardSemiBold}) format('opentype');
    }


`;

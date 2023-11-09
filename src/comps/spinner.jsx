/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, useTheme } from '@zuzjs/ui'

function Spinner({ s, w, h }) {

    const { body, textColor, logoBG, logoText } = useTheme()

    return (
        <Box w={s || 50} h={s || 50} as={`un-spinner`} anim={`2`} flex aic jcc>
            <Box as={`un-loader`} w={w || 30} h={h || 6} bg={textColor} />
        </Box>
    );
}

export default Spinner;
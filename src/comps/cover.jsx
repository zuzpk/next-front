/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Heading, useTheme } from '@zuzjs/ui'
import Spinner from '@/comps/spinner';

function Cover({ message }) {

    const { cover } = useTheme()

    return (
        <Box zIndex={`3`} abs top={-10} right={-10} bottom={-10} left={-10} bg={cover} backdropFilter={`blur(3px)`} as={`app-cover`} flex aic jcc dir={`cols`} gap={15}>
            <Box as={`abs abc`}><Spinner /></Box>
            {message && <Heading size={16}>{message}</Heading>}
        </Box>
    );
}

export default Cover;
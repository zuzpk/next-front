"use client"
import React from 'react';
import { ADMIN_EMAIL } from '../config';
import { Box, Heading } from "@zuzjs/ui"

function Error({ code, message}) {

    return (
        <Box flex dir={`cols`} aic jcc abs abc color={`#777`}>
            <Heading size={72} b900>{code || `sorry`}</Heading>
            <Heading size={code == 404 ? 24 : 30} fontWeight={code == 404 ? `` : `900`}>{message || `it's not you, it's us`}</Heading>
            {!code && <Heading size={18}>we're experiencing an internal server problem.</Heading>}
            {!code && <Heading size={18}>please try again in few or contact <b>{ADMIN_EMAIL}</b></Heading>}
        </Box>
    );

}

export default Error;
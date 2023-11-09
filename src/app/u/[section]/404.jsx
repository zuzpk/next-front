import React from 'react';
import { 
    Box,
    Heading
 } from "@zuzjs/ui";
function Error404({
    code,
    codeSize,
    message
}) {
    return (
        <Box abs abc flex aic dir={`cols`}>
            <Heading as={`f`} bold size={codeSize || 100}>{code || `404`}</Heading>
            <Box h={15} />
            <Heading as={`f`} size={18}>{message || `That page does not exist :)`}</Heading>
        </Box>
    );
}

export default Error404;
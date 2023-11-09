"use client"
import React from 'react';
import {
    Box,
    Button,
    Image,
    Heading
} from "@zuzjs/ui"
import Link from 'next/link'

function Home(props) {
    return (
        <Box w={`100vw`} h={`calc(100vh - 70px)`} flex aic jcc dir={`cols`}>

            <Box flex aic gap={10}>
                <Image src={`/images/zuz-logo-text.png`} w={200} />
                <Heading size={58} mt={5} lineHeight={1} bold>NextJS Boilerplate</Heading>
            </Box>

            <Box flex aic gap={10} mt={50} as={`home-buttons`}>
                <Link className={`button s20 bold tdn`} href={`/u/signin/`}>Sign in</Link>
                <Link className={`button s20 bold tdn`} href={`/u/signup/`}>Create Account</Link>
            </Box>

        </Box>
    );
}

export default Home;
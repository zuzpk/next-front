"use client"
import React, { useEffect } from 'react';
import {
    Box,
    withRest,
    removeCookie,
    useTheme
} from "@zuzjs/ui"
import Signin from './signin'
import Signup from './signup'
import Recover from './recover'

import { useParams, useRouter } from 'next/navigation'
import { SESS_KEYS, API, APPURL, SESS_PREFIX } from "@/config"
import Spinner from "@/comps/spinner"

function OAuth(props) {

    const { dark } = useTheme()
    const { section } = useParams()
    const router = useRouter()

    useEffect(() => {
        if(section == `signout`){
            withRest(`${API}u/signout/`, {})
            .then(resp => {
                SESS_KEYS.map(k => {
                    try{ removeCookie(`${SESS_PREFIX}${k}`) }catch(e){
                        return e;
                    }
                });
                window.location = `${APPURL}?__=sot`
            })
            .catch(e => {
                window.location = `${APPURL}?__=autosot`
            })
        }
    }, [section])

    return (
        <Box>
            {section == "signin" && <Signin />}
            {section == "signup" && <Signup />}
            {section == "recover" && <Recover />}
            {section == "signout" && <Box w={`100vw`} p={100} flex aic jcc><Spinner /></Box>}
        </Box>
    );
}

export default OAuth;
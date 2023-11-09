import React, { useEffect } from 'react';
import Link from 'next/link'
import { 
    Box,
    Button,
    useTheme,
    Image,
    getCookie,
    withRest,
    setCSSVar,
    useStore,
    useDispatch
} from '@zuzjs/ui';
import { API, SESS_KEYS, PADDING, SESS_PREFIX } from "@/config"
import Spinner from "@/comps/spinner"

function Header(props) {

    const theme = useTheme()
    const { uloading, usess, user } = useStore(state => state.app)

    useEffect(() => {
        Object.keys(theme).map(k => "string" == typeof theme[k] && setCSSVar(k, theme[k]))
    }, [theme])

    return (
        <Box as={`header`} w={`100vw`} sticky top={0} zIndex={`99`} bg={theme.body} h={70} flex aic p={PADDING}>
            <Box as={`logo`} flex aic weight={1}>
                <Link href={`/`}><Image src={`/images/zuz-logo-text.png`} h={50} /></Link>
            </Box>
            <Box as={`nav`} weight={1} flex aic jce gap={20}>
                {uloading && <Box w={40} h={40} bg={theme.udpBG} r={20}><Spinner s={40} w={20} h={3} /></Box>}
                {!uloading && !usess && <>
                    <Link className={`s18 bold tdn`} href={`/u/signin/`}>Sign in</Link>
                    <Link className={`sup button s18 bold tdn`} href={`/u/signup/`}>Sign up</Link>
                </>}
                {!uloading && usess && <>
                    <Link className={`s18 bold tdn`} href={`/u/signout/`}>
                        <Box w={40} h={40} bg={theme.udpBG} r={20}>
                            <Image src={user.dp} w={`100%`} h={`100%`} r={40} />
                        </Box>
                    </Link>
                    <Link className={`s18 bold tdn`} href={`/u/signout/`}>Sign out</Link>
                </>}
            </Box>
        </Box>
    );
}

export default Header;
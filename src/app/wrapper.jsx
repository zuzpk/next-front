"use client"
import { 
    Box,
    Provider, 
    useTheme,
    withRest,
    getCookie,
    useDispatch,
    useStore
} from "@zuzjs/ui"
import AppTheme from '@/theme'
import Header from './header'
import { default as EN } from '@/langs/en'
import { useEffect } from "react"
import { API, SESS_KEYS, PADDING, SESS_PREFIX } from "@/config"

export default function Wrapper({ children }){
    return <Provider 
        lang={EN}
        theme={AppTheme}
        initialState={{
            app: {
                debug: true,
                loading: false,
                uloading: true,
                usess: false,
                user: null,
                utoken: null,
                lang: `en`,
                temp: null
            }
        }}>
        <Main children={children} />
    </Provider>
} 

const Main = ({ children }) => {

    const theme = useTheme()
    const dispatch = useDispatch(`app`)
    const { uloading, usess, user } = useStore(state => state.app)

    const _oauth = () => {
        let hasCookies = true
        SESS_KEYS.map(k => {
            if(!getCookie(SESS_PREFIX + k) || getCookie(SESS_PREFIX + k) == undefined){
                hasCookies = false
            }
        });
        if(hasCookies && !usess){
            withRest(`${API}u/oauth/`, {})
            .then(resp => dispatch({ uloading: false, usess: true, user: resp.me }))
            .catch(e => dispatch({ uloading: false, usess: false, user: null }))
        }else{
            dispatch({ uloading: false, usess: false, user: null })
        }
    }

    useEffect(() => {
        _oauth();
    }, [])
    return (
        <Box flex as={`app-wrapper theme-${theme?.dark ? `dark` : `light`}`} dir={`cols`} height={`100vh`}>
            <Header />
            <Box as={`app-content`} weight={1}>{children}</Box>
        </Box>
    )
}
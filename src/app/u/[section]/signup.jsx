import React, { useEffect } from 'react';
import {
    Box,
    Button,
    Form,
    Heading,
    Image,
    Input,
    useTheme,
    useStore,
    useToast,
    isEmail,
    useLang,
    byName,
    withRest,
    useDispatch,
    setCookie
} from "@zuzjs/ui"
import { API, APPNAME, APPURL } from "@/config"
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Cover from "@/comps/cover"

function Signup(props) {

    const { dark, input, primary } = useTheme()
    const { loading } = useStore(state => state.app)
    const toast = useToast()
    const lang = useLang()
    const dispatch = useDispatch(`app`)
    const params = useSearchParams()

    const processRequest = ({ nm, em, psw }) => {
        if(!nm || nm == ""){
            toast.show(lang.error_name, 4)
            byName(`nm`).focus()
        }else if(!em || !isEmail(em)){
            toast.show(lang.error_email, 4)
            byName(`em`).focus()
        }else if(!psw || psw == ""){
            toast.show(lang.error_password, 4)
            byName(`psw`).focus()
        }else{
            dispatch({ loading: true })
            withRest(
                `${API}u/signup/`,
                { nm: nm, em: em, psw: psw }
            )
            .then(resp => {
                Object.keys(resp).map(k => k != 'kind' && setCookie(k, resp[k], 90, window.location.hostname));
                toast.show(resp.message || lang.redirecting, 4);
                setTimeout(() => window.location = params.get("next") ? decodeURIComponent(params.get("next")) : resp.next || APPURL, 500);
            })
            .catch(err => {
                dispatch({ loading: false })
                toast.show(err.message || lang.error_unknown, 4);
            })
        }
    }

    useEffect(() => {
        window.document.title = `Create Account`
    }, [])

    return (
        <Form onSubmit={processRequest} w={320} m={`75px auto`} name={`oauth-signup`} rel flex dir={`cols`}>

            {loading && <Cover />}

            <Image src={`/unshare-${dark ? 'light' : 'dark'}.png`} w={75} />
            <Heading size={24} bold mt={15} mb={2}>{lang.signup_to_app.replace(`{APPNAME}`, APPNAME)}</Heading>
            <Heading size={16} mb={20}>{lang.signup_message.replace(`{APPNAME}`, APPNAME)}</Heading>

            <Input name={`nm`} placeholder={lang.label_your_name} bold mb={10} size={16} {...input} />
            <Input name={`em`} placeholder={lang.label_email} bold mb={10} size={16} {...input} />
            <Input name={`psw`} type={`password`} bold placeholder={lang.label_password} mb={20} size={16} {...input} />

            <Button type={`submit`} bg={primary} p={10} r={10} bold hover={{ opacity: 0.8 }} size={16} w={`100%`}>{lang.label_continue}</Button>

            <Box as={`others`} flex ais jcs dir={`cols`} gap={10} mt={30}>
                <Link href={`/u/signin/`} className={`tdn tdnh s16 bold flex ass`}>{lang.signin_instead}</Link>                
            </Box>
        </Form>
    );
}

export default Signup;
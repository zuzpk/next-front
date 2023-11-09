"use client"
import React, { useEffect } from 'react';
import {
    Box,
    Heading,
    Image,
    useTheme,
    useStore,
    useToast,
    useLang,
    useDispatch,
    withRest,
    Form,
    Input,
    Button,
    setCookie
} from "@zuzjs/ui"
import { APPURL, API, APPNAME } from "@/config"
import Cover from "@/comps/cover"
import Spinner from '@/comps/spinner'
import { useParams } from 'next/navigation'
import Link from 'next/link'

function Verify(props) {

    const { dark, input, primary } = useTheme()
    const { uloading, utoken, temp, usess, user } = useStore(state => state.app)
    const toast = useToast()
    const lang = useLang()
    const dispatch = useDispatch(`app`)
    const { token, section } = useParams()

    const processRequest = () => {
        dispatch({ uloading: true })
        withRest(
            `${API}u/verify_token/`,
            { t: token, f: section == 'verify' ? 1 : 2 }
        )
        .then(resp => {
            dispatch({ uloading: false, utoken: resp.kind })
        })
        .catch(err => {
            dispatch({ uloading: false })
        })
    }

    const updatePassword = ({ psw, rpsw }) => {
        if(!psw || psw == ""){
            toast.show(lang.error_password, 4)
            byName(`psw`).focus()
        } else if(!rpsw || rpsw == "" || rpsw != psw){
            toast.show(lang.error_repeat_password, 4)
            byName(`rpsw`).focus()
        } else{
            dispatch({ uloading: true })
            withRest(
                `${API}u/update_password/`,
                { t: token, psw: rpsw }
            )
            .then(resp => {
                dispatch({ uloading: false, utoken: resp.kind })
            })
            .catch(err => {
                dispatch({ uloading: false })
                toast.show(err.message || lang.error_unknown, 4);
            })
        }
    }

    useEffect(() => {
        window.document.title = `Verifying...`
        processRequest()
    }, [])

    if(section == 'recover'){
        
        if(null == utoken){
            return (
                <Box w={400} m={`75px auto`} name={`oauth-signin`} rel flex aic jcc dir={`cols`}>
                    <Image src={`/unshare-${dark ? 'light' : 'dark'}.png`} w={75} mb={20} />
                    <Spinner />
                    <Heading textAlign={`center`} size={18} bold mt={25} mb={20}>{lang.verifying}</Heading>
                </Box>
            )
        }

        if(utoken == `passwordUpdated`){
            return (
                <Box w={400} m={`75px auto`} name={`oauth-signin`} rel flex aic jcc dir={`cols`}>
                    <Image src={`/unshare-${dark ? 'light' : 'dark'}.png`} w={75} mb={20} />
                    <Heading textAlign={`center`} size={18} bold mt={25} mb={20}>{lang.password_updated}</Heading>
                    <Link href={`/u/signin/?__=psu`} className={`tdn tdnh bold s18 color`}>Continue to Signin</Link>
                </Box>
            )
        }

        if( utoken == 'tokenVerified' ){
            return (
                <Form onSubmit={updatePassword} w={450} m={`75px auto`} name={`oauth-update`} rel flex dir={`cols`}>
    
                    {uloading && <Cover />}
    
                    <Image src={`/unshare-${dark ? 'light' : 'dark'}.png`} w={75} />
                    <Heading size={24} bold mt={15} mb={20}>{lang.create_new_password}</Heading>
    
                    <Input name={`psw`} type={`password`} placeholder={lang.new_password} bold mb={20} size={16} {...input} />
                    <Input name={`rpsw`} type={`password`} placeholder={lang.repeat_password} bold mb={20} size={16} {...input} />
    
                    <Button type={`submit`} bg={primary} p={9} r={10} maxW={150} bold hover={{ opacity: 0.8 }} size={16}>{lang.label_continue}</Button>
    
                </Form>
            )
        }

        if(utoken == `invalidToken`){
            return (
                <Box w={400} m={`75px auto`} name={`oauth-signin`} rel flex aic jcc dir={`cols`}>
                    <Image src={`/unshare-${dark ? 'light' : 'dark'}.png`} w={75} mb={20} />
                    <Heading textAlign={`center`} size={18} bold mt={25} mb={20}>
                        {lang.error_invalid_token}
                    </Heading>
                </Box>
            )
        }


    }else{
        return (
            <Box w={400} m={`75px auto`} name={`oauth-signin`} rel flex aic jcc dir={`cols`}>

                <Image src={`/unshare-${dark ? 'light' : 'dark'}.png`} w={75} mb={20} />
                {uloading && <Spinner />}
                <Heading textAlign={`center`} size={18} bold mt={25} mb={20}>{uloading ? lang.verifying : utoken ? utoken == 'tokenVerified' ? lang.email_verified : lang.email_already_verified : lang.error_invalid_token}</Heading>
                {/* <Button type={`submit`} bg={primary} p={10} r={10} bold hover={{ opacity: 0.8 }} size={16} w={`100%`}>{lang.label_continue}</Button> */}

            </Box>
        );
    }
}

export default Verify;
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
    useDispatch,
    withRest,
    setCookie
} from "@zuzjs/ui"
import { APPURL, API, APPNAME } from "@/config"
import Cover from "@/comps/cover"
import Spinner from '@/comps/spinner'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

function Recover(props) {

    const { dark, input, primary } = useTheme()
    const { temp, utoken, uloading, usess, user } = useStore(state => state.app)
    const toast = useToast()
    const lang = useLang()
    const dispatch = useDispatch(`app`)
    const { token } = useParams()
    const router = useRouter()

    const processRequest = ({ em }) => {
        if(!em || !isEmail(em)){
            toast.show(lang.error_email, 4)
            byName(`em`).focus()
        }else{
            dispatch({ uloading: true })
            withRest(
                `${API}u/recover_account/`,
                { em: em }
            )
            .then(resp => {
                dispatch({ uloading: false, utoken: `sent`, temp: em })
            })
            .catch(err => {
                dispatch({ uloading: false })
                toast.show(err.message || lang.error_unknown, 4);
            })
        }
    }

    useEffect(() => {
        window.document.title = `Recover Account`
        if(usess && user) router.push("/?__=rcvr")
    }, [])

    //Step 1 - B : Email is sent here
    if(utoken == `sent`){
        return (
            <Box w={400} m={`75px auto`} name={`oauth-signin`} rel flex aic jcc dir={`cols`}>
                <Image src={`/unshare-${dark ? 'light' : 'dark'}.png`} w={75} mb={20} />
                <Heading textAlign={`center`} size={18} bold mt={25} mb={20}>
                    {utoken == `sent` && lang.recovery_email_sent.replace(`{EMAIL}`, temp )}
                </Heading>
            </Box>
        )
    }

    //Step 1
    return (
        <Form onSubmit={processRequest} w={450} m={`75px auto`} name={`oauth-recover`} rel flex dir={`cols`}>

            {uloading && <Cover />}

            <Image src={`/unshare-${dark ? 'light' : 'dark'}.png`} w={75} />
            <Heading size={24} bold mt={15} mb={20}>{lang.find_your_account.replace(`{APPNAME}`, APPNAME)}</Heading>

            <Input name={`em`} placeholder={lang.label_email} bold mb={20} size={16} {...input} />

            <Button type={`submit`} bg={primary} p={9} r={10} maxW={150} bold hover={{ opacity: 0.8 }} size={16}>{lang.label_continue}</Button>

            <Box as={`others`} flex ais jcs dir={`cols`} gap={10} mt={30}>
                <Link href={`/u/signin/`} className={`tdn tdnh s16 bold flex ass`}>{lang.resignin_to_app}</Link>
                <Link href={`/u/signup/`} className={`tdn tdnh s16 bold flex ass`}>{lang.create_account}</Link>
            </Box>
        </Form>
    );
}

export default Recover;
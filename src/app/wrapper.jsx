"use client"
import { useEffect } from "react"
import { 
    Box,
    Stylesheet
} from "@zuzjs/ui"
import {
    Provider
} from "@zuzjs/ui/hooks"

export default function Wrapper({ children }){

    useEffect(() => {
        
    }, []);

    return <Main children={children} />
} 

const Main = ({ children }) => {

    useEffect(() => {
        
    }, [])
    
    return <Provider
        initialState={{
            app: {
                debug: true
            }
        }}>
        <Box flex as={`app-wrapper`} height={`100vh`} weight={1}>
            <Box flex as={`app-content`} weight={1} w={`100%`} borderRadius={`10px 0px 0px 10px`} bg={`var(--content)`}>{children}</Box>
        </Box>
        <Stylesheet />
    </Provider>
}
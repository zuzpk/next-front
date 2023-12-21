import { VERSION } from "@/config"
import {
  Box,
  Heading,
  Stylesheet
} from "@zuzjs/ui"

const Page = () => {

  return <><Box as={`dashboard`} p={25} flex aic jcc w={`100vw`} h={`100vh`} dir={`cols`}>
    <Heading flex size={50} fontWeight={`900`}>ZuzCMS</Heading>
    <Heading flex size={24}>ZuzJS Boilerplate v{VERSION}</Heading>
  </Box>
  <Stylesheet id={`dashboard`} />
  </>
}

export default Page
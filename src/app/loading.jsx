import { VERSION } from "@/config"
import {
  Box,
  Spinner,
  Stylesheet
} from "@zuzjs/ui"

const Page = () => {

  return <><Box as={`dashboard`} p={25} flex aic jcc w={`100vw`} h={`100vh`} dir={`cols`}>
    <Spinner />
  </Box>
  <Stylesheet id={`dashboard`} />
  </>
}

export default Page
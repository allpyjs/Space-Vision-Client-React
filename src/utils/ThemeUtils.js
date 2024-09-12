import { extendTheme } from '@chakra-ui/react'
import { StyleFunctionProps } from '@chakra-ui/styled-system'

const CustomTheme = extendTheme((currentTheme) => {
  return {
    components: {
      AccordionButton: {
        variants: {
          customV1: {
            bg:
              currentTheme.config.initialColorMode === 'dark'
                ? 'gray.700'
                : 'gray.100',
          },
        },
      },
    },
  }
})

const ThemeUtils = {
  CustomTheme,
  StyleFunctionProps,
}

export default ThemeUtils

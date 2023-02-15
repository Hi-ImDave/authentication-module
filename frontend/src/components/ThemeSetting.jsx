import { useSelector } from 'react-redux'
// change to BG_ThemeSetting
const ThemeSetting = () => {
  const { viewDark, pureBlack, fontSize } = useSelector(
    (state) => state.preference
  )

  //  add switch for text color

  const fontModifier = () => {
    switch (fontSize) {
      case '0':
        return 'text-md'
      case '20':
        return 'text-lg'
      case '40':
        return 'text-xl'
      case '60':
        return 'text-2xl'
      case '80':
        return 'text-3xl'
      case '100':
        return 'text-4xl'
      default:
        return 'text-lg'
    }
  }

  const pageBG = () => {
    switch (true) {
      case viewDark && pureBlack:
        return 'bg-pureBlackBG'
      case viewDark && !pureBlack:
        return 'bg-darkModeBG'
      case !viewDark && !pureBlack:
        return 'bg-lightModeBG'
      case !viewDark && pureBlack:
        return 'bg-lightModeBG'
      default:
        return 'bg-darkModeBG'
    }
  }

  const cardBG = () => {
    switch (true) {
      case viewDark && pureBlack:
        return 'bg-pureBlackCard'
      case viewDark && !pureBlack:
        return 'bg-darkModeCard'
      case !viewDark && !pureBlack:
        return 'bg-lightModeCard'
      case !viewDark && pureBlack:
        return 'bg-lightModeCard'
      default:
        return 'bg-darkModeCard'
    }
  }

  const transition = 'transition-colors duration-1000 ease-in-out'

  return {
    font: fontModifier(),
    pageBG: pageBG(),
    cardBG: cardBG(),
    transition,
  }
}

export default ThemeSetting

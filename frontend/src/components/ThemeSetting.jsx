import { useSelector } from 'react-redux'
// change to BG_ThemeSetting
const ThemeSetting = () => {
  const { viewDark, pureBlack, fontSize } = useSelector(
    (state) => state.preference
  )

  const darkMode = { viewDark, pureBlack }

  const fontModifier = () => {
    switch (fontSize) {
      case '0':
        return 'text-lg'
      case '25':
        return 'text-xl'
      case '50':
        return 'text-2xl'
      case '75':
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

  return { font: fontModifier(), pageBG: pageBG(), cardBG: cardBG() }
}

export default ThemeSetting

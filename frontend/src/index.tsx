import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import GlobalFonts from './styles/GlobalFonts'
import GlobalStyles from './styles/GlobalStyles'
import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalFonts />
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)

serviceWorkerRegistration.unregister()

reportWebVitals()

import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { store } from './store'
import { Provider } from 'react-redux'
import OffersList from './modules/Offers'
import { createGlobalStyle } from 'styled-components'

const queryClient = new QueryClient()

const GlobalStyle = createGlobalStyle`
  :root {
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
  }

  * {
    box-sizing: border-box;
  }

  body {
    padding: 1em;
    min-width: 320px;
    min-height: 100vh;
  }
`

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <OffersList />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)

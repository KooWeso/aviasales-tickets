import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { store } from './app/store'
import App from './App'
import './index.css'

// Create Provider from Redux-toolkit =>
// import { Provider } from 'react-redux'
// import store from './store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)

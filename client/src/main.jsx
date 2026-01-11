import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from "react-redux"
import { store } from './app/store'
import { Toaster } from './components/ui/sonner'
createRoot(document.getElementById('root')).render(
  <>
  <Provider store={store}>
    <App />
<Toaster
  position="top-center"
  closeButton={false}
  richColors={false}
  toastOptions={{
    classNames: {
      toast:
        "bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 text-white shadow-xl rounded-xl px-4 py-3",
      title:
        "text-sm font-medium text-white tracking-tight",
      description:
        "text-xs text-neutral-400",
    },
  }}
/>
   </Provider>
  </>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { ThemeContextProvider } from './contexts/ThemeContextProvider.tsx'


createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ThemeContextProvider>
	</StrictMode>,
)

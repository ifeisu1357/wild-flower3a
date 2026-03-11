import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { PostHogProvider } from '@posthog/react';

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
  defaults: '2026-01-30',
} as const;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY || 'phc_mCHmxd17VPwED0UhgrHRvDgp00cVf2PDm1ObT6VcAJM'} options={options}>
      <App />
    </PostHogProvider>
  </StrictMode>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { TooltipProvider } from '@/shared/shadcn/components/ui/tooltip.tsx';
import { ThemeProvider } from '@/shared/contexts/theme/index.provider.tsx';
import App from '@/pages/app.component.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <TooltipProvider delayDuration={200}>
        <App />
      </TooltipProvider>
    </ThemeProvider>
  </React.StrictMode>,
);

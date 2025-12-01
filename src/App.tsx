import { RouterProvider } from '@tanstack/react-router';
import { router } from 'routes/router';
import { initRootStore } from 'store/widgetStore';

import 'styles/base.css';

export function App({ dealers }: { dealers?: string[] }) {
  initRootStore(dealers);
  
  return (
    <RouterProvider router={router} />
  );
}

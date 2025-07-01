'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { useState } from 'react';

export default function ClientProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </UserProvider>
  );
} 
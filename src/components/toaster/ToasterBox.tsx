import { Toaster } from 'react-hot-toast';

export default function ToasterBox() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        // Default options
        duration: 4000,
        style: {
          background: '#27272a', // zinc-800
          color: '#f4f4f5', // zinc-100
          border: '1px solid #3f3f46', // zinc-700
          borderRadius: '0.5rem',
          padding: '16px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
        },
        // Default options for specific types
        success: {
          duration: 3000,
          style: {
            background: '#27272a',
            color: '#f4f4f5',
            border: '1px solid #4ade80', // green-400
          },
          iconTheme: {
            primary: '#4ade80',
            secondary: '#27272a',
          },
        },
        error: {
          duration: 4000,
          style: {
            background: '#27272a',
            color: '#f4f4f5',
          },
          iconTheme: {
            primary: '#f87171',
            secondary: '#27272a',
          },
        },
        loading: {
          style: {
            background: '#27272a',
            color: '#f4f4f5',
            border: '1px solid #60a5fa', // blue-400
          },
        },
      }}
    />
  );
}
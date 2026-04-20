import './globals.css';
import { Sidebar } from '@/components/Sidebar';

export const metadata = {
  title: 'DR GYMPRO - Rodrigo',
  description: 'Dashboard de progreso personal de gimnasio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="grid-bg">
        <Sidebar />
        <div style={{ marginLeft: '300px' }}>
          {children}
        </div>
      </body>
    </html>
  );
}

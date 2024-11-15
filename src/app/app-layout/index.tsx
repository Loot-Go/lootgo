import DynamicProvider from "./DynamicProvider";
import Footer from "./footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <DynamicProvider>
      <main className="min-h-[100svh] max-w-md mx-auto flex flex-col shadow">
        {children}
        <Footer />
      </main>
    </DynamicProvider>
  );
}

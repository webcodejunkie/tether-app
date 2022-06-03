import Navigation from "./navigation/navigation";

export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <main>
        {children}
      </main>
    </>
  );
}
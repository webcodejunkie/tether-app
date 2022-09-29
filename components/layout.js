import Navigation from "./navigation/navigation";
import Footer from "./footer/footer";

export default function Layout({ children }) {
	return (
		<>
			<Navigation />
			{children}
			<Footer />
		</>
	);
}
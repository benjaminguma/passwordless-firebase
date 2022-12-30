import "../styles/globals.css";
import { AppPropsType, NextComponentType } from "next/dist/next-server/lib/utils";
import AuthProvider, { useAuth } from "../AuthProvider";
import { useRouter } from "next/router";
import { ReactNode } from "react";

function AuthManager({ children }: { children: ReactNode | ReactNode[] }) {
	const { status } = useAuth();
	const router = useRouter();
	if (status === "loading") {
		return <h1>loading please wait</h1>;
	}
	if (status === "unauthenticated") {
		router.push("/");
		return null;
	}
	return <>{children}</>;
}
type CustomAppProps = AppPropsType & {
	Component: NextComponentType & { protected?: boolean }; // add auth type
};

export default function App({ Component, pageProps }: CustomAppProps) {
	return (
		<AuthProvider>
			{Component.protected ? (
				<AuthManager>
					<Component {...pageProps} />
				</AuthManager>
			) : (
				<Component {...pageProps} />
			)}
		</AuthProvider>
	);
}

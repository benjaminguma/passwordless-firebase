import { createContext, PropsWithChildren, useState, useContext, useEffect } from "react";
import { auth } from "./firebase";
import {
	User,
	onAuthStateChanged,
	sendSignInLinkToEmail,
	isSignInWithEmailLink,
	signInWithEmailLink,
} from "firebase/auth";

type authStatus = "authenticated" | "unauthenticated" | "loading";
const AuthCtx = createContext<{
	sendAuthEmail(email: string): Promise<void>;
	verifyEmailLinkAndAuthenticate(): Promise<boolean>;
	signOut(): void;
	status: authStatus;
	user: User | null;
}>({
	async sendAuthEmail(a: string) {},
	status: "loading",
	async verifyEmailLinkAndAuthenticate() {
		return false;
	},
	signOut() {},
	user: null,
});

export const useAuth = () => useContext(AuthCtx);

const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
	const [status, setStatus] = useState<authStatus>("loading");

	const sendAuthEmail = async (email: string) => {
		try {
			const actionCodeSettings = {
				url: "http://localhost:3000/completeAuth",
				handleCodeInApp: true,
			};
			console.log(1);
			await sendSignInLinkToEmail(auth, email, actionCodeSettings);

			window.localStorage.setItem("emailForAuth", email);
			alert("email sent check inbox to complete signup");
		} catch (error) {
			console.log(error);
		}
	};

	const verifyEmailLinkAndAuthenticate = async () => {
		console.log(window.location.href);
		const continueUrl = window.location.href;
		try {
			const isValid = isSignInWithEmailLink(auth, continueUrl);
			if (!isValid) {
				return false;
			}
			const email = window.localStorage.getItem("emailForAuth") as string;
			if (!email) {
				// you can display a prompt to get user email
				return false;
			}
			const res = await signInWithEmailLink(auth, email, continueUrl);
			setStatus("authenticated");
			window.localStorage.removeItem("emailForAuth");
			return true;
		} catch (error) {
			console.log(error);
			setStatus("unauthenticated");
			return false;
		}
	};
	const signOut = async () => await auth.signOut();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			console.log({ ussssaaaa: user });
			if (user) setStatus("authenticated");
			else setStatus("unauthenticated");
		});
	}, [status]);

	return (
		<AuthCtx.Provider
			value={{
				sendAuthEmail,
				status,
				verifyEmailLinkAndAuthenticate,
				user: auth.currentUser,
				signOut,
			}}
		>
			{children}
		</AuthCtx.Provider>
	);
};
export default AuthProvider;

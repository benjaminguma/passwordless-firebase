import { FormEvent, useRef } from "react";
import { useAuth } from "../AuthProvider";

export default function Home() {
	const emailRef = useRef() as { current: HTMLInputElement };
	const { sendAuthEmail } = useAuth();
	const handleSendEmail = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const email = emailRef.current?.value as string;
		await sendAuthEmail(email);
	};
	return (
		<form onSubmit={handleSendEmail}>
			<input
				ref={emailRef}
				value={"benjaminguma.bg@gmail.com"}
				type='email'
				placeholder='enter your email here'
			/>
			<button className='btn'>send email link</button>
		</form>
	);
}

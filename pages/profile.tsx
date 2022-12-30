import React from "react";
import Image from "next/image";
import { useAuth } from "../AuthProvider";

function Profile() {
	const { user, signOut } = useAuth();
	return (
		<div>
			{user && (
				<>
					<div className='u-center'>
						<span>logged in as </span>
						<aside className='flexi'>
							<h2>{user.email}</h2>
							{user.emailVerified && <Image src='/verified.svg' alt='x' width={40} height={40} />}
						</aside>
						<button className='btn' onClick={signOut}>
							{" "}
							sign out
						</button>
					</div>
				</>
			)}
		</div>
	);
}
export default Profile;
Profile.protected = true;


/* 
https://test-proj-a92c9.firebaseapp.com/__/auth/action?apiKey=AIzaSyCLCwZZfbX2CEN4dB9fcA-hcDwpfWgmCqY&mode=signIn&oobCode=d1Y0AQeqNEElyoldLGiqVNNL-PtT90Hua3_dfxrSJBQAAAGFS5FwKQ&continueUrl=http://localhost:3000/completeAuth&lang=en
*/

// http://localhost:3000/completeAuth?apiKey=AIzaSyCLCwZZfbX2CEN4dB9fcA-hcDwpfWgmCqY&oobCode=DT59dfJsYABv1LYhF3FMvCvkksbyCPV6PR9yD0MR7OYAAAGFWzWVQQ&mode=signIn&lang=en

// https://test-proj-a92c9.firebaseapp.com/__/auth/action?apiKey=AIzaSyCLCwZZfbX2CEN4dB9fcA-hcDwpfWgmCqY&mode=signIn&oobCode=DT59dfJsYABv1LYhF3FMvCvkksbyCPV6PR9yD0MR7OYAAAGFWzWVQQ&continueUrl=http://localhost:3000/completeAuth&lang=en

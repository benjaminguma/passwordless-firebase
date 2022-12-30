import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuth } from "../AuthProvider";

function CompleteAuth() {
	const [loading, setLoading] = useState(true);
	const { verifyEmailLinkAndAuthenticate } = useAuth();
	const router = useRouter();
	const handleVerify = async () => {
		setLoading(true);
		const isSuccess = await verifyEmailLinkAndAuthenticate();
		setLoading(false);
		if (!isSuccess) {
			return router.replace("/");
		}
		return router.replace("/profile");
	};
	useEffect(() => {
		handleVerify();
	}, []);

	return (
		<div className='grid_txt_2 u-center'>
			{loading && (
				<>
					<Image src='/loader.gif' alt='' width={200} height={200} />
					<h2>processing...</h2>
				</>
			)}
		</div>
	);
}

export default CompleteAuth;

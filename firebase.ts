import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
	apiKey: "AIzaSyCLCwZZfbX2CEN4dB9fcA-hcDwpfWgmCqY",
	authDomain: "test-proj-a92c9.firebaseapp.com",
	projectId: "test-proj-a92c9",
	storageBucket: "test-proj-a92c9.appspot.com",
	messagingSenderId: "20929191807",
	appId: "1:20929191807:web:29cbcd92a672fc5fb4844a",
	measurementId: "G-R1MSW4PG7V",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

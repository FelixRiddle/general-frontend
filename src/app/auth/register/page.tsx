"use client";

import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";

/**
 * Register page
 * 
 * Generated with NextUI AI.
 */
export default function RegisterPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [email, setEmail] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const validateEmail = (email: any) => {
		const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		return re.test(email);
	};
	
	const handleRegister = () => {
		if (password !== confirmPassword) {
			setErrorMessage("Passwords do not match");
			return;
		}

		if (!validateEmail(email)) {
			setErrorMessage("Invalid email address");
			return;
		}

		// Handle registration logic here
		console.log(username, password, email);
	};

  return (
		<div>
			<Input
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Username"
			/>
			<Input
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Email"
			/>
			<Input
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
				type="password"
			/>
			<Input
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				placeholder="Confirm Password"
				type="password"
			/>
			{errorMessage && <p>{errorMessage}</p>}
			<Button onClick={handleRegister}>Register</Button>
		</div>
	);
}

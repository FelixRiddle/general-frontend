"use client";

import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";

/**
 * Generated with NextUI AI.
 */
export default function LoginPage() {
  	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		// Handle login logic here
		console.log(username, password);
	};

	return (
		<div>
			<Input
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Username"
			/>
			<Input
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
				type="password"
			/>
			<Button onClick={handleLogin}>Login</Button>
		</div>
	);
}

"use client";

import React, { useState } from "react";
import { Card, CardBody, Switch, Slider, Button } from "@nextui-org/react";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SettingsProps {
  // Define your settings props here
}

export default function SettingsClient() {
	const [toasts, setToasts] = useState([]);
	
	const [generalSettings, setGeneralSettings] = useState({
		enableNotifications: true,
		darkMode: false,
	});

	const [appearanceSettings, setAppearanceSettings] = useState({
		fontSize: 16,
		themeColor: "#333333",
	});

	const handleGeneralSettingChange = (key: keyof typeof generalSettings, value: boolean) => {
		setGeneralSettings((prevSettings) => ({ ...prevSettings, [key]: value }));
	};

	const handleAppearanceSettingChange = (key: keyof typeof appearanceSettings, value: number | string) => {
		setAppearanceSettings((prevSettings) => ({ ...prevSettings, [key]: value }));
	};

	const handleSaveSettings = () => {
		const newToast = (
			<>
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
					Settings saved successfully
				<ToastContainer />
			</>
		);
		
		// Append toasts
		setToasts(() => {
			return toasts.concat(
				newToast
			);
		});
	};

	const handleCancelSettings = () => {
		// Reset settings logic here
		setGeneralSettings({ enableNotifications: true, darkMode: false });
		setAppearanceSettings({ fontSize: 16, themeColor: "#333333" });
		
		const newToast = (
			<>
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
					Settings reset successfully
				<ToastContainer />
			</>
		);
		
		// Append toasts
		setToasts(() => {
			return toasts.concat(
				newToast
			);
		});
	};

	return (
		<div>
			{toasts.map((toast) => toast)}
			
			<Card className="w-full max-w-md m-auto">
				<CardBody>
				<p>General Settings</p>
				<Switch
					checked={generalSettings.enableNotifications}
					onChange={(value) => handleGeneralSettingChange("enableNotifications", value)}
				>
					Enable Notifications
				</Switch>
				<Switch
					checked={generalSettings.darkMode}
					onChange={(value) => handleGeneralSettingChange("darkMode", value)}
				>
					Dark Mode
				</Switch>
				</CardBody>
			</Card>

			<Card className="w-full max-w-md m-auto mt-4">
				<CardBody>
				<p>Appearance Settings</p>
				<p>Font Size</p>
				<Slider
					value={appearanceSettings.fontSize}
					min={12}
					max={24}
					onChange={(value) => handleAppearanceSettingChange("fontSize", value)}
				/>
				<p>Theme Color</p>
				<input
					type="color"
					value={appearanceSettings.themeColor}
					onChange={(e) => handleAppearanceSettingChange("themeColor", e.target.value)}
				/>
				</CardBody>
			</Card>

			<div className="flex justify-center mt-4">
				<Button.Group>
					<Button onClick={handleSaveSettings}>Save</Button>
					<Button onClick={handleCancelSettings}>Cancel</Button>
				</Button.Group>
			</div>
		</div>
	);
}

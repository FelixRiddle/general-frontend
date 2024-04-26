import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// /** @type {import('next').NextConfig} */
const nextConfig = {
};

// The package is not working 😡😡😡😡
// I've to do this for every nextjs package
/**
 * Update app information on the database
 */
function updateAppInfo() {
    const raw = fs.readFileSync(path.join(__dirname, "package.json"));
    const packageJson = JSON.parse(raw.toString());
    
    // Insert / Update process to the database
    const url = `http://localhost:24000`;
    const headers = {
        "Content-Type": "application/json"
    };
    const data = {
        name: packageJson.name,
        pid: process.pid,
        appType: "application",
        url: ``,
    };
    
    fetch(`${url}/process`, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
    }).then((res) => {
        // console.log(`Response body: `, res.body);
    }).catch((err) => {
        console.error(`Error: `, err);
    });
}

updateAppInfo();

export default nextConfig;

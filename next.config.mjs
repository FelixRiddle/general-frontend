import { updateAppInfo } from "felixriddle.pid-discovery";

(async () => {
    try {
        await updateAppInfo();
    } catch(err) {
        
    }
})();

// /** @type {import('next').NextConfig} */
const nextConfig = {
};

export default nextConfig;

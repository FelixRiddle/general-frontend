import { updateAppInfo } from "felixriddle.pid-discovery";

(async () => {
    try {
        await updateAppInfo();
        console.log(`App info updated`);
    } catch(err) {
        console.log(`Update app error info in the database`);
        console.error(err);
    }
})();

// /** @type {import('next').NextConfig} */
const nextConfig = {
};

export default nextConfig;

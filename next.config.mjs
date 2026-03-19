/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['cloudinary'],
  images: {
    domains: ["img.icons8.com"],
  },
};

export default nextConfig;
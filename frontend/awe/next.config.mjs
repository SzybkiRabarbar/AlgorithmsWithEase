import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'styles')],
    prependData: '@use "@/utils/_colors.scss" as *;'
  },
};

export default nextConfig;

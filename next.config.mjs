/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
  
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    // Não falhar o build por warnings de lint em produção
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Se o build estiver falhando por tipos, descomente temporariamente
    // ignoreBuildErrors: true,
  },
};

export default nextConfig;


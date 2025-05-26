import { NextConfig } from 'next'
 
const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        //"https://linked-posts.routemisr.com/uploads/default-profile.png" 
        protocol: 'https',
        hostname: 'linked-posts.routemisr.com',
        port: '',
        pathname: '/uploads/**',
        search: '',
      },
    ],
  },
}
 
export default config

/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'encrypted-tbn2.gstatic.com',
              port: '',
              pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'ibb.co',
                port: '',
                pathname: '/**',
              },
              {
                protocol: 'https',
                hostname: 'demo.sirv.com',
                port: '',
                pathname: '/**',
              },
          ],
        
    },
 
}

module.exports = nextConfig


   // async redirects() {
    //     return [
    //       {
    //         source: '/',
    //         destination: '/form',
    //         permanent: true,
    //       },
    //     ]
    //   },
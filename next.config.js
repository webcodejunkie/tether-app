module.exports = {
  images: {
    domains: ['https://via.placeholder.com/500'],
  },
  reactStrictMode: true,
  env: {
    RAWG_API_KEY: process.env.RAWG_API_KEY,
  },
  async redirect() {
    return [
      {
        source: '/',
        destination: '/welcome',
        permant: true,
      },
    ]
  }
}
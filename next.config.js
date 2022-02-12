module.exports = {
    reactStrictMode: true,
    distDir: "out",
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        BASE_URL: process.env.BASE_URL,
    },
};

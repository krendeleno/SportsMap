const { patchWebpackConfig } = require('next-global-css');

const BASE_PATH = process.env.BASE_PATH || '';
const BACKEND_FULL = process.env.BACKEND_FULL || 'https://sportsmap.spb.ru/new-api/v1/';
const BACKEND = process.env.BACKEND || 'https://sportsmap.spb.ru/';

module.exports = {
    typescript: {
        ignoreBuildErrors: true,
    },
    env: {
        BASE_PATH,
        BACKEND_FULL,
        BACKEND,
    },
    images: {
        domains: ['storage.yandexcloud.net'],
    },

    webpack(config, options) {
        patchWebpackConfig(config, options);

        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                resourceQuery: { not: /url/ }, // exclude if *.svg?url
                use: ['@svgr/webpack'],
            }
        );

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },
};

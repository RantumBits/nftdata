module.exports = {
    siteTitle: 'rantum.crypto',
    siteDesc: 'crypto art data, info, sales, graphs',
    siteAuthor: 'ecomloop',
    siteLogoUrl: 'src/images/gatsby-icon.png',

    manifestName: 'rantum.art',
    manifestShortName: 'rantum', // max 12 characters
    manifestStartUrl: 'https://rantum.crypto/',
    manifestBackgroundColor: '#264653',
    manifestThemeColor: '#264653',
    manifestDisplay: 'standalone',
    manifestIcon: 'src/images/hodloot_logo.png',

    // This path is subpath of your hosting https://your.domain/gatsby-eth-dapp-starter/
    // pathPrefix: `/gatsby-eth-dapp-starter/`,
    pathPrefix: '/',

    // social
    socialLinks: [
        {
            icon: 'fa-github',
            name: 'Github',
            url: 'https://github.com/ecomloop',
        },
        {
            icon: 'fa-twitter',
            name: 'Twitter',
            url: 'https://twitter.com/rantumbits',
        },

        {
            icon: 'fa-envelope-o',
            name: 'Email',
            url: 'mailto:andrew@ecomloop.com',
        },
    ],
};

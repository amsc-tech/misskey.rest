// vetur.config.js
/** @type {import('vls').VeturConfig} */
module.exports = {
    settings: {
        "vetur.useWorkspaceDependencies": true,
        "vetur.experimental.templateInterpolationService": true
    },
    projects: [
        './packages/client',
        './packages/backend',
    ]
}
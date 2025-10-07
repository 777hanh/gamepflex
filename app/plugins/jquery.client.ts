import jQuery from 'jquery';
// Rely on Nuxt global type for defineNuxtPlugin (ambient)

// Expose globally for legacy scripts (phase 1 migration)
// Use window existence to gate client execution (avoids linter rule re process.client)
// if (typeof window !== 'undefined') {
//     // @ts-expect-error: augmenting window with jQuery for legacy code
//     window.jQuery = jQuery;
//     // @ts-expect-error: augmenting window with $ alias for legacy code
//     window.$ = jQuery;
// }

// Plugin export using plain function (avoids missing helper during initial TS analysis)
// export default (_nuxtApp: any) => {
//     return {
//         provide: { $: jQuery }
//     };
// };

export default defineNuxtPlugin((_nuxtApp) => {
    if (typeof window !== 'undefined') {
        // @ts-expect-error: augmenting window with jQuery for legacy code
        window.jQuery = jQuery;
        // @ts-expect-error: augmenting window with $ alias for legacy code
        window.$ = jQuery;
    } else {
        return {
            provide: { $: jQuery }
        };
    }
});

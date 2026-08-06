if (typeof window !== "undefined") {
    // Docusaurus calls `window.gtag` after client-side navigation. The PW 1.0
    // Web Components bundle installs Zone.js, which can cause that callback to
    // run before Docusaurus' inline analytics bootstrap has created the global
    // function. Keep the standard Google dataLayer queue available first so a
    // blocked or delayed analytics script can never crash the documentation.
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== "function") {
        window.gtag = function gtag() {
            window.dataLayer.push(arguments);
        };
    }

    require('../node_modules/provenance-widgets/web-components/index.js');
}

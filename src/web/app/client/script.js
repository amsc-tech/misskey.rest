/**
 * MISSKEY CLIENT ENTRY POINT
 */
(() => {
	const head = document.getElementsByTagName('head')[0];

	// Detect user agent
	const ua = navigator.userAgent.toLowerCase();
	const isMobile = /mobile|iphone|ipad|android/.test(ua);

	isMobile ? mountMobile() : mountDesktop();

	/**
	 * Mount the desktop app
	 */
	function mountDesktop() {
		const script = document.createElement('script');
		script.setAttribute('src', `/resources/desktop/script.${VERSION}.js`);
		script.setAttribute('async', 'true');
		script.setAttribute('defer', 'true');
		head.appendChild(script);
	}

	/**
	 * Mount the mobile app
	 */
	function mountMobile() {
		const meta = document.createElement('meta');
		meta.setAttribute('name', 'viewport');
		meta.setAttribute('content', 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no');
		head.appendChild(meta);

		const script = document.createElement('script');
		script.setAttribute('src', `/resources/mobile/script.${VERSION}.js`);
		script.setAttribute('async', 'true');
		script.setAttribute('defer', 'true');
		head.appendChild(script);
	}
})();

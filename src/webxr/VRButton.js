class VRButton {

	static createButton( renderer, options ) {

		if ( options ) {

			console.error( 'THREE.VRButton: The "options" parameter has been removed. Please set the reference space type via renderer.xr.setReferenceSpaceType() instead.' );

		}

		const div = document.createElement( 'div' );

		const parser = new DOMParser();
		
		const svgStr = `<svg style="fill:#FFFFFF" version="1.1" x="0px" y="0px"
		width="24px" height="16px" viewBox="0 0 28 18" xml:space="preserve">
		<path d="M26.8,1.1C26.1,0.4,25.1,0,24.2,0H3.4c-1,0-1.7,0.4-2.4,1.1C0.3,1.7,0,2.7,0,3.6v10.7
		c0,1,0.3,1.9,0.9,2.6C1.6,17.6,2.4,18,3.4,18h5c0.7,0,1.3-0.2,1.8-0.5c0.6-0.3,1-0.8,1.3-1.4l
		1.5-2.6C13.2,13.1,13,13,14,13v0h-0.2 h0c0.3,0,0.7,0.1,0.8,0.5l1.4,2.6c0.3,0.6,0.8,1.1,1.3,
		1.4c0.6,0.3,1.2,0.5,1.8,0.5h5c1,0,2-0.4,2.7-1.1c0.7-0.7,1.2-1.6,1.2-2.6 V3.6C28,2.7,27.5,
		1.7,26.8,1.1z M7.4,11.8c-1.6,0-2.8-1.3-2.8-2.8c0-1.6,1.3-2.8,2.8-2.8c1.6,0,2.8,1.3,2.8,2.8
		C10.2,10.5,8.9,11.8,7.4,11.8z M20.1,11.8c-1.6,0-2.8-1.3-2.8-2.8c0-1.6,1.3-2.8,2.8-2.8C21.7
		,6.2,23,7.4,23,9 C23,10.5,21.7,11.8,20.1,11.8z"/>
		</svg>`;

		const el = parser.parseFromString(`<div id="webxr-ui-svg">${svgStr}</div>`, "text/html");
		const ele = el.getElementById("webxr-ui-svg");
		div.appendChild(ele);

		function showEnterVR( /*device*/ ) {

			let currentSession = null;

			function onSessionStarted( session ) {

				session.addEventListener( 'end', onSessionEnded );

				renderer.xr.setSession( session );
				// div.textContent = 'EXIT VR';

				currentSession = session;

			}

			function onSessionEnded( /*event*/ ) {

				currentSession.removeEventListener( 'end', onSessionEnded );

				// div.textContent = 'ENTER VR';

				currentSession = null;

			}

			//

			div.style.display = '';

			div.style.cursor = 'pointer';
			div.style.left = 'calc(100% - 50px)';
			div.style.width = '50px';
			
			const textEle = document.createElement('p');
			textEle.innerHTML = 'ON VR';
			// div.textContent = 'ENTER VR';
			// div.appendChild(textEle)

			div.onmouseenter = function () {

				div.style.opacity = '1.0';

			};

			div.onmouseleave = function () {

				div.style.opacity = '0.5';

			};

			div.onclick = function () {

				if ( currentSession === null ) {

					// WebXR's requestReferenceSpace only works if the corresponding feature
					// was requested at session creation time. For simplicity, just ask for
					// the interesting ones as optional features, but be aware that the
					// requestReferenceSpace call will fail if it turns out to be unavailable.
					// ('local' is always available for immersive sessions and doesn't need to
					// be requested separately.)

					const sessionInit = { optionalFeatures: [ 'local-floor', 'bounded-floor', 'hand-tracking' ] };
					navigator.xr.requestSession( 'immersive-vr', sessionInit ).then( onSessionStarted );

				} else {

					currentSession.end();

				}

			};

		}

		function disableButton() {

			div.style.display = '';

			div.style.cursor = 'auto';
			div.style.left = 'calc(50% - 75px)';
			div.style.width = '150px';

			div.onmouseenter = null;
			div.onmouseleave = null;

			div.onclick = null;

		}

		function showWebXRNotFound() {

			disableButton();

			// div.textContent = 'VR NOT SUPPORTED';

		}
		// const generateXRIconString = (height)=> {
		// 	let aspect = 28 / 18;
		// 	return `<svg version="1.1" x="0px" y="0px"
		// 		width="${aspect * height}px" height="${height}px" viewBox="0 0 28 18" xml:space="preserve">
		// 		<path d="M26.8,1.1C26.1,0.4,25.1,0,24.2,0H3.4c-1,0-1.7,0.4-2.4,1.1C0.3,1.7,0,2.7,0,3.6v10.7
		// 		c0,1,0.3,1.9,0.9,2.6C1.6,17.6,2.4,18,3.4,18h5c0.7,0,1.3-0.2,1.8-0.5c0.6-0.3,1-0.8,1.3-1.4l
		// 		1.5-2.6C13.2,13.1,13,13,14,13v0h-0.2 h0c0.3,0,0.7,0.1,0.8,0.5l1.4,2.6c0.3,0.6,0.8,1.1,1.3,
		// 		1.4c0.6,0.3,1.2,0.5,1.8,0.5h5c1,0,2-0.4,2.7-1.1c0.7-0.7,1.2-1.6,1.2-2.6 V3.6C28,2.7,27.5,
		// 		1.7,26.8,1.1z M7.4,11.8c-1.6,0-2.8-1.3-2.8-2.8c0-1.6,1.3-2.8,2.8-2.8c1.6,0,2.8,1.3,2.8,2.8
		// 		C10.2,10.5,8.9,11.8,7.4,11.8z M20.1,11.8c-1.6,0-2.8-1.3-2.8-2.8c0-1.6,1.3-2.8,2.8-2.8C21.7
		// 		,6.2,23,7.4,23,9 C23,10.5,21.7,11.8,20.1,11.8z"/>
		// 	</svg>`;
		// };
		// const svgString = generateXRIconString(10);
		
		function stylizeElement( element ) {

			element.style.position = 'absolute';
			element.style.bottom = '0px';
			element.style.padding = '4px';
			// element.style.border = '1px solid #fff';
			element.style.borderRadius = '4px';
			element.style.background = 'rgba(0,0,0,0.1)';
			element.style.color = '#fff';
			element.style.font = 'normal 13px sans-serif';
			element.style.textAlign = 'center';
			element.style.opacity = '0.5';
			element.style.outline = 'none';
			element.style.zIndex = '999';

		}

		if ( 'xr' in navigator ) {

			div.id = 'VRButton';
			div.style.display = 'none';

			stylizeElement( div );

			navigator.xr.isSessionSupported( 'immersive-vr' ).then( function ( supported ) {

				supported ? showEnterVR() : showWebXRNotFound();

			} );

			return div;

		} else {

			const message = document.createElement( 'a' );

			if ( window.isSecureContext === false ) {

				message.href = document.location.href.replace( /^http:/, 'https:' );
				message.innerHTML = 'WEBXR NEEDS HTTPS'; // TODO Improve message

			} else {

				message.href = 'https://immersiveweb.dev/';
				message.innerHTML = 'WEBXR NOT AVAILABLE';

			}

			message.style.left = 'calc(50% - 90px)';
			message.style.width = '180px';
			message.style.textDecoration = 'none';

			stylizeElement( message );

			return message;

		}

	}

}

export { VRButton };

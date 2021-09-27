import App from '@src/App.js';

(function() {
    const body = document.body;
    body.innerHTML = `
        <div id="root"></div>
    `;
    new App({}, body.firstElementChild);
})();

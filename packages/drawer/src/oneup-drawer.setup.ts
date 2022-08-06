const styleElement = document.createElement('style');
const headElement = document.getElementsByTagName('head')[0];
const cssContent = '.oneup-drawer-opened { overflow: hidden !important; }';

styleElement.type = 'text/css';
styleElement.appendChild(document.createTextNode(cssContent));
headElement.appendChild(styleElement);

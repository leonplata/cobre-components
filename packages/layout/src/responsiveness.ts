export declare type ResponsiveWidthChanged =
  | 'enteredXS'
  | 'enteredSM'
  | 'enteredMD'
  | 'enteredLG'
  | 'enteredXL';

function listenAnimationEnd(event: AnimationEvent) {
  if (
    event.animationName === 'enteredXS' ||
    event.animationName === 'enteredSM' ||
    event.animationName === 'enteredMD' ||
    event.animationName === 'enteredLG' ||
    event.animationName === 'enteredXL'
  ) {
    const customEvent = new CustomEvent<ResponsiveWidthChanged>(
      'responsive-width-changed',
      {
        detail: event.animationName,
      }
    );
    window.dispatchEvent(customEvent);
  }
}

let hasInitialized = false;

export function initializeResponsiveEvents() {
  if (hasInitialized) {
    return;
  }
  hasInitialized = true;
  document.body.addEventListener('animationend', listenAnimationEnd);

  const styleElement = document.createElement('style');
  const headElement = document.getElementsByTagName('head')[0];
  const cssContent = `
  @media (min-width: 576px) { body { animation: enteredSM 0s; } }
  @media (min-width: 768px) { body { animation: enteredMD 0s; } }
  @media (min-width: 992px) { body { animation: enteredLG 0s; } }
  @media (min-width: 1200px) { body { animation: enteredXL 0s; } }
  @keyframes enteredSM { from { opacity: 1; } to { opacity: 1; } }
  @keyframes enteredMD { from { opacity: 1; } to { opacity: 1; } }
  @keyframes enteredLG { from { opacity: 1; } to { opacity: 1; } }
  @keyframes enteredXL { from { opacity: 1; } to { opacity: 1; } }
  `;

  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode(cssContent));
  headElement.appendChild(styleElement);
}

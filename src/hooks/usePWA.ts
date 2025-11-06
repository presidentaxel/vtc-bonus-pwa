import { useEffect, useState } from 'react';


export function usePWA() {
const [isStandalone, setStandalone] = useState<boolean>(false);
useEffect(() => {
const mq = window.matchMedia('(display-mode: standalone)');
setStandalone(mq.matches || (window.navigator as any).standalone === true);
const handler = () => setStandalone(mq.matches || (window.navigator as any).standalone === true);
mq.addEventListener?.('change', handler);
return () => mq.removeEventListener?.('change', handler);
}, []);
return { isStandalone };
}
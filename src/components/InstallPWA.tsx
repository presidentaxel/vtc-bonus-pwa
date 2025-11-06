import React from 'react';
import { usePWA } from '../hooks/usePWA';


export default function InstallPWA() {
const { isStandalone } = usePWA();
if (isStandalone) return null;
const isiOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
return (
<div className="card">
<b>Installer l\'appli</b>
<div className="sub" style={{marginTop:6}}>
{isiOS ? (
<>Sur iOS : touche <b>Partager</b> puis <b>\"Sur l\'écran d\'accueil\"</b>.</>
) : (
<>Sur Android Chrome : menu ⋮ puis <b>\"Installer l\'application\"</b>.</>
)}
</div>
</div>
);
}
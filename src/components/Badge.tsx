import React from 'react';




export default function Badge({ icon, text, color }: { icon?: string; text: string; color?: string; }) {
return (
<span className="badge" style={{ borderColor: color ? color : undefined }}>
{icon && <span aria-hidden>{icon}</span>}
<span>{text}</span>
</span>
);
}
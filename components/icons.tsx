export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className}>
      <path d="M16.02 3C9.4 3 4 8.37 4 14.98c0 2.2.6 4.26 1.63 6.03L4 29l8.2-1.58a13 13 0 0 0 3.82.57h.01c6.62 0 12.02-5.37 12.02-11.98C28.05 8.37 22.65 3 16.02 3Zm7.05 17.06c-.3.83-1.72 1.6-2.4 1.7-.61.09-1.4.13-2.26-.14-.52-.16-1.19-.38-2.05-.75-3.6-1.55-5.95-5.19-6.13-5.43-.18-.24-1.47-1.95-1.47-3.73 0-1.77.93-2.64 1.26-3 .33-.36.72-.45.96-.45.24 0 .48 0 .69.01.22.01.52-.08.81.62.3.72 1.02 2.5 1.11 2.68.09.18.15.4.03.64-.12.24-.18.39-.36.6-.18.21-.38.47-.54.63-.18.18-.37.37-.16.73.21.36.93 1.53 2 2.48 1.37 1.22 2.53 1.6 2.89 1.78.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.81-.18.33.12 2.1.99 2.46 1.17.36.18.6.27.69.42.09.15.09.85-.21 1.67Z" />
    </svg>
  );
}

export function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="1.5" />
      <path d="m3.5 6 8.5 6.5L20.5 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <path
        d="M6.5 3.5h3l1.5 4.5-2.3 1.7a11.5 11.5 0 0 0 5.6 5.6l1.7-2.3 4.5 1.5v3a1.5 1.5 0 0 1-1.6 1.5C11.5 18.7 5.3 12.5 4 5.1A1.5 1.5 0 0 1 5.5 3.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <path
        d="M12 21s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  );
}

export function PassportIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className={className}>
      <rect x="5" y="2.5" width="14" height="19" rx="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.6" />
      <path d="M8.5 15.5h7M9.5 18h5" strokeLinecap="round" />
    </svg>
  );
}

export function KeyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className={className}>
      <circle cx="8" cy="15.5" r="4" />
      <path d="M11 12.5 19.5 4M16.5 6.5l2.3 2.3M14 9l2 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BankIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className={className}>
      <path d="M3 9.5 12 4l9 5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 9.5v9M9 9.5v9M15 9.5v9M19.5 9.5v9" strokeLinecap="round" />
      <path d="M3 19h18" strokeLinecap="round" />
    </svg>
  );
}

export function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className={className}>
      <rect x="2.5" y="7.5" width="19" height="12" rx="1.6" strokeLinejoin="round" />
      <path d="M8.5 7.5v-2a1.6 1.6 0 0 1 1.6-1.6h3.8A1.6 1.6 0 0 1 15.5 5.5v2" strokeLinejoin="round" />
      <path d="M2.5 13h19" />
    </svg>
  );
}

export function ScalesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className={className}>
      <path d="M12 3v17M8 20h8" strokeLinecap="round" />
      <path d="M4 7h6M14 7h6" strokeLinecap="round" />
      <path d="M4 7 1.5 12a2.7 2.7 0 0 0 5 0Zm16 0-2.5 5a2.7 2.7 0 0 0 5 0Z" strokeLinejoin="round" />
    </svg>
  );
}

export function HandshakeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className={className}>
      <circle cx="8" cy="8" r="4" />
      <circle cx="17" cy="10" r="3.4" />
      <path d="M3 20c.6-3 2.6-5 5-5s4 1.6 4.8 3.6M11.5 20c.5-2.6 2.2-4.2 4.3-4.4 1.9-.2 3.6.8 4.7 2.4" strokeLinecap="round" />
    </svg>
  );
}

export function BookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className={className}>
      <path
        d="M12 5.5c-1.6-1.2-4-1.7-6.5-1.5a1 1 0 0 0-.9 1v12.6a1 1 0 0 0 1.1 1c2.2-.1 4.4.4 6.3 1.6 1.9-1.2 4.1-1.7 6.3-1.6a1 1 0 0 0 1.1-1V5a1 1 0 0 0-.9-1c-2.5-.2-4.9.3-6.5 1.5Z"
        strokeLinejoin="round"
      />
      <path d="M12 5.5v14" />
    </svg>
  );
}

import { Youtube, Facebook, Linkedin } from "lucide-react";

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

const socialLinks = [
  {
    href: "https://youtube.com/@testologygeeks?si=G00dkV08idhW44vD",
    icon: Youtube,
    label: "YouTube",
  },
  {
    href: "https://www.facebook.com/groups/750516570186092",
    icon: Facebook,
    label: "Facebook",
  },
  {
    href: "https://www.linkedin.com/in/omar-zidan-%F0%9F%8D%89-56b851108",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "https://chat.whatsapp.com/DkquGZvYaVl6LhhWE7CznY",
    icon: WhatsAppIcon,
    label: "WhatsApp",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border px-4 py-6 text-muted-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center text-sm sm:flex-row sm:text-left">
        <p className="m-0">&copy; {year} TestologyAi. All rights reserved.</p>
        <div className="flex items-center gap-3">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
        <p className="m-0 text-xs">Practice smarter, certify faster.</p>
      </div>
    </footer>
  );
}

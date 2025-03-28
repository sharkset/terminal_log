
import Link from 'next/link';

interface NavigationLinksProps {
  className?: string
}

export default function NavigationLinks ({className}: NavigationLinksProps) {

  return (
    <>
      <Link 
        href='/' 
        className={`text-foreground ${className}`}
      >
        DASHBOARD
      </Link>
      <Link 
        href='/terminal' 
        className={`text-foreground ${className}`}
      >
        TERMINAL
      </Link>
    </>
  );
}

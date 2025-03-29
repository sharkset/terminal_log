
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
      <Link 
        href='https://docs.defaicreator.bot/'
        target='_blank'
        className={`text-foreground ${className}`}
      >
        DOCS
      </Link>
      <Link 
        href='https://t.me/defaicreatorbot?start'
        target='_blank'
        className={`text-foreground ${className} text-[#FDD72D]`}
      >
        CREATE NEW CALLER AGENT
      </Link>
    </>
  );
}

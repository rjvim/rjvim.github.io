import type { Icon as LucideIcon, LucideProps } from "lucide-react";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Code,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Info,
  Laptop,
  Loader2,
  LogIn,
  LogOut,
  Mail,
  Menu,
  Moon,
  MoreVertical,
  Newspaper,
  Pizza,
  Plus,
  Rss,
  SendHorizonal,
  Settings,
  ShareIcon,
  SunMedium,
  Tag,
  Tags,
  Trash,
  User,
  X,
  Computer,
} from "lucide-react";
type IconProps = React.HTMLAttributes<SVGElement>;

export type Icon = typeof LucideIcon;

export const Icons = {
  computer: Computer,
  // logo: Code,
  close: X,
  menu: Menu,
  code: Code,
  copied: ClipboardCheck,
  success: CheckCircle,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  tags: Tags,
  tag: Tag,
  share: ShareIcon,
  posts: Newspaper,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  logIn: LogIn,
  logOut: LogOut,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  info: Info,
  arrowUpRight: ArrowUpRight,
  chevronDown: ChevronDown,
  mail: Mail,
  send: SendHorizonal,
  logo: ({ ...props }: LucideProps) => (
    <svg
      width={400}
      height={400}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M135 50C154.33 50 170 65.67 170 85L170 350L125 350C105.67 350 90 334.33 90 315L90 50L135 50Z"
        fill="var(--logo-color-1)"
      />
      <path
        d="M310 315C310 334.33 294.33 350 275 350L90 350L90 305C90 285.67 105.67 270 125 270L310 270L310 315Z"
        fill="var(--logo-color-2)"
      />
      <path
        d="M250 315C250 334.33 234.33 350 215 350L90 350L90 305C90 285.67 105.67 270 125 270L250 270L250 315Z"
        fill="var(--logo-color-3)"
      />
    </svg>
  ),
  check: Check,
  rss: Rss,
};

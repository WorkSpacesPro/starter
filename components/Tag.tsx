import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
  className?: string
  title?: string
  children?: React.ReactNode
}

const Tag = ({ text, className = '', title, children }: Props) => {
  const baseStyle =
    'bg-primary-100/50 dark:bg-primary-900/30 text-primary-500 dark:text-primary-300 inline-flex items-center rounded-sm px-1.5 py-0.5 text-xs'

  // 否则返回可点击的链接
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className={`${baseStyle} hover:bg-primary-200/60 dark:hover:bg-primary-800/40 transition-colors duration-200 ${className}`}
      title={title}
    >
      {children || text}
    </Link>
  )
}

export default Tag

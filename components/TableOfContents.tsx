import { cn } from '@/lib/utils'
import Tag from './Tag'

// 更新接口以匹配实际数据结构，添加摘要和标签字段
export interface Heading {
  value: string
  url: string
  depth: number
  summary?: string // 摘要字段
  tags?: string[] // 标签字段
}

interface TableOfContentsProps {
  headings: Heading[]
  className?: string
  isMobile?: boolean
  onItemClick?: () => void
  showSummary?: boolean // 控制是否显示摘要的属性
  maxHeight?: string // 控制最大高度的属性
  hideScrollbar?: boolean // 是否隐藏滚动条
}

// 辅助函数：截断摘要文本
const truncateSummary = (text: string, maxLength: number = 120): string => {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export default function TableOfContents({
  headings = [],
  className,
  isMobile = false,
  onItemClick,
  showSummary = false, // 默认不显示摘要
  maxHeight = '70vh', // 默认最大高度为视口高度的70%
  hideScrollbar = true, // 默认隐藏滚动条
}: TableOfContentsProps) {
  // 优先查找 level 2 (H2), 使用 'depth'
  let tocHeadings = headings.filter((h) => h.depth === 2)

  // 如果找不到 level 2，则查找 level 3 (H3), 使用 'depth'
  if (tocHeadings.length === 0) {
    tocHeadings = headings.filter((h) => h.depth === 3)
  }

  // 如果 level 2 和 level 3 都找不到，则不渲染目录
  if (tocHeadings.length === 0) {
    return null
  }

  const scrollToHeading = (url: string) => {
    const target = document.querySelector(url)
    if (target) {
      const headerOffset = 80 // 顶部导航栏的高度 + 一些额外间距
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })

      // 如果是移动端，点击后关闭目录
      if (isMobile) {
        onItemClick?.()
      }
    }
  }

  // 为不同浏览器准备隐藏滚动条的样式
  const scrollbarStyles = hideScrollbar
    ? {
        msOverflowStyle: 'none' as const, // IE and Edge
        scrollbarWidth: 'none' as const, // Firefox
      }
    : {}

  return (
    <nav
      className={cn('toc', className, isMobile ? 'mobile-toc' : '')}
      aria-label="Table of contents"
    >
      <div
        className={cn(
          'overflow-y-auto pr-2',
          !isMobile && 'overflow-auto',
          hideScrollbar && 'webkit-scrollbar-hide'
        )}
        style={{
          ...(!isMobile ? { maxHeight } : {}),
          ...scrollbarStyles,
        }}
      >
        <ul className={cn(showSummary ? 'space-y-6' : 'space-y-2')}>
          {tocHeadings.map((heading) => (
            <li
              key={heading.url}
              className={cn(
                'text-sm',
                showSummary && heading.summary
                  ? 'mb-1 border-b border-gray-100 pb-4 dark:border-gray-800'
                  : 'pb-2'
              )}
            >
              <a
                href={heading.url}
                className="text-muted-foreground hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToHeading(heading.url)
                }}
              >
                {heading.value}
              </a>

              {showSummary && heading.summary && (
                <div className="mt-2 space-y-1">
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => scrollToHeading(heading.url)}
                    aria-label={`跳转到"${heading.value}"章节`}
                  >
                    <p className="text-muted-foreground/80 hover:text-muted-foreground line-clamp-2 text-xs transition-colors duration-200">
                      {truncateSummary(heading.summary)}
                    </p>
                  </button>

                  {heading.tags && heading.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {heading.tags.map((tag, index) => (
                        <Tag key={`${heading.url}-tag-${index}`} text={tag} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

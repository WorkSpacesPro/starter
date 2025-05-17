import { getAllFilesFrontMatter } from '@/lib/mdx'
import Link from '@/components/Link'

export const metadata = {
  title: '首页 - 博客',
  description: '大表哥的博客首页',
}

export default async function Page() {
  const posts = await getAllFilesFrontMatter('blog')

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          最新博客
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          欢迎来到大表哥的博客！以下是最新发布的文章：
        </p>
      </div>

      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {posts.map((post) => {
          const { slug, date, title, summary } = post
          return (
            <li key={slug} className="py-6">
              <article>
                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">发布时间</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      {date}
                    </dd>
                  </dl>
                  <div className="space-y-5 xl:col-span-3">
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-gray-900 dark:text-gray-100"
                        >
                          {title}
                        </Link>
                      </h2>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {summary}
                      </div>
                    </div>
                    <div className="text-base font-medium leading-6">
                      <Link
                        href={`/blog/${slug}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        阅读更多 →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
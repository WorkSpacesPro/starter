import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json'
import { notFound } from 'next/navigation'

const POSTS_PER_PAGE = 5

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  return Object.keys(tagCounts).flatMap((tag) => {
    const postCount = tagCounts[tag]
    const totalPages = Math.max(1, Math.ceil(postCount / POSTS_PER_PAGE))
    return Array.from({ length: totalPages }, (_, i) => ({
      tag: encodeURI(tag),
      page: (i + 1).toString(),
    }))
  })
}

export default async function TagPage(props: { params: Promise<{ tag: string; page: string }> }) {
  const params = await props.params
  const tag = decodeURI(params.tag)
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const pageNumber = parseInt(params.page)

  // 修改过滤逻辑，支持从headingSummaries中获取标签
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter((post) => {
        // 首先检查顶层tags
        if (post.tags && post.tags.length > 0) {
          return post.tags.map((t) => slug(t)).includes(tag)
        }
        // 如果顶层tags为空但有headingSummaries，则从中查找标签
        else if (post.headingSummaries && post.headingSummaries.length > 0) {
          // 检查任意headingItem中是否包含目标标签
          return post.headingSummaries.some((headingItem) => {
            if (headingItem.tags && Array.isArray(headingItem.tags)) {
              return headingItem.tags.map((t) => slug(t)).includes(tag)
            }
            return false
          })
        }
        return false
      })
    )
  )

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  // Return 404 for invalid page numbers or empty pages
  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound()
  }
  const initialDisplayPosts = filteredPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={title}
    />
  )
}

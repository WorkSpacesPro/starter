interface Tag {
  name: string
  description: string
  color?: string
}

const tags: Record<string, Tag> = {
  next: {
    name: 'Next.js',
    description: 'React框架，用于构建现代化的Web应用',
    color: 'bg-black text-white',
  },
  react: {
    name: 'React',
    description: '用于构建用户界面的JavaScript库',
    color: 'bg-blue-500 text-white',
  },
  web开发: {
    name: 'Web开发',
    description: 'Web应用开发相关的技术和最佳实践',
    color: 'bg-green-500 text-white',
  },
  tailwind: {
    name: 'Tailwind CSS',
    description: '实用优先的CSS框架',
    color: 'bg-teal-500 text-white',
  },
  博客开发: {
    name: '博客开发',
    description: '个人博客开发相关的经验和教程',
    color: 'bg-purple-500 text-white',
  },
  技术选型: {
    name: '技术选型',
    description: '项目技术栈的选择和决策过程',
    color: 'bg-yellow-500 text-black',
  },
  前端框架: {
    name: '前端框架',
    description: '现代前端框架相关的知识和实践',
    color: 'bg-red-500 text-white',
  },
  入门教程: {
    name: '入门教程',
    description: '适合初学者的基础教程',
    color: 'bg-blue-400 text-white',
  },
}

export default tags 
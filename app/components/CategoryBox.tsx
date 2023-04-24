'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { IconType } from 'react-icons'
import qs from 'query-string'
interface CategoryBoxProps {
  icon: IconType
  label: string
  selected?: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected
}) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    let currentQuery = {}
    // 检查 Params 是否存在
    if (params) {
      // 解析当前 url
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }
    // 反选操作
    if (params?.get('category') === label) {
      delete updatedQuery.category
    }
    // Stringify an object into a URL with a query string and sorting the keys.
    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery
      },
      { skipNull: true }
    )
    //跳转路由
    router.push(url)
  }, [label, router, params])

  return (
    <div
      onClick={handleClick}
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={26} />
      <div className='font-medium text-sm'>{label}</div>
    </div>
  )
}

export default CategoryBox


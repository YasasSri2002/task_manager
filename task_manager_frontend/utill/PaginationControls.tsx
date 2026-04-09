'use client'

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import DynamicIcon from './DynamicIcon'

interface PaginationControlsProps {
  hasNextPage: boolean
  hasPrevPage: boolean
  endPage: number
  perPageNumber: string
  routerPath: string
}

const PaginationControls: FC<PaginationControlsProps> = (
  {
    hasNextPage,
    hasPrevPage,
    endPage,
    perPageNumber,
    routerPath
  }
) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = searchParams.get('page') ?? '1'
  const per_page = searchParams.get('per_page') ?? perPageNumber
  


  return (
    <div className='flex items-center gap-2'>
      <button
        className='bg-blue-500 rounded-sm text-white px-2 py-1'
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/${routerPath}/?page=${Number(page) - 1}&per_page=${per_page}`)
        }}>
        <DynamicIcon name="FaChevronLeft" className='w-5 h-5'/>
      </button>

      <div className='shrink-0'>
        {page} / {endPage}
      </div>

      <button
        className='bg-blue-500 rounded-sm text-white px-2 py-1'
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/${routerPath}/?page=${Number(page) + 1}&per_page=${per_page}`)
        }}>
        <DynamicIcon name="FaChevronRight" className='w-5 h-5'/>
      </button>
    </div>
  )
}

export default PaginationControls
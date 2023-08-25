'use client'

import { useRouter } from 'next/navigation'

import { PAGE_SIZE } from '~/app/admin/constants'

import { Pagination } from './ui/Pagination'

export function QuestionPagination({
  currentPage,
  questionCount,
}: {
  currentPage: number
  questionCount: number
}) {
  const router = useRouter()

  return (
    <Pagination
      current={currentPage}
      total={Math.ceil(questionCount / PAGE_SIZE)}
      // TODO: Add loading when changing page
      onChange={(page) => router.push('/admin?page=' + page)}
    />
  )
}

'use client'

import { useRouter } from 'next/navigation'

import { Pagination } from './ui/Pagination'

interface QuestionPaginationProps {
  currentPage: number
  questionCount: number
  pageSize: number
}

export function QuestionPagination({
  currentPage,
  questionCount,
  pageSize,
}: QuestionPaginationProps) {
  const router = useRouter()

  return (
    <Pagination
      current={currentPage}
      total={Math.ceil(questionCount / pageSize)}
      // TODO: Add loading when changing page
      onChange={(page) => router.push(`/admin?page=${page}&size=${pageSize}`)}
    />
  )
}

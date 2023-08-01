import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react'
import Image from 'next/image'

import { db } from '~/db'
import { questions } from '~/db/schema'
import { env } from '~/env.mjs'

import { AISwitch } from './AISwitch'

// TODO: Add virtual list or pagination
// TODO: Add 'Reactive' and 'Delete' actions
export async function QuestionList() {
  const data = await db.select().from(questions)

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Image</TableHeaderCell>
          <TableHeaderCell>AI</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((question) => (
          <TableRow key={question.id}>
            <TableCell width="400px">
              {/* FIXME: Image with src "<url>" has either width or height modified, but not the other. If you use CSS to change the size of your image, also include the styles 'width: "auto"' or 'height: "auto"' to maintain the aspect ratio. */}
              <Image
                src={`https://imagedelivery.net/${env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH}/${question.image}/public`}
                alt={`Question ${question.image}`}
                width={200}
                height={0}
                quality={1}
              />
            </TableCell>
            <TableCell>
              <AISwitch question={question} />
            </TableCell>
            <TableCell>
              {question.isActive ? (
                <Badge size="xs" color="green">
                  Active
                </Badge>
              ) : (
                <Badge size="xs" color="orange">
                  Expired
                </Badge>
              )}
            </TableCell>
            <TableCell className="space-x-2">
              {!question.isActive && (
                <Button size="xs" variant="secondary" color="orange">
                  Reactivate
                </Button>
              )}
              <Button size="xs" variant="secondary" color="red">
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

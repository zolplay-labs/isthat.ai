'use client'

import {
  Badge,
  Button,
  type Color,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from '@tremor/react'
import { useRef, useState } from 'react'
import { useImmer } from 'use-immer'

import { uploadQuestion } from '~/app/admin/action'

import { Dialog } from './ui/Dialog'

type FileStatus = 'Pending' | 'Uploading' | 'Success' | 'Fail'
const fileStatusColor: Record<FileStatus, Color> = {
  Pending: 'slate',
  Uploading: 'amber',
  Success: 'green',
  Fail: 'red',
}
type QuestionFile = { file: File; status: FileStatus; isAIGenerated: boolean }

const convertFileSizeToMB = (fileSize: number) => {
  return fileSize / 1024 / 1024
}

export function UploadQuestionsDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [files, updateFiles] = useImmer<QuestionFile[]>([])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const noFiles = files.length === 0
  const canUpload = files.every(({ status }) => status === 'Pending')
  const isLoading = files.some(({ status }) => status === 'Uploading')
  const handleSubmit = async () => {
    await Promise.all(
      files.map(async ({ file, isAIGenerated }, i) => {
        updateFiles((draftFiles) => {
          draftFiles[i]!.status = 'Uploading'
        })
        const fileFormData = new FormData()
        fileFormData.append('file', file)
        const { success } = await uploadQuestion({
          fileFormData,
          isAIGenerated,
        })
        updateFiles((draftFiles) => {
          draftFiles[i]!.status = success ? 'Success' : 'Fail'
        })
      })
    )
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Upload Questions</Button>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Upload Questions"
        className="space-y-4"
      >
        <input
          type="file"
          ref={fileInputRef}
          accept="image/jpeg, image/png, image/webp, image/gif, image/svg+xml"
          multiple
          hidden
          onChange={(e) => {
            updateFiles(
              Array.from(e.target.files || [], (file) => file)
                .filter((file) => {
                  if (convertFileSizeToMB(file.size) > 10) {
                    alert(`${file.name} is greater than 10 MB`)
                    return false
                  } else {
                    return true
                  }
                })
                .map(
                  (file) =>
                    ({
                      file,
                      isAIGenerated: false,
                      status: 'Pending',
                    } satisfies QuestionFile)
                )
            )
          }}
        />
        <Text>
          File size must be less than 10 MB. See:{' '}
          <a
            className="text-tremor-brand-emphasis underline"
            href="https://developers.cloudflare.com/images/cloudflare-images/upload-images/formats-limitations/#dimensions-and-sizes"
          >
            Cloudflare Document
          </a>
        </Text>
        {!noFiles && (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Filename</TableHeaderCell>
                <TableHeaderCell>Size</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>
                  AI Generated{' '}
                  <input
                    type="checkbox"
                    checked={files.every(({ isAIGenerated }) => isAIGenerated)}
                    onChange={(e) => {
                      updateFiles((draftFiles) =>
                        draftFiles.forEach((file) => {
                          file.isAIGenerated = e.target.checked
                        })
                      )
                    }}
                    disabled={!canUpload}
                  />
                </TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files.map(({ file, status, isAIGenerated }, i) => (
                <TableRow key={i}>
                  <TableCell>{file.name}</TableCell>
                  <TableCell>
                    {convertFileSizeToMB(file.size).toFixed(2)} MB
                  </TableCell>
                  <TableCell>
                    <Badge color={fileStatusColor[status]}>{status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <input
                      type="checkbox"
                      checked={isAIGenerated}
                      onChange={(e) => {
                        updateFiles((draftFiles) => {
                          draftFiles[i]!.isAIGenerated = e.target.checked
                        })
                      }}
                      disabled={!canUpload}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <div className="flex justify-between">
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="secondary"
          >
            {noFiles ? 'Select' : 'Reselect'} Images
          </Button>
          <Button
            disabled={noFiles || !canUpload}
            onClick={handleSubmit}
            loading={isLoading}
          >
            Upload
          </Button>
        </div>
      </Dialog>
    </>
  )
}

'use client'

import { Button, List, ListItem, Text } from '@tremor/react'
import { clsxm } from '@zolplay/utils'
import { useRef, useState } from 'react'

import { uploadQuestion } from '~/app/admin/action'
import { dialog } from '~/lib/dialog'

import { Dialog } from './ui/Dialog'

export function UploadQuestionsDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async () => {
    setIsLoading(true)
    const results = await Promise.allSettled(
      files.map(async (file) => {
        const data = new FormData()
        data.append('file', file)
        await uploadQuestion(data)
      })
    )

    setIsOpen(false)
    setFiles([])
    setIsLoading(false)

    const total = results.length
    const successLength = results.filter(
      (res) => res.status === 'fulfilled'
    ).length
    const errorLength = results.filter(
      (res) => res.status === 'rejected'
    ).length
    if (total === successLength) {
      await dialog.fire({
        title: `${total} files uploaded successfully!`,
        icon: 'success',
        confirmButtonColor: '#3b82f6',
      })
    } else if (total > successLength) {
      await dialog.fire({
        title: `${errorLength} out of ${total} files failed to upload successfully`,
        icon: 'warning',
        confirmButtonColor: '#3b82f6',
      })
    } else {
      await dialog.fire({
        title: `${total} files failed to upload successfully`,
        icon: 'error',
        confirmButtonColor: '#3b82f6',
      })
    }
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
            setFiles(Array.from(e.target.files || [], (file) => file))
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
        <List>
          {files.map((file, i) => (
            <ListItem
              key={i}
              className={clsxm(
                file.size / 1024 / 1024 > 10 && 'text-[#ef4444]'
              )}
            >
              <span>{file.name}</span>
              <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
            </ListItem>
          ))}
        </List>
        <div className="flex justify-between">
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="secondary"
          >
            Select Images
          </Button>
          <Button
            disabled={files?.length === 0}
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

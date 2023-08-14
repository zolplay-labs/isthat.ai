'use client'

import { Button, List, ListItem, Text } from '@tremor/react'
import { useRef, useState } from 'react'

import { addQuestions } from '~/app/admin/action'

import { Dialog } from '../ui/Dialog'

export function UploadQuestionsDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [questions, setQuestions] = useState<
    {
      file: File
      isAIGenerated: boolean
    }[]
  >([])

  const fileInputRef = useRef<HTMLInputElement>(null)

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
            setQuestions(
              Array.from(e.target.files || [], (file) => ({
                file,
                isAIGenerated: false,
              }))
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
        <List>
          {questions.map((image, index) => (
            <ListItem key={index}>
              <span>{image.file.name}</span>
              <span>
                <span className="mr-4">
                  {(image.file.size / 1024 / 1024).toFixed(2)} MB
                </span>
                <span className="mr-1">AI</span>
                <input
                  type="checkbox"
                  checked={image.isAIGenerated}
                  onChange={(e) => {
                    setQuestions(
                      questions.map((image, stateIndex) =>
                        index === stateIndex
                          ? {
                              file: image.file,
                              isAIGenerated: e.target.checked,
                            }
                          : image
                      )
                    )
                  }}
                />
              </span>
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
            disabled={questions.length === 0}
            onClick={async () => {
              await addQuestions(questions)
            }}
          >
            Upload
          </Button>
        </div>
      </Dialog>
    </>
  )
}

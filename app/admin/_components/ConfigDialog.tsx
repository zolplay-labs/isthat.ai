'use client'

import { Button, DatePicker, NumberInput, Text } from '@tremor/react'
import { useEffect, useState } from 'react'

import { changeConfig } from '~/app/admin/action'
import { type Config } from '~/db/queries'
import { dialog } from '~/lib/dialog'

import { Dialog } from './ui/Dialog'

export function ConfigDialog({ configData }: { configData: Config }) {
  const [isOpen, setIsOpen] = useState(false)

  const [releaseDate, setReleaseDate] = useState(configData.releaseDate)
  const [activeQuestionsLimit, setActiveQuestionsLimit] = useState(
    configData.activeQuestionsLimit
  )
  const [questionsPerChallenge, setQuestionsPerChallenge] = useState(
    configData.questionsPerChallenge
  )

  const [isChanged, setIsChanged] = useState(false)
  useEffect(() => {
    setIsChanged(
      releaseDate.getDate() !== configData.releaseDate?.getDate() ||
        activeQuestionsLimit !== configData.activeQuestionsLimit ||
        questionsPerChallenge !== configData.questionsPerChallenge
    )
  }, [releaseDate, activeQuestionsLimit, questionsPerChallenge, configData])

  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await changeConfig({
        releaseDate,
        activeQuestionsLimit,
        questionsPerChallenge,
      })
      setIsLoading(false)
      setIsOpen(false)
      await dialog.fire({
        title: 'Config is changed successfully!',
        icon: 'success',
        confirmButtonColor: '#3b82f6',
      })
    } catch (error) {
      setIsLoading(false)
      setIsOpen(false)
      await dialog.fire({
        title: 'Config failed to be changed!',
        icon: 'error',
        confirmButtonColor: '#3b82f6',
      })
    }
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Config</Button>
      <Dialog
        title="Config"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Text>Release Date</Text>
            <DatePicker
              className="w-2/3"
              maxDate={new Date()}
              enableClear={false}
              value={releaseDate}
              onValueChange={(value) =>
                setReleaseDate(value || new Date('2023-7-25'))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Text>Active Questions Limit</Text>
            <NumberInput
              className="w-2/5"
              min={0}
              value={activeQuestionsLimit}
              onValueChange={(value) => setActiveQuestionsLimit(value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Text>Questions Per Challenge</Text>
            <NumberInput
              className="w-2/5"
              min={0}
              value={questionsPerChallenge}
              onValueChange={(value) => setQuestionsPerChallenge(value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              loading={isLoading}
              onClick={handleSubmit}
              disabled={!isChanged}
            >
              Save & Change
            </Button>
            <Button onClick={() => setIsOpen(false)} color="gray">
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

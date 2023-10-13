'use client'

import { Button, NumberInput, Text } from '@tremor/react'
import { useEffect, useState } from 'react'

import { changeConfig } from '~/app/admin/action'
import { type Config } from '~/db/queries'

import { Dialog } from './ui/Dialog'

export function ConfigDialog({ config }: { config: Config }) {
  const [isOpen, setIsOpen] = useState(false)

  const [activeQuestionsLimit, setActiveQuestionsLimit] = useState(
    config.activeQuestionsLimit
  )
  const [questionsPerChallenge, setQuestionsPerChallenge] = useState(
    config.questionsPerChallenge
  )
  const [refreshIntervalHours, setRefreshIntervalHours] = useState(
    config.refreshIntervalHours
  )

  const [isChanged, setIsChanged] = useState(false)
  useEffect(() => {
    setIsChanged(
      activeQuestionsLimit !== config.activeQuestionsLimit ||
        questionsPerChallenge !== config.questionsPerChallenge ||
        refreshIntervalHours !== config.refreshIntervalHours
    )
  }, [
    activeQuestionsLimit,
    questionsPerChallenge,
    refreshIntervalHours,
    config,
  ])

  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await changeConfig({
        activeQuestionsLimit,
        questionsPerChallenge,
        refreshIntervalHours,
      })
      setIsLoading(false)
      setIsOpen(false)
      alert('Config is changed successfully!')
    } catch (error) {
      setIsLoading(false)
      setIsOpen(false)
      alert('Config failed to be changed!')
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
        <div className="grid grid-cols-2 items-center gap-y-4">
          <Text>Active Questions Limit</Text>
          <NumberInput
            min={0}
            value={activeQuestionsLimit}
            onValueChange={(value) => setActiveQuestionsLimit(value)}
          />
          <Text>Questions Per Challenge</Text>
          <NumberInput
            min={0}
            value={questionsPerChallenge}
            onValueChange={(value) => setQuestionsPerChallenge(value)}
          />
          <Text>Refresh Interval Hours</Text>
          <NumberInput
            min={1}
            max={24}
            value={refreshIntervalHours}
            onValueChange={(value) => setRefreshIntervalHours(value)}
          />
        </div>
        <div className="mt-4 flex justify-end gap-2">
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
      </Dialog>
    </>
  )
}

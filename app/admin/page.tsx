import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  Title,
} from '@tremor/react'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Panel - Is That AI',
  robots: 'noindex',
}

export default function Admin() {
  return (
    <main className="px-8 py-2">
      <Title>Admin Panel</Title>
      <Text>Is That AI</Text>

      <TabGroup className="mt-6">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Images</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Something awesome</TabPanel>
          <TabPanel>Many images</TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  )
}

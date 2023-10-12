export type Tier = { image: string; title: string; description: string }

const TIERS: Tier[] = [
  {
    image: '/images/result-tiers/ai-spy.jpg',
    title: 'AI Spy',
    description: "Can't slip an AI past you!",
  },
  {
    image: '/images/result-tiers/ai-detective.jpg',
    title: 'AI Detective',
    description: "You know what's real and what's not.",
  },
  {
    image: '/images/result-tiers/pixel-pro.jpg',
    title: 'Pixel Pro',
    description: "AI can't fake you out.",
  },
  {
    image: '/images/result-tiers/digital-diplomat.jpg',
    title: 'Digital Diplomat',
    description: 'Skilled in navigating the realms of reality and AI.',
  },
  {
    image: '/images/result-tiers/code-curator.jpg',
    title: 'Code Curator',
    description: 'Got a keen eye for details in the AI domain.',
  },
  {
    image: '/images/result-tiers/algorithm-apprentice.jpg',
    title: 'Algorithm Apprentice',
    description: 'On the path to mastering AI spotting, but still learning.',
  },
  {
    image: '/images/result-tiers/techie-trainee.jpg',
    title: 'Techie Trainee',
    description:
      "Beginning to see through AI's tricks, yet still gets stumped sometimes.",
  },
  {
    image: '/images/result-tiers/blundering-botanist.jpg',
    title: 'Blundering Botanist',
    description: 'Mistaking many AI plants for real ones.',
  },
  {
    image: '/images/result-tiers/clueless-coder.jpg',
    title: 'Clueless Coder',
    description: 'Gets befuddled by AI-generated content more often than not.',
  },
]

export const getResultTier = (
  score: number,
  total: number,
  time: number
): Tier => {
  // TODO: Tier calculating algorithm
  const percentage = (score / total) * 100
  const index = Math.min(Math.floor(percentage / 12.5), 8)
  return TIERS[index] || { image: '', title: '', description: '' }
}

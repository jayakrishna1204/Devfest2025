import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import { PartialSpeaker } from '@/app/[locale]/schedule/common';

const speakersDirectory = path.join(process.cwd(), 'src/data/speakers')

export async function getAllSpeakers(): Promise<{ slug: string; speaker: PartialSpeaker }[]> {
  const filenames = fs.readdirSync(speakersDirectory)

  return filenames
    .filter(name => name.endsWith('.yaml') || name.endsWith('.yml'))
    .map(filename => {
      const slug = filename.replace(/\.ya?ml$/, '')
      const fullPath = path.join(speakersDirectory, filename)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const speaker = yaml.parse(fileContents) as PartialSpeaker

      return { slug, speaker }
    })
}

export async function getSpeakerBySlug(slug: string): Promise<PartialSpeaker | null> {
  try {
    const fullPath = path.join(speakersDirectory, `${slug}.yaml`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    return yaml.parse(fileContents) as PartialSpeaker
  } catch {
    try {
      const fullPath = path.join(speakersDirectory, `${slug}.yml`)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      return yaml.parse(fileContents) as PartialSpeaker
    } catch {
      return null
    }
  }
}

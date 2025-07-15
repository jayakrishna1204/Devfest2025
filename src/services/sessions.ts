import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import { Session } from '@/data/schedule/session';
import { slots } from '@/data/schedule/slots.json'
import { Slot } from '@/data/schedule/slots';

const sessionsDirectory = path.join(process.cwd(), 'src/data/sessions')
const typedSlots = slots as Slot[]

// Cache for all sessions data
let allSessionsCache: Session[] | null = null
let sessionsBySpeakerCache: Map<string, Session[]> | null = null

export async function getAllSessions(): Promise<Session[]> {
  if (allSessionsCache) {
    return allSessionsCache
  }

  const filenames = fs.readdirSync(sessionsDirectory)

  allSessionsCache = filenames
    .filter(name => name.endsWith('.yaml') || name.endsWith('.yml'))
    .map(filename => {
      const fullPath = path.join(sessionsDirectory, filename)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const sessionWithoutResolvedSlot = yaml.parse(fileContents)

      const resolvedSlot = typedSlots.find(slot => slot.key === sessionWithoutResolvedSlot.slot)

      if (!resolvedSlot) {
        throw new Error(`Slot not found for session ${sessionWithoutResolvedSlot.key}: ${sessionWithoutResolvedSlot.slot}`)
      }

      return {
        ...sessionWithoutResolvedSlot,
        slot: resolvedSlot
      } as Session
    })

  return allSessionsCache
}

export async function getSessionsBySpeaker(speakerSlug: string): Promise<Session[]> {
  // Build the index if not already done
  if (!sessionsBySpeakerCache) {
    sessionsBySpeakerCache = new Map()
    const allSessions = await getAllSessions()

    // Index sessions by speaker
    allSessions.forEach((session) => {
      session.speakers.forEach((speaker) => {
        if (!sessionsBySpeakerCache!.has(speaker)) {
          sessionsBySpeakerCache!.set(speaker, []);
        }
        sessionsBySpeakerCache!.get(speaker)!.push(session);
      });
    });
  }

  return sessionsBySpeakerCache.get(speakerSlug) || []
}

export async function getSessionBySlug(slug: string): Promise<Session | null> {
  const filenames = fs.readdirSync(sessionsDirectory)

  const filename = filenames.find(name => {
    const fileSlug = name.replace(/\.ya?ml$/, '')
    return fileSlug === slug
  })

  if (!filename) {
    return null
  }

  const fullPath = path.join(sessionsDirectory, filename)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const sessionWithoutResolvedSlot = yaml.parse(fileContents)

  const resolvedSlot = typedSlots.find(slot => slot.key === sessionWithoutResolvedSlot.slot)

  if (!resolvedSlot) {
    throw new Error(`Slot not found for session ${sessionWithoutResolvedSlot.key}: ${sessionWithoutResolvedSlot.slot}`)
  }

  return {
    ...sessionWithoutResolvedSlot,
    slot: resolvedSlot
  } as Session
}

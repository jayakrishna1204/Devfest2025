import { PartialSession } from '@/app/[locale]/schedule/common';
import fs from 'fs'
import path from 'path'
import yaml from 'yaml'

const sessionsDirectory = path.join(process.cwd(), 'src/data/sessions')

// Cache for all sessions data
let allSessionsCache: { slug: string; session: PartialSession }[] | null = null
let sessionsBySpeakerCache: Map<string, PartialSession[]> | null = null

export async function getAllSessions(): Promise<{ slug: string; session: PartialSession }[]> {
  if (allSessionsCache) {
    return allSessionsCache
  }

  const filenames = fs.readdirSync(sessionsDirectory)

  allSessionsCache = filenames
    .filter(name => name.endsWith('.yaml') || name.endsWith('.yml'))
    .map(filename => {
      const slug = filename.replace(/\.ya?ml$/, '')
      const fullPath = path.join(sessionsDirectory, filename)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const session = yaml.parse(fileContents) as PartialSession

      return { slug, session }
    })

  return allSessionsCache
}

export async function getSessionsBySpeaker(speakerSlug: string): Promise<PartialSession[]> {
  // Build the index if not already done
  if (!sessionsBySpeakerCache) {
    sessionsBySpeakerCache = new Map()
    const allSessions = await getAllSessions()

    // Index sessions by speaker
    allSessions.forEach(({ session }) => {
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

export async function getSessionBySlug(slug: string): Promise<PartialSession | null> {
  const allSessions = await getAllSessions()
  const found = allSessions.find(s => s.slug === slug)
  return found?.session || null
}

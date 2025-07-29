import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import { Speaker } from '@/types/schedule/speaker';

const speakersDirectory = path.join(process.cwd(), 'data/speakers');

export async function getAllSpeakers(): Promise<Speaker[]> {
  const filenames = fs.readdirSync(speakersDirectory);

  return filenames
    .filter((name) => name.endsWith('.yaml') || name.endsWith('.yml'))
    .map((filename) => {
      const fullPath = path.join(speakersDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      return yaml.parse(fileContents) as Speaker;
    });
}

export async function getSpeakerBySlug(
  slug: string
): Promise<Speaker | null> {
  try {
    const fullPath = path.join(speakersDirectory, `${slug}.yaml`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return yaml.parse(fileContents) as Speaker;
  } catch {
    try {
      const fullPath = path.join(speakersDirectory, `${slug}.yml`);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      return yaml.parse(fileContents) as Speaker;
    } catch {
      return null;
    }
  }
}

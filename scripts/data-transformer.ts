/* ts-ignore @typescript-eslint/no-explicit-any */

import * as fs from 'fs';
import yaml from 'js-yaml';
import { Speaker } from '../src/data/schedule/speaker';
import data from './export.json';
import { normalize, writeFile } from './helpers';
import rimraf from 'rimraf';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';

const dumpOptions: yaml.DumpOptions = { lineWidth: -1 };

const outDirSpeakers = '../src/data/speakers';
const outDirSessions = '../src/data/sessions';
const outDirImages = '../src/images/speakers';

rimraf.sync(outDirSpeakers);
fs.mkdirSync(outDirSpeakers);

rimraf.sync(outDirSessions);
fs.mkdirSync(outDirSessions);

rimraf.sync(outDirImages);
fs.mkdirSync(outDirImages);

transformerSpeakers();
transformerSessions();

// Fonction pour télécharger une image
async function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;

    protocol
      .get(url, (response) => {
        if (response.statusCode === 200) {
          const file = fs.createWriteStream(filepath);
          response.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
          file.on('error', reject);
        } else {
          reject(new Error(`Failed to download image: ${response.statusCode}`));
        }
      })
      .on('error', reject);
  });
}

// Fonction pour obtenir l'extension d'un fichier depuis une URL
function getImageExtension(url: string): string {
  const urlPath = new URL(url).pathname;
  const ext = path.extname(urlPath).toLowerCase();

  // Si pas d'extension détectée, essayer de deviner depuis les paramètres
  if (!ext && url.includes('raw=1')) {
    return '.jpg'; // Dropbox raw images are usually JPG
  }

  // Extensions d'images courantes
  if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
    return ext;
  }

  // Par défaut, utiliser .jpg
  return '.jpg';
}

function transformerSpeakers() {
  // Extraire tous les speakers uniques de toutes les sessions
  const allSpeakers = new Map<string, any>();

  data.forEach((session) => {
    session.speakers.forEach((speaker) => {
      if (!allSpeakers.has(speaker.id)) {
        allSpeakers.set(speaker.id, speaker);
      }
    });
  });

  const promises = Array.from(allSpeakers.values()).map(async (speaker) => {
    const normalizedName = normalize(speaker.name || 'x-undefined');

    // Télécharger l'image si elle existe
    let imageFileName: string | null = null;
    if (speaker.picture) {
      try {
        const imageExtension = getImageExtension(speaker.picture);
        imageFileName = `${normalizedName}${imageExtension}`;
        const imagePath = path.join(outDirImages, imageFileName);

        // Télécharger l'image seulement si elle n'existe pas déjà
        if (!fs.existsSync(imagePath)) {
          console.log(
            `Downloading image for ${speaker.name}: ${speaker.picture}`
          );
          await downloadImage(speaker.picture, imagePath);
          console.log(`✓ Downloaded: ${imageFileName}`);
        } else {
          console.log(`✓ Image already exists: ${imageFileName}`);
        }
      } catch (error) {
        console.error(`✗ Failed to download image for ${speaker.name}:`, error);
      }
    }

    const yamlData: Speaker = {
      key: normalizedName,
      name: speaker.name || 'x-undefined',
      company: speaker.company || undefined,
      companyLogo:
        speaker.company && speaker.company !== 'Freelance'
          ? `/images/partners/${normalize(speaker.company.toLowerCase())}.png`
          : undefined,
      city: speaker.location,
      photoUrl: imageFileName ? `/images/speakers/${imageFileName}` : undefined,
      socials: {},
      bio: speaker.bio && speaker.bio.length > 1 ? speaker.bio : undefined,
    };

    // Traitement des liens sociaux
    if (speaker.socialLinks) {
      speaker.socialLinks.forEach((link: string) => {
        if (link.includes('twitter.com') || link.includes('x.com')) {
          yamlData.socials.twitter = link
            .replace('https://twitter.com/', '')
            .replace('https://x.com/', '')
            .replace('@', '');
        } else if (link.includes('github.com')) {
          yamlData.socials.github = link.replace('https://github.com/', '');
        } else if (link.includes('linkedin.com')) {
          yamlData.socials.linkedin = link;
        }
      });
    }

    const speakerData = `---
${yaml.dump(yamlData, dumpOptions)}`;

    return writeFile(`${outDirSpeakers}/${normalizedName}.yml`, speakerData);
  });

  // Créer le fichier des emails
  const emails = Array.from(allSpeakers.values())
    .map((s) => s.email)
    .join('\n');
  fs.writeFileSync('emails_speakers.md', emails);

  Promise.all(promises).then(() => console.log('speakers ok'));
}

function transformerSessions() {
  const promises = data.map((session) => {
    const normalizedName = normalize(session.title);
    console.log(normalizedName);
    const yamlData: any = {
      key: normalizedName,
      title: session.title,
      language: getLanguage(session.languages),
      talkType: getTalkType(session.formats),
      tags: getCategory(session.categories),
      complexity: getComplexity(session.level),
      speakers: getSpeakers(session.speakers),
      slot: 'day-x-' + getTalkType(session.formats) + '-x',
      room: 'undefined',
      abstract: session.abstract,
    };

    const sessionData = `---
${yaml.dump(yamlData, dumpOptions)}`;

    return writeFile(`${outDirSessions}/${normalizedName}.yml`, sessionData);
  });

  Promise.all(promises).then(() => console.log('sessions ok'));
}

function getTalkType(formats: any[]) {
  if (!formats || formats.length === 0) return 'conference';

  const format = formats[0];
  if (format.name.includes('Quickie')) {
    return 'quickie';
  } else if (format.name.includes('Conference')) {
    return 'conference';
  } else if (format.name.includes('Codelab')) {
    return 'codelab';
  }
  return 'conference';
}

function getLanguage(languages: string[]) {
  if (!languages || languages.length === 0) return 'French';
  return languages[0] === 'fr' ? 'French' : 'English';
}

function getCategory(categories: any[]) {
  if (!categories || categories.length === 0) return ['web'];

  const categoryMap = {
    'BigData & AI': 'bigdata_ai',
    'Cloud & DevOps': 'cloud_devops',
    Discovery: 'discovery',
    Languages: 'languages',
    Mobile: 'mobile_iot',
    Security: 'security',
    'UX / UI': 'ux_ui',
    Web: 'web',
  };

  const category = categories[0];
  for (const [key, value] of Object.entries(categoryMap)) {
    if (category.name.includes(key)) {
      return [value];
    }
  }

  return ['web'];
}

function getComplexity(level: string | undefined) {
  if (!level) return 'Intermediate';
  return level === 'BEGINNER'
    ? 'Beginner'
    : level === 'ADVANCED'
      ? 'Advanced'
      : 'Intermediate';
}

function getSpeakers(speakers: any[]) {
  return speakers
    .map((speaker) => normalize(speaker.name || 'x-undefined'))
    .sort((a: string, b: string) => a.localeCompare(b));
}

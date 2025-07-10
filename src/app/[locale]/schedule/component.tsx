import { CommonParams } from '@/types';
import { getTranslation } from '@/i18n/i18n';
import { LargeSchedule } from '@/app/[locale]/schedule/large';
import { slots } from '@/data/schedule/slots.json'
import './schedule.scss'
import fs from 'fs';
import { SessionWithoutResolvedSlot } from '@/data/schedule/session';
import yaml from 'js-yaml';
import { Slot } from '@/data/schedule/slots';
import { PartialSession } from './common';

const typedSlots = slots as Slot[];

export async function generateMetadata({ params }: CommonParams) {
  const t = await getTranslation(params);
  return {
    title: t('pages.schedule.name'),
  };
}

export default async function Schedule({ params, day }: CommonParams & { day: 1 | 2 }) {

  const allHoursSlots: Slot[] = typedSlots //
    .filter((s) => s.key.startsWith("day-" + day)) //
    .filter((s) => s.type !== "codelab");

  const fixedSlots: Slot[] = allHoursSlots.filter((s) =>
    ["opening", "lunch", "break", "keynote", "party"].includes(s.type)
  );
  
  const files = fs.readdirSync('src/data/sessions');
  const sessionsYamls = files.map(f => fs.readFileSync('src/data/sessions/' + f, 'utf8'));
  const sessionsWithoutResolvedSlot = sessionsYamls.map(yamlContent => yaml.load(yamlContent) as SessionWithoutResolvedSlot);

  const sessions: PartialSession[] = sessionsWithoutResolvedSlot
    .filter((s) => s.slot.startsWith("day-" + day))
    .map((s) => {
      const slot = typedSlots.find((slot) => slot.key === s.slot);
      return {
        ...s,
        slot: slot || { start: '', end: '', key: '' },
      } as PartialSession;
    });

  return (
    <>
      <LargeSchedule sessions={sessions} allHoursSlots={allHoursSlots} fixedSlots={fixedSlots} params={params} />
    </>
  );
}

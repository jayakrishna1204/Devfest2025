import { CommonParams } from '@/types';
import { LargeSchedule } from '@/app/[locale]/schedule/large';
import Slots from '../../../../data/slots.json'
import './schedule.scss'
import { Slot } from '../../../types/schedule/slots';
import { PartialSession } from './common';
import { getAllSessions } from '@/services/sessions';
import { MobileSchedule } from '@/app/[locale]/schedule/mobile';

const typedSlots = Slots.slots as Slot[];

export default async function Schedule({ params, day }: CommonParams & { day: 1 | 2 }) {

  const allHoursSlots: Slot[] = typedSlots //
    .filter((s) => s.key.startsWith("day-" + day)) //
    .filter((s) => s.type !== "codelab");

  const fixedSlots: Slot[] = allHoursSlots.filter((s) =>
    ["opening", "lunch", "break", "keynote", "party"].includes(s.type)
  );

  const allSessions = await getAllSessions();

  const sessions: PartialSession[] = allSessions
    .filter((s) => s.slot.key.startsWith("day-" + day));

  return (
    <>
      <LargeSchedule sessions={sessions} allHoursSlots={allHoursSlots} fixedSlots={fixedSlots} params={params} />
      <MobileSchedule sessions={sessions} allHoursSlots={allHoursSlots} fixedSlots={fixedSlots} params={params}/>
    </>
  );
}

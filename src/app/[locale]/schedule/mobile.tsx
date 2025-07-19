import { Stack, Typography } from "@mui/material";
import classNames from "classnames";
import React from "react";
import { PartialSession, rooms, Speakers, Tags } from "./common";
import "./schedule.scss";
import { Slot } from '@/data/schedule/slots';
import { MyLink } from '@/components/commun/link';
import { Flag } from '@/components/commun/flags';
import { getTranslation } from '@/i18n/i18n';
import { CommonParams } from '@/types';

export const MobileSchedule: React.FC<{
  sessions: PartialSession[];
  allHoursSlots: Slot[];
  fixedSlots: Slot[];
  params: CommonParams["params"];
}> = ({ sessions, allHoursSlots, fixedSlots, params }) => {
  const hours = allHoursSlots
    .map((slot) => slot.start) //
    // unicity
    .filter((start, i, l) => l.indexOf(start) === i);

  const sessionsByHours: { [k: string]: Array<PartialSession> } = {};
  const fixedSlotsByHours: { [k: string]: Array<Slot> } = {};
  hours.forEach((hour) => {
    sessionsByHours[hour] = sessions
      .filter((s) => s.slot.start === hour)
      .sort((s1, s2) => rooms.indexOf(s1.room) - rooms.indexOf(s2.room));
    fixedSlotsByHours[hour] = fixedSlots.filter((s) => s.start === hour);
  });

  return (
    <Stack direction="column" spacing={2} className="mobile-schedule">
      {hours.map((hour) => {
        return (
          <React.Fragment key={hour}>
            <Hour hour={hour} />
            {sessionsByHours[hour].map((session) => (
              <SessionInfo session={session} key={session.key} />
            ))}
            {fixedSlotsByHours[hour].map((slot) => (
              <FixedSlot params={params} slot={slot} key={slot.key} />
            ))}
          </React.Fragment>
        );
      })}
    </Stack>
  );
};

const Hour: React.FC<{ hour: string }> = ({ hour }) => (
  <div className="hour">
    <Typography variant="h3">{hour}</Typography>
  </div>
);

const FixedSlot: React.FC<{ slot: Slot, params: CommonParams["params"] }> = async ({ slot, params }) => {
  const t =  await getTranslation(params, "pages.schedule");
  return (
    <div className={classNames("slot", "fixed", slot.type)}>
      <Typography variant="h3">{t(slot.type)}</Typography>
    </div>
  );
};

const SessionInfo: React.FC<{ session: PartialSession }> = ({ session }) => {
  return (
    <div
      className={classNames("slot session-info", session.cancelled && "cancelled")}
    >
      <MyLink href={"/sessions/" + session.key}><span className="session-title">{session.title}</span></MyLink>
      <Stack spacing={2} alignItems="center" direction="row">
        {session.tags && <Tags tags={session.tags}/>}
        <Flag lang={session.language} size="small" />
        <span>{session.room}</span>
      </Stack>
      <Speakers speakers={session.speakers} />
    </div>
  );
};

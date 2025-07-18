import {
  Brush,
  Cloud,
  Code,
  DeveloperBoard,
  Language,
  Lightbulb,
  PhoneAndroid,
  Security,
  SmartToy,
} from '@mui/icons-material';
import { Chip } from '@mui/material';
import React, { JSX } from 'react';
import './schedule.scss';
import { Session } from '@/data/schedule/session';
import { Slot } from '@/data/schedule/slots';
import { Speaker } from '@/data/schedule/speaker';
import { RoomName } from '@/data/schedule/schedule';
import { MyLink } from '@/components/commun/link';
import { AvatarSpeaker } from '@/components/speaker/avatar';
import { getAllSpeakers } from '@/services/speakers';

export type PartialSession = Omit<Session, 'abstract'> & { slot: Slot };
export type PartialSpeaker = Pick<Speaker, 'key' | 'name' | 'photoUrl'>;

export const rooms: RoomName[] = [
  'Jules Verne',
  'Titan',
  'Belem',
  'Tour Bretagne',
  'Les Machines',
  'Hangar',
  "L'Atelier",
  "Unconf",
];

const tagLabels: Record<string, { label: string; icon: JSX.Element }> = {
  iot_hardware: {
    label: 'IoT & Hardware',
    icon: <DeveloperBoard />,
  },
  mobile: {
    label: 'Mobile',
    icon: <PhoneAndroid />,
  },
  web: {
    label: 'Web',
    icon: <Language />,
  },
  discovery: {
    label: 'Discovery',
    icon: <Lightbulb />,
  },
  cloud_devops: {
    label: 'Cloud & DevOps',
    icon: <Cloud />,
  },
  languages: {
    label: 'Languages',
    icon: <Code />,
  },
  bigdata_ai: {
    label: 'BigData & AI',
    icon: <SmartToy />,
  },
  security: {
    label: 'SECURITY',
    icon: <Security />,
  },
  ux_ui: {
    label: 'UX / UI',
    icon: <Brush />,
  },
};
export const Tags: React.FC<{
  tags: string[];
  color?: 'primary' | 'secondary' | 'info';
}> = ({ tags, color = 'primary' }) => {
  if (tags.some((tag) => !tagLabels[tag])) {
    console.warn(
      'Unknown tag(s) found:',
      tags.filter((tag) => !tagLabels[tag])
    );
  }
  return (
    <div className='tags'>
      {tags.map((tag) => (
        <Chip
          icon={tagLabels[tag].icon}
          key={tag}
          label={tagLabels[tag].label}
          variant='outlined'
          size='small'
          color={color}
          sx={{ fontSize: '10px' }}
        />
      ))}
    </div>
  );
};
export const SessionComplexity: React.FC<{
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
}> = ({ complexity }) => {
  return (
    <Chip
      label={complexity}
      variant='outlined'
      size='small'
      color='info'
      sx={{ fontSize: '10px' }}
    />
  );
};

export const Speakers: React.FC<{ speakers: string[] }> = async ({
  speakers,
}) => {
  const allSpeakers = await getAllSpeakers();
  const speakersFull = allSpeakers.filter((speaker) =>
    speakers.includes(speaker.key)
  );

  return (
    <div className='speakers'>
      {speakers.length === 1 ? (
        <MyLink href={'/speakers/' + speakersFull[0].key}>
          <div className='speaker'>
            <AvatarSpeaker speaker={speakersFull[0]} noLink />
            {speakersFull[0].name}
          </div>
        </MyLink>
      ) : (
        <>
          {speakersFull.map((speaker) => (
            <MyLink href={'/speakers/' + speaker.key} key={speaker.key}>
              <div className='speaker'>
                <AvatarSpeaker speaker={speaker} noLink />
              </div>
            </MyLink>
          ))}
        </>
      )}
    </div>
  );
};

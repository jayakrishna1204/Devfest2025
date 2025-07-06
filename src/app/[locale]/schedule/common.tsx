import {
  Brush,
  Cloud,
  Code,
  DeveloperBoard,
  Language,
  Lightbulb,
  PhoneAndroid,
  Security,
  SmartToy
} from "@mui/icons-material";
import { Avatar, Chip, Tooltip } from "@mui/material";
import React, { JSX } from 'react';
import "./schedule.scss";
import { Session } from '@/data/schedule/session';
import { Slot } from '@/data/schedule/slots';
import { Speaker } from '@/data/schedule/speaker';
import { RoomName } from '@/data/schedule/schedule';
import { MyLink } from '@/components/commun/link';
import fs from 'fs';
import yaml from 'js-yaml';
import { MyAvatar } from "@/components/commun/avatar/avatar";

export type PartialSession = Omit<Session, "abstract"> & { slot: Slot };
export type PartialSpeaker = Pick<Speaker, "key" | "name" | "photoUrl">;

export const rooms: RoomName[] = [
  "Jules Verne",
  "Titan",
  "Belem",
  "Tour Bretagne",
  "Les Machines",
  "Hangar",
  "L'Atelier",
];

const tagLabels: Record<
  string,
  { label: string; icon: JSX.Element }
> = {
  iot_hardware: {
    label: "IoT & Hardware",
    icon: <DeveloperBoard />,
  },
  mobile: {
    label: "Mobile",
    icon: <PhoneAndroid />,
  },
  web: {
    label: "Web",
    icon: <Language />,
  },
  discovery: {
    label: "Discovery",
    icon: <Lightbulb />,
  },
  cloud_devops: {
    label: "Cloud & DevOps",
    icon: <Cloud />,
  },
  languages: {
    label: "Languages",
    icon: <Code />,
  },
  bigdata_ai: {
    label: "BigData & AI",
    icon: <SmartToy />,
  },
  security: {
    label: "SECURITY",
    icon: <Security />,
  },
  ux_ui: {
    label: "UX / UI",
    icon: <Brush />,
  },
};
export const Tags: React.FC<{
  tags: string[];
  color?: "primary" | "secondary";
}> = ({ tags, color = "primary" }) => {
  return (
    <div className="tags">
      {tags.map((tag) => (
        <Chip
          icon={tagLabels[tag].icon}
          key={tag}
          label={tagLabels[tag].label}
          variant="outlined"
          size="small"
          color={color}
          sx={{ fontSize: "10px" }}
        />
      ))}
    </div>
  );
};
export const SessionComplexity: React.FC<{
  complexity: "Beginner" | "Intermediate" | "Advanced";
}> = ({ complexity }) => {
  return (
    <Chip
      label={complexity}
      variant="outlined"
      size="small"
      color="secondary"
      sx={{ fontSize: "10px" }}
    />
  );
};

export const Speakers: React.FC<{ speakers: string[] }> = ({ speakers }) => {
  // TODO: allSpeakers
  const files = fs.readdirSync('src/data/speakers');
  const speakersYaml = files.map(f => fs.readFileSync('src/data/speakers/' + f, 'utf8'));
  const speakersFull = speakersYaml.map(yamlContent => yaml.load(yamlContent) as Speaker).filter(speaker => speakers.includes(speaker.key));


  return (
    <div className="speakers">
      {speakers.length === 1 ? (
        <MyLink href={"/speakers/" + speakersFull[0].key}>
          <div className="speaker">
            <AvatarSpeaker speaker={speakersFull[0]} noLink/>
            {speakersFull[0].name}
          </div>
        </MyLink>
      ) : (
        <>
          {speakersFull.map((speaker) => (
            <MyLink href={"/speakers/" + speaker.key} key={speaker.key}>
              <div className="speaker">
                <AvatarSpeaker speaker={speaker} noLink/>
              </div>
            </MyLink>
          ))}
        </>
      )}
    </div>
  );
};

export const AvatarSpeaker: React.FC<{
  speaker: PartialSpeaker;
  size?: "small" | "medium" | "large";
  noLink?: boolean
}> = async ({ speaker, size = "small", noLink }) => {
  const sizePx = size == "large" ? 150 : size == "medium" ? 50 : 24;
  const Wrapper = noLink
    ? React.Fragment
    : ({ children }: { children: React.ReactNode }) => <MyLink href={"/speakers/" + speaker.key}>{children}</MyLink>;

  const image = await import(`@/images/speakers/${speaker.photoUrl}`)
  return (
    <Wrapper>
      <Tooltip title={speaker.name} className="avatar-picture-container">
        <MyAvatar
          alt={speaker.name}
          src={image.default.src}
          width={sizePx}
          height={sizePx}
        />
      </Tooltip>
    </Wrapper>
  );
};

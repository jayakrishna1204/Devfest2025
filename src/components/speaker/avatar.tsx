import { PartialSpeaker } from "@/app/[locale]/schedule/common";
import { Tooltip } from "@mui/material";
import React from "react";
import { MyAvatar } from "../commun/avatar/avatar";
import { MyLink } from "../commun/link";
import "./avatar.scss";

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
      <div className="avatar-speaker">
        <Tooltip title={speaker.name}>
            <MyAvatar
            alt={speaker.name}
            src={image.default.src}
            size={sizePx}
            />
        </Tooltip>
      </div>
    </Wrapper>
  );
};

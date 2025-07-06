'use client';
import React from 'react';
import Image, { ImageProps } from 'next/image';

export const MyAvatar: React.FC<ImageProps> = (props) => {
  return (
    <div className="avatar-picture-container">
      <Image
        className="avatar-picture"
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
      />
    </div>
  );
};

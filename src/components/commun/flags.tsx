import React from "react";
import Image from "next/image";

export const Flag: React.FC<{
  lang: "English" | "French" | "fr" | "en";
  size?: "medium" | "small" | "tiny";
}> = ({ lang, size = "medium" }) => {
  const flagname = lang.toLowerCase().startsWith("f") ? "fr" : "en";

  const sizes =
    size == "medium"
      ? { height: "18px", width: "24px" }
      : size == "tiny"
      ? { height: "12px", width: "16px" }
      : { height: "14px", width: "19px" };

  return (
    <Image
      alt="logo"
      src={"images/flags/" + flagname + ".svg"}
      style={{
        ...sizes,
        objectFit: "cover",
        verticalAlign: "middle",
      }}
    />
  );
};

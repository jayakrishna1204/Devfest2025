import { SecondarySection, TertiarySection } from "@/components/commun/section/sectionType";
import { CommonParams } from "@/types";
import { Card, Stack, Typography } from "@mui/material";
import { PartialSession, Tags } from "../../schedule/common";
import { SocialLink, SocialWithLogin } from "@/components/commun/socials/socials";
import { Speaker } from "@/data/schedule/speaker";
import { Markdown } from "@/components/commun/markdown";
import { MyLink } from "@/components/commun/link";
import { AvatarSpeaker } from "@/components/speaker/avatar";

export const getStaticProps = () => ({
  props: {
    hello: 'world',
  },
})

export default async function SessionPage({ params, sessions }: CommonParams<{sessions: PartialSession[]}, {slug: string}>) {
    const slug = (await params).slug;

    const speaker = await import(`@/data/speakers/${slug}.yml`) as Speaker;

  return (
    <>
        <TertiarySection slim>
          <Stack spacing={1}>
            <Stack spacing={2} direction="column" alignItems="center">
              <div className="speaker">
                <AvatarSpeaker speaker={speaker} size="large" />
              </div>
              <Typography
                variant="h1"
                color="primary"
                sx={{ marginBottom: "2px" }}
              >
                {speaker.name}
              </Typography>
              {speaker.company && (
                <Typography
                  variant="h4"
                  style={{ color: "white", marginTop: "10px" }}
                >
                  {speaker.company}
                </Typography>
              )}
              <Stack direction="row" spacing={2}>
                {Object.entries(speaker.socials || {}).map(([media, login]) =>
                  media == "website" ? (
                    <SocialLink key={media} url={login} type={"website"} withLogin/>
                  ) : (
                    <SocialLink
                      key={media}
                      login={login}
                      type={media as SocialWithLogin}
                      withLogin
                    />
                  )
                )}
              </Stack>
            </Stack>
            <Stack spacing={1}>
              {sessions.map((session) => (
                <SessionCard key={session.key} session={session} />
              ))}
            </Stack>
          </Stack>
        </TertiarySection>
        <SecondarySection slim>
          <Markdown content={speaker.bio} />
        </SecondarySection>
        </>
  );
};

const SessionCard: React.FC<{ session: PartialSession }> = ({ session }) => {
  return (
    <MyLink href={"/sessions/" + session.key}>
      <Card
        sx={{
          maxWidth: "90%",
          minHeight: "60px",
          color: "var(--tertiary)",
          backgroundColor: "var(--primary)",
          padding: "10px",
          border: "1px solid white",
          borderLeft: "5px solid var(--secondary)"
        }}
      >
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          sx={{ minHeight: "60px" }}
        >
          {session.tags && <Tags tags={session.tags} color="secondary"/>}
          <Typography variant="h3" color="inherit" style={{ color: "white" }}>
            {session.title}
          </Typography>
        </Stack>
      </Card>
    </MyLink>
  );
};


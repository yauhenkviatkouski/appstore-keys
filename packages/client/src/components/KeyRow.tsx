import { styled } from "@material-ui/core";
import { useEffect, useState } from "react";

type KeyRowProps = {
  keyWord: string;
  number?: number;
};

type GameInfoType = {
  icon?: string;
  url?: string;
  title?: string;
};

function KeyRow({ keyWord }: KeyRowProps) {
  const [games, setGames] = useState<GameInfoType[]>();

  useEffect(() => {
    fetch(`api/keys/${keyWord}`, { cache: "force-cache" })
      .then((res) => res.json())
      .then((res) => {
        if (res.length) {
          const games = res.map((game: any) => ({
            icon: game.icon,
            url: game.url,
            title: game.title,
          }));
          setGames(games);
        }
      });
  }, [keyWord]);

  return (
    <Root>
      {games?.map((game) => (
        <LinkWrapper key={game.url} target="_blank" href={game.url}>
          <ImageWrapper
            src={`${game.icon}=w50-h50`}
            title={game.title}
          ></ImageWrapper>
        </LinkWrapper>
      ))}
    </Root>
  );
}

const Root = styled("div")({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "52px",
});

const LinkWrapper = styled("a")({
  height: "40px",
  margin: "0 12px",
});

const ImageWrapper = styled("img")({
  width: "40px",
  height: "40px",
});

export { KeyRow };

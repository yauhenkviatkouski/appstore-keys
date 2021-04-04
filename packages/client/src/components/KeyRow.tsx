import { styled } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

type KeyRowProps = {
  keyWord: string;
  number: number;
};

type GameInfoType = {
  icon?: string;
  url?: string;
  title?: string;
};

function KeyRow({ keyWord, number }: KeyRowProps) {
  const [games, setGames] = useState<GameInfoType[]>();

  useEffect(() => {
    fetch(`api/keys/${keyWord}`)
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
      <span style={{ marginRight: "12px", fontSize: "8px" }}>{number}</span>
      <KeyWordWrapper>{keyWord}</KeyWordWrapper>
      {games?.map((game) => (
        <a key={game.url} target="_blank" href={game.url}>
          <ImageWrapper
            src={`${game.icon}=w40-h40`}
            alt={game.title}
            title={game.title}
          ></ImageWrapper>
        </a>
      ))}
    </Root>
  );
}

const Root = styled("div")({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "46px",
  marginBottom: "2px",
  borderBottom: "1px gray solid",
});

const KeyWordWrapper = styled("div")({
  width: "300px",
});

const ImageWrapper = styled("img")({
  width: "40px",
  height: "40px",
  margin: "0 8px",
});

export { KeyRow };

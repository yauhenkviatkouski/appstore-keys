import { styled } from "@material-ui/core";
import { GameInfoType, useKeyWordInfo } from "../hooks/useKeyWordInfo";

type KeyRowProps = {
  keyWord: string;
  country: string;
};

function KeyRow({ keyWord, country }: KeyRowProps) {
  const { isLoading, isError, games, error, isFetching } = useKeyWordInfo(
    keyWord,
    country
  );
  // console.log("RENDER KEY, IS ERROR ", error);
  return (
    <Root>
      {isLoading && "Loading..."}
      {games?.map((game: GameInfoType) => (
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

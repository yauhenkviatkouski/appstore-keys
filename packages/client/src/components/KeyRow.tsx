import { Spin } from "antd";
import styled from "styled-components";
import { GameInfoType, useKeyWordInfo } from "../hooks/useKeyWordInfo";

type KeyRowProps = {
  keyWord: string;
  country: string;
};

function KeyRow({ keyWord, country }: KeyRowProps) {
  const { isLoading, games, attemptNumber, delaySeconds } = useKeyWordInfo(
    keyWord,
    country
  );

  if (!keyWord) {
    return null;
  }
  return (
    <Root>
      {isLoading && (
        <>
          <Spin style={{ marginRight: "26px" }} size="small" />
          {attemptNumber > 0 &&
            delaySeconds > 0 &&
            ` banned by store ${attemptNumber} times, next attempt in ${delaySeconds} seconds`}
        </>
      )}
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

const Root = styled("div")`
  display: flex;
  align-items: center;
  width: 100%;
  height: 52px;
`;

const LinkWrapper = styled("a")`
  height: 40px;
  margin: 0 12px;
`;

const ImageWrapper = styled("img")`
  width: 40px;
  height: 40px;
`;

export { KeyRow };

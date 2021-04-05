import { useQuery } from "react-query";

function useKeyWordInfo(keyWord: string, country: string) {
  const { isLoading, isError, data, error } = useQuery(
    `api/keys/${keyWord}?country=${country}`,
    async () => {
      const response = await fetch(`api/keys/${keyWord}?country=${country}`);
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    }
  );

  let games;

  if (data) {
    games = data.map((game: any) => ({
      icon: game.icon,
      url: game.url,
      title: game.title,
    }));
  }

  return { isLoading, isError, games, error };
}

export { useKeyWordInfo };

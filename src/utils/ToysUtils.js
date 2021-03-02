const getLoading = (games) => !!games ? games.loading : false;
const getHasMore = (games) => !!games ? games.hasMore : false;
const getErrorMessage = (games) => !!games ? games.errorMessage : null;
const getGames = (games) => !!games ? games.data : [];

export const getGamesData = (games) => {
    return {
        loading: getLoading(games),
        hasMore: getHasMore(games),
        errorMessage: getErrorMessage(games),
        games: getGames(games),
    }
}
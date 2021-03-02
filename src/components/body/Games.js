import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import GameItem from 'components/body/GameItem';
import withInfiniteScroll from 'components/hocs/withInfiniteScroll';
import { useSelector } from 'react-redux';

const propTypes = {
    loading: PropTypes.bool.isRequired,
    games: PropTypes.array,
    errorMessage: PropTypes.string,
    fetchGames: PropTypes.func.isRequired,
    searchGamesRequest: PropTypes.func.isRequired,

    lastBookElementRef: PropTypes.func.isRequired,
};

const defaultProps = {
    query: '',
};

const Games = ({
    games,
    loading,
    errorMessage,
    fetchGames,
    searchGamesRequest,
    // pageNumber,
    // query,
    // onSearch,
    lastBookElementRef
}) => {
    console.log('games');
    // const [searchValue, setSearchValue] = useState('');
    // const { query } = queryString.parse(history.location.search.replace('?', ''));

    const router = useSelector(state => state.router.router);
    console.log('router games: ', router);
    const { query, page } = router.options;
    // const dispatch = useDispatch('');

    // useEffect(() => {
    //     dispatch(initRouter());
    //     console.log('initRouter');
    // }, []);
    useEffect(() => {
        searchGamesRequest();
    }, [searchGamesRequest, fetchGames, query]);
    useEffect(() => {
        fetchGames({
            search: query,
            page: page
        });
    }, [fetchGames, query, page]);

    // const typingTimeoutRef = useRef(null);

    // const handleSearch = (event) => {
    //     const value = event.target.value;
    //     setSearchValue(event.target.value);
    //     if (!onSearch) return;

    //     if (typingTimeoutRef.current) {
    //         clearTimeout(typingTimeoutRef.current);
    //     }
    //     typingTimeoutRef.current = setTimeout(() => {
    //         onSearch(value);
    //     }, 300);
    // }

    return (
        <>
            {/* <input
                type="text"
                value={searchValue}
                onChange={handleSearch}
                placeholder="Search..."
            ></input> */}
            {
                games.map((game, index) => {
                    if (games.length === index + 1) {
                        return <div ref={lastBookElementRef} key={index}><GameItem game={game} /></div>
                    } else {
                        return <GameItem key={index} game={game} />
                    }
                })}
            <div style={{ margin: '25px', textAlign: 'center' }}>{loading && 'Loading...'}</div>
            {/* <Loading loading={loading} /> */}
            <div>{errorMessage && 'Error'}</div>
        </>
    )
}

Games.propTypes = propTypes;
Games.defaultProps = defaultProps;

export default withInfiniteScroll(Games);
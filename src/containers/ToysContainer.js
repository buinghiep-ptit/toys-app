import { connect } from 'react-redux';
import Toys from 'components/body/Toys';
import { gamesSelector } from 'selectors/toysSelectors';
import { fetchGames, searchGamesRequest } from 'redux/actions/toysActions';
import { changeRouter } from 'redux/actions/routerActions';

const mapStateToProps = state => {
    return {
        ...gamesSelector(state),
    };
};

export default connect(mapStateToProps, {
    fetchGames,
    searchGamesRequest,
    changeRouter
})(Toys);
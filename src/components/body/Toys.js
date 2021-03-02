import React, { useEffect } from "react";
import PropTypes from 'prop-types';

import { makeStyles } from "@material-ui/core/styles";
import styles from 'assets/jss/material-kit-react/bodyStyle.js';
import GridContainer from "components/common/GridContainer.js";
import GridItem from "components/common/GridItem.js";

import CustomCard from 'components/common/CustomCard.js';
import withInfiniteScroll from 'components/hocs/withInfiniteScroll';
import Filters from "./Filters.js";
import { useSelector } from "react-redux";
import GameItem from "./GameItem.js";
import Loading from "./Loading.js";
import Search from "components/header/Search.js";

const useStyles = makeStyles(styles);

const propTypes = {
    loading: PropTypes.bool.isRequired,
    games: PropTypes.array,
    errorMessage: PropTypes.string,
    fetchGames: PropTypes.func.isRequired,
    searchGamesRequest: PropTypes.func.isRequired,
    // lastBookElementRef: PropTypes.func.isRequired,
};

const defaultProps = {
    query: '',
};

const Toys = ({
    games,
    loading,
    errorMessage,
    fetchGames,
    searchGamesRequest,
    lastBookElementRef
}) => {
    console.log('toys');

    const classes = useStyles();

    const router = useSelector(state => state.router.router);
    const { query, page } = router.options;

    useEffect(() => {
        searchGamesRequest();
    }, [searchGamesRequest, fetchGames, query]);
    useEffect(() => {
        fetchGames({
            search: query,
            page: page,
            page_size: 20
        });
    }, [fetchGames, query, page]);

    return (
        <div className={classes.sections}>
            <div className={classes.container}>
                <div id="filters">
                    <GridContainer spacing={3}>
                        <GridItem xs={6} sm={4} md={3} lg={2}>
                            <Filters />
                        </GridItem>
                        <GridItem xs={6} sm={4} md={3} lg={2}>
                            <Filters />
                        </GridItem>
                        <GridItem xs={6} sm={4} md={3} lg={2}>
                            <Filters />
                        </GridItem>
                    </GridContainer>
                </div>
                <div id="cards">
                    <GridContainer spacing={3}>
                        {
                            games.length > 0 && games.map(toy =>
                                <GridItem key={toy.id} xs={12} sm={6} md={4} lg={3}>
                                    <CustomCard model={toy} />
                                </GridItem>)

                        }
                    </GridContainer>
                    <div style={{ margin: '25px', textAlign: 'center' }}>{loading && <Loading loading={loading} />}</div>
                    <div>{errorMessage && 'Error'}</div>
                </div>
            </div>
        </div>
    )
}

Toys.propTypes = propTypes;
Toys.defaultProps = defaultProps;

export default withInfiniteScroll(Toys);
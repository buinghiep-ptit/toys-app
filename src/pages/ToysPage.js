import React, { useState, useCallback, useEffect } from "react";
import classNames from "classnames";

import Header from "components/header/Header";
import Parallax from "components/parallax/Parallax";
import Toys from "components/body/Toys";
import Footer from "components/footer/Footer";

import img from "assets/img/thumb-lol-1.jpg";

import { makeStyles } from "@material-ui/core/styles";
import styles from 'assets/jss/material-kit-react/pages/toysPageStyle.js';
import { useDispatch, useSelector } from "react-redux";
import { fetchToysIfNeeded } from "redux/actions/toysActions";
import { selectToys } from "selectors/toysSelectors";

import { history } from 'utils/helpers/history';

const useStyles = makeStyles(styles);

function ToysPage(props) {
    const classes = useStyles();

    const [filters, setFilters] = useState({
        page: 1,
        size: 100,
    });

    const dispatch = useDispatch();

    const initFetch = useCallback(() => {
        dispatch(fetchToysIfNeeded(filters));
    }, [dispatch, filters]);

    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const toys = useSelector(state => selectToys(state));
    const loading = useSelector(state => state.toys.loading);

    const handleFiltersChange = (newFilters) => {
        setFilters({
            ...filters,
            page: 1,
            searchTerm: newFilters.searchTerm,
        })
        if (newFilters.searchTerm !== '') {
            history.push(`/toys?query=${newFilters.searchTerm}`);
        }
    };
    console.log("Toys!");
    return (
        <div>
            <Header
                branch="Lego"
                fixed
                color="transparent"
                changeColorOnScroll={{
                    height: 400,
                    color: "dark"
                }}
                onSubmit={handleFiltersChange}
            />

            <Parallax image={img} />

            <div className={classNames(classes.main, classes.mainRaised)}>
                {
                    !loading && <Toys toys={toys} />
                }
            </div>
            <Footer />
        </div>
    );
}

export default ToysPage;

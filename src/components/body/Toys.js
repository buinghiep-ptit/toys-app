import React from "react";
import PropTypes from 'prop-types';

import { makeStyles } from "@material-ui/core/styles";
import styles from 'assets/jss/material-kit-react/bodyStyle.js';
import GridContainer from "components/common/GridContainer.js";
import GridItem from "components/common/GridItem.js";

import CustomCard from 'components/common/CustomCard.js';
import Filters from "./Filters.js";

const useStyles = makeStyles(styles);

Toys.propTypes = {
    toys: PropTypes.array,
}
Toys.defaultProps = {
    toys: [],
}
export default function Toys({ toys }) {
    const classes = useStyles();

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
                            toys.length > 0 && toys.map(toy =>
                                <GridItem key={toy.id} xs={12} sm={6} md={4} lg={3}>
                                    <CustomCard model={toy} />
                                </GridItem>)
                        }
                    </GridContainer>
                </div>
            </div>
        </div>
    )
}
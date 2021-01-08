import React from "react";
import { useSelector } from 'react-redux';

import { makeStyles } from "@material-ui/core/styles";
import styles from '../../assets/jss/material-kit-react/mainStyle.js';
import GridContainer from "../common/GridContainer.js";
import GridItem from "../common/GridItem.js";

import CustomCard from '../common/CustomCard.js';

const useStyles = makeStyles(styles);

export default function Main() {
    const classes = useStyles();

    const listModel = useSelector(state => state.lego.listModel);

    console.log("main!");
    return (
        <div className={classes.sections}>
            <div className={classes.container}>
                <div id="cards">
                    <GridContainer spacing={3}>
                        {
                            [...listModel].map(model =>
                                <GridItem key={model.id} xs={12} sm={6} md={4} lg={3}>
                                    <CustomCard model={model} />
                                </GridItem>)
                        }
                    </GridContainer>
                </div>
            </div>
        </div>
    )
}
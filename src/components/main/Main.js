import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import styles from '../../assets/jss/material-kit-react/mainStyle.js';
import GridContainer from "../common/GridContainer.js";
import GridItem from "../common/GridItem.js";

import CustomCard from '../common/CustomCard.js';

const useStyles = makeStyles(styles);

const listModel = [
    {
        id : 1,
        name : '',
        urlModel : '/models/league_of_legends_-_aatrox.zip',
        urlBackground : '/backgrounds/bg_lol/aatrox.png',
        description : ''
    },
    {
        id : 2,
        name : '',
        urlModel : '/models/darius.zip',
        urlBackground : '/backgrounds/bg_lol/darius.png',
        description : ''
    },
    {
        id : 3,
        name : '',
        urlModel : '/models/shen_base_skin.zip',
        urlBackground : './backgrounds/bg_lol/shen.png',
        description : ''
    },
    {
        id : 4,
        name : '',
        urlModel : '/models/yasuo_3rd_skin_edit.zip',
        urlBackground : './backgrounds/bg_lol/yasou.png',
        description : ''
    }
]

export default function Main() {
    const classes = useStyles();
    return (
        <div className={classes.sections}>
            <div className={classes.container}>
                <div id="cards">
                    <GridContainer spacing={3}>
                        {
                            [...listModel].map(model =>
                                <GridItem key={model.id} xs={12} sm={6} md={4} lg={3}>
                                    <CustomCard model={model}/>
                                </GridItem>)
                        }
                    </GridContainer>
                </div>
            </div>
        </div>
    )
}
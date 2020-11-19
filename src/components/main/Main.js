import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import styles from '../../assets/jss/material-kit-react/mainStyle.js';
import GridContainer from "../common/GridContainer.js";
import GridItem from "../common/GridItem.js";

import CustomCard from '../common/CustomCard.js';
import productApi from '../../../src/api/productApi.js';

const useStyles = makeStyles(styles);

const listModel = [
    {
        id: 1,
        name: 'Aatrox animation skin',
        avatar: './avatars/aatrox.png',
        dateCreation: '07/11/2020',
        urlModel: '/models/league_of_legends_-_aatrox.zip',
        audio: './audios/aatrox.mp3',
        urlBackground: '/backgrounds/bg_lol/aatrox.png',
        views: '1.1k',
        comments: 15,
        likes: 8,
        description: ''
    },
    {
        id: 2,
        name: 'Darius skin',
        avatar: './avatars/darius.png',
        dateCreation: '07/11/2020',
        urlModel: '/models/darius.zip',
        audio: './audios/darius.mp3',
        urlBackground: '/backgrounds/bg_lol/darius.png',
        views: '23',
        comments: 4,
        likes: 17,
        description: ''
    },
    {
        id: 3,
        name: 'Shen base skin',
        avatar: './avatars/shen.png',
        dateCreation: '06/11/2020',
        urlModel: '/models/shen_base_skin.zip',
        audio: './audios/shen.mp3',
        urlBackground: './backgrounds/bg_lol/shen.png',
        views: '102',
        comments: 9,
        likes: 27,
        description: ''
    },
    {
        id: 4,
        name: 'Yasuo skin edit',
        avatar: './avatars/yasuo.png',
        dateCreation: '06/11/2020',
        urlModel: './models/yasuo_3rd_skin_edit.zip',
        audio: './audios/yasuo.mp3',
        urlBackground: './backgrounds/bg_lol/yasou.png',
        views: '29',
        comments: 13,
        likes: 11,
        description: ''
    }
]

export default function Main() {
    const classes = useStyles();

    const [productList, setProductList] = React.useState([]);

    React.useEffect(() => {
        const fetchProductList = async () => {
            try {
                const params = {
                    politician_name : 'Le_Loi'
                };
                const response = await productApi.getAll(params);
                // console.log(response);
                setProductList(response.data);
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
        }

        fetchProductList();
    }, []);
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
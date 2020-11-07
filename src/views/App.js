import React from "react";
import classNames from "classnames";

import Header from "../components/header/Header";
import Parallax from "../components/parallax/Parallax";
import Main from "../components/main/Main";

import { makeStyles } from "@material-ui/core/styles"; 
import styles from '../assets/jss/material-kit-react/appStyle.js';
const useStyles = makeStyles(styles);

function App(props) {
  const classes = useStyles();
  const { ...rest } = props;
    return (
      <div>
        <Header 
          branch="Lego"
          fixed
          color="transparent"
           changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
        />

        <Parallax/>

        <div className={classNames(classes.main, classes.mainRaised)}>
          <Main />
        </div>
      </div>
    );
  }
  
  export default App;
  
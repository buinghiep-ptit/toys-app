import React from "react";
import classNames from "classnames";

import Header from "components/header/Header";
import Parallax from "components/parallax/Parallax";
import Footer from "components/footer/Footer";

import img from "assets/img/thumb-lol-1.jpg";

import { makeStyles } from "@material-ui/core/styles";
import styles from 'assets/jss/material-kit-react/pages/toysPageStyle.js';

const useStyles = makeStyles(styles);

function HomePage(props) {
  const classes = useStyles();
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
      />

      <Parallax image={img} />

      <div className={classNames(classes.main, classes.mainRaised)}>
        <h1>Home Page</h1>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;

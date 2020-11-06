const parallaxStyle = {
    content: {
      display: "flex",
      flexFlow: "row",
      height: "100%",
      width: "100%"
    },
    viewport: {
      flex: "1 1 auto",
      overflow: "hidden",
      cursor: "move"
    },
    parallax: {
      height: "90vh",
      maxHeight: "1000px",
      overflow: "hidden",
      position: "relative",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      margin: "0",
      padding: "0",
      border: "0",
      display: "flex",
      alignItems: "center"
    },
    filter: {
      "&:before": {
        background: "rgba(0, 0, 0, 0.5)"
      },
      "&:after,&:before": {
        position: "absolute",
        zIndex: "1",
        width: "100%",
        height: "100%",
        display: "block",
        left: "0",
        top: "0",
        content: "''"
      }
    },
    small: {
      height: "380px"
    }
  };
  
  export default parallaxStyle;
  
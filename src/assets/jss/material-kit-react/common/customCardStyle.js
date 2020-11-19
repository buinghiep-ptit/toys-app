import { grey } from "@material-ui/core/colors";

const customCardStyle = theme => ({
    root: {
      maxWidth: "100%",
      // transition: "transform 0.25s ease-in-out"
      "&:hover,&:focus": {
        transition: "transform 0.25s ease-in-out",
        transform: "scale3d(1.025, 1.025, 1)"
      }
    },
    cardHovered: {
      transform: "scale3d(1.025, 1.025, 1)"
    },
    header : {
      // position : "relative",
      // float : "right",
      padding : "3px !important"
    },
    footer : {
      padding : "2px !important",
      minHeight : "40px"
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
      "&:hover,&:focus": {
        opacity: "80%"
      }
    },
    icons : {
      marginLeft: "auto",
      padding : "1px !important",
      opacity : "75%"
    },
    expand: {
      transform: "rotate(0deg)",
      marginRight: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    avatar: {
      backgroundColor: grey[500],
      width : "25px",
      height : "25px",
      fontSize : "1rem",
      borderRadius : "5px"
    },
    mediaWrapper : {
      position: "relative",
      cursor: "pointer"
    },
    layer : {
      position: "absolute", 
      top: "0",
      // bottom: "0",
      // left: "0",
      right: "0",
      // float : "right",
      display: "block"
    }
  });

  export default customCardStyle
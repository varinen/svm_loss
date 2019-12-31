import {container, title} from "assets/jss/material-kit-react.js";
import {pt1, pt2, pt3, pt4, mt1, mt2, mt3, mt4, mb1, mb2, mb3, mb4} from "../layout";
import {textRed, fontItalic} from "../common";

const demoStyles = {
    pt1: {
        ...pt1
    },
    pt2: {
        ...pt2
    },
    pt3: {
        ...pt3
    },
    pt4: {
        ...pt4
    },
    mt1: {
        ...mt1
    },
    mt2: {
        ...mt2
    },
    mt3: {
        ...mt3
    },
    mt4: {
        ...mt4
    },
    mb1: {
        ...mb1
    },
    mb2: {
        ...mb2
    },
    mb3: {
        ...mb3
    },
    mb4: {
        ...mb4
    },
    container: {
        zIndex: "12",
        color: "#FFFFFF",
        ...container
    },
    title: {
        ...title,
        display: "inline-block",
        position: "relative",
        marginTop: "30px",
        minHeight: "32px",
        color: "#FFFFFF",
        textDecoration: "none"
    },
    subtitle: {
        fontSize: "1rem",
        maxWidth: "500px",
        margin: "10px auto 0",
        fontWeight: 200
    },
    main: {
        background: "#FFFFFF",
        position: "relative",
        zIndex: "3"
    },
    mainRaised: {
        margin: "-60px 30px 0px",
        borderRadius: "6px",
        boxShadow:
            "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    },
    textRed: {
        ...textRed
    },
    fontItalic: {
        ...fontItalic
    }
};

export default demoStyles;

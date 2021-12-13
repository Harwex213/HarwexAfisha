export const whiteSelect = {
    ".MuiSelect-icon": {
        color: "white",
    },
    color: "white",
    "&:before": {
        borderColor: "white",
    },
    "&:after": {
        borderColor: "white",
    },
    "&:not(.Mui-disabled):hover::before": {
        borderColor: "white",
    },
};

export const underlinedHover = {
    "&:after": {
        display: "block",
        content: "''",
        borderBottom: "solid 2px #fff",
        transform: "scaleX(0)",
        transition: " transform 150ms ease-in-out",
    },
    "&:hover:after": { transform: "scaleX(1)" },
};

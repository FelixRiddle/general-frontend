import styles from "./styles.module.css";
import navbarStyles from "./navbar.module.css";

// Buttons
export const buttonClasses = "bg-slate-800 p-3 m-1 hover:bg-slate-500 rounded";

// Hr styles
export const hrClasses = `${styles.hr} ${styles.general}`;

// Inputs
export const fullwidthInputClasses = `${styles.fullWidthInput} rounded border-2 border-sky-500 border-solid text-black`;

// Links
export const linkClasses = `${styles.link}`

// --- Container ---
export const formContainerClasses = `${styles.general} ${styles.container}`;

// Miscellaneous
export const formAlternativeFormsContainerClasses = `${styles.container} ${styles.signin}`;

// --- Navbar ---
export const navbarButtonActiveClasses = `border-solid border-2 border-pink-600 bg-pink-500`;
export const navbarButtonClasses = `p-2 rounded bg-pink-200 hover:bg-pink-400 hover:cursor-pointer`;
export const navbarUlClasses = `bg-slate-800 p-2 pb-3 pt-3 m-1 rounded flex`;

export default {
    buttonClasses,
    hrClasses,
    fullwidthInputClasses,
    linkClasses,
    formContainerClasses,
    formAlternativeFormsContainerClasses,
    navbarButtonActiveClasses,
    navbarButtonClasses,
    navbarUlClasses,
};

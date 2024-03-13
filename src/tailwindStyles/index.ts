import styles from "./styles.module.css";
import navbarStyles from "./navbar.module.css";

// Buttons
export const buttonClasses = "bg-slate-800 p-3 m-1 hover:bg-slate-500 rounded";

// Hr styles
export const hrClasses = `${styles.hr} ${styles.general}`;

// Inputs
export const fullwidthInputClasses = `${styles.fullWidthInput} rounded border border-sky-500 border-solid text-black`;

// Links
export const linkClasses = `${styles.link}`

// --- Container ---
export const formContainerClasses = `${styles.general} ${styles.container}`;

// Miscellaneous
export const formAlternativeFormsContainerClasses = `${styles.container} ${styles.signin}`;

// --- Navbar ---
export const navbarUlClasses = `bg-slate-800 p-2 m-1 rounded`;
// This active part should be used conditionally in the frontend.
export const navbar_liaActiveClasses = `inline p-2 m-1 rounded hover:bg-pink-600 hover:cursor-pointer bg-pink-500`;
// Note: The active part with 'active:*', works only when clicking the item.
export const navbar_liaClasses = `inline p-2 m-1 rounded hover:bg-pink-600 hover:cursor-pointer active:bg-pink-500`;
export const navLinkClasses = ``;

export default {
    buttonClasses,
    hrClasses,
    fullwidthInputClasses,
    linkClasses,
    formContainerClasses,
    formAlternativeFormsContainerClasses,
    navbarUlClasses,
    navbar_liaActiveClasses,
    navbar_liaClasses,
    navLinkClasses,
};

export const isServer = () => typeof window === "undefined";
// if undefined we are on server, if the window is active we are in the browser
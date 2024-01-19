import { createContext } from "react";

const DataContext = createContext({
    user:  {},
    isLoggedIn: false,
    setLoggedUser: () => {},
    setLogOut: () => {}
});

export default DataContext;
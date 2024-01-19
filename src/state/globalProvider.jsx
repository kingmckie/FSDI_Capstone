
import { useState } from "react";
import DataContext from "./dataContext";

function GlobalProvider(props) {
    const [user, setUser] = useState({
        email: "",
        displayName: ""
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    function setLoggedUser(user) {
        setUser(user);
        setIsLoggedIn(true);
    }

    function setLogOut() {
        setUser({
            email: "",
            displayName: ""
        });
        setIsLoggedIn(false);
    }

    return (
        <DataContext.Provider value={{
            user: user,
            isLoggedIn: isLoggedIn,
            setLoggedUser: setLoggedUser,
            setLogOut: setLogOut
        }}>
            {props.children}
        </DataContext.Provider>
    )
};

export default GlobalProvider;

import { useState } from "react";
import DataContext from "../state/dataContext";

function GlobalProvider(props) {
    const [user, setUser] = useState({
        email: "",
        displayName: ""
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userBlogs, setUserBlogs] = useState([]);

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
        setUserBlogs([]); //clear user blogs on logout
    }

    // Function to update user blogs
  function updateUserBlogs(blogs) {
    setUserBlogs(blogs);
  }

    return (
        <DataContext.Provider value={{
            user: user,
            isLoggedIn: isLoggedIn,
            setLoggedUser: setLoggedUser,
            setLogOut: setLogOut,
            userBlogs: userBlogs, // Provide user blogs in the context
            updateUserBlogs: updateUserBlogs // Function to update user blogs
        }}>
            {props.children}
        </DataContext.Provider>
    )
};

export default GlobalProvider;
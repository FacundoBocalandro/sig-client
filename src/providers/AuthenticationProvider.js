import React, {createContext, useContext, useEffect, useMemo, useState,} from 'react';
import {initializeApp} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    getIdToken,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";
import {Navigate} from "react-router-dom";
import * as firebaseConfig from '../firebaseConfig.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const AuthenticationContext = createContext(null);
export const useAuthentication = () => useContext(AuthenticationContext);

/**
 * HOC to render only when user is authenticated
 * @param Component
 */
export const withAuthentication = (Component) => (props) => {
    const {isAuthenticated, initializing} = useAuthentication();

    if (initializing) {
        return null
    }

    if (!isAuthenticated) {
        return <Navigate to={"/"}/>;
    }

    return <Component {...props} />;
};

/**
 * HOC to render only when user is unauthenticated
 * @param Component
 */
export const withReverseAuthentication = (Component) => (props) => {
    const {isAuthenticated, initializing} = useAuthentication();

    if (initializing) {
        return null
    }

    if (isAuthenticated) {
        return <Navigate to={"/dashboard"}/>;
    }

    return <Component {...props} />;
};

const AuthenticationProvider = ({children}) => {
    const [user, setUser] = useState(auth.currentUser);
    const [loading, setLoading] = useState(false);
    const [initializing, setInitializing] = useState(true);

    /**
     * Effect which mounts auth state listener.
     * Recommended by Firebase (https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed-in_user)
     * When auth state changes, it:
     *    - Calls the Notifications and Database login handlers,
     *      if the user logged in (user state is null and new user detected by listener isn't null)
     *    - Sets user state
     */
    useEffect(() => {
        return onAuthStateChanged(auth, newUser => {
            setUser(newUser);
            setInitializing(false);
        });
    }, [user]);

    const registerUser = ({email, password, companyName}, successCallback, errorCallback) => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                updateProfile(userCredential.user, {displayName: companyName})
                    .then(res => {
                        setLoading(false)
                        successCallback(res)
                    })
                    .catch(err => {
                        setLoading(false)
                        errorCallback(err)
                    })
            })
            .catch(err => {
                setLoading(false)
                if (errorCallback) errorCallback(err.code)
            })
    }

    const login = ({email, password}, successCallback, errorCallback) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                setLoading(false);
                successCallback(userCredential.user)
            })
            .catch(err => {
                setLoading(false);
                if (errorCallback) errorCallback(err.code)
            })
    }

    const logout = (successCallback) => {
        setLoading(true);
        signOut(auth)
            .then(() => {
                if (successCallback) successCallback();
                setUser(null)
                setLoading(false);
            })
            .catch(() => setLoading(false))
    }

    const getToken = async () => {
        if (user) {
            return await getIdToken(user);
        } else return null;
    }

    const isAuthenticated = useMemo(() => user && !user.isAnonymous, [user])

    return (
        <AuthenticationContext.Provider
            value={{
                user,
                loading,
                login,
                registerUser,
                logout,
                initializing,
                getToken,
                isAuthenticated
            }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationProvider;

// import { User, onAuthStateChanged } from 'firebase/auth';
// import {
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useState,
// } from 'react';

// import { authenticationService } from '../../domain/services/authenticationService';
// import { auth } from '../../infrastructure/common/services/firebase';
// import { LoadingScreen } from '../components/LoadingScreen';

// interface AuthContextValue {
//   signedIn: boolean;
//   user: User | null;
//   isLoading: boolean;
//   signout(): void;
// }
//

// export const AuthContext = createContext({} as AuthContextValue);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [signedIn, setSignedIn] = useState<boolean>(false);
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   const signout = useCallback(() => {
//     authenticationService.signout();

//     setSignedIn(false);
//   }, [auth]);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//         setSignedIn(true);
//       } else {
//         setUser(null);
//         setSignedIn(false);
//       }

//       setIsLoading(false);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         // signedIn: isSuccess && signedIn,
//         signedIn,
//         user,
//         isLoading,
//         signout,
//       }}
//     >
//       {isLoading && <LoadingScreen />}
//       {/* {!isFetching && children} */}
//       {!isLoading && children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);

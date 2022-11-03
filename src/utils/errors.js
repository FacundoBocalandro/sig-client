import {FIREBASE_ERROR_CODES} from "../constants/errors";

export const getFirebaseErrorMessage = (errorCode) => {
    return FIREBASE_ERROR_CODES[errorCode] ?? ''
}

import { SEND_MESSAGE } from '../../fixtures/constants';

export const sendMessage = (messageData) => {
  console.log('🚀 ~ file: contactActions.ts ~ line 4 ~ sendMessage ~ messageData', messageData);
  return null;
  // return (dispatch, getState, { getFirebase, getFirestore }) => {
  //   const firebase = getFirebase();
  //   const firestore = getFirestore();
  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(newUser.email, newUser.password)
  //     .then((response) => {
  //       return firestore.collection('users').doc(response.user.uid).set({
  //         username: newUser.username,
  //         accountType: newUser.accountType
  //       });
  //     })
  //     .then(() => {
  //       dispatch({ type: SIGNUP_SUCCESS });
  //       callback();
  //     })
  //     .catch((error) => dispatch({ type: SIGNUP_ERROR, payload: error }));
  // };
};

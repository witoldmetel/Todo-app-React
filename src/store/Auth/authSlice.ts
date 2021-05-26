import { createSlice } from '@reduxjs/toolkit';

import firebase from 'firebase/app';
import 'firebase/auth';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: null,
    initialized: false
  },
  reducers: {
    SET_INITIALIZED: (state, { payload }) => {
      state.initialized = payload;
    },
    REGISTER: (state, { payload }) => {
      state.userData = payload.user;
    },
    LOGIN: (state, { payload }) => {
      state.userData = payload.user;
    },
    LOGOUT: (state) => {
      state.userData = null;
    },
    SET_USER_DATA: (state, { payload }) => {
      state.userData = { ...(state.userData as any), ...payload.userData };
    }
  }
});

export const { SET_INITIALIZED, LOGIN, LOGOUT, SET_USER_DATA, REGISTER } = authSlice.actions;

export const register = ({ email, password }) => async (dispatch) => {
  const resp = await firebase.auth().createUserWithEmailAndPassword(email, password);

  const uid = firebase?.auth()?.currentUser?.uid;
  await firebase.firestore().collection('users').doc(uid).set({
    id: uid,
    email: resp.user?.email
  });

  dispatch(REGISTER({ user: firebase?.auth()?.currentUser?.toJSON() }));

  const userData = {
    ...firebase?.auth()?.currentUser?.toJSON(),
    id: uid,
    email: resp.user?.email
  };

  dispatch(SET_USER_DATA({ userData }));
};

export const getUser = () => async (dispatch, state) => {
  let userData = null;
  const userID = firebase?.auth()?.currentUser?.uid;

  const response = await firebase.firestore().collection('users').doc(userID).get();

  if (response.exists) {
    userData = {
      id: response.id,
      ...response.data()
    } as any;
  }

  dispatch(SET_USER_DATA({ userData }));

  return state().userAuth.userData;
};

export const setAuthListener = () => (dispatch, state) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user && !state().userAuth.initialized) {
      dispatch(LOGIN({ user: firebase?.auth()?.currentUser?.toJSON() }));
      dispatch(getUser());
    }

    !state().userAuth.initialized && dispatch(SET_INITIALIZED(true));
  });
};

export const logIn = ({ email, password }) => async (dispatch, state) => {
  await firebase.auth().signInWithEmailAndPassword(email, password);

  dispatch(LOGIN({ user: firebase?.auth()?.currentUser?.toJSON() }));
  dispatch(getUser());

  return state().userAuth.userData;
};

export const logOut = () => async (dispatch) => {
  await firebase.auth().signOut();

  dispatch(LOGOUT());
};

export const selectUser = (state) => {
  return state.userAuth.userData;
};

export default authSlice.reducer;

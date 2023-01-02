import {auth, provider} from '../firebase';

export const SignInWithGoogle = async () => {
   let user;
    try {
    const res = await auth.signInWithPopup(provider);
    user = await res.user;
    localStorage.setItem('user', JSON.stringify(user));
    }
    catch (ex) {
        console.log("Some Error Occured.")
    }
    return user;
}

export const Logout = async () => {
  await auth.signOut().then(() => {
  localStorage.removeItem('user');
  }).catch((error) => {
    console.log("Some Error Occured.")
  });
  window.location.reload();
}
 
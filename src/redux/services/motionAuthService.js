import localStorageService from "./localStorageService";
import { setUserData } from "../redux/actions/UserActions";

class motionAuthService {
  // Dummy user object just for the demo
  user = {
    userId: "1",
    role: "ADMIN",
    displayName: "Gabriel Pabon",
    email: "jasonalexander@gmail.com",
    photoURL: "/assets/images/face-1.jpg",
    age: 25,
    token: "faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh",
  };
  // Especificar roles de usuario y la forma de obtener el rol , con la foto.
  // Get session_id of cookies
  // Modal con formulario completo
  // login flow definition..
  // You need to send http request with email and passsword to your server in this method
  // Your server will return user object & a Token
  // User should have role property
  // You can define roles in app/auth/authRoles.js
  loginWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.user);
      }, 1000);
    }).then((data) => {
      // Login successful
      // Save token
      //this.setSession(data.token);
      // Set user
      this.setUser(data);
      return data;
    });
  };
  // You need to send http requst with existing token to your server to check token is valid
  // This method is being used when user logged in & app is reloaded
  loginWithToken = () => {
    // primero preguntamos si existe algun reques en nuestro navegador ... si obtenemos repuesta obvio ya tenemos acceso
  };

  logout = () => {
    this.setSession(null);
    this.removeUser();


  };

  // Set token to all http request header, so you don't need to attach everytime
  setSession = (token) => {
    if (token) {
      localStorage.setItem("auth_user", token);
      //axios.defaults.headers.common["Authorization"] = "Bea " + token;
    } else {
      localStorage.removeItem("auth_user");
      //delete axios.defaults.headers.common["Authorization"];
    }
  };

  // Save user to localstorage
  setUser = (user) => {
    localStorageService.setItem("auth_user", user);
  };
  // Remove user from localstorage
  removeUser = () => {
    localStorage.removeItem("auth_user");
  };
}

export default new motionAuthService();

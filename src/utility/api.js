import axios from "axios";
import { setIsLoggedIn,setUserTaskData } from "../redux/appSlice";
import { API_ENDPOINT } from "../config/config";



export const loginAsync = async (dispatch, email, password) => {
    try {
      const response = await axios.get(API_ENDPOINT);
  
      const users = response.data;
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      console.log("@@@@VIRALI Response", user);
  
      console.log("@@@@VIRALI-TODS", user.todos);
      console.log("@@@@@@Dispatch", dispatch);
  
      if (response.status === 200) {
        dispatch(setIsLoggedIn());
        dispatch(setUserTaskData(user.todos));
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };
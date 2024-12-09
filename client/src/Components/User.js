import user from "../Images/user.png";
import { useSelector } from "react-redux";

// {user?.email} ? if data is null do not give you error
const User = () => {
  const { user, msg, isLogin } = useSelector((state) => state.users);
  return (
    <div>
      <img src={user} className="userImage" alt=""/>
      <h6>{user?.name}</h6> 
      <h6>{user?.email}</h6>
      
    </div>
  );
};

export default User;

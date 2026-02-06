import { useSelector } from "react-redux";
import { getUsername } from "../user/userSlice";

function Username() {
  const username = useSelector(getUsername);

  if (!username) return null;

  return <div className="hidden text-sm font-bold md:block">{username}</div>;
}

export default Username;

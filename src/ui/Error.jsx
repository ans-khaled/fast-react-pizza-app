import { useRouteError } from "react-router-dom";
import LinkButton from "../LinkButton";

function NotFound() {
  const error = useRouteError();

  return (
    <div className="mt-20 px-3 text-center">
      <h1>Something went wrong 😢</h1>
      <p className="pb-3">{error.data || error.message}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default NotFound;

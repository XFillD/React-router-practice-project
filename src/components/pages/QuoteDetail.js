import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../comments/Comments";
import HighlightedQuote from "../quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";

const DUMMYQ = [
  {
    id: "q1",
    author: "Filo",
    text: "jjjjj",
  },
  {
    id: "q2",
    author: "FilaDaKila",
    text: "kkkkkk",
  },
];

const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();

  const { quoteId } = params;

  const { sendRequest, status, data: loadedQuote, error } = useHttp(
    getSingleQuote,
    true
  );

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedQuote.text) {
    return <p>No quote found</p>;
  }

  return (
    <div>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link to={`${match.url}/comments`}>
            <button className="btn--flat">Show Comments</button>
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`} exact>
        <div className="centered">
          <Link to={`${match.url}`}>
            <button className="btn--flat">Hide Comments</button>
          </Link>
        </div>
      </Route>

      <Route path={`${match.url}/comments`}>
        <Comments />
      </Route>
    </div>
  );
};
export default QuoteDetail;

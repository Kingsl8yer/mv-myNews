import { useState } from "react";

const SortByArticles = ({setSortByParamsFunc}) => {

  const [sortAttributes, setSortAttributes] = useState(["created_at", "votes", "comment_count"]);
    return (
        <div className="menu">
              {sortAttributes.map((sortAttribute, index) => {
                return (
                  <div
                    className="item"
                    key={index}
                    onClick={() => {
                      setSortByParamsFunc(sortAttribute);
                    }}
                  >
                    {sortAttribute === "created_at"
                      ? "Date (default)"
                      : sortAttribute === "votes"
                      ? "Votes"
                      : "Comments"}
                  </div>
                );
              })}
            </div>
    )
}

export default SortByArticles;
import { useState } from "react";

const ArticleOrder = ( {setOrderParamsFunc}) =>{
    const [order, setOrder] = useState(true);
    return (
        <div className="item">
            <i
              className={
                order ? "sort amount down icon" : "sort amount up icon"
              }
              onClick={() => {
                setOrder(!order);
                setOrderParamsFunc(order ? "asc" : "desc");
              }}
            ></i>
          </div>
    )
}

export default ArticleOrder;
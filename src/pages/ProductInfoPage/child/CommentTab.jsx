import { useSelector } from "react-redux";
import CommentCard from "./CommentCard";

export default function CommentTab(props) {
  const Rating = useSelector(store => store.product.productRating);

  function createyellowstar(star) {
    let star_arr = Array.from(new Array(star), () => 0);
    return star_arr.map((v, i) => {
      return <i className="fas fa-star yellow_star" key={i} />;
    })
  }
  function createnonstar(star) {
    let nonstar_arr = Array.from(new Array(5 - star), () => 0);
    return nonstar_arr.map((v, i) => {
      return <i className="fas fa-star" key={5 - i} />;
    })
  }
  function average_star(data) {
    let kq = 0;
    if (data.length === 1) {
      kq = data[0].stars;
    } else {
      let star = 0;
      for (let i = 0; i < data.length; i++) {
        star = star + data[i].stars;
      }
      kq = Math.round(star / data.length);
    }
    return kq;
  }

  function createCommentCard(data) {
    return data.map((v, i) => {
      return (
        <CommentCard
          key={i}
          username={v.user}
          content={v.content}
          star={v.stars}
        />
      )
    })
  }
  return (
    Rating.data.length === 0 ?
      (<div className="comment-tab"
        style={{ textAlign: "center", fontSize: "18px", color: "#757575" }}>
        Sản phẩm chưa có đánh giá nào
      </div>) : (
        <div className="comment-tab">
          <div className="comment">
            <div className="total flex">
              <div className="average-rating">{average_star(Rating.data)}</div>
              <div className="more">
                <div className="flex star">
                  {createyellowstar(average_star(Rating.data))}
                  {createnonstar(average_star(Rating.data))}
                </div>
                {Rating.data.length} nhận xét
              </div>
            </div>
          </div>
          {
            createCommentCard(Rating.data)
          }
        </div>)
  );
}
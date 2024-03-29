import { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { appActions } from "../../../actions/appActions";
import { cartActions } from "../../../actions/cartActions";
import { constant } from "../../../constants";
import { helper } from "../../../helper";
import "react-toastify/dist/ReactToastify.css";
export default function MainInfo(props) {
  let { _id, name, image, rating, luotdanhgia, sold, priceafter, pricebefore, quantity } = props;
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [selectnumber, setSelectNumber] = useState(1);
  function increaseQuantity() {
    if (selectnumber <= quantity) {
      return setSelectNumber(selectnumber + 1);
    }
  }
  function descreaseQuantity() {
    if (selectnumber > 1) {
      return setSelectNumber(selectnumber - 1);
    }
  }
  function handleAddCart() {
    if (!token) {
      dispatch(appActions.changePopup(constant.PHONE_POPUP));
      return;
    }
    let product = {
      quantity: selectnumber,
      product_id: _id
    }
    dispatch(cartActions.addCart(product));
  }
  function handleInputChange(e) {
    if (e.target.value) {
      let number = parseInt(e.target.value);
      if (number > quantity) {
        setSelectNumber(quantity);
        return;
      }
      setSelectNumber(number)
    } else {
      setSelectNumber(e.target.value);
    }
  }
  function checkValue() {
    if (!selectnumber || selectnumber === 0) {
      setSelectNumber(1);
    }
  }
  return (
    <div>
      <div className="maininfo-container flex ">
        <div className="image">
          <div className="img-container">
            <img src={image} alt="" />
          </div>
        </div>
        <ToastContainer />
        <div className="info">
          <div className="name">{name}</div>
          <div className="flex moreinfo">
            <div className="star">
              {helper.createYellowstar(rating)}
              {helper.createNonstar(rating)}
            </div>
            <div className="number-of-rating">({luotdanhgia} đánh giá)</div>
            <div className="sold">Đã bán {sold}</div>
          </div>
          {helper.discount(pricebefore, priceafter) > 0 ? (
            <div className="price-container">
              <div className="price-after-discount">{helper.priceBreak(priceafter)} ₫</div>
              <div className="flex discount-container">
                <div className="price-before-discount">{helper.priceBreak(pricebefore)} ₫</div>
                <div className="discount">{helper.discount(pricebefore, priceafter)}%</div>
              </div>
            </div>
          ) : (
            <div className="price-container">
              <div className="price-after-discount no-discount">{helper.priceBreak(priceafter)} ₫</div>
            </div>
          )}
          <div className="cart-action">
            Số lượng <br />
            <div className="flex">
              {selectnumber <= 1 ? (
                <button onClick={descreaseQuantity} disabled={true}>-</button>
              ) : (
                <button onClick={descreaseQuantity}>-</button>
              )}
              <input
                onChange={handleInputChange}
                onBlur={checkValue}
                type="number"
                value={selectnumber} />
              {selectnumber >= quantity ? (
                <button onClick={increaseQuantity} disabled={true}>+</button>
              ) : (
                <button onClick={increaseQuantity} >+</button>
              )}
            </div>
            <button id="add-cart-btn" onClick={handleAddCart}>Thêm vào giỏ hàng</button>
          </div>
        </div>
      </div>
    </div>
  );
}
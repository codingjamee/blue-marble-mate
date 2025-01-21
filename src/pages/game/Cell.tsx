const Cell = ({ data, position }) => {
  return (
    <div className={`cell ${data.type} ${position}`}>
      <div className="cell-content">
        <div className="flag">{data.flag}</div>
        {/* <div className="name">{data.name}</div> */}
        {/* {data.price > 0 && <div className="price">{data.price}만원</div>} */}
      </div>
    </div>
  );
};

export default Cell;

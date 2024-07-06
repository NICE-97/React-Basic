import Item from "./Item";
import './Transaction.css'
// import { useContext } from "react";

const Transaction = (props) =>{
    const {items} = props
    // const name = useContext(DataContext)
    return (
      <div>
        <ul className="item-list">
          {items.map((element)=>{
              // return <Item title={element.title} amount={element.amount}/> (แบบเต็ม) ชื่อ property เหมือนกัน เขียนแบบย่อได้เลย
              return <Item {...element} key={element.id} /> //แบบย่อ
          })}
      </ul>
          {/* {name}  */}
      </div>
    );
}

export default Transaction;


import "../Home/Home.css";
import { Aside } from "../Aside/Aside";
import { ListMembers } from "../ListMembers/ListMembers";
import { Link } from "react-router-dom";
export const Members = () => {
  return (
    <>
      <div className="mainContainer">
        <Aside></Aside>
        <div className="section">
          <div className="sectionButtons">
            <Link to={"/"}>
              <button className="bgGreen">Catálogo</button>
            </Link>
            <Link to={"/members"}>
              <button className="bgCream">Socios</button>
            </Link>
          </div>
          <ListMembers />
        </div>
      </div>
    </>
  );
};

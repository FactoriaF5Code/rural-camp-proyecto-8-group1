import { List } from "../List/List";
import "./Home.css";
import { Aside } from "../Aside/Aside";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div className="mainContainer">
        <Aside></Aside>
        <div className="section">
          <div className="sectionButtons">
            <Link to={"/"}>
              <button className="bgCream">Catálogo</button>
            </Link>
            <Link to={"/members"}>
              <button className="bgGreen">Socios</button>
            </Link>
          </div>
          <List />
        </div>
      </div>
    </>
  );
};

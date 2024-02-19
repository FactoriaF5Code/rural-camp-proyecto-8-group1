import { useParams } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { useState, useEffect } from "react";
import "./List.css";
export const List = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [dni, setDni] = useState("");
  const [visibleLoan, setVisibleLoan] = useState(false);
  const [errorMessageLoan, setErrorMessageLoan] = useState("");
  const [successMessageLoan, setSuccessMessageLoan] = useState("");
  const [showFormLoan, setShowFormLoan] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/books/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setResults(data);
        }) .catch((error) => {console.error ("Error fetching data", error )});
    } 
  }, [id]);

  const handleLoanClick = (bookId) => {
    setSelectedBookId(bookId);
    setShowModal(true);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/books?query=${search}`
      );

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error al buscar", error);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="listContainer">
      <section className="searchContainer">
        <button
          name="searchButton"
          className="searchButton"
          onClick={handleSearch}
        >
          <img
            className="searchIcon"
            src="../../../src/imgs/Search.svg"
            alt="icono buscador"
          />
        </button>
        <input
          className="searchInput"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Buscar libro..."
        />
      </section>
      <ul>
        {results.map((result) => (
          <div key={result.book_id}>
            <div className="list">
              <div className="leftPartList">
                <li className="listTitle">{result.title}</li>
                <li>{result.author}</li>
              </div>
              <div className="rightPartList">
                <li>{result.isbn}</li>
                <li>{result.sectionCode}</li>
                <div className="buttonsLoan">
                  <button
                    className="loanButton"
                    onClick={() => {
                      handleLoanClick(result.bookId);
                    }}
                  >
                    <img
                      src="../../../src/imgs/Reading.svg"
                      alt="Icono prestamo"
                    />
                  </button>
                  <button className="closeButton">
                    <img src="../../../src/imgs/Close.svg" alt="Icono Cierre" />
                  </button>
                </div>
              </div>
            </div>

            <hr />
          </div>
        ))}
      </ul>
      {showModal && (
        <Dialog
          visible={visibleLoan}
          style={{ width: "50vw" }}
          onHide={() => {
            setVisibleLoan(false);
            setSuccessMessageLoan("");
            setErrorMessageLoan("");
          }}
          className="addDialog"
        >
          {errorMessageLoan && (
            <p className="errorMessage">{errorMessageLoan}</p>
          )}
          {successMessageLoan && (
            <>
              <p className="successMessage">¡Reserva realizada con exito!</p>
              <div className="successInfo">
                <p>
                  <strong> {successMessageLoan.split(",")[0]}</strong>
                </p>
                <p>{successMessageLoan.split(",")[1]}</p>
                <p>{successMessageLoan.split(",")[2]}</p>
                <p>{successMessageLoan.split(",")[3]}</p>
              </div>
            </>
          )}
          {showFormLoan && (
            <form className="addForm" onSubmit={handleSubmitLoan}>
              <input type="text" name="title" placeholder="DNI" />
              <button type="submit">
                <img src="../../../src/imgs/Reading.svg" alt="Icono añadir" />
                ACEPTAR
              </button>
            </form>
          )}
        </Dialog>
      )}
    </div>
  );
};

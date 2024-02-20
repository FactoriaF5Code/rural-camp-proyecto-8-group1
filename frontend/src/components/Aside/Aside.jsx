import { Dialog } from "primereact/dialog";
import "./Aside.css";
import { useState } from "react";
import { Header } from "../Header/Header";

export const Aside = () => {
  const [visibleBooks, setVisibleBooks] = useState(false);
  const [visibleMembers, setVisibleMembers] = useState(false);
  const [showFormBooks, setShowFormBooks] = useState(true);
  const [showFormMembers, setShowFormMembers] = useState(true);
  const [successMessageBooks, setSuccessMessageBooks] = useState("");
  const [successMessageMembers, setSuccessMessageMembers] = useState("");
  const [errorMessageBooks, setErrorMessageBooks] = useState("");
  const [errorMessageMembers, setErrorMessageMembers] = useState("");

  const handleSubmitBooks = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    if (!data.title || !data.author || !data.isbn || !data.sectionCode) {
      setErrorMessageBooks("Error al agregar el libro");
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const responseData = await response.json();
        setSuccessMessageBooks(
          `${responseData.title},${responseData.author},${responseData.isbn},${responseData.sectionCode}`
        );
        setErrorMessageBooks("");
        setShowFormBooks(false);
      } else {
        setErrorMessageBooks("Error al agregar el libro");
        setSuccessMessageBooks("");
      }
    } catch (error) {
      console.error("Error al buscar", error);
      setErrorMessageBooks("Error al agregar el libro");
      setSuccessMessageBooks("");
    }
    setVisibleBooks(true);
  };

  const handleSubmitMembers = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    if (!data.firstName || !data.lastName || !data.dni || !data.email) {
      setErrorMessageMembers("Error al agregar el socio");
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const responseData = await response.json();
        setSuccessMessageMembers(
          `${responseData.firstName},${responseData.lastName},${responseData.dni},${responseData.email}`
        );
        setErrorMessageMembers("");
        setShowFormMembers(false);
      } else {
        setErrorMessageMembers("Error al agregar el socio");
        setSuccessMessageMembers("");
      }
    } catch (error) {
      console.error("Error al buscar", error);
      setErrorMessageMembers("Error al agregar el socio");
      setSuccessMessageMembers("");
    }
    setVisibleMembers(true);
  };
  return (
    <div>
      <Header></Header>
      <button className="buttonAddBook" onClick={() => setVisibleBooks(true)}>
        <img src="../../../src/imgs/Book Stack.svg" alt="Icono añadir" />
        AÑADIR LIBRO
      </button>
      <Dialog
        visible={visibleBooks}
        style={{ width: "50vw" }}
        onHide={() => {
          setVisibleBooks(false);
          setSuccessMessageBooks("");
          setErrorMessageBooks("");
        }}
        className="addDialog"
      >
        {errorMessageBooks && (
          <p className="errorMessage">{errorMessageBooks}</p>
        )}
        {successMessageBooks && (
          <>
            <p className="successMessage">¡Libro agregado con éxito!</p>
            <div className="successInfo">
              <p>
                <strong> {successMessageBooks.split(",")[0]}</strong>
              </p>
              <p>{successMessageBooks.split(",")[1]}</p>
              <p>{successMessageBooks.split(",")[2]}</p>
              <p>{successMessageBooks.split(",")[3]}</p>
            </div>
          </>
        )}
        {showFormBooks && (
          <form className="addForm" onSubmit={handleSubmitBooks}>
            <input type="text" name="title" placeholder="Libro" />
            <input type="text" name="author" placeholder="Autor" />
            <input type="text" name="isbn" placeholder="ISBN" />
            <input type="text" name="sectionCode" placeholder="Sección" />
            <button type="submit">
              <img src="../../../src/imgs/Book Stack.svg" alt="Icono añadir" />
              ACEPTAR
            </button>
          </form>
        )}
      </Dialog>

      <button className="buttonAddBook" onClick={() => setVisibleMembers(true)}>
        <img src="../../../src/imgs/User Account.svg" alt="Icono socios" />
        AÑADIR SOCIO
      </button>
      <Dialog
        visible={visibleMembers}
        style={{ width: "50vw" }}
        onHide={() => {
          setVisibleMembers(false);
          setSuccessMessageMembers("");
          setErrorMessageMembers("");
        }}
        className="addDialog"
      >
        {errorMessageMembers && (
          <p className="errorMessage">{errorMessageMembers}</p>
        )}
        {successMessageMembers && (
          <>
            <p className="successMessage">¡Socio agregado con éxito!</p>
            <div className="successInfo">
              <p>
                <strong> {successMessageMembers.split(",")[0]}</strong>
              </p>
              <p>{successMessageMembers.split(",")[1]}</p>
              <p>{successMessageMembers.split(",")[2]}</p>
              <p>{successMessageMembers.split(",")[3]}</p>
            </div>
          </>
        )}
        {showFormMembers && (
          <form className="addForm" onSubmit={handleSubmitMembers}>
            <input type="text" name="firstName" placeholder="Nombre" />
            <input type="text" name="lastName" placeholder="Apellidos" />
            <input type="text" name="dni" placeholder="DNI" />
            <input type="text" name="email" placeholder="Email" />
            <button type="submit">
              <img
                src="../../../src/imgs/User Account.svg"
                alt="Icono añadir"
              />
              ACEPTAR
            </button>
          </form>
        )}
      </Dialog>
    </div>
  );
};

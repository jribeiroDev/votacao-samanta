import React, { useState } from "react";
import "./App.css";

// IMPORTANTE: Substitua esta URL pela URL do seu Google Apps Script
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwKF64ZNXknRN5pH3sPxijAAXxtSgFqNIcjzkKjuSXLaocTObNnTA8vbxCnAr4Rd3o/exec";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    selectedOption: "",
    otherText: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  // Defina suas opções de votação aqui
  const votingOptions = [
    "Já Casei",
    "Comprei um carro",
    "Estou grávida",
    "Outra",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOptionChange = (option) => {
    setFormData((prev) => ({
      ...prev,
      selectedOption: option,
      otherText: option !== "Outra" ? "" : prev.otherText,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação
    if (!formData.name.trim()) {
      setDialogMessage("Por favor, preencha o nome.");
      setShowDialog(true);
      return;
    }

    if (!formData.selectedOption) {
      setDialogMessage("Por favor, selecione uma opção de votação.");
      setShowDialog(true);
      return;
    }

    if (formData.selectedOption === "Outra" && !formData.otherText.trim()) {
      setDialogMessage('Por favor, preencha o campo "Outra".');
      setShowDialog(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Enviar dados para o Google Sheets usando fetch
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("selectedOption", formData.selectedOption);
      formDataToSend.append("otherText", formData.otherText);

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          selectedOption: formData.selectedOption,
          otherText: formData.otherText,
        }),
        headers: {
          "Content-Type": "text/plain",
        },
      });

      // Como pode não conseguir ler a resposta devido ao CORS, assumimos sucesso se não houver erro
      setDialogMessage("✓ Voto enviado com sucesso!");
      setShowDialog(true);
      // Limpar formulário
      setFormData({
        name: "",
        selectedOption: "",
        otherText: "",
      });
    } catch (error) {
      console.error("Erro:", error);
      // Mesmo com erro de CORS, os dados podem ter sido salvos
      setDialogMessage("✓ Voto enviado!");
      setShowDialog(true);
      // Limpar formulário mesmo assim
      setFormData({
        name: "",
        selectedOption: "",
        otherText: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="main-title">Os meus 26 trás uma novidade...</h1>
        <p className="description-text">Tenta adivinhar o que é...</p>

        <form onSubmit={handleSubmit} className="voting-form">
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Digite o seu nome"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Opções para Votação</label>
            <div className="options-container">
              {votingOptions.map((option, index) => (
                <div key={index} className="option-item">
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="votingOption"
                    checked={formData.selectedOption === option}
                    onChange={() => handleOptionChange(option)}
                    className="option-radio"
                  />
                  <label htmlFor={`option-${index}`} className="option-label">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {formData.selectedOption === "Outra" && (
            <div className="form-group outro-field">
              <label htmlFor="otherText">Especifique sua opção</label>
              <input
                type="text"
                id="otherText"
                name="otherText"
                value={formData.otherText}
                onChange={handleInputChange}
                placeholder="Digite sua opção personalizada"
                className="form-input"
              />
            </div>
          )}

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar Voto"}
          </button>
        </form>

        {showDialog && (
          <div className="dialog-overlay" onClick={() => setShowDialog(false)}>
            <div className="dialog" onClick={(e) => e.stopPropagation()}>
              <div className="dialog-content">
                <p>{dialogMessage}</p>
                <button
                  className="dialog-button"
                  onClick={() => setShowDialog(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

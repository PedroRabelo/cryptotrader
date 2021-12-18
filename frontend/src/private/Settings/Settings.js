import { useEffect, useRef, useState } from "react";
import { getSettings, updateSettings } from "../../services/SettingsService";
import { useHistory } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import Symbols from "./Symbols";

function Settings() {
  const inputEmail = useRef("");
  const inputNewPassword = useRef("");
  const inputConfirmPassword = useRef("");
  const inputApiUrl = useRef("");
  const inputStreamUrl = useRef("");
  const inputAccessKey = useRef("");
  const inputSecretKey = useRef("");

  const history = useHistory();

  const [error, setError] = useState([]);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    getSettings(token)
      .then((settings) => {
        inputEmail.current.value = settings.email;
        inputApiUrl.current.value = settings.apiUrl;
        inputStreamUrl.current.value = settings.streamUrl;
        inputAccessKey.current.value = settings.accessKey;
      })
      .catch((err) => {
        if (err.response && err.response.status === 401)
          return history.push("/");
        if (err.response) setError(err.response.data);
        else setError(err.message);
      });
  }, []);

  function onFormSubmit(event) {
    event.preventDefault();

    if (
      (inputNewPassword.current.value || inputConfirmPassword.current.value) &&
      inputNewPassword.current.value !== inputConfirmPassword.current.value
    ) {
      return setError("Os campos nova senha e confirmar senha deve ser iguais");
    }

    const token = localStorage.getItem("token");
    updateSettings(
      {
        email: inputEmail.current.value,
        password: inputNewPassword.current.value
          ? inputNewPassword.current.value
          : null,
        apiUrl: inputApiUrl.current.value,
        streamUrl: inputStreamUrl.current.value,
        accessKey: inputAccessKey.current.value,
        secretKey: inputSecretKey.current.value
          ? inputSecretKey.current.value
          : null,
      },
      token
    ).then((result) => {
      if (result) {
        setError("");
        setSuccess("Configurações atualizadas com sucesso");
        inputSecretKey.current.value = "";
        inputNewPassword.current.value = "";
        inputConfirmPassword.current.value = "";
      } else {
        setSuccess("");
        console.error(error.message);
        setError("Não foi possível atualizar as configurações");
      }
    });
  }

  return (
    <>
      <Menu />
      <main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <div className="d-block mb-4 mb-md-0">
            <h1 className="h4">Configurações</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card card-body border-0 shadow mb-4">
              <h2 className="h5 mb-4">Informações Gerais</h2>
              <form onSubmit={onFormSubmit}>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <div className="form-group">
                      <label htmlFor="email">E-mail</label>
                      <input
                        ref={inputEmail}
                        className="form-control"
                        id="email"
                        type="text"
                        placeholder="Seu E-mail"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="newPassword">Nova Senha</label>
                      <input
                        ref={inputNewPassword}
                        className="form-control"
                        id="newPassword"
                        type="text"
                        placeholder="Digite a senha"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="confirmPassword">
                        Confirme sua senha
                      </label>
                      <input
                        ref={inputConfirmPassword}
                        className="form-control"
                        id="confirmPassword"
                        type="text"
                        placeholder="Digite a senha novamente"
                      />
                    </div>
                  </div>
                </div>

                <h2 className="h5 mb-4">Informações da Exchange</h2>

                <div className="row">
                  <div className="col-sm-12 mb-3">
                    <div className="form-group">
                      <label htmlFor="apiUrl">API URL</label>
                      <input
                        ref={inputApiUrl}
                        className="form-control"
                        id="apiUrl"
                        type="text"
                        placeholder="API URL"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 mb-3">
                    <div className="form-group">
                      <label htmlFor="apiUrl">STREAM URL</label>
                      <input
                        ref={inputStreamUrl}
                        className="form-control"
                        id="streamUrl"
                        type="text"
                        placeholder="STREAM URL"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 mb-3">
                    <div className="form-group">
                      <label htmlFor="accessKey">Chave de Acesso</label>
                      <input
                        ref={inputAccessKey}
                        className="form-control"
                        id="accessKey"
                        type="text"
                        placeholder="Sua chave de acesso"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 mb-3">
                    <div className="form-group">
                      <label htmlFor="secretKey">Nova chave secreta</label>
                      <input
                        ref={inputSecretKey}
                        className="form-control"
                        id="secretKey"
                        type="password"
                        placeholder="Informe uma nova chave secreta"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap">
                    <div className="col-sm-3">
                      <button
                        className="btn btn-gray-800 mt-2 animate-up-2"
                        type="submit"
                        onClick={onFormSubmit}
                      >
                        Salvar
                      </button>
                    </div>
                    {error && error.length ? (
                      <div className="alert alert-danger mt-2 col-9 py-2">
                        {error}
                      </div>
                    ) : (
                      <></>
                    )}
                    {success && success.length ? (
                      <div className="alert alert-success mt-2 col-9 py-2">
                        {success}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Symbols />
      </main>
    </>
  );
}

export default Settings;

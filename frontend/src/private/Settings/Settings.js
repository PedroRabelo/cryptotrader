import {useEffect, useState} from "react";
import {getSettings} from "../../services/SettingsService";
import {useHistory} from "react-router-dom";
import {doLogout} from "../../services/AuthService";


function Settings() {
  const history = useHistory();

  const [settings, setSettings] = useState({
    email: '',
    apiUrl: '',
    accessKey: '',
    keySecret: ''
  });

  const [error, setError] = useState([]);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    getSettings(token)
      .then(response => {
        setSettings(response);
      })
      .catch(err => {
        if (err.response && err.response.status === 401)
          return history.push('/');
        if (err.response) setError(err.response.data);
        else setError(err.message);
      })

  }, []);

  function onLogoutClick(event) {
    const token = localStorage.getItem('token');
    doLogout(token)
      .then(response => {
        localStorage.removeItem('token');
        history.push('/');
      })
      .catch(err => {
        setError(err.message);
      })

  }

  return (
    <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4'>
      <div className='d-block mb-4 mb-md-0'>
        <h1 className='h4'>Configurações</h1>
      </div>
      {settings.email}

    </div>
  )
}

export default Settings;
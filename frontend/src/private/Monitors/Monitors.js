import React, { useEffect, useState } from 'react'
import Menu from '../../components/Menu/Menu'
import Pagination from '../../components/Pagination/Pagination'
import Footer from '../../components/Footer/Footer'
import { useHistory, useLocation } from 'react-router-dom'
import { getMonitors } from '../../services/MonitorsService'
import MonitorRow from './MonitorRow'
import MonitorModal from './MonitorModal/MonitorModal'
import NewMonitorButton from './NewMonitorButton'

function Monitors() {

  const defaultLocation = useLocation();

  function getPage(location) {
    if (!location) location = defaultLocation;
    return new URLSearchParams(location.search).get('page');
  }

  const history = useHistory();

  useEffect(() => {
    return history.listen(location => {
      setPage(getPage(location));
    })
  }, [history]);

  const [count, setCount] = useState(0);
  const [page, setPage] = useState(getPage());
  const [monitors, setMonitors] = useState([]);
  const [editMonitor, setEditMonitor] = useState({
    type: 'CANDLES',
    interval: '1m',
    isActive: false,
    logs: false
  })

  useEffect(() => {
    const token = localStorage.getItem('token');
    getMonitors(page || 1, token)
      .then(result => {
        setMonitors(result.rows);
        setCount(result.count);
      })
      .catch(err => console.error(err.response ? err.response.data : err.message))
  }, []);

  function onEditClick(event) {
    console.log('edit click');
  }

  function onStartClick(event) {
    console.log('edit click');
  }

  function onStopClick(event) {
    console.log('edit click');
  }

  function onDeleteClick(event) {
    console.log('edit click');
  }

  function onModalSubmit(event) {
    history.go(0);
  }

  function onNewMonitorClick(event) {
    setEditMonitor(editMonitor);
  }

  return (
    <>
      <Menu />
      <main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <div className="d-block mb-4 mb-md-0">
            <h2 className="h4">Monitors</h2>
          </div>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="d-inline-flex align-items-center">
              <NewMonitorButton onClick={onNewMonitorClick} />
            </div>
          </div>
        </div>
        <div className="card card-body boder-0 shadow table-wrapper table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="border-gray-200">Type</th>
                <th className="border-gray-200">Symbol</th>
                <th className="border-gray-200">Active</th>
                <th className="border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                monitors.map(monitor => (
                  <MonitorRow
                    key={monitor.id}
                    data={monitor}
                    onEditClick={onEditClick}
                    onStartClick={onStartClick}
                    onStopClick={onStopClick}
                    onDeleteClick={onDeleteClick} />
                ))
              }
            </tbody>
          </table>
          <Pagination count={count} />
        </div>
        <Footer />
      </main>
      <MonitorModal data={editMonitor} onSubmit={onModalSubmit} />
    </>
  )
}

export default Monitors;
import React, { useState } from 'react'
import Menu from '../../components/Menu/Menu'
import Pagination from '../../components/Pagination/Pagination'
import Footer from '../../components/Footer/Footer'

function Monitors() {
  const [count, setCount] = useState(0);

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
              <button id="btnNewMonitor" className="btn btn-primary animate-up-2" data-bs-toogle="modal" data-bs-target="#modalMonitor">
                <svg
                  className='icon icon-xs me-2'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z'
                    clipRule='evenodd'
                  />
                </svg>
                Novo Monitor
              </button>
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

            </tbody>
          </table>
          <Pagination count={count} />
        </div>
        <Footer />
      </main>
    </>
  )
}

export default Monitors;
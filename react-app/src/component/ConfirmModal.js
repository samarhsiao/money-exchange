import React from 'react'

import '../styles/confirmmodal.css'
function ConfirmModal(props) {
     const {
       showUp,
       setShowUp
     } = props

     const closeModal = () => {
        setShowUp('fade-out')
     }
  return (
    <>
      <div className={`my_modal ${showUp} p-0`}>
      <div className="header"></div>
        <div>
          <p className="content m-0">請選擇要兌換的外幣</p>
          <div className={`my_btn text-center `}
          onClick={()=>{closeModal()}}><a className="waves-effect waves-light btn-large green darken-3" href="#/">確定</a></div>
        </div>
      </div>
    </>
  )
}

export default ConfirmModal

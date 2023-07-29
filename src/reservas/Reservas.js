import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import TopNavbar from '../Nav/TopNavbar';


export default function Reservas() {

    const [reservas,setReservas]= useState([])

    const {id} = useParams()

    useEffect(()=>{
        getAllReservas();
        
    },[])

    const getAllReservas=async()=>{
        const result= await axios.get("http://localhost:8080/reservas")
        setReservas(result.data)
    }

    const deleteReserva=async(id)=>{
        if (window.confirm("¿Estás seguro de que deseas eliminar esta reserva?")){
       await axios.delete(`http://localhost:8080/reserva/${id}`) 
       alert("Cliente eliminado exitosamente.")
       getAllReservas()
    }}

  return (
<>
<div className='top-navbar'><TopNavbar position="fixed"/></div>

<div className="d-flex justify-content-center " style={{  padding: '20px'  }}>
      <div className="card bg-white p-4 shadow-sm rounded-3" style={{ width: '1090px' }}>
        <MDBTable className="table  align-middle">
      <MDBTableHead>
        <tr>
          <th scope="col"style={{ color: 'blue', fontWeight: 'bold' }}>#</th>
          <th scope='col'style={{ color: 'blue', fontWeight: 'bold' }}>Cantidad de personas</th>
          <th scope='col'style={{ color: 'blue', fontWeight: 'bold' }}>Cliente</th>
          <th scope='col' style={{ color: 'blue', fontWeight: 'bold' }}>Agente</th>
          <th scope='col' style={{ color: 'blue', fontWeight: 'bold' }}>Precio</th>
          <th scope='col' style={{ color: 'blue', fontWeight: 'bold' }}>Viaje</th>
          <th scope='col' style={{ color: 'blue', fontWeight: 'bold' }}>Fecha</th>
          <th scope="col"style={{ color: 'blue', fontWeight: 'bold' }}>Acciones 
          &nbsp; &nbsp;&nbsp;&nbsp;<Link to='/newclient'><MDBBtn color="blue" rounded size="sm" style={{ color: 'white', fontWeight: 'bold' }}>
              Agregar
          </MDBBtn></Link></th>
        </tr>
      </MDBTableHead>

      <MDBTableBody>
        {
            reservas.map((reservas,index)=>(
        <tr>
        <th scope="row" key={index}>{index+1}</th>
          <td>
          {reservas.cantidadpersonas}
          </td>
          <td>
          {reservas.cliente_id}
          </td>
          <td>{reservas.agente_id}</td>
          <td>
          {reservas.preciototal}
          </td>
          <td>
          {reservas.viaje_id}
          </td>
          <td>{reservas.preciototal}</td>
          <td>
          <Link to={`/editclient/${reservas.id}`}>
            <MDBBtn color="success" rounded size="sm">
                Editar
            </MDBBtn>
         </Link>
          <MDBBtn color="danger" rounded size="sm">
              Eliminar
          </MDBBtn>
            </td>
        </tr>
        ))
    }
      </MDBTableBody>
    </MDBTable>
    </div>
    </div>
    <style>
    {`
    .top-navbar {
      position: static;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 999;
      /* Add any additional styles you need for your navbar */`}
    </style>
    </>

  )
}
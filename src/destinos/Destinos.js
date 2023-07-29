import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import TopNavbar from '../Nav/TopNavbar';


export default function Destinos() {

    const [destino,setDestinos]= useState([])

    const {id} = useParams()

    useEffect(()=>{
        loadDestinos();
        
    },[])

    const loadDestinos=async()=>{
        const result= await axios.get("http://localhost:8080/destinos")
        console.log("result.data")
        console.log(result.data)
        setDestinos(result.data)
    }

    const deleteDestino=async(id)=>{
        if (window.confirm("¿Estás seguro de que deseas eliminar este destino?")){
       await axios.delete(`http://localhost:8080/deletedestino/${id}`) 
       alert("Destino eliminado esxitosamente!")
       loadDestinos()
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
          <th scope='col'style={{ color: 'blue', fontWeight: 'bold' }}>Nombre </th>
          <th scope='col'style={{ color: 'blue', fontWeight: 'bold' }}>Pais</th>
          <th scope='col' style={{ color: 'blue', fontWeight: 'bold' }}>Precio</th>
          <th scope="col"style={{ color: 'blue', fontWeight: 'bold' }}>Acciones 
          &nbsp; &nbsp;&nbsp;&nbsp;<Link to='/newdestino'><MDBBtn color="blue" rounded size="sm" style={{ color: 'white', fontWeight: 'bold' }}>
              Agregar
          </MDBBtn></Link></th>
        </tr>
      </MDBTableHead>

      <MDBTableBody>
        {
            destino.map((destino,index)=>(
        <tr>
        <th scope="row" key={index}>{index+1}</th>
          <td>
            {destino.nombre}
          </td>
          <td>
            {destino.nombrePais}    
          </td>
          <td>{destino.precio}</td>
          <td>
          <Link to={`/editdestino/${destino.idDestino}`}>
            <MDBBtn color="success" rounded size="sm">
                Editar
            </MDBBtn>
         </Link>
          <MDBBtn color="danger" rounded size="sm" onClick={() => deleteDestino(destino.idDestino)}>
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
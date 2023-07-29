import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { Link, useNavigate,useParams } from 'react-router-dom'

export default function EditDestinos() {
    let navigate = useNavigate()

    const {id}=useParams()

    const [destino,setDestino]=useState({
        nombre:"",
        idPais:"",
        precio:""
    })

    const {nombre,idPais,precio}=destino
    
    const [paises, setPaises] = useState([]); // New state to store the list of countries

    const onInputChange=(e)=>{

        const { name, value } = e.target;
      
        if (name === 'nombre_pais') {
            // Find the selected country object from the list
            const selectedCountry = paises.find(country => country.nombre_pais === value);
            console.log("pais selected")
            console.log(selectedCountry)
            // Set the pais_id if the selectedCountry is found, otherwise set it to null
            setDestino({ ...destino, [name]: value, idPais: selectedCountry ? selectedCountry.id_pais : null });
        } else {
            setDestino({ ...destino, [name]: value });
        }
    }

    useEffect(()=>{
        loadDestinos();
        fetchPaises(); // Fetch the list of countries when the component mounts

        
    },[])

    const fetchPaises = async () => {
        try {
            const response = await axios.get("http://localhost:8080/paises");
            setPaises(response.data);
            console.log("response.data")
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
    };

    const onSubmit=async (e)=>{
        e.preventDefault();
        console.log(nombre,idPais,precio)
        if (!nombre || !idPais || !precio) {
          alert("Por favor, complete todos los campos");
          return;
        }
        await axios.put(`http://localhost:8080/EditDestino/${id}`,destino)
        alert("Destino Actualizado!")
        navigate("/destinos")
    }

    const loadDestinos=async()=>{
        const result= await axios.get(`http://localhost:8080/destino/${id}`)
        console.log(result.data)
        setDestino(result.data)
    }

  return (
    <div className='container'>
    <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'> 
            <h2 className='text-center m-4'>Editar Destino</h2>
            <form onSubmit={e=>onSubmit(e)}>
                <div className='mb-3'>
                    <label htmlFor='Nombre' className='form-label'>Nombre</label>
                    <input
                        type= {"text"}
                        className='form-control' 
                        placeholder='Ingrese el Nombre'
                        name='nombre'
                        value={nombre}
                        onChange={(e)=>onInputChange(e)}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='País' className='form-label'>País</label>
                    <select
                        className='form-control'
                        name='nombre_pais' // Changed from 'idPais' to 'nombre_pais'
                        value={idPais} // Changed from idPais to nombre_pais
                        onChange={onInputChange}
                        style={{ color: 'black' }}
                    >
                        <option value="">Seleccione el país</option>
                        {paises.map(country => (
                            <option key={country.id_pais} value={country.nombre_pais}>
                                {country.nombre_pais}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='mb-3'>
                    <label htmlFor='Precio' className='form-label'>Precio</label>
                    <input
                        type= {"text"}
                        className='form-control' 
                        placeholder='Ingrese el precio'
                        name='precio'
                        value={precio}
                        onChange={(e)=>onInputChange(e)}
                    />
                </div>
                <button type='submit' className='btn btn-outline-primary'>Aceptar</button>
                <Link type='submit' className='btn btn-outline-danger mx-2' to="/destinos">Cancelar</Link>
            </form>
        </div>
    </div>
</div>
  )
}

import firebaseConfig from '../config/firebaseConfig'
import { useState } from 'react'

function Form() {
    const cliente = {
        name: '',
        address: '',
        phone: '',
        web: '',
        email: ''
    }

    const [client, setClient] = useState(cliente)

    const handleChange = (e) => {
        const { name, value } = e.target
        setClient({ ...client, [name]: value })
    }

    const saveClient = (e) => {
        e.preventDefault()
        console.log(client)
    }

    return (
        <div>
            <div className="shadow-sm rounded-sm mt-5">
                <h4 className="text-center">Registro de clientes</h4>
                <form action="" className="p-4" onSubmit={saveClient}>
                    <div className="flex flex-col">
                        <label htmlFor="floatingInput">Ingresar Nombre</label>
                        <input
                            type="text"
                            className="border border-blue-500 mt2 mb-2"
                            id="floatingInput"
                            placeholder="Ingresar Nombre"
                            name="name"  
                            onChange={handleChange}
                            value={client.name}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="floatingInput">Ingresar Dirección</label>
                        <input
                            type="text"
                            className="border border-blue-500 mt2 mb-2"
                            id="floatingInput"
                            placeholder="Ingresar Dirección"
                            name="address" 
                            onChange={handleChange}
                            value={client.address}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="floatingInput">Ingresar teléfono</label>
                        <input
                            type="text"
                            className="border border-blue-500 mt2 mb-2"
                            id="floatingInput"
                            placeholder="Ingresar teléfono"
                            name="phone" 
                            onChange={handleChange}
                            value={client.phone}
                            required
                        />
                    </div>
                    <div>
                        <label>Elegir Foto de perfil</label>
                        <input
                            type="file"
                            id="foto"
                            className="border border-blue-500"
                            // required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="floatingInput">Ingresar web</label>
                        <input
                            type="text"
                            className="border border-blue-500 mt2 mb-2"
                            id="floatingInput"
                            placeholder="Ingresar web"
                            name="web"
                            onChange={handleChange}
                            value={client.web}
                            required
                        />
                    </div>
                    <div className="flex flex-col border">
                        <label htmlFor="floatingInput">Ingresar email</label>
                        <input
                            type="email"
                            className="border border-blue-500 mt2 mb-2"
                            id="floatingInput"
                            placeholder="Ingresar email"
                            name="email"
                            onChange={handleChange}
                            value={client.email}
                            required
                        />
                    </div>
                    <button className="bg-blue-400 rounded-lg w-28 h-10">Enviar</button>
                </form>
            </div>
        </div>
    )
}
export { Form }

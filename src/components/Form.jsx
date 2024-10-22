import { useState } from 'react'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import firebaseConfig from '../config/firebaseConfig'

const db = getFirestore(firebaseConfig)
const storage = getStorage(firebaseConfig)

function Form({ onAddClient }) {
    const initialClientState = {
        name: '',
        address: '',
        phone: '',
        web: '',
        email: ''
    }

    const [client, setClient] = useState(initialClientState)
    const [urlImg, setUrlImg] = useState("")
    const [available, setAvailable] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setClient({ ...client, [name]: value })
    }

    const fileHandler = async (e) => {
        try {
            const fileImg = e.target.files[0]
            if (!fileImg) return
            const refFile = ref(storage, `clientes/${fileImg.name}`)
            await uploadBytes(refFile, fileImg)
            const urlImg = await getDownloadURL(refFile)
            setUrlImg(urlImg)
            alert('Imagen guardada con éxito')
            setAvailable(true)
        } catch (error) {
            alert('Error al subir la imagen: ' + error)
        }
    }

    const saveClient = async (e) => {
        e.preventDefault()
        try {
            const newClient = {
                name: client.name,
                address: client.address,
                web: client.web,
                email: client.email,
                phone: client.phone,
                picture: urlImg
            }

            // Agregar el nuevo cliente a Firebase
            const docRef = await addDoc(collection(db, "clientes"), newClient)
            alert('Cliente guardado con éxito')

            // Enviar cliente al padre
            if (onAddClient) {
                onAddClient({ ...newClient, id: docRef.id })  // Pasamos el cliente con su ID
            }

            // Resetear el formulario
            setClient(initialClientState)
            e.target.reset()
            setAvailable(false)
        } catch (error) {
            alert('Error al guardar el cliente: ' + error)
        }
    }

    return (
        <div>
            <div className="shadow-sm rounded-sm mt-5">
                <h4 className="text-center">Registro de clientes</h4>
                <form className="p-4" onSubmit={saveClient}>
                    <div className="flex flex-col">
                        <label htmlFor="name">Ingresar Nombre</label>
                        <input
                            type="text"
                            className="border border-blue-500 mt-2 mb-2"
                            id="name"
                            placeholder="Ingresar Nombre"
                            name="name"  
                            onChange={handleChange}
                            value={client.name}
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="address">Ingresar Dirección</label>
                        <input
                            type="text"
                            className="border border-blue-500 mt-2 mb-2"
                            id="address"
                            placeholder="Ingresar Dirección"
                            name="address"
                            onChange={handleChange}
                            value={client.address}
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="phone">Ingresar teléfono</label>
                        <input
                            type="text"
                            className="border border-blue-500 mt-2 mb-2"
                            id="phone"
                            placeholder="Ingresar teléfono"
                            name="phone"
                            onChange={handleChange}
                            value={client.phone}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="picture">Elegir Foto de perfil</label>
                        <input
                            type="file"
                            id="picture"
                            className="border border-blue-500 mt-2 mb-2"
                            onChange={fileHandler}
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="web">Ingresar web</label>
                        <input
                            type="text"
                            className="border border-blue-500 mt-2 mb-2"
                            id="web"
                            placeholder="Ingresar web"
                            name="web"
                            onChange={handleChange}
                            value={client.web}
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email">Ingresar email</label>
                        <input
                            type="email"
                            className="border border-blue-500 mt-2 mb-2"
                            id="email"
                            placeholder="Ingresar email"
                            name="email"
                            onChange={handleChange}
                            value={client.email}
                            required
                        />
                    </div>

                    <button
                        className={`${
                            available ? "bg-blue-400" : "bg-gray-400 cursor-not-allowed"
                        } text-white font-bold py-2 px-4 rounded`}
                        disabled={!available}
                    >
                        {available ? "Guardar cliente" : "Llenar formulario"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export { Form }

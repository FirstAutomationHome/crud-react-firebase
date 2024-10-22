import { useState } from 'react'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import firebaseConfig from '../config/firebaseConfig'

const db = getFirestore(firebaseConfig)
const storage = getStorage(firebaseConfig)

function Form() {
    const person = {
        name: '',
        address: '',
        phone: '',
        web: '',
        email: ''
    }

    const [client, setClient] = useState(person)
    const [urlImg, setUrlImg] = useState("")
    const [available, setAvailable] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setClient({ ...client, [name]: value })
    }

    const fileHandler = async (e) => {
        try {
            //Seleccionar el archivo
            const fileImg = e.target.files[0]
            //Cargar imagen al storage
            const refFile = ref(storage, `clientes/${fileImg.name}`)
            await uploadBytes(refFile, fileImg)
            //Obtener la url de la imagen en firebase
            const urlImg = await getDownloadURL(refFile)
            setUrlImg(urlImg)
            alert('Imagen guardad con éxito')
            setAvailable(true)
        } catch (error) {
            alert(error)
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
            await addDoc(collection(db, "clientes"), newClient)
            alert('Cliente guardado con éxito')
            setClient(person)
            e.target.picture.value = ""
            setAvailable(false)
        } catch (error) {
            alert(error)
            
        }
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
                            onChange={fileHandler}
                            required
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
                    <button
                        className={`${
                            available ? "bg-blue-400" : "bg-gray-400 cursor-not-allowed"
                        } text-white font-bold py-2 px-4 rounded`}
                        disabled={!available}
                        >
                        {available ? "Guardar producto" : "Llenar formulario"}
                    </button>

                </form>
            </div>
        </div>
    )
}
export { Form }

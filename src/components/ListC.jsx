import { useState, useEffect } from 'react'
import { getFirestore, collection, getDocs, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import firebaseConfig from '../config/firebaseConfig'

const db = getFirestore(firebaseConfig)
const storage = getStorage(firebaseConfig)

function ListC() {
    const [list, setList] = useState([])
    const [client, setClient] = useState(null)
    const [urlImg, setUrlImg] = useState("")
    const [available, setAvailable] = useState(false)

    const getList = async () => {
        const data = await getDocs(collection(db, "clientes"))
        setList(data.docs.map((doc) => ({
            ...doc.data(), id: doc.id
        })))
    }

    useEffect(() => {
        getList()
    }, [])

    const deleteClient = async (id) => {
        try {
            await deleteDoc(doc(db, "clientes", id))
            
            setList(list.filter(client => client.id !== id))
            alert("Cliente eliminado con éxito")
        } catch (error) {
            alert(error)
        }
    }

    const getClient = async (id) => {
        const docSnap = await getDoc(doc(db, "clientes", id))
        if(docSnap.exists()) {
            setClient({ ...docSnap.data(), id: docSnap.id})
            setUrlImg(docSnap.data().picture)
            setAvailable(true)
        } else {
            console.log("No such document!")
        }
    }

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

    const updateClient = async (e) => {
        e.preventDefault()
        try {
            const updateClient = {
                ...client,
                picture: urlImg
            }
            await updateDoc(doc(db, "clientes", client.id), updateClient)
            alert('Cliente actualizado con éxito')
            setClient(null)
            setUrlImg("")
            setAvailable(false)
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {list.map((client) => (
                    <div key={client.id}>
                        <div className='shadow-sm rounded-sm m-1'>
                            <img src={client.picture} alt="picture" className='w-full h-36 object-cover' />
                            <h5 className='mt-3 text-lg font-semibold'>{client.name}
                                <button
                                    type='button'
                                    className='ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded'
                                    onClick={() => {
                                        getClient(client.id)  // Obtenemos el cliente
                                        setAvailable(true)    // Mostramos el modal
                                    }}>
                                    Editar
                                </button>
                            </h5>
                            <p className='mt-2 text-gray-600'>{client.address}</p>
                            <p className='mt-2 text-gray-600'>{client.phone}</p>
                            <p className='mt-2 text-gray-600'>{client.web}</p>
                            <p className='mt-2 text-gray-600'>{client.email}</p>
                            <button 
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-3" 
                                onClick={() => deleteClient(client.id)}>
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <div className={`fixed inset-0 z-10 ${available ? 'block' : 'hidden'}`} aria-labelledby="staticBackdropLabel">
                <div className='flex justify-center items-center min-h-screen px-4'>
                    <div className='bg-white rounded-lg shadow-xl overflow-hidden max-w-lg w-full'>
                        <div className='px-6 py-4 border-b'>
                            <h2 className='text-lg font-bold'>Actualizar Cliente</h2>
                            <button
                                className='text-gray-400 hover:text-gray-600 focus:outline-none'
                                onClick={() => setAvailable(false)}>
                                <span className='sr-only'>Cerrar</span> ✖
                            </button>
                        </div>
                        <div className='p-6'>
                            {client && (
                                <form onSubmit={updateClient}>
                                    <div className='mb-4'>
                                        <label className="block text-sm font-medium text-gray-700">Ingresar nombre</label>
                                        <input 
                                            type="text"
                                            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                            name='name'
                                            onChange={handleChange}
                                            value={client.name}
                                            required />                                                    
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Ingresar Dirección</label>
                                        <input
                                            type="text"
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            name="address"
                                            onChange={handleChange}
                                            value={client.address}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Ingresar teléfono</label>
                                        <input
                                            type="text"
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            name="phone"
                                            onChange={handleChange}
                                            value={client.phone}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Elegir Foto de perfil</label>
                                        <input
                                            type="file"
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                                            onChange={fileHandler}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Ingresar web</label>
                                        <input
                                            type="text"
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            name="web"
                                            onChange={handleChange}
                                            value={client.web}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Ingresar email</label>
                                        <input
                                            type="email"
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            name="email"
                                            onChange={handleChange}
                                            value={client.email}
                                            required
                                        />
                                    </div>
                                    <button
                                        className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring'
                                        type="submit">
                                        Actualizar Cliente
                                    </button>
                                </form>
                            )}
                        </div>
                        <div className='px-6 py-4 border-t'>
                            <button
                                className='text-red-500 hover:text-red-600 font-bold'
                                onClick={() => setAvailable(false)}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { ListC }

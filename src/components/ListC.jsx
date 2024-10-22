import { useState, useEffect } from 'react'
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import firebaseConfig from '../config/firebaseConfig'

const db = getFirestore(firebaseConfig)
const storage = getStorage(firebaseConfig)

function ListC() {
    const [list, setList] = useState([])

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

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {list.map((client) => (
                    <div key={client.id}>
                        <div className='shadow-sm rounded-sm m-1'>
                            <img src={client.picture} alt="picture" className='w-full h-36' />
                            <h5 className='mt-3'>{client.name}</h5>
                            <p className='mt-3'>{client.address}</p>
                            <p className='mt-3'>{client.phone}</p>
                            <p className='mt-3'>{client.web}</p>
                            <p className='mt-3'>{client.email}</p>
                            <button 
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" 
                                onClick={() => deleteClient(client.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export { ListC }

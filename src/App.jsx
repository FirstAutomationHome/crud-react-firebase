import { Form } from './components/Form'
import { ListC } from './components/ListC'
function App() {
  

  return (
    
    <div className='container w-full'>
      <div className='w-full grid grid-cols-2'>
        <div>
          <h2>formulario</h2>
          <Form />

        </div>
        <div>
          <h2>lista de clientes</h2>
          <ListC />

        </div>
      </div>
    </div>
  

  )
}

export default App

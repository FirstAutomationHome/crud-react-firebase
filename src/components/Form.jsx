function Form() {
    return(
        <div>
            <div className="shadow-sm rounded-sm mt-5">
                <h4 className="text-center">Registro de clientes</h4>
                <form action="" className="p-4">
                    <div className="form-floating">
                        <input 
                            type="text"
                            className="form-control mt2 mb-2"
                            id="floatingInput"
                            placeholder="Ingresar Nombre"
                            name="nombre"
                            required />
                        <label htmlFor="floatingInput">Ingresar Nombre</label>
                    </div>
                    <div className="form-floating">
                        <input 
                            type="text"
                            className="form-control mt2 mb-2"
                            id="floatingInput"
                            placeholder="Ingresar Dirección"
                            name="Dirección"
                            required />
                        <label htmlFor="floatingInput">Ingresar Dirección</label>
                    </div>
                    <div className="form-floating">
                        <input 
                            type="text"
                            className="form-control mt2 mb-2"
                            id="floatingInput"
                            placeholder="Ingresar teléfono"
                            name="teléfono"
                            required />
                        <label htmlFor="floatingInput">Ingresar teléfono</label>
                    </div>
                    <div>
                        <label>Elegir Foto de perfil</label>
                        <input 
                            type="file"
                            id="foto"
                            className="form-control"
                            required />
                    </div>
                    <div className="form-floating">
                        <input 
                            type="text"
                            className="form-control mt2 mb-2"
                            id="floatingInput"
                            placeholder="Ingresar web"
                            name="web"
                            required />
                        <label htmlFor="floatingInput">Ingresar web</label>
                    </div>
                    <div className="form-floating">
                        <input 
                            type="email"
                            className="form-control mt2 mb-2"
                            id="floatingInput"
                            placeholder="Ingresar email"
                            name="email"
                            required />
                        <label htmlFor="floatingInput">Ingresar email</label>
                    </div>
                    <button>Enviar</button>                
                </form>
            </div>
        </div>
    )
}
export { Form }
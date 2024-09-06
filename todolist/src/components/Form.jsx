import { useState } from "react"

export default function Form(){
    const [formData, setFormData] = useState({
        email: '',
        name: "",
        password: ""
       })
    
       const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name] : value
            
        }))

   }
    return(
        <>
            <form className="col-md-5 col-sm-10 col-8 col-lg-4  mx-auto my-5 border rounded p-5 shadow">
                <label htmlFor="email">Email: </label>
                <input type="email" className="form-control m-2" name="email" value={formData.email} onChange={handleChange} id="email"/>
                <label htmlFor="name">Name: </label>
                <input type="text" className="form-control m-2"name="name" value={formData.name} onChange={handleChange} id="name"/>
                <label htmlFor="pswd">Password:</label>
                <input type="password" className="form-control m-2" name="password" value={formData.password} onChange={handleChange} id="pswd"/>
                <button type="submit" className="btn btn-success mx-2 my-4 p-2 w-100">Sign up</button>
            </form>
        </>
    )
}
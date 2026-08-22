import {useState} from 'react';
import '../style/form.scss'
import {Link} from 'react-router'
import axios from 'axios'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

     function handleSubmit(e) {
        e.preventDefault();
        // Handle login logic here
        axios.post('http://localhost:3000/api/auth/login', { email, password },{withCredentials: true })
.then(res=>{
    console.log(res.data);
})

}
return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onInput={(e) => { setEmail(e.target.value) }}
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onInput={(e) => { setPassword(e.target.value) }}
                />
                <button type="submit">login</button>
            </form>
            <p>Don't have an account? <Link className="toggleAuthForm" to="/register">Register</Link></p>
        </div>
    </main>
        
)
}
export default Login
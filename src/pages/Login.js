import React from "react"
import axios from "axios"

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: ""
        }
    }

    loginProcess(event) {
        event.preventDefault()
        let endpoint = "http://localhost:8000/login"
        let request = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post(endpoint, request)
            .then(result => {
                if (result.data.logged) {
                    localStorage.setItem("token", result.data.token)
                    window.alert("yeay! you're logged<3")
                } else {
                    window.alert("gkbs! pls recheck your usn and pass")
                }
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="container">
                <div className="col-lg-6" style={{ margin: "0 auto" }}>
                    <div className="card">

                        <div className="card-header bg-success">
                            <h4 className="text-white">Hey :3</h4>
                        </div>

                        <div className="card-body">

                            <form onSubmit={ev => this.loginProcess(ev)}>
                                username
                                <input type="text" className="form-control"
                                    required value={this.state.username}
                                    onChange={ev => this.setState({ username: ev.target.value })} />

                                password
                                <input type="password" className="form-control mb-2"
                                    required value={this.state.username.password}
                                    onChange={ev => this.setState({ password: ev.target.value })} />

                                <button type="submit" className="btn btn-success">
                                    Login
                                </button>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        )
    }

}

export default Login
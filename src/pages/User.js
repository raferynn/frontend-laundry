import React from "react"
import { Modal } from "bootstrap"
import axios from "axios"

class User extends React.Component {
    constructor() {
        super()
        this.state = {
            id_user: "",
            username: "",
            password: "",
            nama: "",
            role: "",
            users: [
                {
                    username: "rAfI123",
                    nama: "rafi",
                    role: "admin"
                },
                {
                    username: "Al1xxx",
                    nama: "alix",
                    role: "user"
                },
                {
                    username: "4lo1s",
                    nama: "alois",
                    role: "user"
                },

            ]
        }
    }

    tambahData() {
        this.modalUser = new Modal(document.getElementById("modal_user"))
        this.modalUser.show()
        this.setState({
            username: "",
            password: "",
            nama: "",
            role: "user",
            action: "tambah"
        })
    }

    editData(id_user) {
        this.modalUser = new Modal(document.getElementById("modal_user"))
        this.modalUser.show()

        let index = this.state.users.findIndex(user => user.id_user === id_user)

        this.setState({
            id_user: this.state.users[index].id_user,
            username: this.state.users[index].username,
            password: this.state.password,
            nama: this.state.users[index].nama,
            role: this.state.users[index].role,
            action: "ubah"
        })
    }

    simpanData(event) {
        event.preventDefault();

        if (this.state.action === "tambah") {
            let endpoint = "http://localhost:8000/users"
            let data = {
                username: this.state.username,
                password: this.state.password,
                nama: this.state.nama,
                role: this.state.role
            }
            console.log(data)

            axios.post(endpoint, data)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()

                })
                .catch(error => console.log(error))
            this.modalUser.hide()

        } else if (this.state.action === "ubah") {
            this.modalUser.hide()

            let endpoint = "http://localhost:8000/users/" +this.state.id_user
            let data = {
                id_user: this.state.id_user,
                username: this.state.username,
                password: this.state.password,
                nama: this.state.nama,
                role: this.state.role
            }

            axios.put(endpoint, data)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()

                })
                .catch(error => console.log(error))

        }
    }

    destroyData(id_user) {
        if (window.confirm("yakin???")) {

            let endpoint = "http://localhost:8000/users/" + id_user
            axios.delete(endpoint)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
        }
    }

    getData() {
        let endpoint = "http://localhost:8000/users"
        axios.get(endpoint)
            .then(response => {
                this.setState({ users: response.data })
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <div className="container">
                <br /><br />
                <div className="card">

                    <div className="card-header bg-success">
                        <h3 className="text-white">List of users</h3>
                    </div>
                

                <div className="card-body">
                    <ul className="list-group">
                        {this.state.users.map(user => (
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-lg-5">
                                        <small className="text-info">Username</small> <br />
                                        <h5>{user.username}</h5>
                                    </div>
                                    <div className="col-lg-3">
                                        <small className="text-info">Nama</small> <br />
                                        <h5>{user.nama}</h5>
                                    </div>
                                    <div className="col-lg-3">
                                        <small className="text-info">Role</small> <br />
                                        <h5>{user.role}</h5>
                                    </div>
                                    <div className="col-lg-1">
                                        <div className="d-grid gap-1">
                                            <button className="btn btn-sm btn-outline-warning mx-1 my-1" onClick={() => this.editData(user.id_user)}>Edit</button>
                                            <button className="btn btn-sm btn-outline-danger mx-1 my-1" onClick={() => this.destroyData(user.id_user)}>Hapus</button>
                                        </div>
                                    </div>


                                </div>
                            </li>
                        ))}
                    </ul>
                    <br />
                    <button className="btn btn-sm btn-outline-success mx-1 my-1"
                        onClick={() => this.tambahData()}>Tambah</button>
                </div>

                {/*form modal data member*/}
                <div className="modal" id="modal_user">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">

                            <div className="modal-header bg-success">
                                <h4 className="text-white">Form Data Member</h4>
                            </div>

                            <div className="modal-body">

                                <form onSubmit={ev => this.simpanData(ev)}>
                                    Username
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.username}
                                        onChange={(ev) => this.setState({ username: ev.target.value })} />
                                    
                                    Password
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.password}
                                        onChange={(ev) => this.setState({ password: ev.target.value})} />

                                    Nama
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.nama}
                                        onChange={(ev) => this.setState({ nama: ev.target.value })} />

                                    Role
                                    <select className="form-control mb-2"
                                        value={this.state.role}
                                        onChange={(ev) => this.setState({ role: ev.target.value })}>
                                        <option value="admin">admin</option>
                                        <option value="user">user</option>
                                    </select>

                                    <button className="btn btn-success" type="submit">
                                        Simpan
                                    </button>
                                </form>

                            </div>

                        </div>
                    </div>
                </div>

            </div>

            </div>
        )
    }

}

export default User
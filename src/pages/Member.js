import React from "react"
import { Modal } from "bootstrap"
import { data } from "jquery"
import axios from "axios"

class Member extends React.Component {
    constructor() {
        super()
        this.state = {
            id_member: "",
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            telepon: "",
            action: "",
            members: [
                {
                    id_member: "1",
                    nama: "Rafi",
                    alamat: "Perum Oma View Blok GF-30, Jl. Band. Abd. Saleh, RT03/RW10, Kel. Cemorokandang Kedungkandang, Kota Malang, Jawa Timur 65138",
                    jenis_kelamin: "Laki-laki",
                    telepon: "085330222234"
                },
                {
                    id_member: "2",
                    nama: "Cahya",
                    alamat: "Perum Oma View Blok GF-30, Jl. Band. Abd. Saleh, RT03/RW10, Kel. Cemorokandang Kedungkandang, Kota Malang, Jawa Timur 65138",
                    jenis_kelamin: "Laki-laki",
                    telepon: "082334990029"
                },
                {
                    id_member: "3",
                    nama: "Ramadhana",
                    alamat: "Perum Oma View Blok GF-30, Jl. Band. Abd. Saleh, RT03/RW10, Kel. Cemorokandang Kedungkandang, Kota Malang, Jawa Timur 65138",
                    jenis_kelamin: "Laki-laki",
                    telepon: "082330222234"
                }
            ]
        }
    }

    tambahData() {
        this.modalMember = new Modal(document.getElementById("modal_member"))
        this.modalMember.show()
        this.setState({
            action: "tambah",
            id_member: Math.random(1, 10000),
            nama: "",
            alamat: "",
            jenis_kelamin: "cowo",
            telepon: ""
        })
    }

    editData(id_member) {
        this.modalMember = new Modal(document.getElementById("modal_member"))
        this.modalMember.show()

        // find index from member's data  based on their ids in member's array
        let index = this.state.members.findIndex(member => member.id_member === id_member)

        this.setState({
            id_member: this.state.members[index].id_member,
            nama: this.state.members[index].nama,
            alamat: this.state.members[index].alamat,
            jenis_kelamin: this.state.members[index].jenis_kelamin,
            telepon: this.state.members[index].telepon,
            action: "ubah",
        })
    }

    simpanData(event) {
        event.preventDefault();

        if (this.state.action === "tambah") {
            let endpoint = "http://localhost:8000/member"
            let data = {
                id_member: this.state.id_member,
                nama: this.state.nama,
                alamat: this.state.alamat,
                jenis_kelamin: this.state.jenis_kelamin,
                telepon: this.state.telepon
            }

            // let temp = this.state.members
            // temp.push(data)
            // this.setState({ members: temp })

            axios.post(endpoint, data)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()

                })
                .catch(error => console.log(error))
            this.modalMember.hide()

        } else if (this.state.action === "ubah") {
            this.modalMember.hide()
            let endpoint = "http://localhost:8000/member/" + this.state.id_member

            let data = {
                nama: this.state.nama,
                alamat: this.state.alamat,
                jenis_kelamin: this.state.jenis_kelamin,
                telepon: this.state.telepon
            }

            axios.put(endpoint, data)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()

                })
                .catch(error => console.log(error))
        }

    }

    destroyData(id_member) {
        if (window.confirm("yakin???")) {

            let endpoint = "http://localhost:8000/member/" + id_member
            axios.delete(endpoint)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
        }
    }


    getData() {
        let endpoint = "http://localhost:8000/member"
        axios.get(endpoint)
            .then(response => {
                this.setState({ members: response.data })
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
                        <h3 className="text-white">List of members</h3>
                    </div>

                    <div className="card-body">
                        <ul className="list-group">
                            {this.state.members.map(member => (
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <small className="text-info">Nama</small> <br />
                                            <h5>{member.nama}</h5>
                                        </div>
                                        <div className="col-lg-3">
                                            <small className="text-info">Jenis Kelamin</small> <br />
                                            <h5>{member.jenis_kelamin}</h5>
                                        </div>
                                        <div className="col-lg-3">
                                            <small className="text-info">No. Telepon</small> <br />
                                            <h5>{member.telepon}</h5>
                                        </div>
                                        <div className="col-lg-1">
                                            <div className="d-grid gap-1">
                                                <button className="btn btn-sm btn-outline-warning mx-1 my-1" onClick={() => this.editData(member.id_member)}>Edit</button>
                                                <button className="btn btn-sm btn-outline-danger mx-1 my-1" onClick={() => this.destroyData(member.id_member)}>Hapus</button>
                                            </div>
                                        </div>
                                        <br /><br />
                                        <div className="col-lg-9">
                                            <small className="text-info">Alamat</small> <br />
                                            <h5>{member.alamat}</h5>
                                        </div>
                                        <div className="col-lg-2">

                                        </div>
                                        <div className="col-lg-1">
                                            <div className="d-grid gap-1">

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

                </div>

                {/*form modal data member*/}
                <div className="modal" id="modal_member">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">

                            <div className="modal-header bg-success">
                                <h4 className="text-white">Form Data Member</h4>
                            </div>

                            <div className="modal-body">
                                <form onSubmit={ev => this.simpanData(ev)}>
                                    Nama
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.nama}
                                        onChange={(ev) => this.setState({ nama: ev.target.value })} />

                                    Alamat
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.alamat}
                                        onChange={(ev) => this.setState({ alamat: ev.target.value })} />

                                    Jenis Kelamin
                                    <select className="form-control mb-2"
                                        value={this.state.jenis_kelamin}
                                        onChange={(ev) => this.setState({ jenis_kelamin: ev.target.value })}>
                                        <option value="cowo">cowo</option>
                                        <option value="cewe">cewe</option>
                                    </select>

                                    Telepon
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.telepon}
                                        onChange={(ev) => this.setState({ telepon: ev.target.value })} />

                                    <button className="btn btn-success" type="submit">
                                        Simpan
                                    </button>
                                </form>

                            </div>

                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default Member
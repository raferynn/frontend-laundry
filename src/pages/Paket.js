import React from "react"
import { Modal } from "bootstrap"
import axios from "axios"

class Paket extends React.Component {
    constructor() {
        super()
        this.state = {
            id_paket: "",
            jenis_paket: "",
            harga: "",
            pakets: [

            ]
        }
    }

    tambahData() {
        this.modalPaket = new Modal(document.getElementById("modal_paket"))
        this.modalPaket.show()
        this.setState({
            action: "tambah",
            id_paket: "",
            jenis_paket: "",
            harga: ""
        })
    }

    editData(id_paket) {
        this.modalPaket = new Modal(document.getElementById("modal_paket"))
        this.modalPaket.show()

        let index = this.state.pakets.findIndex(paket => paket.id_paket === id_paket)

        this.setState({
            id_paket: this.state.pakets[index].id_paket,
            jenis_paket: this.state.pakets[index].jenis_paket,
            harga: this.state.pakets[index].harga,
            action: "ubah"
        })
    }

    simpanData(event) {
        event.preventDefault();

        if (this.state.action === "tambah") {
            let endpoint = "http://localhost:8000/paket"
            let data = {
                id_paket: this.state.id_paket,
                jenis_paket: this.state.jenis_paket,
                harga: this.state.harga
            }

            // let temp = this.state.members
            // temp.push(data)
            // this.setState({ members: temp })

            axios.post(endpoint, data)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                        .catch(error => console.log(error))
                })
            this.modalPaket.hide()

        } else if (this.state.action === "ubah") {
            this.modalPaket.hide()
            let endpoint = "http://localhost:8000/paket/" + this.state.id_paket

            let data = {
                id_paket: this.state.id_paket,
                jenis_paket: this.state.jenis_paket,
                harga: this.state.harga
            }

            axios.put(endpoint, data)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()

                })
                .catch(error => console.log(error))
        }

    }

    destroyData(id_paket) {
        if (window.confirm("yakin???")) {

            let endpoint = "http://localhost:8000/paket/" + id_paket
            axios.delete(endpoint)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
        }
    }

    getData() {
        let endpoint = "http://localhost:8000/paket"
        axios.get(endpoint)
            .then(response => {
                this.setState({ pakets: response.data })
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
                        <h3 className="text-white">List of packages</h3>
                    </div>
                </div>

                <div className="card-body">
                    <ul className="list-group">
                        {this.state.pakets.map(paket => (
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-lg-5">
                                        <small className="text-info">Jenis Paket</small> <br />
                                        <h5>{paket.jenis_paket}</h5>
                                    </div>
                                    <div className="col-lg-5">
                                        <small className="text-info">Harga</small> <br />
                                        <h5>{paket.harga}</h5>
                                    </div>

                                    <div className="col-lg-1">
                                        <div className="d-grid gap-1">
                                            <button className="btn btn-sm btn-outline-warning mx-1 my-1" onClick={() => this.editData(paket.id_paket)} >Edit</button>
                                            <button className="btn btn-sm btn-outline-danger mx-1 my-1" onClick={() => this.destroyData(paket.id_paket)}>Hapus</button>
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
                <div className="modal" id="modal_paket">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">

                            <div className="modal-header bg-success">
                                <h4 className="text-white">Form Data Paket</h4>
                            </div>

                            <div className="modal-body">
                                <form onSubmit={ev => this.simpanData(ev)}>
                                    Jenis Paket
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.jenis_paket}
                                        onChange={(ev) => this.setState({ jenis_paket: ev.target.value })} />

                                    Harga
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.harga}
                                        onChange={(ev) => this.setState({ harga: ev.target.value })} />

                                    <button type="submit" className="btn btn-success">
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

export default Paket
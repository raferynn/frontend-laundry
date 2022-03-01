import React from "react"
import axios from "axios"

export default class Transaksi extends React.Component {
    constructor() {
        super()
        this.state = {
            transaksi: []
        }
    }

    getData() {
        let endpoint = "http://localhost:8000/transaksi"
        axios.get(endpoint)
            .then(response => {
                this.setState({ transaksi: response.data })
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getData()
    }

    convertStatus(status) {
        if (status === 1) {
            return (
                <div className="badge bg-info">
                    Transaksi Baru
                </div>
            )
        } else if (status === 2) {
            return (
                <div className="badge bg-warning">
                    Sedang di Proses
                </div>
            )
        } else if (status === 3) {
            return (
                <div className="badge bg-secondary">
                    Siap Diambil
                </div>
            )
        } else if (status === 4) {
            return (
                <div className="badge bg-success">
                    Telah Diambil
                </div>
            )
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-header bg-info">
                    <h4 className="text-white">
                        List Transaksi
                    </h4>
                </div>
                <ul className="list-group">
                    {this.state.transaksi.map(trans => (
                        <li className="list-group-item">
                            <div className="row">
                                {/* this is member area */}
                                <div className="col-lg-3">
                                    <small className="text-info">
                                        Member
                                    </small> <br />
                                    {trans.member.nama}
                                </div>

                                {/* this is tgl transaksi area  */}
                                <div className="col-lg-3">
                                    <small className="text-info">
                                        Tanggal Transaksi
                                    </small> <br />
                                    {trans.tgl}
                                </div>

                                {/* this is batas waktu area  */}
                                <div className="col-lg-3">
                                    <small className="text-info">
                                        Batas Waktu
                                    </small> <br />
                                    {trans.batas_waktu}
                                </div>

                                {/* this is tanggal bayar area  */}
                                <div className="col-lg-3">
                                    <small className="text-info">
                                        Tanggal Bayar
                                    </small> <br />
                                    {trans.tgl_bayar}
                                </div>

                                {/* this is tanggal bayar area  */}
                                <div className="col-lg-3">
                                    <small className="text-info">
                                        Status
                                    </small> <br />
                                    {this.convertStatus(trans.status)}
                                </div>
                            </div>

                            {/* Area detail transaksi */}
                            <br />
                            <h5>Detail Transaksi</h5>
                            {trans.detail_transaksi.map(detail => (
                                <div className="row">
                                    {/* area nama paket col-3*/}
                                    <div className="col-lg-3">
                                        {detail.paket.jenis_paket}
                                    </div>
                                    {/* area quantity col-2*/}
                                    <div className="col-lg-2">
                                        Qty : {detail.qty}
                                    </div>
                                    {/* area harga paket col-3*/}
                                    <div className="col-lg-3">
                                        @ Rp {detail.paket.harga}
                                    </div>
                                    {/* area harga total col-4*/}
                                    <div className="col-lg-4">
                                        Rp {detail.paket.harga * detail.qty}
                                    </div>
                                </div>
                            ))}

                        </li>
                    ))}
                </ul>
                <div className="card-body">

                </div>
            </div>
        )
    }
}
import React from 'react'
import Axios from 'axios';
import { urlApi } from '../support/urlApi';
import { connect } from 'react-redux';


class ProductDetail extends React.Component{
    state = {product : {}}
    componentDidMount(){
        this.getDataApi()
    }

    getDataApi = () => {
        var idUrl = this.props.match.params.id // id harus sesuai dengan yg ada di app.js yg di route product-detail
        Axios.get(urlApi + '/products/' + idUrl)
        .then((res) => {
            this.setState({product : res.data})
        })
        .catch((err) => console.log(err))
    }

    qtyValidation = () => {
        var qty = this.refs.inputQty.value
        if(qty < 1){
            this.refs.inputQty.value = 1
        }
    }
    render(){
        var{nama,harga,discount,img,deskripsi} = this.state.product
        return(
            <div className='container'>
                <div  className='row'>
                    <div className='col-md-4'>
                        <div className="card" style={{width: '100%'}}>
                            <img src={img} className="card-img-top" alt="..." />
                            <div className="card-body">
                            <p className="card-text"></p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-8'>
                        <h1 style={{color:'#4C4C4C'}}>{nama}</h1>
                        <div style={{backgroundColor:'#D50000',width:'50px',height:'20px',color:'white',textAlign:'center',fontWeight:'bold',display:'inline-block'}}>
                            {discount}%
                        </div>
                        <span style={{fontWeight:'600',fontSize:'15px',color:'#606060',marginLeft:'10px',textDecoration:'line-through'}}> Rp. {harga}</span>
                        <div style={{fontWeight:'700',fontSize:'24px',color:'#FF5722',marginTop:'20px'}}>Rp. {harga-(harga*(discount/100))}</div>

                        <div className='row'>
                            <div className='col-md-2'>
                                <div style={{marginTop:'20px',color:'#606060',fontWeight:'700',fontSize:'14px'}}>Jumlah</div>
                                <input type='number' ref='inputQty' onChange={this.qtyValidation} min={1} className='form-control' style={{width:'60px',marginTop:'10px'}}></input>
                            </div>
                            <div className='col-md-6'>
                                <div style={{marginTop:'20px',color:'#606060',fontWeight:'700',fontSize:'14px'}}>Catatan Untuk Penjual (Optional)</div>
                                <input type='text' placeholder='Ex : Contoh Warna Putih, Ukuran XL, Edisi ke-2'className='form-control' style={{width:'100%',marginTop:'10px'}}></input>   
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-md-8'>
                                <p style={{color:'#606060',fontStyle:'italic'}}>{deskripsi}</p>
                            </div>
                        </div>
                        {
                            this.props.username === '' ?
                        <div className='row mt-4'>
                            <input type='button' className='btn border-secondary col-md-2 ml-3' disabled value='Add To Wishlist'></input>
                            <input type='button' className='btn btn-primary col-md-2 ml-3' disabled value='Beli Sekarang'></input>
                            <input type='button' className='btn btn-success col-md-3 ml-3' disabled value='Masukkan Ke Keranjang'></input>
                        </div>
                         :
                         <div className='row mt-4'>
                         <input type='button' className='btn border-secondary col-md-2 ml-3' value='Add To Wishlist'></input>
                         <input type='button' className='btn btn-primary col-md-2 ml-3' value='Beli Sekarang'></input>
                         <input type='button' className='btn btn-success col-md-3 ml-3' value='Masukkan Ke Keranjang'></input>
                     </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
      username : state.user.username,

    }
  }

export default connect (mapStateToProps)(ProductDetail);
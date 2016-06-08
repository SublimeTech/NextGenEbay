import * as db from "../db";
import {getProducts} from "../db";

exports.list = function(req, res) {
  db.getProducts(function(data){
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({'products': data, error: false}));
  })
}

exports.makeBid = function(req, res) {
  req.setHeader('Content-Type', 'application/json');
  if (!req.body.amount) {
    res.send(JSON.stringify({error: true, error_msg: 'Bid amount is required'}));
    return
  }
  if (!req.body.productId) {
    req.send(JSON.stringify({error: true, error_msg: 'Product id is required'}));
  }
  

}
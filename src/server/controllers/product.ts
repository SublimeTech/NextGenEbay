import * as db from "../db";
import {getProducts} from "../db";

exports.list = function(req, res) {
  db.getProducts(function(data){
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({'products: data, error: false}))
  })
}

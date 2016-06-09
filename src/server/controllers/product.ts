import * as db from "../db";
import {getProducts} from "../db";

exports.list = function(req, res) {
  db.getProducts(function(data){
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({'products': data, error: false}));
  })
};

exports.makeBid = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (!req.body.amount) {
    res.send(JSON.stringify({error: true, error_msg: 'Bid amount is required'}));
    return;
  }
  if (!req.body.product_id) {
    res.send(JSON.stringify({error: true, error_msg: 'Product id is required'}));
    return;
  }

  db.getProductMaxbid(req.body.product_id, function(currentMaxBid){
    console.log(currentMaxBid)
    if (currentMaxBid && req.body.amount < currentMaxBid.amount) {
      res.send(JSON.stringify({error: true, error_msg: 'Amount is less than the current max bid of this product'}));
      return;
    }
    if (!req.session.currentUser) {
      res.send(JSON.stringify({error: true, error_msg: 'User should be authenticated in order to make bids', error_code:1000}))
      return;
    }
    // console.log(req.session.currentUser)
    db.makeBid(req.session.currentUser.id, req.body.product_id, req.body.amount, function(bid){
      return res.send(JSON.stringify({error: false, bid: bid}));
    })

  });


};
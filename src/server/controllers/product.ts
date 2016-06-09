import * as db from "../db";
import {getProducts} from "../db";
import {WebSocket} from '../app'

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
    if (!currentMaxBid) {

    }
    else if (req.body.amount <= currentMaxBid.amount) {
      res.send(JSON.stringify({error: true, error_msg: 'Amount is less than the current max bid of this product'}));
      return;
    }
    if (!req.session.currentUser) {
      res.send(JSON.stringify({error: true, error_msg: 'User should be authenticated in order to make bids', error_code:1000}))
      return;
    }
    // console.log(req.session.currentUser)
    db.makeBid(req.session.currentUser.id, req.body.product_id, req.body.amount, function(bid){
      res.send(JSON.stringify({error: false, bid: bid}));
      var aWss = WebSocket.getWss('/api/bid/listen');
      aWss.clients.forEach(function (client) {
        client.send(JSON.stringify({bid:bid}));
      });
    })

  });


};

exports.createProduct = function (req, res) {
  var error = false;
  var errors = {title: [], description: []};
  if (!req.body.title) {
    error = true;
    errors.title.push('Title can\'t be empty');
  }
  if (!req.body.description) {
    error = true;
    errors.description.push('Description can\'t be empty')
  }

  if (error == true) {
    res.send(JSON.stringify({error: true, errors: errors}));
    return;
  }
  if (!req.body.image) {
    var image = null;
  } else {
    var image = req.body.image;
  }

  db.createProduct(req.body.title, req.body.description, image, function (data) {
    if (!data) {
      res.send(JSON.stringify({error: true, response_msg: 'Internal error'}), 500)
    } else {
      res.send(JSON.stringify({error: false, response_msg: 'Product created success'}))
    }
  });
};
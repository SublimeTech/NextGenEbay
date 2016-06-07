var pgp = require ('pg-promise')();
var db = pgp('postgres://nextgenebaydba:ebay@localhost/nextgenebay');

function sql(file) {
    return new pgp.QueryFile(file, {minify: true});
}

var sqlGetProducts = sql('./sql/getProducts.sql');



export interface User {
  id: number;
  username: string;
  password: string;
  created_at: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

export interface Bid {
  id: number;
  user: User;
  product: Product;
  created_at: string;
}


export function getProducts(callback: (products: Product[]) => void) {
  db.connect().then(function(obj) {
    obj.query("select * from product;").then(function(data: Product[]){
      callback(data);

    }).catch(function(error){
      console.error(error);
    });
  }).catch(function(error){
    console.error(error);
  });

}

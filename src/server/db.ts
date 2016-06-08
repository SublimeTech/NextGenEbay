var pgp = require('pg-promise')();
var db = pgp('postgres://nextgenebaydba:ebay@localhost/nextgenebay');

function sql(file) {
    return new pgp.QueryFile(file, {minify: true});
}

var sqlGetProducts = sql('./sql/getProducts.sql');


export interface User {
    id:number;
    username:string;
    password:string;
    created_at:string;
}

export interface Product {
    id:number;
    title:string;
    description:string;
    created_at:string;
}

export interface Bid {
    id:number;
    user:User;
    product:Product;
    created_at:string;
}


export function getProducts(callback:(products:Product[]) => void) {
    db.task(t =>
        t.map('SELECT * FROM product', null, product =>
            t.map('SELECT * FROM bid WHERE product_id = $1 order by amount desc limit 1', product.id, bid=>
                t.one('select id, username, created_at from "user" where id = $1', bid.user_id)
                    .then(user=> {
                        bid.user = user;
                        return bid
                    })
            )
                .then(t.batch)

                .then(bid=> {

                    product.maxBid = bid[0];
                    return product;
                })
        ).then(t.batch)
    )
        .then(data=> {
            callback(data);
        });


}

export function getUserByUsername(username, callback:(user:User) => void) {
    db.connect().then(db=> db.oneOrNone('select * from "user" where username = $1', [username])
        .then(user=>callback(user))
        .catch(error=> console.log(error))
    );
}

export function createUser(username, password, callback:(data) => void) {
    db.one('INSERT INTO "user"(username, password) values($1, $2) returning id;', [username, password])
        .then(data=> callback(data))
        .catch(function(err){
            console.log('Error inserting user into database '+err);
            callback(null);
        })
}

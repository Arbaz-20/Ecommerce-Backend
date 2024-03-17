import auth from "./auth";
import category from "./category";
import order from "./order";
import permissions from "./permission";
import product from "./product";
import favourites from "./favourite";
import cart from "./cart";

const associations = ()=> {
    
    auth.hasMany(permissions,{foreignKey:"authId",onUpdate:"CASCADE",onDelete:"CASCADE"}),
    permissions.belongsTo(auth);

    category.hasMany(product,{foreignKey:"categoryId",onUpdate:"CASCADE",onDelete:"CASCADE"});
    product.belongsTo(category);

    product.hasMany(favourites,{foreignKey:"productId",onUpdate:"CASCADE",onDelete:"CASCADE"});
    favourites.belongsTo(product);

    auth.hasMany(favourites,{foreignKey:"authId",onUpdate:"CASCADE",onDelete:"CASCADE"});
    favourites.belongsTo(auth);

    product.hasOne(cart,{onUpdate:"CASCADE",onDelete:"CASCADE"})
    cart.belongsTo(product)

    


}

export default associations;
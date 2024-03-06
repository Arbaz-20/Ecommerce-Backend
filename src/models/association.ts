import auth from "./auth";
import category from "./category";
import order from "./order";
import permissions from "./permission";
import product from "./product";
import product_order from "./product_order";
import favourites from "./favourite";

const associations = ()=> {
    
    auth.hasMany(permissions,{foreignKey:"authId",onUpdate:"CASCADE",onDelete:"CASCADE"}),
    permissions.belongsTo(auth);

    category.hasMany(product,{foreignKey:"categoryId",onUpdate:"CASCADE",onDelete:"CASCADE"});
    product.belongsTo(category);

    product.belongsToMany(order,{through:product_order,onDelete:"CASCADE",onUpdate:"CASCADE",foreignKey:"productId"});
    order.belongsToMany(product,{through:product_order,onDelete:"CASCADE",onUpdate:"CASCADE",foreignKey:"orderId"});

    product.hasMany(favourites,{foreignKey:"productId",onUpdate:"CASCADE",onDelete:"CASCADE"});
    favourites.belongsTo(product);

    auth.hasMany(favourites,{foreignKey:"authId",onUpdate:"CASCADE",onDelete:"CASCADE"});
    favourites.belongsTo(auth);

}

export default associations;
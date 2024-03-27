import auth from "./auth";
import category from "./category";
import order from "./order";
import permissions from "./permission";
import product from "./product";
import favourites from "./favourite";
import cart from "./cart";
import product_order from "./product_order";
import Role from "./role";

const associations = ()=> {
    
    Role.hasMany(auth,{foreignKey:"roleId",onUpdate:"CASCADE",onDelete:"CASCADE"}),
    auth.belongsTo(Role);

    permissions.hasMany(Role,{foreignKey:"permissionId",onUpdate:"CASCADE",onDelete:"CASCADE"});
    Role.belongsTo(permissions);

    category.hasMany(product,{foreignKey:"categoryId",onUpdate:"CASCADE",onDelete:"CASCADE"});
    product.belongsTo(category);

    product.hasMany(favourites,{foreignKey:"productId",onUpdate:"CASCADE",onDelete:"CASCADE"});
    favourites.belongsTo(product);

    auth.hasMany(favourites,{foreignKey:"authId",onUpdate:"CASCADE",onDelete:"CASCADE"});
    favourites.belongsTo(auth);

    product.hasOne(cart,{onUpdate:"CASCADE",onDelete:"CASCADE"})
    cart.belongsTo(product)

    order.hasMany(product_order,{foreignKey:"orderId", onDelete:"CASCADE",onUpdate:"CASCADE"})
    product_order.belongsTo(order)

}

export default associations;
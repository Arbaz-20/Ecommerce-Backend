import auth from "./auth";
import category from "./category";
import permissions from "./permission";
import product from "./product";

const associations = ()=> {
    
    auth.hasMany(permissions,{foreignKey:"authId",onUpdate:"CASCADE",onDelete:"CASCADE"}),
    permissions.belongsTo(auth);

    category.hasMany(product,{foreignKey:"categoryId",onUpdate:"CASCADE",onDelete:"CASCADE"});
    product.belongsTo(category);
}

export default associations;
module.exports = (sequelize, DataTypes) => {
    const AddressDetail = sequelize.define("AddressDetail", {
        line1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        line2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pincode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return AddressDetail
}
module.exports = (sequelize, DataTypes) => {
    const PersonalDetail = sequelize.define("PersonalDetail", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: false
        },
        mother_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        father_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return PersonalDetail
}
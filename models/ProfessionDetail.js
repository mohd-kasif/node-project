module.exports = (sequelize, DataTypes) => {
    const ProfessionDetail = sequelize.define("ProfessionDetail", {
        profession: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salary_range: {
            type: DataTypes.STRING,
            allowNull: false
        },
        experience: {
            type: DataTypes.INTEGER,
        }
    })
    return ProfessionDetail
}
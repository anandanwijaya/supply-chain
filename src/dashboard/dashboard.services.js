let dashboardRepository = require('./dashboard.repository')

async function getAllDashboard() {
    let dashboards = await dashboardRepository.findDashboard()
    return dashboards
}

async function getAllDashboardByUserId(user_id) {
    let dashboards = await dashboardRepository.findDashboardByUserId(user_id)
    return dashboards
}


module.exports = {getAllDashboard, getAllDashboardByUserId}
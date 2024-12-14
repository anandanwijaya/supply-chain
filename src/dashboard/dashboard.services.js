const dashboardRepository = require('./dashboard.repository')

async function getAllDashboard() {
    const dashboards = await dashboardRepository.findDashboard()
    return dashboards
}

async function getAllDashboardByUserId(user_id) {
    const dashboards = await dashboardRepository.findDashboardByUserId(user_id)
    return dashboards
}

module.exports = { getAllDashboard, getAllDashboardByUserId }

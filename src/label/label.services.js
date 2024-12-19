const labelRepository = require('./label.repository')

async function getLabel() {
    const labels = labelRepository.findLabels()
    return labels
}

async function getLabelByUserId(user_id) {
    const labels = labelRepository.findLabelByUserId(user_id)
    return labels
}


module.exports = { getLabel, getLabelByUserId }

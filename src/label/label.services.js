const labelRepository = require('./label.repository')

async function getLabelByUserId(user_id) {
    const labels = labelRepository.findLabelByUserId(user_id)
    return labels
}

async function getLabelById(label_id) {
    const label = labelRepository.findLabelById(label_id)
    return label
}

module.exports = { getLabelByUserId, getLabelById }

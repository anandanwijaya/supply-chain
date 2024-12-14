const labelRepository = require('./label.repository')

async function getLabelById(label_id) {
    const label = labelRepository.findLabelById(label_id)
    return label
}

module.exports = { getLabelById }

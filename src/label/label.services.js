let labelRepository = require("./label.repository");

async function getLabelById(label_id) {
  let label = labelRepository.findLabelById(label_id);
  return label;
}

module.exports = { getLabelById };

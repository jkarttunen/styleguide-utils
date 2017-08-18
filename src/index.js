
function sgNavigation (sg){
  return {
    sections: sg.sections.map(pickNavigation)
  };
}

function pickNavigation (section){
  return {
    header : section.header,
    reference: section.reference,
    parentReference: section.parentReference,
    depth : getDepth(section.reference)
  }
}

function getDepth (ref) {
  return (ref.split(".").length - 1)
}


function sgNavigationTree(sg){
  return {sections: listToTree(sgNavigation(sg)) };
}

function listToTree(sg) {
    var tree = [],
        subItems = {};
    var item, id, parentId;
    for (var i = 0, length = sg.sections.length; i < length; i++) {
        item = sg.sections[i];
        id = item.reference;
        parentId = item.parentReference || 0;
        // every item may have children
        subItems[id] = subItems[id] || [];
        // init its children
        item.subItems = subItems[id];
        if (parentId != 0) {
            // init its parent's children object
            subItems[parentId] = subItems[parentId] || [];
            // push it into its parent's children object
            subItems[parentId].push(item);
        } else {
            tree.push(item);
        }
    };
    return tree;
}


module.exports = {
  sgNavigation: sgNavigation,
  sgNavigationTree: sgNavigationTree,
  getDepth: getDepth
};



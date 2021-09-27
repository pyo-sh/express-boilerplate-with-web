export function updateAttributes(oldNode, newNode) {
    [ ...newNode.attributes ].forEach(({ name, value }) => {
        if(value !== oldNode.getAttribute(name))
            oldNode.setAttribute(name, value);
    });
    [ ...oldNode.attributes ].forEach(({ name }) => {
        if(newNode.getAttribute(name) === undefined)
            oldNode.removeAttribute(name);
    });
}

export function switchElement(oldNode, newNode) {
    const parent = oldNode.parentNode;
    parent.insertBefore(newNode, oldNode);
    oldNode.remove();
}

function updateElement(parent, oldNode, newNode) {
    if(!oldNode && newNode) return parent.appendChild(newNode);
    if(oldNode && !newNode) return oldNode.remove();
    if(oldNode instanceof Text && newNode instanceof Text) {
        if (oldNode.nodeValue !== newNode.nodeValue) {
            oldNode.nodeValue = newNode.nodeValue;
        }
        return;
    }
    if(oldNode.nodeName !== newNode.nodeName) {
        switchElement(oldNode, newNode);
        return newNode;
    }

    updateAttributes(oldNode, newNode);
    updateElements(oldNode, newNode)
    return oldNode;
}

export function updateElements(oldNode, newNode){
    const originChildren = [ ...oldNode.childNodes ];
    const targetChildren = [ ...newNode.childNodes ];
    const maxLength = Math.max(originChildren.length, targetChildren.length);
    for(let i = 0; i < maxLength; i++) {
        updateElement(oldNode, originChildren[i], targetChildren[i]);
    }
};

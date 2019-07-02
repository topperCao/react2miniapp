
const ReactReconciler = require('react-reconciler');

const rootHostContext = {};
const childHostContext = {};

const hostConfig = {
  now: Date.now,
  getRootHostContext: () => {
    return rootHostContext;
  },
  prepareForCommit: () => {
    console.log('prepareForCommit');
  },
  resetAfterCommit: (containerInfo) => {
    console.log('resetAfterCommit', containerInfo);
  },
  getChildHostContext: () => {
    return childHostContext;
  },
  shouldSetTextContent: (type, props) => {
    return typeof props.children === 'string' || typeof props.children === 'number';
  },
  /**
   This is where react-reconciler wants to create an instance of UI element in terms of the target. Since our target here is the DOM, we will create document.createElement and type is the argument that contains the type string like div or img or h1 etc. The initial values of domElement attributes can be set in this function from the newProps argument
   */
  createInstance: (type, newProps, rootContainerInstance, _currentHostContext, workInProgress) => {
    console.log('createInstance')
    return rootContainerInstance;
  },
  createTextInstance: (text) => {
    // return document.createTextNode(text);
  },
  appendInitialChild: (parent, child) => {
    // parent.appendChild(child);
  },
  appendChild(parent, child) {
    // parent.appendChild(child);
  },
  finalizeInitialChildren: (domElement, type, props) => {},
  supportsMutation: true,
  appendChildToContainer: (parent, child) => {
    // parent.appendChild(child);
  },
  prepareUpdate(domElement, oldProps, newProps) {
    console.log('prepareUpdate')
    return true;
  },
  commitUpdate(domElement, updatePayload, type, oldProps, newProps) {
    console.log('commitUpdate');
    // console.log(domElement, 'domElement');
    // Object.keys(newProps).forEach((propName) => {
    //   const propValue = newProps[propName];
    //   if (propName === 'children') {
    //     if (typeof propValue === 'string' || typeof propValue === 'number') {
    //       domElement.textContent = propValue;
    //     }
    //   } else {
    //     const propValue = newProps[propName];
    //     domElement.setAttribute(propName, propValue);
    //   }
    // });
  },
  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.text = newText;
  },
  removeChild(parentInstance, child) {
    parentInstance.removeChild(child);
  },
};

const ReactReconcilerInst = ReactReconciler(hostConfig);

const roots = new Map();

module.exports = {
  render(element, containerTag, callback) {
    let root = roots.get(containerTag);

    if (!root) {
      // TODO (bvaughn): If we decide to keep the wrapper component,
      // We could create a wrapper for containerTag as well to reduce special casing.
      root = ReactReconcilerInst.createContainer(containerTag, 0, false);
      // console.log(root, 'root')
      roots.set(containerTag, root);
    }
    ReactReconcilerInst.updateContainer(element, root, null, callback);
    const rootInstance = ReactReconcilerInst.getPublicRootInstance(root);
    return ReactReconcilerInst.getPublicRootInstance(root);
  },
};

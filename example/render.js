
const ReactReconciler = require('react-reconciler');
const _ = require('lodash');

const hostConfig = {
  now: Date.now,
  getRootHostContext: (nextRootInstance) => {
    return nextRootInstance;
  },
  prepareForCommit: () => {

  },
  resetAfterCommit: (containerInfo) => {
    console.log('resetAfterCommit', containerInfo);
  },
  commitMount: (instance, type, props, finishedWork) => {
    console.log(instance, type, props, finishedWork, 'commitMount');
  },
  getChildHostContext: (context, type, rootInstance) => {
    return context;
  },
  shouldSetTextContent: (type, props) => {
    return true;
  },
  createInstance: (type, newProps, rootContainerInstance, _currentHostContext, workInProgress) => {
    const instance = {
      type,
      props: newProps,
      children: [],
      root: false,
      appendChild(child) {
        this.children.push(child);
      },
      removeChild(child) {
        _.remove(this.children, (n) => {
          return n === child;
        });
      },
    };
    return instance;
  },
  createTextInstance: (text, rootContainerInstance, currentHostContext, workInProgress) => {
    const instance = {
      type: 'text',
      props: {},
      text,
      root: false,
    };
    return instance;
  },
  appendInitialChild: (parent, child) => {
    parent.appendChild(child);
  },
  appendChild(parent, child) {
    parent.appendChild(child);
  },
  finalizeInitialChildren: (newInstance, type, newProps, rootContainerInstance, currentHostContext) => {
    console.log('finalizeInitialChildren', newInstance);
    return newInstance;
  },
  supportsMutation: true,
  appendChildToContainer: (parent, child) => {
    console.log(parent, child, 'appendChildToContainer');
    parent.appendChild(child);
  },
  prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, currentHostContext) {
    console.log('prepareUpdate', instance, oldProps, newProps);
    return newProps;
  },
  commitUpdate(instance, updatePayload, type, oldProps, newProps, finishedWork) {
    console.log(instance, 'commitUpdate');
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
      roots.set(containerTag, root);
    }
    ReactReconcilerInst.updateContainer(element, root, null, callback);
    const rootInstance = ReactReconcilerInst.getPublicRootInstance(root);
    return rootInstance;
  },
};

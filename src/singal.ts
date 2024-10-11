export function createSignal<T>(value: T):
  [() =>T, (value: T) => void]{

  const subscriptions = new Set<NodeRunner>();
  const read = () => {
    const node = context[context.length - 1];
    if(node){
      subscribe(node, subscriptions);
    }
    return value;
  }

  const write = (newValue: T) => {
    value = newValue;

    for(const sub of subscriptions){
      sub.execute();
    }

  }

  return [read, write];
}

export interface NodeRunner {
  execute: () => void,
  dependencies: Set<any>
}

const context: NodeRunner [] = [];

function subscribe(node: NodeRunner, subscriptions: Set<NodeRunner>){
  subscriptions.add(node);
  node.dependencies.add(subscriptions);
}

function cleanup(node: NodeRunner){
  for(const dep of node.dependencies){
    dep.delete()
  }

  node.dependencies.clear();
}

export function effect(fn: () => unknown){
  const execute = () => {
    cleanup(node);
    context.push(node);
    try{
      fn();
    }
    finally {
      context.pop();
    }
  }

  const node: NodeRunner = {
    execute,
    dependencies: new Set()
  }

  execute();
}

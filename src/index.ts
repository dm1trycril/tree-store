import { OriginItem, TreeStore } from "./tree-store";

const items: OriginItem[] = [
  { id: 1, parent: "root" },
  { id: 2, parent: 1, type: "test" },
  { id: 3, parent: 1, type: "test" },
  { id: 4, parent: 2, type: "test" },
  { id: 5, parent: 2, type: "test" },
  { id: 6, parent: 2, type: "test" },
  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
  { id: 9, parent: 7 },
  { id: 10, parent: 9},
  { id: 11, parent: 8}
];

const ts = new TreeStore(items);
console.log("🚀 ~ ts:", ts)

// ts.getAll(); // [{"id":1,"parent":"root"},{"id":2,"parent":1,"type":"test"},{"id":3,"parent":1,"type":"test"},{"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},{"id":6,"parent":2,"type":"test"},{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}]
console.log("🚀 ~ ts.getAll():", ts.getAll(), '\n')
// ts.getItem(7); // {"id":7,"parent":4,"type":null}
console.log("🚀 ~ ts.getItem(7):", ts.getItem(7), '\n')
// ts.getChildren(4); // [{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}]
console.log("🚀 ~ ts.getChildren(4):", ts.getChildren(4), '\n')
// ts.getChildren(5); // []
console.log("🚀 ~ ts.getChildren(5):", ts.getChildren(5), '\n')
// ts.getChildren(2); // [{"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},{"id":6,"parent":2,"type":"test"}]
console.log("🚀 ~ ts.getChildren(2):", ts.getChildren(2), '\n\n\n\n\n')
// ts.getAllChildren(2); // [{"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},{"id":6,"parent":2,"type":"test"},{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}]
console.log("🚀 ~ ts.getAllChildren(2):", ts.getAllChildren(2), '\n')
// ts.getAllParents(7); // [{"id":4,"parent":2,"type":"test"},{"id":2,"parent":1,"type":"test"},{"id":1,"parent":"root"}]
console.log("🚀 ~ ts.getAllParents(7):", ts.getAllParents(7))

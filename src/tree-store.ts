export interface OriginItem {
  id: number | string;
  parent: number | string | "root";
  type?: "test" | null;
}

interface TreeItem {
  data: OriginItem;
  children?: TreeItem[];
}

export class TreeStore {
  treeMap: Map<string, TreeItem>;

  constructor(originItems: OriginItem[]) {
    this.treeMap = new Map();

    originItems.forEach((item) => {
      this.treeMap.set(item.id.toString(), {
        data: item,
        children: [],
      });
    });

    this.treeMap.forEach((item) => {
      if (item.data.parent === "root") {
        return;
      }

      const parentItem = this.treeMap.get(item.data.parent.toString());

      if (!parentItem) {
        return;
      }

      parentItem?.children
        ? parentItem.children?.push(item)
        : (parentItem.children = [item]);
    });
  }

  getAll(): OriginItem[] {
    return Array.from(this.treeMap.values()).map((item) => item.data);
  }

  getItem(id: number | string): OriginItem | undefined {
    return this.treeMap?.get(id.toString())?.data;
  }

  getChildren(id: number | string): OriginItem[] {
    return (
      this.treeMap?.get(id.toString())?.children?.map((item) => item.data) || []
    );
  }

  getAllChildren(id: number | string): OriginItem[] {
    const item = this.treeMap?.get(id.toString());

    if (!item) {
      return [];
    }

    const children: OriginItem[] = [];

    item?.children?.forEach((child) => {
      children.push(child.data, ...this.getAllChildren(child.data.id));
    });

    // item?.children?.forEach((child) => {
    //   children.push(...this.getAllChildren(child.data.id));
    // });

    return children;
  }

  getAllParents(id: number | string): OriginItem[] {
    const item = this.treeMap?.get(id.toString());
    if (!item) {
      return [];
    }

    const parent = this.treeMap?.get(item.data.parent.toString());
    if (!parent) {
      return [];
    }

    const parents: OriginItem[] = [parent.data];

    if (parent.data.parent === "root") {
      return parents;
    }

    return parents.concat(this.getAllParents(parent.data.id));
  }
}

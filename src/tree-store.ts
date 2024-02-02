/**
 * * Интерфейс оригинального элемента
 */
export interface OriginItem {
  id: number | string;
  parent: number | string | "root";
  type?: "test" | null;
}

/**
 * * Интерфейс элемента дерева
 * @param data данные оригинального элемента
 * @param children сслыки дочерних элементов
 */
interface TreeItem {
  data: OriginItem;
  children?: TreeItem[];
}

/**
 * * Класс хранилища дерева
 */
export class TreeStore {
  // Мап связанных элементов дерева
  treeMap: Map<string, TreeItem>;

  // Конструктор
  constructor(originItems: OriginItem[]) {
    // Инициализация мап
    this.treeMap = new Map();

    // Заполнение мап элементами дерева
    originItems.forEach((item) => {
      this.treeMap.set(item.id.toString(), {
        data: item,
        children: [],
      });
    });

    // Связывание элементов дерева
    this.treeMap.forEach((item) => {
      // Пропуск итерации, корневого элемента
      if (item.data.parent === "root") {
        return;
      }

      // Поиск родительского элемента
      const parentItem = this.treeMap.get(item.data.parent.toString());

      // Пропуск итерации если родительский элемент не найден
      if (!parentItem) {
        return;
      }

      // Запись ссылки элемента в родительский 
      parentItem?.children
        ? parentItem.children?.push(item)
        : (parentItem.children = [item]);
    });
  }

  // Получение всех элементов в исходном порядке
  getAll(): OriginItem[] {
    return Array.from(this.treeMap.values()).map((item) => item.data);
  }

  // Получение элемента по id
  getItem(id: number | string): OriginItem | undefined {
    return this.treeMap?.get(id.toString())?.data;
  }

  // Получение детей элемента по id
  getChildren(id: number | string): OriginItem[] {
    return (
      this.treeMap?.get(id.toString())?.children?.map((item) => item.data) || []
    );
  }

  // Получение всех детей элемента по id
  getAllChildren(id: number | string): OriginItem[] {
    // Получени элемента по id
    const item = this.treeMap?.get(id.toString());

    // При отсуствии элемента возврат пустого массива
    if (!item) {
      return [];
    }

    // Создание массива для дочерних элементов
    const children: OriginItem[] = [];

    // Обход детей текущего элемента
    item?.children?.forEach((child) => {
      // Добавление дочернего элемента в массив
      // Рекурсивный вызов метода для получения потомков текущего ребенка и последующее добавление
      children.push(child.data, ...this.getAllChildren(child.data.id));
    });

    // item?.children?.forEach((child) => {
    //   children.push(...this.getAllChildren(child.data.id));
    // });

    return children;
  }

  // Получние родителей элемента
  getAllParents(id: number | string): OriginItem[] {
    // Получение элемента по id
    const item = this.treeMap?.get(id.toString());
    // При отсуствии элемента возврат пустого массива
    if (!item) {
      return [];
    }
    // Поиск родительского элемента по id
    const parent = this.treeMap?.get(item.data.parent.toString());
    // При отсуствии родителя возврат пустого массива
    if (!parent) {
      return [];
    }
    // Создание массива для родительских элементов, с родителем текущего элемента
    const parents: OriginItem[] = [parent.data];

    // Если parentId родителя root возврат массива родителей 
    if (parent.data.parent === "root") {
      return parents;
    }

    // Рекурсивный выхов метода для поиска родительких элементов родителя
    // Возврат результата рекурсивного вызова и конкатенация с текущем массивом родителя
    return parents.concat(this.getAllParents(parent.data.id));
  }
}

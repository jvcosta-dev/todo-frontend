export interface ITask {
  _id: string;
  title: string;
  description: string;
  tag: string;
  initialDate: Date;
  endDate: Date;
  status?: 0 | 1 | 2;
}

interface Foo {
  title: string;
}

export interface Content {
  foo: Foo;
}

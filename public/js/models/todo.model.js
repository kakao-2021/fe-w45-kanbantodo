const TODO_API_HOST = "http://localhost:8000/api/todo";

class TodoModel {
  constructor() {
    this.todoCardList = {};
  }

  async getCardData() {
    let res = await fetch(TODO_API_HOST);
    return await res.json();
  }

  async addCard(cardData) {
    let res = await this.postCardData(cardData);
    let newCard = await res.json();

    this.todoCardList[cardData.status] = [...this.todoCardList[cardData.status], newCard];

    return this.todoCardList;
  }

  async deleteTodo(todoData) {
    await this.deleteCardData(todoData);

    this.todoCardList[todoData.status] = this.todoCardList[todoData.status].filter(({ _id }) => {
      return _id !== todoData.id;
    });

    return this.todoCardList;
  }

  postCardData(todoData) {
    return fetch(TODO_API_HOST, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    });
  }

  deleteCardData(todoData) {
    return fetch(TODO_API_HOST, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    });
  }

  clusterTodoData(todoData) {
    for (let todo of todoData) {
      if (this.todoCardList[todo.status]) {
        this.todoCardList[todo.status] = [...this.todoCardList[todo.status], todo];
        continue;
      }
      this.todoCardList[todo.status] = [todo];
    }
  }

  async initData() {
    let res = await this.getCardData();

    this.clusterTodoData(res);
    return this.todoCardList;
  }
}

export { TodoModel };

import create from "zustand";
import produce from "immer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// Turn the set method into an immer proxy
const immer = (config) => (set, get, api) =>
  config(
    (fn) => {
      const state = typeof fn === "function" ? fn : () => fn;
      set(produce(state));
    },
    get,
    api
  );

const zustandCreateStore = (children) => create(immer(children));

const storeStates = {
  admin: null,
  todo: [],
  isAuth: false,
  role: "test",
  error: null,
  errorForSignUp: null,
  allusers: [],
  meetings: [],
  IsCreateMeetingTrue: false,
  user: null,
  createuser: null,
};

const storeMethods = (set, get) => ({
  setAuth: async (data) => {
    set({ isAuth: true, role: data.role });
  },
  setcreteUserEMpty: async () => {
    set({ createuser: null });
  },
  setCreateUser: async (data) => {
    console.log(data);

    try {
      const res = await axios.post(
        "http://207.154.251.59:5001/users/create",
        data
      );

      console.log(res.data, "res");
      set({ createuser: res.data });
    } catch (error) {
      console.log(error);
      set({ error: error.response.data.message });
    }
  },
  setLogin: async (data) => {
    // console.log(data);

    try {
      const res = await axios.post(
        "http://207.154.251.59:5001/users/signin",
        data
      );

      // console.log(res.data, "res");
      set({ isAuth: true, role: res.data.role });
      set({ user: res.data });
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({ ...res.data, isAuth: true })
      );
    } catch (error) {
      console.log(error);
      set({ error: error.response.data.message });
    }
  },

  setErrorForSignupEmpty: async () => {
    set({ errorForSignUp: null });
  },
  setSignUp: async (data) => {
    // console.log(data);

    try {
      const res = await axios.post(
        "http://207.154.251.59:5001/users/signup",
        data
      );

      // console.log(res.data, "res");
      set({ isAuth: true, role: res.data.role });
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({ ...res.data, isAuth: true })
      );
    } catch (error) {
      // console.log(error.response.data);
      set({ errorForSignUp: error.response.data.message });
    }
  },

  setUploadDoc: async (data) => {
    console.log(data, "doc");

    try {
      // axios.post("http://207.154.251.59:5001/docs/create", data);
      const res = await axios({
        method: "post",
        url: "http://207.154.251.59:5001/docs/create",
        data: data,
      });

      console.log(res, "res create");

      // set({ isAuth: true, role: res.data.role });
    } catch (error) {
      console.log(error, "error");
    }
  },
  getAllUsers: async (data) => {
    try {
      const res = await axios.get("http://207.154.251.59:5001/users");

      console.log(res.data, "res");
      set({ allusers: res.data });
    } catch (error) {
      console.log(error.response.data);
      // set({ error: error.response.data.message });
    }
  },
  createMeeting: async (data) => {
    // console.log(data, "data");
    try {
      const res = await axios.post(
        "http://207.154.251.59:5001/meeting/create",
        data
      );

      console.log(res.data, "res create");
      set({ IsCreateMeetingTrue: true });
      setTimeout(() => {
        set({ IsCreateMeetingTrue: false });
      }, 200);
    } catch (error) {
      console.log(error.response.data);
      // set({ error: error.response.data.message });
    }
  },
  EditMeeting: async (data) => {
    console.log(
      data,
      "dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    );
    try {
      const res = await axios.patch(
        `http://207.154.251.59:5001/meeting/${data.id}`,
        data
      );

      console.log(res.data, "res edit");
      set({ IsCreateMeetingTrue: true });
      setTimeout(() => {
        set({ IsCreateMeetingTrue: false });
      }, 200);
    } catch (error) {
      console.log(error.response.data);
      // set({ error: error.response.data.message });
    }
  },
  getAllMeeting: async (data) => {
    try {
      const res = await axios.get(
        `http://207.154.251.59:5001/meeting?ClientId=${data.id}`
      );

      // console.log(res.data, "res");
      set({ meetings: res.data });
    } catch (error) {
      // console.log(error.response.data);
      // set({ error: error.response.data.message });
    }
  },
  init: async () => {
    try {
      // await AsyncStorage.clear();
      const todo = await AsyncStorage.getItem("TODO");
      const admin = await AsyncStorage.getItem("user");
      if (admin !== null) {
        set({ admin: JSON.parse(admin) });
      }
      if (todo !== null) {
        set({ todo: JSON.parse(todo) });
      }
    } catch (error) {
      // Error saving data
    }
  },
  updateTodo: async (item) =>
    new Promise(async (resolve) => {
      const datePresent = get().todo.find((data) => {
        if (data.date === item.date) {
          return true;
        }
        return false;
      });

      if (datePresent) {
        const updatedTodo = get().todo.map((data) => {
          if (datePresent.date === data.date) {
            return { ...data, todoList: [...data.todoList, ...item.todoList] };
          }
          return data;
        });

        try {
          set({ todo: updatedTodo });
          await AsyncStorage.setItem("TODO", JSON.stringify(updatedTodo));
        } catch (error) {
          // Error saving data
        }
      } else {
        const newTodo = [...get().todo, item];

        try {
          set({ todo: newTodo });
          resolve();
          await AsyncStorage.setItem("TODO", JSON.stringify(newTodo));
        } catch (error) {
          // Error saving data
        }
      }
    }),
  deleteTodo: () => {},
  updateSelectedTask: async (item) =>
    new Promise(async (resolve) => {
      const previousTodo = get().todo;
      const newTodo = previousTodo.map((data) => {
        if (item.date === data.date) {
          const previousTodoList = [...data.todoList];
          const newTodoList = previousTodoList.map((list) => {
            if (list.key === item.todo.key) {
              return item.todo;
            }
            return list;
          });
          return { ...data, todoList: newTodoList };
        }
        return data;
      });
      try {
        set({ todo: newTodo });
        resolve();
        await AsyncStorage.setItem("TODO", JSON.stringify(newTodo));
      } catch (error) {
        // Error saving data
      }
    }),
  deleteSelectedTask: async (item) =>
    new Promise(async (resolve) => {
      const previousTodo = get().todo;
      const newTodo = previousTodo.map((data) => {
        if (item.date === data.date) {
          const previousTodoList = [...data.todoList];
          const newTodoList = previousTodoList.filter((list) => {
            if (list.key === item.todo.key) {
              return false;
            }
            return true;
          });

          return { ...data, todoList: newTodoList };
        }
        return data;
      });
      const checkForEmpty = newTodo.filter((data) => {
        if (data.todoList.length === 0) {
          return false;
        }
        return true;
      });
      try {
        set({ todo: checkForEmpty });
        resolve();
        await AsyncStorage.setItem("TODO", JSON.stringify(checkForEmpty));
      } catch (error) {
        // Error saving data
      }
    }),
});

const useStore = zustandCreateStore((set, get) => ({
  ...storeStates,
  ...storeMethods(set, get),
}));

export default useStore;

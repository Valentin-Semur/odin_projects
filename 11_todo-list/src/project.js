const projectFactory = () => {
    let _name;
    let _tasks = [];

    return {
        getName () {
            return _name;
        },
        setName (name) {
            _name = name;
            return this;
        },

        getAllTasks () {
            return _tasks;
        },
        addNewTask (task) {
            _tasks.push(task)
        },
    };
};

export default projectFactory;
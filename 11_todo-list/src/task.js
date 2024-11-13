const taskFactory = () => {
    let _title;
    let _dueDate;
    let _description = "";
    let _priority = 0;
    let _completed = false;

    return {
        getTitle () {
            return _title;
        },
        setTitle (title) {
            _title = title;
            return this;
        },

        getDueDate () {
            return _dueDate;
        },
        setDueDate (dueDate) {
            if (dueDate instanceof Date) {
                _dueDate = dueDate;
            } else {
                console.error("Invalid due date. Must be a Date object.");
            }
            return this;
        },

        getDescription () {
            return _description;
        },
        setDescription (description) {
            _description = description;
            return this;
        },

        getPriority () {
            return _priority;
        },
        setPriority (priority) {
            _priority = priority;
            return this;
        },

        isCompleted () { // different naming convention because it returns a boolean
            return _completed;
        },
        setCompleted (completed) {
            if (typeof completed === "boolean") {
                _completed = completed;
            } else {
                console.error("Invalid completed status. Must be a boolean value.");
            }
            return this;
        },

        getTaskDetails () {
            return `Task: { title: "${this.getTitle()}", dueDate: ${this.getDueDate()}, description: "${this.getDescription()}", priority: ${this.getPriority()}, isCompleted: ${this.isCompleted()} }`;
        },
    };
};

export default taskFactory;
const dataHandler = (function() {

    const taskFactory = () => {
        let id = crypto.randomUUID();
        let _name;
        let _dueDate;
        let _description = "";
        let _priority = 2;
        let _completed = false;
        let _project;
    
        return {
            getName () {
                return _name;
            },
            setName (name) {
                _name = name;
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

            getProject () {
                return _project;
            },
            setProject (project) {
                _project = project;
                return this;
            },
    
            getTaskDetails () {
                return `Task: { name: "${this.getName()}", dueDate: ${this.getDueDate()}, description: "${this.getDescription()}", priority: ${this.getPriority()}, isCompleted: ${this.isCompleted()} }`;
            },

            id,
        };
    };

    const projectFactory = () => {
        let _name;
    
        return {
            getName () {
                return _name;
            },
            setName (name) {
                _name = name;
                return this;
            },
        };
    };
    
    return {
        taskFactory, projectFactory,
    }
})();

export default dataHandler;
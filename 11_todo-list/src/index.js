import "./styles.css";
import dataHandler from "./dataHandler.js"
import displayHandler from "./displayHandler.js";





displayHandler.loadFooter();
displayHandler.loadSidebar();
displayHandler.addProject("Work");
displayHandler.addProject("Life");

displayHandler.addTaskCard(false, "Do the dishes", "01-09-2029", 2);
displayHandler.addTaskCard(true, "Homework", "01-01-2020", 3);
displayHandler.addTaskCard(false, "Bisous to Magali", "14-11-2024", 4);

displayHandler.addCardaddTask();

const newTask = dataHandler.taskFactory()
    .setName("Test")



console.log(newTask);
console.log(newTask.getName());



const logicInterface = (function() {

    const showTask = (task) => {
        displayHandler.addTaskCard(
            task.isCompleted(),
            task.getName(),
            task.getDueDate(),
            task.getPriority()
        )
    }

    return {
        showTask
    }

})();


logicInterface.showTask(newTask);
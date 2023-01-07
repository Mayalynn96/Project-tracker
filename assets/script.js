$(function (){
    var dateTime = $('#timeAndDate');
    function displayTime(){
        setInterval(function(){
            dateTime.text(dayjs().format('MMM D, YYYY [at] HH:mm:ss'));
        }, 1000);
    }
    displayTime();
});

var projectsEl = document.getElementById("listOfProjects")
var allProjectsString = localStorage.getItem("allProjects")
var allProjects = JSON.parse(allProjectsString) || [];
function sortFunction(a, b) {
    var c = new Date(a.dDate).getTime();
    var d = new Date(b.dDate).getTime();
    return c > d ? 1 : -1;
};

allProjects.sort(sortFunction);

function renderProject(position) {
    var newProject = document.createElement("div")
    newProject.setAttribute("class", "row my-projects")

    function createProjectEl(varName, content, col,) {
        var varName = document.createElement("p")
        varName.setAttribute("class", col)
        varName.textContent = content;
        newProject.appendChild(varName)
    }

    createProjectEl(projectName, pName, "col-4");
    createProjectEl(projectType, pType, "col-3");
    createProjectEl(dueDate, dDate, "col-2");

    var doneBtn = document.createElement("button")
    doneBtn.setAttribute("class", "my-btns doneBtn col-2");
    doneBtn.textContent = "Done"
    newProject.appendChild(doneBtn);

    projectsEl.appendChild(newProject);

    doneBtn.addEventListener('click', function () {
        this.parentElement.remove();
        allProjects.splice(position, 1)
        localStorage.setItem("allProjects", JSON.stringify(allProjects));
        location.reload();
    });

    var tomorrow = dayjs().add(1, "day").format("YYYY MM DD");
    var today = dayjs().format("YYYY MM DD");
    var thisDate = dayjs(dDate).format("YYYY MM DD");
    if(thisDate < today){
        newProject.style.backgroundColor = "#406E8E";
        newProject.style.color = "#CBF7ED";
    } else if (thisDate === today) {
        newProject.style.backgroundColor = "#8EA8C3";
        newProject.style.color = "#CBF7ED";
    } else if (thisDate === tomorrow) {
        newProject.style.backgroundColor = "#CBF7ED";
        newProject.style.color = "#406E8E";
    }

}

for(var i = 0; i < allProjects.length; i++) {
    var pName = allProjects[i].pName;
    var pType = allProjects[i].pType;
    var dDate = allProjects[i].dDate;
    var position = i;
    renderProject(position);
}

function addProject() {

    allProjects.push({
        pName: document.getElementById("projectName").value,
        pType: document.getElementById("projectType").value,
        dDate: document.getElementById("dueDate").value,
    });

    localStorage.setItem("allProjects", JSON.stringify(allProjects));

    location.reload();

}

var saveNewProject = document.getElementById("saveProject") 

saveNewProject.addEventListener("click", function() {
    addProject();
})



const inquirer=require("inquirer")
const connection = require("./config");
require("console.table");

function menu() {
    inquirer.prompt([{
        type:"list", 
        name:"userselect", 
        message:"what would you like to do?",
        choices:["add employees","view employees","add department","view department","quit","view role","add role"]
        }]).then(userinput=>{
            if (userinput.userselect == "view employees") {
                viewEmployees();
            } else if (userinput.userselect == "add employees") {
                addEmployees();
            } else if (userinput.userselect == "add department") {
                addDepartment();
            } else if (userinput.userselect == "view department") {
                viewDepartment();
            } else if (userinput.userselect == "view role") {
                viewRole();
            } else if (userinput.userselect == "add role") {
                addRole();
            } else {
                endProgram();
            } 
        })
}

function addEmployees(){
    const employeeQuery= "insert into employee set ?"
    const roleQuery= "select * from role"
    connection.query(roleQuery,(error,results)=>{
        let roles=[

        ]
        if (error) throw error
        roles=results.map(role=>({
         id:role.id,title:role.title   
        }))
        inquirer.prompt([
            {
                type:"input",name:"first_name",message:"what is your first name ?"
            },
            {
                type:"input",name:"last_name",message:"what is your last name ?"
            },
            {
                type:"list",name:"role_id",message:"what is your role ?",choices:roles.map(role=>({
                    name:role.title,value:role.id
                }))
            }
        ]).then(response=>{
            connection.query(employeeQuery,response,function(error,results){
                if (error) throw error
                console.log("welcome aboard")
                menu()
            })
        })
    })
    
}
function addDepartment(){
   inquirer.prompt([
    {type:"input",name:"name",message:"insert the name of the department"}
   ]).then(response =>{
    connection.promise().query(`insert into department set ?`,response).then(data => {
        console.table(data[0]);
        menu()
    })
   })
}
function viewDepartment(){
    connection.promise().query(`SELECT * FROM department;`).then(data => {
        console.table(data[0]);
        menu()
    })
    
}

function addRole(){
    const sqlquery="select * from department"
    connection.query(sqlquery,function(error,results){
        let department=[]
    if(error)throw error
    department=results.map(results=>({
        id:results.id,name:results.name
    }))
    console.log(department)
    inquirer.prompt([
     {type:"list",name:"id",message:"in which department do you wish to add the new role ?",choices:department.map(d=>({name:d.name,value:d.id}))},
     {type:"input",name:"title",message:"role title"}, 
     {type:"input",name:"salary",message:"insert the salary for this role"}
    ]).then(response =>{
        const newRole={title:response.title,salary:response.salary,department_id:response.id}
     connection.promise().query(`insert into role set ?`,newRole).then(data => {
         console.table(data[0]);
         menu()
     })
    })})
 }

 function viewRole(){
    connection.promise().query(`SELECT * FROM role left join department on role.department_id = department.id;`).then(data => {
        console.table(data[0]);
        menu()
    })
    
}

function viewEmployees(){
    connection.promise().query(`SELECT * FROM employee;`).then(empData => {
        console.table(empData[0]);
        menu()
    })
}

function endProgram(){
    // Later on this does something
    process.exit(0);
}

menu();
"use strict";
class Candidate {
    constructor(name, age, position) {
        this.name = name;
        this.age = age;
        this.position = position;
    }
}
class Employee {
    constructor(name, age, position, isNew) {
        this.name = name;
        this.age = age;
        this.position = position;
        this.isNew = isNew;
        this.name = name;
        this.age = age;
        this.position = position;
        this.isNew = isNew;
    }
}
class CandidateRepo {
    constructor() {
        this.candidates = [];
    }
    create(candidate) {
        this.candidates.push(candidate);
        return candidate;
    }
    get() {
        return this.candidates;
    }
    delete(candidate) {
        this.candidates = this.candidates.filter((c) => c !== candidate);
    }
    update(candidate) {
        const index = this.candidates.findIndex((c) => c.name === candidate.name);
        if (index !== -1) {
            this.candidates[index] = candidate;
        }
        return candidate;
    }
}
class EmployeeRepo {
    constructor() {
        this.employees = [];
    }
    create(employee) {
        this.employees.push(employee);
        return employee;
    }
    get() {
        return this.employees;
    }
    delete(employee) {
        this.employees = this.employees.filter((c) => c.name !== employee.name);
    }
    update(employee) {
        const index = this.employees.findIndex((c) => c.name !== employee.name);
        if (index !== -1) {
            this.employees[index] = employee;
        }
        return employee;
    }
}
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    login(username, password) {
        return this.username === username && this.password === password;
    }
}
class HRManager extends User {
    constructor(username, password) {
        super(username, password);
        this.employees = [];
    }
    conductInterview(candidate) {
        console.log(`Прошло интервью с ${candidate.name},на позицию ${candidate.position} `);
        return Math.random() > 0.5;
    }
    registerEmployee(candidate) {
        const employee = new Employee(candidate.name, candidate.age, candidate.position, true);
        this.employees.push(employee);
        console.log(`Сотрудник зареган ${candidate.name}`);
    }
    removeEmployee(employeeName) {
        this.employees = this.employees.filter((e) => e.name !== employeeName);
        console.log(`работник ${employeeName} был уволен`);
    }
    getEmployees() {
        console.log(this.employees);
        return this.employees;
    }
    receiveCandidate(candidate) {
        console.log(`HR Manager received candidate ${candidate.name} for position ${candidate.position}`);
    }
}
class Recruiter extends User {
    constructor(username, password) {
        super(username, password);
    }
    sendCandidatesToHR(candidate, hrManager) {
        console.log(`Отправляем кандидата ${candidate.name} к HR`);
        if (hrManager.conductInterview(candidate)) {
            hrManager.registerEmployee(candidate);
        }
        else {
            console.log(`Кандидат не прошел интервью`);
        }
    }
    sendJobApp(candidate, hrManager) {
        console.log(`Sending candidate ${candidate.name} for position ${candidate.position} to HR`);
        hrManager.receiveCandidate(candidate);
    }
}
class Director extends User {
    constructor(username, password) {
        super(username, password);
    }
    sendJobApp(recruiter, positions) {
        positions.forEach((position) => {
            const candidate = new Candidate(`Candidate ${Math.floor(Math.random() * 100)}`, Math.floor(Math.random() * 50) + 20, position);
            recruiter.sendJobApp(candidate, new HRManager("3333", "44444"));
        });
    }
}
class Trainer extends User {
    conductTraining(employees) {
        employees.forEach((employee) => {
            if (employee.isNew) {
                this.conductIntroTraining(employee);
            }
            else {
                this.conductDevTraining(employee);
            }
        });
    }
    conductIntroTraining(employee) {
        console.log(`Проведен тренинг вводный для сотрудника ${employee.name}`);
    }
    conductDevTraining(employee) {
        console.log(`Проведен интервью для личностного роста для сотрудника ${employee.name}`);
    }
}
const candidateRepo = new CandidateRepo();
const employeeRepo = new EmployeeRepo();
const can2 = new Candidate("candidate2", 33, "emp");
console.log(can2);
const can3 = { name: "eeee", age: 53, position: "www" };
const can4 = { name: "eedsfee", age: 53, position: "www" };
const can5 = { name: "eee23e", age: 53, position: "www" };
candidateRepo.create(can3);
candidateRepo.create(can4);
candidateRepo.create(can5);
console.log(candidateRepo.get());
candidateRepo.delete(can3);
console.log(candidateRepo.update(can4));
const can1 = new Candidate("candidate1", 23, "developer");
const emp1 = new Employee("employee1", 34, "rh", true);
const HR1 = new HRManager("HR", "1234");
const dir = new Director("director", "1234");
const rec1 = new Recruiter("recruiter", "1234");
HR1.conductInterview(can1);
HR1.registerEmployee({ name: "12332", age: 33, position: "erere" });
HR1.removeEmployee("12332");
HR1.registerEmployee({ name: "123", age: 33, position: "erere" });
HR1.getEmployees();
rec1.sendCandidatesToHR(can1, HR1);
dir.sendJobApp(rec1, []);
const tr1 = new Trainer("444", "444");
const newEmployee = new Employee("John Doe", 30, "Manager", true);
employeeRepo.create(newEmployee);
employeeRepo.create(new Employee("dsakfd", 343, "kdfdf", true));
const employees = employeeRepo.get();
tr1.conductTraining(employees);

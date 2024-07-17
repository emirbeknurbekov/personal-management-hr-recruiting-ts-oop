class Candidate {
  constructor(
    public name: string,
    public age: number,
    public position: string
  ) {}
}

class Employee {
  constructor(
    public name: string,
    public age: number,
    public position: string,
    public isNew: boolean
  ) {
    this.name = name;
    this.age = age;
    this.position = position;
    this.isNew = isNew;
  }
}

interface Repository<T> {
  create: (obj: T) => T;
  get: () => T[];
  delete: (obj: T) => void;
  update: (obj: T) => T;
}

class CandidateRepo implements Repository<Candidate> {
  private candidates: Candidate[] = [];

  create(candidate: Candidate): Candidate {
    this.candidates.push(candidate);
    return candidate;
  }

  get(): Candidate[] {
    return this.candidates;
  }

  delete(candidate: Candidate): void {
    this.candidates = this.candidates.filter((c) => c !== candidate);
  }
  update(candidate: Candidate): Candidate {
    const index = this.candidates.findIndex((c) => c.name === candidate.name);
    if (index !== -1) {
      this.candidates[index] = candidate;
    }
    return candidate;
  }
}

class EmployeeRepo implements Repository<Employee> {
  private employees: Employee[] = [];

  create(employee: Employee): Employee {
    this.employees.push(employee);
    return employee;
  }

  get(): Employee[] {
    return this.employees;
  }

  delete(employee: Employee): void {
    this.employees = this.employees.filter((c) => c.name !== employee.name);
  }

  update(employee: Employee): Employee {
    const index = this.employees.findIndex((c) => c.name !== employee.name);
    if (index !== -1) {
      this.employees[index] = employee;
    }
    return employee;
  }
}

class User {
  constructor(public username: string, private password: string) {}

  login(username: string, password: string): boolean {
    return this.username === username && this.password === password;
  }
}

class HRManager extends User {
  private employees: Employee[] = [];

  constructor(username: string, password: string) {
    super(username, password);
  }

  conductInterview(candidate: Candidate): boolean {
    console.log(
      `Прошло интервью с ${candidate.name},на позицию ${candidate.position} `
    );
    return Math.random() > 0.5;
  }

  registerEmployee(candidate: Candidate) {
    const employee = new Employee(
      candidate.name,
      candidate.age,
      candidate.position,
      true
    );
    this.employees.push(employee);
    console.log(`Сотрудник зареган ${candidate.name}`);
  }

  removeEmployee(employeeName: string) {
    this.employees = this.employees.filter((e) => e.name !== employeeName);
    console.log(`работник ${employeeName} был уволен`);
  }

  getEmployees(): Employee[] {
    console.log(this.employees);

    return this.employees;
  }

  receiveCandidate(candidate: Candidate) {
    console.log(
      `HR Manager received candidate ${candidate.name} for position ${candidate.position}`
    );
  }
}

class Recruiter extends User {
  constructor(username: string, password: string) {
    super(username, password);
  }

  sendCandidatesToHR(candidate: Candidate, hrManager: HRManager) {
    console.log(`Отправляем кандидата ${candidate.name} к HR`);
    if (hrManager.conductInterview(candidate)) {
      hrManager.registerEmployee(candidate);
    } else {
      console.log(`Кандидат не прошел интервью`);
    }
  }
  sendJobApp(candidate: Candidate, hrManager: HRManager) {
    console.log(
      `Sending candidate ${candidate.name} for position ${candidate.position} to HR`
    );
    hrManager.receiveCandidate(candidate);
  }
}

class Director extends User {
  constructor(username: string, password: string) {
    super(username, password);
  }
  sendJobApp(recruiter: Recruiter, positions: string[]) {
    positions.forEach((position) => {
      const candidate = new Candidate(
        `Candidate ${Math.floor(Math.random() * 100)}`,
        Math.floor(Math.random() * 50) + 20,
        position
      );
      recruiter.sendJobApp(candidate, new HRManager("3333", "44444"));
    });
  }
}

class Trainer extends User {
  conductTraining(employees: Employee[]) {
    employees.forEach((employee) => {
      if (employee.isNew) {
        this.conductIntroTraining(employee);
      } else {
        this.conductDevTraining(employee);
      }
    });
  }
  private conductIntroTraining(employee: Employee) {
    console.log(`Проведен тренинг вводный для сотрудника ${employee.name}`);
  }

  private conductDevTraining(employee: Employee) {
    console.log(
      `Проведен интервью для личностного роста для сотрудника ${employee.name}`
    );
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

const newEmployee: Employee = new Employee("John Doe", 30, "Manager", true);
employeeRepo.create(newEmployee);
employeeRepo.create(new Employee("dsakfd", 343, "kdfdf", false));

const employees = employeeRepo.get();

tr1.conductTraining(employees);

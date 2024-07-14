#! /usr/bin/env node

import inquirer from "inquirer";

console.log(`Welcome to Student Management System!\n`);

// creating a class of student
class Student {
  //properties
  static idCounter: number = 0;
  studentID: number;
  courses: string[] = [];
  balance: number = 0;

  constructor(private name: string) {
    Student.idCounter++;
    this.studentID = this.generateStudentID();
  }

  generateStudentID() {
    return 10000 + Student.idCounter; // 10001, 10002 and so on
  }

  enrollCourse(course: string) {
    this.courses.push(course);
    this.balance += 1000; // each course fees is 1000
  }

  viewBalance(): number {
    return this.balance; //  pending balance of a student
  }

  payCoursesFee(amount: number) {
    this.balance -= amount; // the balance of student will - amount paid by student
  }

  showStatus() {
    console.log(`
      Name: ${this.name}
      Student ID: ${this.studentID}
      Courses Enrolled: ${this.courses.join(", ")}
      Balance: ${this.balance}
      `);
  }

  getStudentID(): number {
    return this.studentID;
  }

  getName() {
    return this.name;
  }
}

// class ends here

const students: Student[] = []; // students list will be stored here

// mainMenu start
async function mainMenu() {
  const userInputMenu = await inquirer.prompt({
    type: 'list',
    name: 'menu',
    message: 'Select your Menu!',
    choices: [
      { name: "1. Add New Student", value: "ADD_STUDENT" },
      { name: "2. Enroll Student in Course", value: "ENROLL_COURSE" },
      { name: "3. View Student Balance", value: "VIEW_BALANCE" },
      { name: "4. Pay course fees", value: "PAY_FEES" },
      { name: "5. Show Student Status", value: "SHOW_STATUS" },
      { name: "6. End Menu", value: "END_MENU" }
    ]
  });

  // destructuring
  const { menu } = userInputMenu;

  if (menu === "ADD_STUDENT") await addNewStudent();
  if (menu === "ENROLL_COURSE") await enrollStudent();
  if (menu === "VIEW_BALANCE") await viewBalance();
  if (menu === "PAY_FEES") await payTuition();
  if (menu === "SHOW_STATUS") await showStatus();
  if (menu === "END_MENU") {
    console.log(`Thank you for using Student Management System\n`);
    process.exit();
  }
  mainMenu();
}
// mainMenu ends

// start creating functions

// addNewStudent start here
async function addNewStudent() {
  const userInput = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Enter Student Name here!'
  });

  const student = new Student(userInput.name);

  students.push(student);
  console.log(`Student ${student.getName()} added with ID ${student.getStudentID()}\n`);
}
// addNewStudent ends here

// enrollStudent start here
async function enrollStudent() {
  const student = await selectStudent(); // we will create this function after

  if (student) {
    const userInput = await inquirer.prompt({
      type: 'list',
      name: 'course',
      message: 'Select courses to enroll',
      choices: [
        { name: 'TypeScript', value: 'TypeScript' },
        { name: 'JavaScript', value: 'JavaScript' },
        { name: 'Python', value: 'Python' },
        { name: 'Next.js', value: 'Next.js' }
      ]
    });

    student.enrollCourse(userInput.course);
    console.log(`Successfully Enrolled in Course: ${userInput.course}`);
  }
}
// enrollStudent ends here

// viewBalance start here
async function viewBalance() {
  const student = await selectStudent();

  if (student) {
    console.log(`Balance: ${student.viewBalance()}`);
  }
}
// viewBalance ends here

//payTuition() starts here
async function payTuition() {
  const student = await selectStudent();

  if (student) {
    const userInput = await inquirer.prompt({
      type: 'input',
      name: 'amount',
      message: 'Enter amount you want to pay?'
    });

    student.payCoursesFee(parseFloat(userInput.amount));
    console.log(`Paid ${userInput.amount}. Balance remaining ${student.viewBalance()}`);
  }
}
//payTuition() ends here

// showStatus() starts here
async function showStatus() {
  const student = await selectStudent();
  if (student) {
    student.showStatus();
  }
}
// showStatus() ends here

// selectStudent() start here
async function selectStudent() {
  if (students.length === 0) {
    console.log('No Students record available.\n');
  } else {
    const stdSelect = await inquirer.prompt({
      type: 'list',
      name: 'stdID',
      message: 'Select a student!',
      choices: students.map((std) => ({
        name: std.getName(),
        value: std.getStudentID()
      }))
    });

    return (
      students.find((std) => std.getStudentID() === stdSelect.stdID) || null
    );
  }
}
// selectStudent() start here

mainMenu();

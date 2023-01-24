#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName: any;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
               'Quiz Game'
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    I am a process on your computer.
    If you get any question wrong you will be ${chalk.bgRed('killed')}
    So get all the questions right...
  `);
}

async function handleAnswer(isCorrect: boolean) {
  const spinner = createSpinner('Checking answer...').start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}. It's correct!` });
  } else {
    spinner.error({ text: `Game over, you lose ${playerName}!` });
    process.exit(1);
  }
}

async function askName() {
  const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
    default() {
      return 'Player';
    },
  });

  playerName = answers.player_name;
}

function winner() {
  console.clear();
  figlet(`Congrats , ${playerName} !`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + '\n');

    console.log(
        chalk.green(" YOU WIN!")
    );
    process.exit(0);
  });
}

async function question1() {
  const answers = await inquirer.prompt({
    name: 'question_1',
    type: 'list',
    message: 'Brass gets discoloured in air because of the presence of which of the following gases in air?\n',
    choices: [
      'Oxygen',
      'Hydrogen Sulphide',
      'Carbon Dioxide',
      'Nitrogen',
    ],
  });

  return handleAnswer(answers.question_1 === 'Hydrogen Sulphide');
}

async function question2() {
  const answers = await inquirer.prompt({
    name: 'question_2',
    type: 'list',
    message: 'How many bones do we have in an ear?\n',
    choices: ['2', '3', '206', '10'],
  });
  return handleAnswer(answers.question_2 === '3');
}

async function question3() {
  const answers = await inquirer.prompt({
    name: 'question_3',
    type: 'list',
    message: `Which planet has the most moons?\n`,
    choices: ['Neptune', 'Earth', 'Jupuitar', 'Saturn'],
  });

  return handleAnswer(answers.question_3 === 'Saturn');
}

async function question4() {
  const answers = await inquirer.prompt({
    name: 'question_4',
    type: 'list',
    message: 'Where did sushi originate?\n',
    choices: [
      'China',// Correct
      'Korea',
      'Italy',
      'Japan', 
    ],
  });
  return handleAnswer(answers.question_4 === 'China');
}

async function question5() {
  const answers = await inquirer.prompt({
    name: 'question_5',
    type: 'list',
    message:
      'What is the capital of Ireland?\n',
    choices: ['Sligo', 'Dublin', 'Cork', 'Waterford'],
  });

  return handleAnswer(answers.question_5 === 'Dublin');
}

async function question6() {
    const answers = await inquirer.prompt({
      name: 'question_6',
      type: 'list',
      message:
        'What is acrophobia a fear of? \n',
      choices: ['Flying', 'Dark', 'Height', 'Snakes'],
    });
  
    return handleAnswer(answers.question_6 === 'Flying');
  }

  async function question7() {
    const answers = await inquirer.prompt({
      name: 'question_7',
      type: 'list',
      message:
        'How many hearts does an octopus have? \n',
      choices: ['7', '8', '10', '3'],
    });
  
    return handleAnswer(answers.question_7 === '3');
  }

  async function question8() {
    const answers = await inquirer.prompt({
      name: 'question_8',
      type: 'list',
      message:
        'What phone company produced the 3310? \n',
      choices: ['Qmobile', 'Apple', 'Samsung', 'Nokia'],
    });
  
    return handleAnswer(answers.question_8 === 'Nokia');
  }

// Run it with top-level await
console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await question6();
await question7();
await question8();
winner();
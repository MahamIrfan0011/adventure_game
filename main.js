import inquirer from "inquirer";
let enemies = ['Skeleton', 'Zombie', 'Warrior', 'Assassin'];
let maxEnemyHealth = 75;
let enemyAttackDamage = 25;
let health = 100;
let attackDamage = 50;
let numHealthPotions = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50; //percentage
let running = true;
let getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * max - min) + min;
};
console.log("\n\tWelcome to the Dangeon!");
GAME: while (running) {
    console.log("\t..................................");
    let enemyHealth = getRandomNumber(1, maxEnemyHealth);
    let enemy = enemies[getRandomNumber(0, enemies.length - 1)];
    console.log(`\t ${enemy} has appeared`);
    while (enemyHealth > 0) {
        console.log(`\t Your health power: ${health}`);
        console.log(`\t ${enemy} health power: ${enemyHealth}`);
        let control = await inquirer.prompt({
            message: "What would you like to do?",
            type: "list",
            choices: ['\tAttack', '\tDrink Health Potion', '\tRun '],
            name: "command"
        });
        switch (control.command) {
            case "\tAttack":
                let strikeDamage = getRandomNumber(1, attackDamage);
                let damageTaken = getRandomNumber(1, enemyAttackDamage);
                health -= damageTaken;
                enemyHealth -= strikeDamage;
                console.log(`\tYou strike the ${enemy} with ${strikeDamage} damage.`);
                console.log(`\tYou received ${damageTaken} damage from the ${enemy}`);
                if (health < 1) {
                    console.log(`\t You have taken too much damage. You are too weak to go on.`);
                    break;
                }
                break;
            case "\tDrink Health Potion":
                if (numHealthPotions > 0) {
                    health += healthPotionHealAmount;
                    console.log(`\t You drank health potion, healing yourself for ${healthPotionHealAmount}. \nYou now have the ${health} health power\n you now have ${numHealthPotions} left.`);
                }
                else {
                    console.log(`\t You have no health potions left to defeat enemy`);
                }
                break;
            case "\tRun":
                console.log(`\t You ran away from the ${enemy}.`);
                continue GAME;
                break;
        }
    }
    if (health < 1) {
        console.log(`\t You limp out of the Dungeon, weak from battle.`);
        break;
    }
    console.log("\t..................................");
    console.log(`\t${enemy} has been defeated`);
    console.log(`\t You have ${health} HP left`);
    if (getRandomNumber(1, 100) < healthPotionDropChance) {
        numHealthPotions++;
        console.log(`\t The ${enemy} dropped the health potion`);
        console.log(`\t You now have ${numHealthPotions} health potions`);
    }
    let stateControl = await inquirer.prompt({
        message: "\tWhat would you like to do?",
        type: "list",
        choices: ['\tCountinue Fighting', '\tExit Dungeon'],
        name: "command"
    });
    if (stateControl.command === "Continue Fighting") {
        console.log(`\t You can continue your adventure!`);
    }
    else {
        console.log(`\t You exit the Dungeon, successfully! `);
        break;
    }
}
console.log("\t THANK YOU FOR PLAYING");

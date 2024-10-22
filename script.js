const disks = prompt("enter the number of disk"); //  number of disks
const rods = {
  rod1: document.getElementById("rod1"),
  rod2: document.getElementById("rod2"),
  rod3: document.getElementById("rod3"),
};
let moveCount = 0; // Track the moves

// Define an array of colors for the disks
const colors = ["yellow", "blue", "red","aqua","green","gold","lightgreen","violet","white","brown"]; // Colors are ordered with largest first

// Create disks and add them to the first rod
function initializeDisks() {
  rods.rod1.innerHTML = "";
  rods.rod2.innerHTML = "";
  rods.rod3.innerHTML = "";

  for (let i = disks; i > 0; i--) {
    const disk = document.createElement("div");
    disk.classList.add("disk");
    disk.style.width = `${20*i + 40}px`; // Each disk has a different width, largest at the bottom
    disk.style.height = "30px"; // Disk height
    disk.style.backgroundColor = colors[disks - i]; // Assign color based on index
    disk.style.marginBottom = "5px"; // Spacing between disks
    rods.rod1.appendChild(disk); // Add disk to the first rod
  }
}

// Recursive function to solve Tower of Hanoi with delay
function towerOfHanoi(n, fromRod, toRod, auxRod) {
  if (n === 1) {
    setTimeout(() => moveDisk(fromRod, toRod), moveCount * 1000); // Add delay based on move count
    moveCount++;
    return;
  }
  towerOfHanoi(n - 1, fromRod, auxRod, toRod);
  setTimeout(() => moveDisk(fromRod, toRod), moveCount * 1000); // Add delay based on move count
  moveCount++;
  towerOfHanoi(n - 1, auxRod, toRod, fromRod);
}

// Move disk from one rod to another
function moveDisk(fromRodId, toRodId) {
  const fromRod = rods[fromRodId];
  const toRod = rods[toRodId];

  if (fromRod.childElementCount === 0) return; // No disk to move

  const disk = fromRod.lastElementChild;
  toRod.appendChild(disk);

  console.log(`Move disk from ${fromRodId} to ${toRodId}`);
}

// Start the process when the button is clicked
document.getElementById("start-btn").addEventListener("click", () => {
  initializeDisks();
  moveCount = 0; // Reset the move count before starting
  setTimeout(() => {
    towerOfHanoi(disks, "rod1", "rod3", "rod2");
  }, 300); // Adding a delay before solving
});

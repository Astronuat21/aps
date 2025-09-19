let colorCount = 1;

function main() {
    let weightInput = document.getElementById("mass").value;
    let weight = weightInput ? Number(weightInput) : 0;

    let size_xInput = document.getElementById("size_x").value;
    let size_yInput = document.getElementById("size_y").value;

    let X_SIZE = size_xInput ? Number(size_xInput) : size_yInput ? 1 : 0;
    let Y_SIZE = size_yInput ? Number(size_yInput) : size_xInput ? 1 : 0;

    let size_zInput = document.getElementById("size_z").value;
    let Z_SIZE = size_zInput ? Number(size_zInput) : 0;

    // Weight
    let price = weight * 0.03;

    // Size based on taken plate space
    let plate_space = (X_SIZE * Y_SIZE) / 65536;
    price += plate_space;

    // Height (Small Boost)
    price += (Z_SIZE * 0.0005);

    // Color Price
    price += (colorCount - 1) * 0.1

    // Push value
    document.getElementById("cost").innerText = "$" + price.toFixed(2);

    //Console Log:
    console.log("Pushed value:", price)
}

window.onload = function () {
    document.getElementById("mass").addEventListener("input", main);
    document.getElementById("size_x").addEventListener("input", main);
    document.getElementById("size_y").addEventListener("input", main);
    document.getElementById("size_z").addEventListener("input", main);
    main();

    // Add color dropdown
    document.getElementById("add-color-btn").addEventListener("click", function () {
        if (colorCount >= 4) return; // limit to 4
        colorCount++;

        // Thanks GPT lol
        let container = document.createElement("div");
        container.classList.add("Input_Container");
        container.id = `color-container-${colorCount}`;
        let label = document.createElement("label");
        label.setAttribute("for", `color-${colorCount}`);
        label.classList.add("Textbox_Small");
        label.innerText = `Color ${colorCount}:`;
        let select = document.createElement("select");
        select.name = "colors";
        select.id = `color-${colorCount}`;
        select.classList.add("Textbox_Small");

        // Add the thingies in the dropdown
        let colors = ["red", "orange", "yellow", "green", "dark green", "blue", "violet", "brown", "gold", "white", "silver", "black"];
        colors.forEach(color => {
            let option = document.createElement("option");
            option.value = color;
            option.innerText = color//.charAt(0).toUpperCase() + color.slice(1);
            select.appendChild(option);
        });

        container.appendChild(label);
        container.appendChild(select);
        document.getElementById("color-container").appendChild(container);

        main(); // recalc
    });

    // Remove last color dropdown
    document.getElementById("remove-color-btn").addEventListener("click", function () {
        if (colorCount <= 1) return; // keep at least 1
        let containerToRemove = document.getElementById(`color-container-${colorCount}`);
        if (containerToRemove) {
            containerToRemove.remove();
        }
        colorCount--;
        main(); // recalc
    });
};
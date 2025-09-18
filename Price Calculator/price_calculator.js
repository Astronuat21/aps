function main() {
    let weightInput = document.getElementById("mass").value;
    let weight = weightInput ? Number(weightInput) : 0;

    let size_xInput = document.getElementById("size_x").value;
    let X_SIZE = size_xInput ? Number(size_xInput) : 1;

    let size_yInput = document.getElementById("size_y").value;
    let Y_SIZE = size_yInput ? Number(size_yInput) : 1;

    let size_zInput = document.getElementById("size_z").value;
    let Z_SIZE = size_zInput ? Number(size_zInput) : 1;

    // Weight
    let price = weight * 0.03;

    // Size based on taken plate space
    let plate_space = (X_SIZE * Y_SIZE) / 256 * 256;
    price = price + plate_space;

    // Height (Small Boost)
    price = price + (Z_SIZE * 0.0005);

    // Push value
    document.getElementById("cost").innerText = "$" + price.toFixed(2);
}

window.onload = function () {
    document.getElementById("mass").addEventListener("input", main);
    document.getElementById("size_x").addEventListener("input", main);
    document.getElementById("size_y").addEventListener("input", main);
    document.getElementById("size_z").addEventListener("input", main);
};
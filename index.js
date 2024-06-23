const inquirer = require("inquirer");
const SVG = require("./lib/svg");
const {
    Circle, Triangle, Square

} = require("./lib/shapes")

const fs = require ("fs");

inquirer.prompt([
    {
      type: "input", message: "what text you want for your logo?", name: "text"
    },
    {
        type: "input", message: "what font color you want for your text?", name: "color"

    },
    {
        type: "input", message: "what color you want for the shape?", name: "fill"

    }, 
    {
        type: "list", message: "select shape", name: "shape", choices: ["square", "triangle", "circle"]

    },
]). then (answers => {
    let shape;
    if(answers.shape === "square") {
        shape = new Square()
    }
    else if (answers.shape === "triangle") {
        shape = new Triangle()
    }
    else{shape = new Circle()}
    shape.setColor(answers.fill) 
    const svg = new SVG()
    svg.setShape (shape)
    svg.setText(answers.text, answers.color)
    fs.writeFile("Logo.svg", svg.render(), (err )=> {
        if(err) console.log(err)
            else console.log ("svg logo successfully created")
    })
})
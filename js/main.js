const _parent = document.getElementById("wrapper");
const _ini = document.getElementById("ini");


const _currentDownloaded = [];

class Crosshair{

    constructor(width, height, thicknessX, thicknessY, centerGap, id){

        this.packName = "xhairtests";

        this.width = width;
        this.height = height;
        this.thickness = {"x": thicknessX, "y": thicknessY};

        this.centerGap = centerGap;

        this.wrapper = document.createElement("div");
        this.wrapper.className = "download";

        

        this.canvas = document.createElement("canvas");
        this.canvas.id = `x_${this.width}_${this.height}_${this.thickness.x}_${this.thickness.y}_${this.centerGap}`;
        this.canvas.width = 64;
        this.canvas.height = 64;


        this.wrapper.appendChild(this.canvas);
        this.render();

        this.url = document.createElement("A");
        this.url.download = `${this.canvas.id}.png`;
        this.url.herf = "#";

    
        this.url.innerHTML = "Download";
        this.wrapper.appendChild(this.url);

        _parent.appendChild(this.wrapper);

        this.url.addEventListener("click", () =>{

            _currentDownloaded.push(`${this.packName}.x_${this.width}_${this.height}_${this.thickness.x}_${this.thickness.y}_${this.centerGap}`);

            let string = ``;

            for(let i = 0; i < _currentDownloaded.length; i++){

                string += `CrossHairs[${i}]=${_currentDownloaded[i]}<br/>`;
            }
            
            console.log(string);
            _ini.innerHTML = string;
        });

        const image = this.canvas.toDataURL("image/png");

        this.url.href = image;
          
    
    }



    render(){

        const c = this.canvas.getContext("2d");
        c.fillStyle = "black";
        c.fillRect(0,0,64,64);

        c.fillStyle = "white";

        //x
        c.fillRect(32 - this.width - this.centerGap, 32 - Math.floor(this.thickness.x * 0.5), this.width, this.thickness.x);
        //c.fillStyle = "red";
        c.fillRect(32 + this.centerGap + (this.thickness.x), 32 - Math.floor(this.thickness.x * 0.5), this.width, this.thickness.x);

        //y
        c.fillStyle = "white";
        c.fillRect(32 - Math.floor(this.thickness.y * 0.5), 32 - this.height - this.centerGap, this.thickness.y, this.height);
       // c.fillStyle = "red";
        c.fillRect(32 - Math.floor(this.thickness.y * 0.5), 32 + this.centerGap + this.thickness.y , this.thickness.y, this.height);


    }

}


//new Crosshair(10,10,1,1,0);
//new Crosshair(10,10,2,2,0);
//new Crosshair(10,10,4,4,0);
//new Crosshair(10,10,8,8,0);

for(let i = 0; i < 32; i++){

    new Crosshair(i + 1, i + 1, 1, 1, 0, i);
}
onload = function () {
    const editor = document.getElementById("editor");
    const context = editor.getContext("2d");
    const toolbar = document.getElementById("toolbar");
    
    const tools = {
        "upload" : function () {
            const upload = document.createElement('input');
            upload.type = "file";
            upload.click();
            upload.onchange = function() {
                const img = new Image();
                img.onload = () => {
                    editor.width = img.width;
                    editor.height = img.height;
                    context.drawImage(img, 0,0);
                };
                img.onerror = () => {
                    console.error("The provided file couldn't be loaded as an Image media");
                };

                img.src = URL.createObjectURL(this.files[0]);
            };
        },
        "save" : function(){
            const image = editor.toDataURL();
            const link = document.createElement('a');
            link.download = 'image.png';
            link.href = image;
            link.click();
        },

        "flipHor" : function(){
            let cols = editor.width; // Width is number of columns
            let rows = editor.height; // Height is number of rows
            let image = getRGBArray(rows, cols);
            
            for(let i=0;i<Math.floor(rows/2);i++){
                for(let j=0;j<cols;j++){
                    let tmp = image[i][j];
                    image[i][j] = image[rows-1-i][j];
                    image[rows-1-i][j] = tmp;
                }
            }
            setImageData(image, rows, cols);
        },
        
        "flipVert" : function(){
            let cols = editor.width; // Width is number of columns
            let rows = editor.height; // Height is number of rows
            let image = getRGBArray(rows, cols);
            
            for(let i=0;i<rows;i++){
                for(let j=0;j<Math.floor(cols/2);j++){
                    let tmp = image[i][j];
                    image[i][j] = image[i][cols-1-j];
                    image[i][cols-1-j] = tmp;
                }
            }
            setImageData(image, rows, cols);
        },

